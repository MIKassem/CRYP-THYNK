import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent


def _env(name: str, default: str = "") -> str:
    """Tiny helper to read environment variables with a default."""
    return os.getenv(name, default)


SECRET_KEY = _env("DJANGO_SECRET_KEY", "dev-secret-key")
DEBUG = _env("DJANGO_DEBUG", "false").lower() == "true"
ALLOWED_HOSTS = [h for h in _env("DJANGO_ALLOWED_HOSTS", "127.0.0.1,localhost").split(",") if h]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "agents",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "agent_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "agent_backend.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# RAG and Databricks settings that can be overridden via environment variables.
DATABRICKS_HOST = _env("DATABRICKS_HOST")
# Accept both names for the PAT to match your curl examples.
DATABRICKS_API_TOKEN = _env("DATABRICKS_API_TOKEN") or _env("DATABRICKS_TOKEN")
DATABRICKS_SERVING_ENDPOINT = _env("DATABRICKS_SERVING_ENDPOINT")
DATABRICKS_MODEL = _env("DATABRICKS_MODEL")  # Optional override if your endpoint needs it.
SEARCH_API_ENDPOINT = _env("SEARCH_API_ENDPOINT")  # e.g., https://api.serpapi.com/search
SEARCH_API_KEY = _env("SEARCH_API_KEY")
RAG_PDF_PATH = _env("RAG_PDF_PATH", str(BASE_DIR / "rag" / "crypto.pdf"))
RAG_MAX_CHUNKS = int(_env("RAG_MAX_CHUNKS", "64"))
# Optional: use LlamaParse instead of PyPDF2 for PDF extraction when API key is provided.
LLAMA_PARSE_API_KEY = _env("LLAMA_PARSE_API_KEY")
RAG_CACHE_PATH = _env("RAG_CACHE_PATH", str(BASE_DIR / "rag" / "cache.json"))
RAG_MAX_PAGES = int(_env("RAG_MAX_PAGES", "10"))
