# Agentic Django Backend (Databricks + RAG)

Small Django backend that wires together a Databricks-hosted LLM, a PDF-backed RAG helper, optional web search, and function/tool calling.

## Setup
- Install Python 3.11+ and dependencies:
  ```bash
  pip install -r requirements.txt
  ```
- Export environment variables (place in `.env` or shell):
  ```bash
  export DATABRICKS_HOST="https://<workspace-host>"
  export DATABRICKS_API_TOKEN="<token>"       # or DATABRICKS_TOKEN
  # Use the endpoint name OR a full invocations URL (without /api/2.0) if you prefer:
  # export DATABRICKS_SERVING_ENDPOINT="databricks-meta-llama-3-1-8b-instruct"
  export DATABRICKS_SERVING_ENDPOINT="https://<workspace-host>/serving-endpoints/<endpoint>/invocations"
  export DATABRICKS_MODEL="<optional-model-name>"
  export SEARCH_API_ENDPOINT="<search-endpoint>"      # e.g., https://serpapi.com/search
  export SEARCH_API_KEY="<search-key>"
  export RAG_PDF_PATH="/abs/path/to/intro_crypto.pdf"
  export LLAMA_PARSE_API_KEY="<optional-key>"  # enables LlamaParse PDF extraction
  export RAG_CACHE_PATH="/abs/path/to/rag/cache.json" # optional cache to avoid reparsing
  export RAG_MAX_PAGES=10                             # limit pages parsed
  export DJANGO_ALLOWED_HOSTS="localhost,127.0.0.1"
  export DJANGO_SECRET_KEY="<dev-secret>"
  export DJANGO_DEBUG=true
  ```
- Place your cryptography PDF at `rag/crypto.pdf` or point `RAG_PDF_PATH` to it.
- Run the server:
  ```bash
  python manage.py migrate
  python manage.py runserver 8000
  ```

## API
`POST /api/agent/query/`
```json
{ "query": "Explain one-time pads", "allow_search": true }
```
Response:
```json
{ "answer": "...", "trace": [...], "tools_available": ["web_search", "summarize_text", "sample_crypto_helper"] }
```

## Tool (function) calling
- Tools live in `agents/tools.py` and are registered inside `build_builtin_tools`.
- Schema matches OpenAI/Databricks style:
  ```python
  Tool(
      name="my_tool",
      description="What it does",
      parameters={
          "type": "object",
          "properties": {"foo": {"type": "string"}},
          "required": ["foo"],
      },
      handler=lambda args: f"Got {args['foo']}",
  )
  ```
- To add a new function:
  1) Implement a handler in `agents/tools.py`.
  2) Add a `Tool(...)` to `build_builtin_tools`.
  3) Restart the Django server so the registry refreshes.

## How it works
- `agents/rag.py` loads/splits the PDF once and does lightweight keyword retrieval (swap in a vector DB when ready).
- `agents/databricks_client.py` posts chat messages to a Databricks serving endpoint.
- `agents/agent.py` composes system/user messages, calls the LLM, executes tool calls, and does a second LLM pass with tool outputs.
- `agents/views.py` exposes the `/api/agent/query/` endpoint.

## Notes
- Web search is off unless you configure `SEARCH_API_ENDPOINT` and `SEARCH_API_KEY`.
- If `PyPDF2` is missing or the PDF path is invalid, the RAG step simply skips context.
- If `LLAMA_PARSE_API_KEY` is set and `llama-parse` is installed, PDF text is extracted via LlamaParse before falling back to PyPDF2.
- Parsed chunks are cached when `RAG_CACHE_PATH` is set; cache invalidates if the PDF mtime changes. Only the first `RAG_MAX_PAGES` are parsed (default 10).
- A lightweight TF-IDF vector store is built and cached for similarity search over the parsed chunks.

## Frontend (CRYP-THYNK/Frontend) quick start
- Set the backend URL for the agent API: `export VITE_BACKEND_URL="http://127.0.0.1:8000"`.
- From `CRYP-THYNK/Frontend`, install deps and run the client:
  ```bash
  cd CRYP-THYNK/Frontend
  pnpm install    # or npm install
  pnpm dev        # or npm run dev
  ```
- The chat now POSTs to `/api/agent/query/` and displays backend answers; lesson triggers remain client-side.
