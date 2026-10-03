import os
import numpy as np
from psycopg_pool import ConnectionPool
from pgvector.psycopg import register_vector
from sentence_transformers import SentenceTransformer

_model = SentenceTransformer("intfloat/multilingual-e5-small")
pool = ConnectionPool(os.environ["DATABASE_URL"], configure=register_vector, open=True)


def embed_passages(texts: list[str]) -> np.ndarray:
    return _model.encode([f"passage: {t}" for t in texts], normalize_embeddings=True)


def embed_query(q: str) -> np.ndarray:
    return _model.encode(f"query: {q}", normalize_embeddings=True)


def reset_chunks() -> None:
    with pool.connection() as conn:
        conn.execute("TRUNCATE doc_chunks RESTART IDENTITY")


def add_chunks(chunks: list[dict]) -> None:
    """chunks: [{service, doc_type, source, content}]"""
    embs = embed_passages([c["content"] for c in chunks])
    rows = [
        (c["service"], c.get("doc_type"), c["source"], c["content"], e)
        for c, e in zip(chunks, embs)
    ]
    with pool.connection() as conn:
        conn.cursor().executemany(
            "INSERT INTO doc_chunks (service, doc_type, source, content, embedding) "
            "VALUES (%s, %s, %s, %s, %s)",
            rows,
        )


def retrieve(query: str, k: int = 12) -> list[dict]:
    q = embed_query(query)
    with pool.connection() as conn:
        rows = conn.execute(
            "SELECT service, doc_type, source, content "
            "FROM doc_chunks ORDER BY embedding <=> %s LIMIT %s",
            (q, k),
        ).fetchall()
    return [
        {"service": r[0], "doc_type": r[1], "source": r[2], "text": r[3]} for r in rows
    ]
