import os
from openai import OpenAI

_client = OpenAI()
MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")


def generate_structured(system: str, user: str, output_model):
    resp = _client.chat.completions.parse(
        model=MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        response_format=output_model,
    )
    msg = resp.choices[0].message
    if msg.refusal:
        raise ValueError(f"El modelo rechazó la solicitud: {msg.refusal}")
    return msg.parsed
