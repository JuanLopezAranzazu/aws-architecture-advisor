from typing import Literal
from pydantic import BaseModel, Field


class ArchitectRequest(BaseModel):
    idea: str = Field(min_length=10, max_length=2000)
    budget: Literal["minimo", "moderado", "sin_limite"] = "minimo"
    expected_users: Literal["<100", "100-10k", ">10k"] = "<100"
    team_level: Literal["principiante", "intermedio", "avanzado"] = "principiante"


class Node(BaseModel):
    id: str          # minúsculas, sin espacios: "apigw"
    service: str     # nombre visible: "Amazon API Gateway"
    role: str        # qué hace en esta arquitectura (una frase)


class Edge(BaseModel):
    source: str
    target: str
    label: str       # ej. "HTTPS", "consultas SQL"


class ServiceDetail(BaseModel):
    name: str                  # debe coincidir con Node.service
    what_it_is: str            # qué es, explicado para el nivel del usuario
    role_in_architecture: str  # qué hace aquí concretamente
    why_chosen: str            # por qué se eligió para esta idea
    alternatives: list[str]    # alternativas y cuándo preferirlas


class ArchitectureOutput(BaseModel):
    summary: str
    assumptions: list[str]
    nodes: list[Node]
    edges: list[Edge]
    services: list[ServiceDetail]
