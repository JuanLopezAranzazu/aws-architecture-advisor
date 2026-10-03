CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS doc_chunks (
  id        BIGSERIAL PRIMARY KEY,
  service   TEXT NOT NULL,
  doc_type  TEXT,
  source    TEXT NOT NULL,
  content   TEXT NOT NULL,
  embedding vector(384) NOT NULL
);

CREATE INDEX IF NOT EXISTS doc_chunks_emb_idx ON doc_chunks USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS doc_chunks_service_idx ON doc_chunks (service);
