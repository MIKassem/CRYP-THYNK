import json
from typing import Any, Dict, List, Optional

import requests
from django.conf import settings


class DatabricksLLMClient:
    """
    Minimal Databricks Model Serving client for chat-style completions.
    Assumes you have a serving endpoint that accepts OpenAI-compatible inputs.
    """

    def __init__(
        self,
        host: Optional[str],
        api_token: str,
        serving_endpoint: str,
        model: Optional[str] = None,
    ) -> None:
        self.host = host
        self.api_token = api_token
        self.serving_endpoint = serving_endpoint
        self.model = model

    def chat(self, messages: List[Dict[str, Any]], tools: Optional[List[Dict[str, Any]]] = None) -> Dict[str, Any]:
        if self.serving_endpoint.startswith("http"):
            # Allow a full invocations URL to be provided via env (with or without /api/2.0).
            url = self.serving_endpoint
        else:
            if not self.host:
                raise RuntimeError("DATABRICKS_HOST is required when serving endpoint is not a full URL")
            # Use host + /serving-endpoints/... (no /api/2.0).
            url = f"{self.host}/serving-endpoints/{self.serving_endpoint}/invocations"
        payload: Dict[str, Any] = {"messages": messages}
        if tools:
            payload["tools"] = tools
        if self.model:
            payload["model"] = self.model

        headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json",
        }
        response = requests.post(url, headers=headers, data=json.dumps(payload), timeout=60)
        response.raise_for_status()
        data = response.json()
        return self._normalize_response(data)

    @staticmethod
    def _normalize_response(data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Normalize Databricks response into a small shape:
        {"message": str, "tool_calls": list, "raw": full_response}
        """
        message = ""
        tool_calls: List[Dict[str, Any]] = []

        if "choices" in data:
            # OpenAI-style
            choice = data["choices"][0]
            msg = choice.get("message", {})
            message = msg.get("content") or ""
            tool_calls = msg.get("tool_calls") or []
        elif "output_text" in data:
            message = data.get("output_text", "")
        else:
            message = json.dumps(data)

        return {"message": message, "tool_calls": tool_calls, "raw": data}


def build_default_client() -> DatabricksLLMClient:
    missing = []
    serving_endpoint = settings.DATABRICKS_SERVING_ENDPOINT
    host_required = not (serving_endpoint and serving_endpoint.startswith("http"))
    for key in ("DATABRICKS_API_TOKEN", "DATABRICKS_SERVING_ENDPOINT"):
        if not getattr(settings, key):
            missing.append(key)
    if host_required and not settings.DATABRICKS_HOST:
        missing.append("DATABRICKS_HOST")
    if missing:
        raise RuntimeError(f"Missing Databricks settings: {', '.join(missing)}")
    return DatabricksLLMClient(
        host=settings.DATABRICKS_HOST,
        api_token=settings.DATABRICKS_API_TOKEN,
        serving_endpoint=settings.DATABRICKS_SERVING_ENDPOINT,
        model=settings.DATABRICKS_MODEL or None,
    )
