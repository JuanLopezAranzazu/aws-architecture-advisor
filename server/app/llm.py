import copy
import json
import os

from groq import BadRequestError, Groq
from pydantic import ValidationError

_client = Groq()  # lee GROQ_API_KEY
MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
EFFORT = os.getenv("GROQ_REASONING_EFFORT", "medium")  # low | medium | high


def _prepare_schema(schema: dict) -> dict:
    """Inlina $defs/$ref y marca additionalProperties=false (requisito de modo strict)."""
    defs = schema.get("$defs", {})

    def walk(node):
        if isinstance(node, dict):
            if "$ref" in node:
                return walk(copy.deepcopy(defs[node["$ref"].split("/")[-1]]))
            out = {k: walk(v) for k, v in node.items() if k != "$defs"}
            if out.get("type") == "object":
                out["additionalProperties"] = False
            return out
        if isinstance(node, list):
            return [walk(x) for x in node]
        return node

    return walk(schema)


def _call(system: str, user: str, response_format: dict) -> str:
    resp = _client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        response_format=response_format,
        temperature=0.2,
        reasoning_effort=EFFORT,
        max_completion_tokens=8000,
    )
    return resp.choices[0].message.content or ""


def generate_structured(system: str, user: str, output_model):
    schema = _prepare_schema(output_model.model_json_schema())
    try:
        raw = _call(
            system,
            user,
            {
                "type": "json_schema",
                "json_schema": {"name": "architecture", "strict": True, "schema": schema},
            },
        )
        return output_model.model_validate_json(raw)
    except (BadRequestError, ValidationError, ValueError):
        system2 = (
            system
            + "\n\nResponde ÚNICAMENTE con un objeto JSON válido que cumpla este JSON Schema:\n"
            + json.dumps(schema, ensure_ascii=False)
        )
        raw = _call(system2, user, {"type": "json_object"})
        return output_model.model_validate_json(raw)
