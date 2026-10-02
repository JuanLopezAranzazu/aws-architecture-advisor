# AWS Architect Assistant

## Puesta en marcha

### 1. Base de datos
```bash
docker compose up -d
```

### 2. Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # edita OPENAI_API_KEY
uvicorn app.main:app --reload
```
API en http://localhost:8000/docs