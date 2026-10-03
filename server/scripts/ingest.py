import re
from pathlib import Path

from app import rag

DOCS = Path(__file__).resolve().parent.parent / "data" / "docs"
MAX_CHARS = 2500


def split_markdown(text: str) -> list[str]:
    """Divide por encabezados (#, ##, ###) y sub-divide secciones muy largas."""
    parts = re.split(r"(?m)^(?=#{1,3} )", text)
    chunks: list[str] = []
    for part in parts:
        part = part.strip()
        if not part:
            continue
        if len(part) <= MAX_CHARS:
            chunks.append(part)
            continue
        buf = ""
        for para in part.split("\n\n"):
            if len(buf) + len(para) > MAX_CHARS and buf:
                chunks.append(buf.strip())
                buf = ""
            buf += para + "\n\n"
        if buf.strip():
            chunks.append(buf.strip())
    return chunks


def main() -> None:
    all_chunks: list[dict] = []
    for md in sorted(DOCS.rglob("*.md")):
        service = md.parent.name
        title = md.parent.name.upper()
        for c in split_markdown(md.read_text(encoding="utf-8")):
            all_chunks.append(
                {
                    "service": service,
                    "doc_type": md.stem,
                    "source": str(md.relative_to(DOCS)),
                    "content": f"Servicio: {title}\n{c}",
                }
            )
    if not all_chunks:
        raise SystemExit(f"No se encontraron .md en {DOCS}")
    rag.reset_chunks()
    for i in range(0, len(all_chunks), 64):
        rag.add_chunks(all_chunks[i : i + 64])
    print(f"Indexados {len(all_chunks)} chunks de {DOCS}")


if __name__ == "__main__":
    main()
