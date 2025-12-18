import json
import math
import re
from collections import Counter
from pathlib import Path
from typing import Dict, List, Optional


class TfidfVectorStore:
    """
    Lightweight TF-IDF vector store for small corpora.
    Stores vectors + metadata in JSON for reuse.
    """

    def __init__(self, cache_path: Optional[Path] = None) -> None:
        self.cache_path = Path(cache_path) if cache_path else None
        self.vocabulary: Dict[str, int] = {}
        self.idf: List[float] = []
        self.vectors: List[List[float]] = []
        self.metadatas: List[Dict[str, str]] = []
        self.source_pdf: Optional[str] = None
        self.source_mtime: Optional[float] = None

    def build(self, documents: List[Dict[str, str]], source_pdf: Optional[str], source_mtime: Optional[float]) -> None:
        self.metadatas = documents
        self.source_pdf = source_pdf
        self.source_mtime = source_mtime

        tokenized = [self._tokenize(doc.get("text", "")) for doc in documents]
        df_counter: Counter[str] = Counter()
        for tokens in tokenized:
            df_counter.update(set(tokens))

        vocab_items = sorted(df_counter.items(), key=lambda kv: kv[0])
        self.vocabulary = {term: idx for idx, (term, _) in enumerate(vocab_items)}
        n_docs = len(documents) or 1
        self.idf = [math.log((n_docs + 1) / (df + 1)) + 1.0 for _, df in vocab_items]

        self.vectors = []
        for tokens in tokenized:
            vec = self._tfidf_vector(tokens)
            self.vectors.append(vec)

    def search(self, query: str, k: int = 3) -> List[Dict[str, str]]:
        if not self.vectors or not self.metadatas:
            return []
        q_vec = self._tfidf_vector(self._tokenize(query))
        scores: List[tuple[float, Dict[str, str]]] = []
        for vec, meta in zip(self.vectors, self.metadatas):
            score = self._cosine(q_vec, vec)
            scores.append((score, meta))
        scores.sort(key=lambda item: item[0], reverse=True)
        return [meta for score, meta in scores[:k] if score > 0]

    def save(self) -> None:
        if not self.cache_path:
            return
        payload = {
            "source_pdf": self.source_pdf,
            "source_mtime": self.source_mtime,
            "vocabulary": self.vocabulary,
            "idf": self.idf,
            "vectors": self.vectors,
            "metadatas": self.metadatas,
        }
        self.cache_path.parent.mkdir(parents=True, exist_ok=True)
        with open(self.cache_path, "w", encoding="utf-8") as fh:
            json.dump(payload, fh)

    def load(self, expected_pdf: Optional[str], expected_mtime: Optional[float]) -> bool:
        if not self.cache_path or not self.cache_path.exists():
            return False
        try:
            with open(self.cache_path, "r", encoding="utf-8") as fh:
                data = json.load(fh)
        except Exception:
            return False
        if data.get("source_pdf") != expected_pdf or data.get("source_mtime") != expected_mtime:
            return False
        try:
            self.vocabulary = {str(k): int(v) for k, v in data.get("vocabulary", {}).items()}
            self.idf = [float(x) for x in data.get("idf", [])]
            self.vectors = [[float(v) for v in row] for row in data.get("vectors", [])]
            self.metadatas = data.get("metadatas", [])
        except Exception:
            return False
        self.source_pdf = data.get("source_pdf")
        self.source_mtime = data.get("source_mtime")
        return True

    def _tokenize(self, text: str) -> List[str]:
        return re.findall(r"\w+", text.lower())

    def _tfidf_vector(self, tokens: List[str]) -> List[float]:
        counts = Counter(tokens)
        total = float(len(tokens) or 1)
        vec = [0.0] * len(self.vocabulary)
        for term, idx in self.vocabulary.items():
            tf = counts.get(term, 0) / total
            vec[idx] = tf * self.idf[idx] if idx < len(self.idf) else 0.0
        norm = math.sqrt(sum(v * v for v in vec))
        if norm > 0:
            vec = [v / norm for v in vec]
        return vec

    @staticmethod
    def _cosine(a: List[float], b: List[float]) -> float:
        if not a or not b:
            return 0.0
        return sum(x * y for x, y in zip(a, b))
