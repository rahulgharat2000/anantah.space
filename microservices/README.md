# Anantah Space Microservices

This folder contains independently runnable Anantah Space backend services.

## Projects

- `src/Anantah.Space.Fashion.Api` (ASP.NET Core HTTP composition root)
- `src/Anantah.Space.Fashion.Application` (commerce use cases and ports)
- `src/Anantah.Space.Fashion.Contracts` (versioned transport contracts)
- `src/Anantah.Space.Fashion.Domain` (business model and rules)
- `src/Anantah.Space.Fashion.Infrastructure` (PostgreSQL and external adapters)
- `src/Anantah.Space.Intelligence.Agent` (dependency-free Python chat-service bootstrap)

Play currently runs as a React/Phaser micro-frontend.

## Fashion local infrastructure

Fashion uses resources isolated from every other Anantah project:

- PostgreSQL database `anantah_fashion_commerce`, schema `fashion`, port `5433`
- Redis port `6380`, key prefix `anantah:fashion:`
- OpenSearch port `9201`, index `anantah-fashion-products-v1`
- MinIO ports `9002`/`9003`, bucket `anantah-fashion-media-development`

Docker is not installed automatically. After Docker is available, copy `.env.example` to `.env`, replace local passwords, and run:

```powershell
docker compose -f compose.fashion.yml up -d
```

The Compose file uses named Fashion-only volumes and does not connect to an existing PostgreSQL server.

Restore the repository-local EF tool and apply only Fashion migrations:

```powershell
dotnet tool restore
dotnet tool run dotnet-ef database update `
	--project src/Anantah.Space.Fashion.Infrastructure `
	--startup-project src/Anantah.Space.Fashion.Api
```

Automatic migration is disabled by default. To opt in for local development, set `Database__ApplyMigrationsOnStartup=true`.

## Run locally

```powershell
cd microservices

dotnet run --project src/Anantah.Space.Fashion.Api --launch-profile http
# http://localhost:5134

cd src/Anantah.Space.Intelligence.Agent
py app.py
# http://localhost:5171
```

## Fashion API endpoints

- `GET /api/v1/fashion/health`
- `GET /api/v1/fashion/categories`
- `GET /api/v1/fashion/products`
- `GET /api/v1/fashion/products/{id}`

The previous SQLite file is retained but no longer read or modified. Fashion now targets its dedicated PostgreSQL database.

The Python Intelligence service currently provides a local preview response and does not invoke an external model. A real agent requires an approved model provider or local runtime plus explicit dependency installation.
