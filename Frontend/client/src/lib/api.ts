const API_BASE = (import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const AGENT_ENDPOINT = `${API_BASE}/api/agent/query/`;

export interface AgentResponse {
  answer: string;
  context_used?: Array<{ text: string; source: string; id: string }>;
  trace?: unknown;
  tools_available?: string[];
}

export async function callAgent(query: string, allowSearch = true): Promise<AgentResponse> {
  const resp = await fetch(AGENT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, allow_search: allowSearch }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Agent request failed (${resp.status}): ${text}`);
  }

  return (await resp.json()) as AgentResponse;
}
