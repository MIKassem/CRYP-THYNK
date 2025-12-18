import requests


def main() -> None:
    """
    Quick smoke test against the Django agent endpoint.
    Ensure the server is running and env vars for Databricks are set.
    """
    resp = requests.post(
        "http://127.0.0.1:8000/api/agent/query/",
        json={"query": "Explain one-time pads", "allow_search": False},
        timeout=60,
    )
    print("Status:", resp.status_code)
    try:
        print("Body:", resp.json())
    except Exception:
        print("Body (raw):", resp.text)


if __name__ == "__main__":
    main()
