from .schemas import ArchitectRequest, ArchitectureOutput
from .rag import retrieve
from .llm import generate_structured
from .prompts import SYSTEM, build_user_prompt


def run(req: ArchitectRequest) -> dict:
    query = f"{req.idea} presupuesto {req.budget} usuarios {req.expected_users}"
    chunks = retrieve(query, k=12)

    arch: ArchitectureOutput = generate_structured(
        SYSTEM, build_user_prompt(req, chunks), ArchitectureOutput
    )

    ids = {n.id for n in arch.nodes}
    arch.edges = [e for e in arch.edges if e.source in ids and e.target in ids]

    result = arch.model_dump()
    result["sources"] = sorted({c["source"] for c in chunks})
    return result
