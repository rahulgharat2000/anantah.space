# Anantah Space Intelligence Agent

Dependency-free Python bootstrap service for the Intelligence chat MFE.

```powershell
cd C:\ANANTAH\microservices\src\Anantah.Space.Intelligence.Agent
py app.py
```

Endpoints:

- `GET /api/v1/intelligence/health`
- `POST /api/v1/intelligence/chat`

The current response is intentionally local and deterministic. A production agent should use FastAPI, Uvicorn, Pydantic, HTTPX, an approved model provider, scoped tools, durable conversation storage, and safety controls. Those packages have not been installed because installation approval was unavailable.