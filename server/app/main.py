import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .schemas import ArchitectRequest
from .pipeline import run

app = FastAPI(title="AWS Architect Assistant")
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/architect")
def architect(req: ArchitectRequest):
    try:
        return run(req)
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=502, detail=f"No se pudo generar la arquitectura: {e}")


@app.get("/health")
def health():
    return {"ok": True}
