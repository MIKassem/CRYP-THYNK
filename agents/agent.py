import json
from typing import Any, Dict, List, Optional

from .databricks_client import DatabricksLLMClient
from .rag import RagPipeline
from .tools import ToolRegistry


class Agent:
    """
    Simple agent that:
    - Pulls context from a local RAG pipeline.
    - Calls a Databricks-hosted LLM.
    - Executes locally registered tools/functions on demand.
    """

    def __init__(self, llm: DatabricksLLMClient, rag: RagPipeline, tools: ToolRegistry) -> None:
        self.llm = llm
        self.rag = rag
        self.tools = tools

    def run(
        self,
        query: str,
        allow_search: bool = True,
        conversation_history: Optional[List[Dict[str, str]]] = None,
    ) -> Dict[str, Any]:
        trace: List[Dict[str, Any]] = []

        context_chunks = self.rag.search(query, k=3)
        system_prompt = self._system_prompt()
        user_content = self._format_user_message(query, context_chunks)

        messages: List[Dict[str, Any]] = [
            {"role": "system", "content": system_prompt},
        ]
        if conversation_history:
            messages.extend(conversation_history)
        messages.append({"role": "user", "content": user_content})

        first = self.llm.chat(messages=messages, tools=self.tools.schemas())
        trace.append({"event": "llm_first_pass", "data": first["raw"]})

        tool_calls = first.get("tool_calls") or []
        if tool_calls:
            for call in tool_calls:
                tool_name = call.get("function", {}).get("name") or call.get("name")
                if not tool_name:
                    continue
                if tool_name == "web_search" and not allow_search:
                    continue
                args_raw = call.get("function", {}).get("arguments") or call.get("arguments") or "{}"
                try:
                    parsed_args: Dict[str, Any] = json.loads(args_raw) if isinstance(args_raw, str) else args_raw
                except json.JSONDecodeError:
                    parsed_args = {}
                try:
                    result = self.tools.call(tool_name, parsed_args)
                except Exception as exc:  # pragma: no cover - defensive
                    result = f"Tool {tool_name} failed: {exc}"

                trace.append({"event": "tool_call", "name": tool_name, "arguments": parsed_args, "result": result})

                messages.append(
                    {
                        "role": "assistant",
                        "tool_calls": [
                            {
                                "id": call.get("id") or tool_name,
                                "type": "function",
                                "function": {"name": tool_name, "arguments": json.dumps(parsed_args)},
                            }
                        ],
                        "content": None,
                    }
                )
                messages.append(
                    {
                        "role": "tool",
                        "tool_call_id": call.get("id") or tool_name,
                        "name": tool_name,
                        "content": result,
                    }
                )

            final = self.llm.chat(messages=messages, tools=self.tools.schemas())
            trace.append({"event": "llm_final", "data": final["raw"]})
            answer = final.get("message", "")
        else:
            answer = first.get("message", "")

        sources = sorted({c.get("source", "unknown") for c in context_chunks})
        sources_line = "Sources: none" if not sources else "Sources: " + "; ".join(sources)
        if isinstance(answer, str):
            # Strip any existing Sources lines to avoid model-invented placeholders.
            filtered_lines = [
                ln for ln in answer.strip().splitlines() if not ln.strip().lower().startswith("sources:")
            ]
            answer_clean = "\n".join(filtered_lines).strip()
            answer = f"{answer_clean}\n\n{sources_line}".strip()

        return {
            "answer": answer or "",
            "trace": trace,
            "tools_available": self.tools.names(),
            "context_used": context_chunks,
        }

    @staticmethod
    def _format_user_message(query: str, context: List[Dict[str, Any]]) -> str:
        if context:
            context_block = "\n\n".join(
                f"[{item.get('source','unknown')}] {item.get('text','')}" for item in context
            )
        else:
            context_block = "No RAG context available."
        return (
            "User question:\n"
            f"{query}\n\n"
            "Relevant context (use these exact [source] tags in your answer; do not invent new ones):\n"
            f"{context_block}\n\n"
            "Citing rules: every claim grounded in context must include its [source] tag; do NOT use numeric citations like [1]/[2]. "
            "If no context applies, state 'Sources: none'."
        )

    @staticmethod
    def _system_prompt() -> str:
        return (
            "You are a research assistant that can cite provided context, call tools, and stay concise. "
            "Prefer RAG context over speculation. If tools are provided, decide when to call them. "
            "Use only the provided [source] tags for citations; never fabricate sources and never use numeric citations like [1]/[2]. "
            "Include a 'Sources:' line at the end listing the tags you used, or 'Sources: none' if nothing was cited. "
            "Return final answers as markdown."
        )
