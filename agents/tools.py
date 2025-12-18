from dataclasses import dataclass
from typing import Any, Callable, Dict, List

from .search import WebSearchClient


Handler = Callable[[Dict[str, Any]], str]


@dataclass
class Tool:
    name: str
    description: str
    parameters: Dict[str, Any]
    handler: Handler


class ToolRegistry:
    def __init__(self) -> None:
        self._tools: Dict[str, Tool] = {}

    def register(self, tool: Tool) -> None:
        self._tools[tool.name] = tool

    def schemas(self) -> List[Dict[str, Any]]:
        """Return OpenAI/Databricks-compatible tool schemas."""
        return [
            {
                "type": "function",
                "function": {
                    "name": tool.name,
                    "description": tool.description,
                    "parameters": tool.parameters,
                },
            }
            for tool in self._tools.values()
        ]

    def call(self, name: str, arguments: Dict[str, Any]) -> str:
        tool = self._tools.get(name)
        if not tool:
            raise ValueError(f"Tool {name} not registered")
        return tool.handler(arguments or {})

    def names(self) -> List[str]:
        return list(self._tools.keys())


def build_builtin_tools(search_client: WebSearchClient) -> ToolRegistry:
    registry = ToolRegistry()

    def web_search(args: Dict[str, Any]) -> str:
        query = args.get("query", "")
        if not query:
            return "No query provided."
        results = search_client.search(query=query, limit=int(args.get("limit", 3)))
        return "\n".join(f"- {item['title']}: {item['url']} ({item['snippet']})" for item in results)

    registry.register(
        Tool(
            name="web_search",
            description="Search the internet for up-to-date information.",
            parameters={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Search query"},
                    "limit": {"type": "integer", "description": "Number of results", "default": 3},
                },
                "required": ["query"],
            },
            handler=web_search,
        )
    )

    def summarize_text(args: Dict[str, Any]) -> str:
        text = args.get("text", "")
        max_chars = int(args.get("max_chars", 300))
        return text[:max_chars] + ("..." if len(text) > max_chars else "")

    registry.register(
        Tool(
            name="summarize_text",
            description="Lightweight local summarizer that truncates text. Use before calling the LLM again.",
            parameters={
                "type": "object",
                "properties": {
                    "text": {"type": "string", "description": "Text to compress"},
                    "max_chars": {"type": "integer", "description": "Maximum characters to keep", "default": 300},
                },
                "required": ["text"],
            },
            handler=summarize_text,
        )
    )

    def sample_crypto_helper(args: Dict[str, Any]) -> str:
        term = args.get("term", "one-time pad")
        return f"Quick helper for {term}: ensure randomness, avoid key reuse, and verify assumptions."

    registry.register(
        Tool(
            name="sample_crypto_helper",
            description="Example domain-specific function that returns a canned cryptography tip.",
            parameters={
                "type": "object",
                "properties": {
                    "term": {"type": "string", "description": "Cryptography topic to comment on"},
                },
            },
            handler=sample_crypto_helper,
        )
    )

    return registry


def add_tool(registry: ToolRegistry, tool: Tool) -> None:
    """Helper used by docs to show how to plug more tools in."""
    registry.register(tool)
