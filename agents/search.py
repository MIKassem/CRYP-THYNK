import html
import re
import requests
from typing import Any, Dict, List, Optional

from django.conf import settings


class WebSearchClient:
    """
    Minimal web search wrapper.
    - If SEARCH_API_ENDPOINT is set, calls it (adds api_key if provided).
    - Otherwise falls back to a simple DuckDuckGo HTML scrape using requests.
    """

    def __init__(self, endpoint: Optional[str], api_key: Optional[str]) -> None:
        self.endpoint = endpoint
        self.api_key = api_key

    def search(self, query: str, limit: int = 3) -> List[Dict[str, Any]]:
        if not self.endpoint:
            return self._duckduckgo(query, limit)

        params = {"q": query, "num": limit}
        if self.api_key:
            params["api_key"] = self.api_key
        response = requests.get(self.endpoint, params=params, timeout=30)
        response.raise_for_status()
        data = response.json()
        # Shape into a simple list of results.
        results = []
        if isinstance(data, dict):
            items = data.get("results") or data.get("data") or data.get("organic_results") or []
            for item in items[:limit]:
                results.append(
                    {
                        "title": item.get("title") or item.get("name") or "result",
                        "url": item.get("url") or item.get("link") or "",
                        "snippet": item.get("snippet") or item.get("description") or "",
                    }
                )
        return results

    def _duckduckgo(self, query: str, limit: int) -> List[Dict[str, Any]]:
        url = "https://duckduckgo.com/html/"
        headers = {"User-Agent": "Mozilla/5.0 (compatible; RAG-Agent/1.0)"}
        try:
            response = requests.get(url, params={"q": query, "kl": "us-en"}, headers=headers, timeout=30)
            response.raise_for_status()
            html_body = response.text
        except Exception as exc:  # pragma: no cover - defensive
            return [{"title": "Search failed", "url": "", "snippet": str(exc)}]

        # Rough scrape for result links.
        pattern = re.compile(r'<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', re.IGNORECASE | re.DOTALL)
        matches = pattern.findall(html_body)
        results: List[Dict[str, Any]] = []
        for href, title_html in matches[:limit]:
            title = html.unescape(re.sub(r"<.*?>", "", title_html)).strip()
            results.append({"title": title or "result", "url": href, "snippet": ""})
        if not results:
            return [{"title": "No results", "url": "", "snippet": "DuckDuckGo returned no results."}]
        return results


def build_default_search_client() -> WebSearchClient:
    return WebSearchClient(endpoint=settings.SEARCH_API_ENDPOINT, api_key=settings.SEARCH_API_KEY)
