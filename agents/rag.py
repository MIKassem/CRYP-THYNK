import re
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Union

from django.conf import settings

from .vector_store import TfidfVectorStore


class RagPipeline:
    """
    RAG pipeline that:
    - Parses only the first N pages of the PDF.
    - Builds/caches a lightweight TF-IDF vector store for similarity search.
    - Returns chunks with source metadata for citation.
    """

    def __init__(
        self,
        pdf_path: Union[str, Path],
        max_chunks: int = 64,
        llama_api_key: Optional[str] = None,
        cache_path: Optional[Union[str, Path]] = None,
        max_pages: int = 10,
    ) -> None:
        self.pdf_path = Path(pdf_path)
        self.max_chunks = max_chunks
        self.llama_api_key = llama_api_key
        self.cache_path = Path(cache_path) if cache_path else None
        self.max_pages = max_pages
        self.chunks: List[Dict[str, str]] = []
        self.vector_store: Optional[TfidfVectorStore] = None
        self._load_pdf()

    def _load_pdf(self) -> None:
        pdf_mtime = self.pdf_path.stat().st_mtime if self.pdf_path.exists() else None

        if self.cache_path:
            vs = TfidfVectorStore(self.cache_path)
            if vs.load(expected_pdf=str(self.pdf_path), expected_mtime=pdf_mtime):
                self.vector_store = vs
                self.chunks = vs.metadatas
                return

        if not self.pdf_path.exists():
            return
        page_texts = self._parse_with_llamaparse() or self._parse_with_pypdf()
        if not page_texts:
            return
        chunks: List[Dict[str, str]] = []
        chunk_id = 0
        for page_number, text in page_texts:
            for chunk in self._split_page_text(text, page_number, chunk_id):
                chunks.append(chunk)
                chunk_id += 1
                if len(chunks) >= self.max_chunks:
                    break
            if len(chunks) >= self.max_chunks:
                break
        self.chunks = chunks
        self.vector_store = TfidfVectorStore(self.cache_path)
        self.vector_store.build(
            documents=chunks, source_pdf=str(self.pdf_path), source_mtime=pdf_mtime
        )
        if self.cache_path:
            self.vector_store.save()

    def _parse_with_llamaparse(self) -> List[Tuple[int, str]]:
        """
        Use LlamaParse (remote API) when LLAMA_PARSE_API_KEY is set and library installed.
        """
        if not self.llama_api_key:
            return []
        try:
            from llama_parse import LlamaParse  # type: ignore
        except ImportError:
            return []
        parser = LlamaParse(api_key=self.llama_api_key, result_type="text")
        docs = parser.load_data(str(self.pdf_path))
        if not docs:
            return []
        parsed: List[Tuple[int, str]] = []
        for idx, doc in enumerate(docs, start=1):
            if idx > self.max_pages:
                break
            parsed.append((idx, getattr(doc, "text", "")))
        return parsed

    def _parse_with_pypdf(self) -> List[Tuple[int, str]]:
        try:
            from PyPDF2 import PdfReader  # type: ignore
        except ImportError:
            return []
        reader = PdfReader(str(self.pdf_path))
        parsed: List[Tuple[int, str]] = []
        for idx, page in enumerate(reader.pages, start=1):
            if idx > self.max_pages:
                break
            parsed.append((idx, page.extract_text() or ""))
        return parsed

    def _split_page_text(
        self, text: str, page_number: int, start_id: int, chunk_size: int = 900, overlap: int = 100
    ) -> List[Dict[str, str]]:
        words = text.split()
        chunks = []
        start = 0
        local_id = start_id
        while start < len(words):
            end = start + chunk_size
            chunk = " ".join(words[start:end])
            source = f"{self.pdf_path.stem} (book) - page {page_number}"
            chunks.append({"text": chunk, "source": source, "id": f"{self.pdf_path.name}#chunk-{local_id}"})
            start = end - overlap
            local_id += 1
        return chunks

    def search(self, query: str, k: int = 3) -> List[Dict[str, str]]:
        if self.vector_store:
            return self.vector_store.search(query=query, k=k)
        # Fallback keyword scoring if vector store is unavailable.
        if not self.chunks:
            return []
        scores: List[Tuple[int, Dict[str, str]]] = []
        tokens = set(re.findall(r"\w+", query.lower()))
        for chunk in self.chunks:
            chunk_tokens = set(re.findall(r"\w+", chunk["text"].lower()))
            score = len(tokens.intersection(chunk_tokens))
            scores.append((score, chunk))
        scores.sort(key=lambda item: item[0], reverse=True)
        return [chunk for score, chunk in scores[:k] if score > 0]


def build_default_rag() -> RagPipeline:
    return RagPipeline(
        pdf_path=settings.RAG_PDF_PATH,
        max_chunks=settings.RAG_MAX_CHUNKS,
        llama_api_key=settings.LLAMA_PARSE_API_KEY or None,
        cache_path=settings.RAG_CACHE_PATH,
        max_pages=settings.RAG_MAX_PAGES,
    )
