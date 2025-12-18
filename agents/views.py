import json
from typing import Optional, Dict, List

from django.conf import settings
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .agent import Agent
from .databricks_client import build_default_client
from .rag import build_default_rag
from .search import build_default_search_client
from .tools import build_builtin_tools

AGENT_INSTANCE: Optional[Agent] = None
SESSION_MEMORY: Dict[str, List[Dict[str, str]]] = {}
SESSION_MEMORY_MAX = 20  # total messages retained per session


def get_agent() -> Agent:
    global AGENT_INSTANCE
    if AGENT_INSTANCE is None:
        rag = build_default_rag()
        search_client = build_default_search_client()
        tools = build_builtin_tools(search_client)
        llm = build_default_client()
        AGENT_INSTANCE = Agent(llm=llm, rag=rag, tools=tools)
    return AGENT_INSTANCE


@csrf_exempt
def agent_query(request: HttpRequest) -> JsonResponse:
    if request.method == "OPTIONS":
        resp = JsonResponse({"ok": True}, status=200)
        return _with_cors(resp)
    if request.method == "GET":
        query = request.GET.get("query")
        allow_search = request.GET.get("allow_search", "true").lower() != "false"
        session_id = request.GET.get("session_id") or "default"
    elif request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        query = payload.get("query")
        allow_search = bool(payload.get("allow_search", True))
        session_id = payload.get("session_id") or "default"
    else:
        return _with_cors(JsonResponse({"error": "Only GET or POST allowed"}, status=405))

    if not query:
        return _with_cors(JsonResponse({"error": "Missing 'query'"}, status=400))

    try:
        agent = get_agent()
    except Exception as exc:
        return _with_cors(JsonResponse({"error": f"Agent init failed: {exc}"}, status=500))

    try:
        history = SESSION_MEMORY.get(session_id, [])
        result = agent.run(query=query, allow_search=allow_search, conversation_history=history)
        updated_history = history + [
            {"role": "user", "content": query},
            {"role": "assistant", "content": result.get("answer", "")},
        ]
        SESSION_MEMORY[session_id] = updated_history[-SESSION_MEMORY_MAX :]
        result["session_id"] = session_id
    except Exception as exc:
        return _with_cors(JsonResponse({"error": f"Agent run failed: {exc.__class__.__name__}: {exc}"}, status=500))
    return _with_cors(JsonResponse(result, status=200, safe=False))


def _with_cors(response: JsonResponse) -> JsonResponse:
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response
