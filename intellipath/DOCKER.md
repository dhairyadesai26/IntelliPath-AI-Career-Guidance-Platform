# 🐳 Docker Deployment & Containerization Guide

Welcome to the Docker guide for **IntelliPath AI — Next-Generation Career Guidance Platform**.

This project features an **enterprise-grade, production-hardened Docker configuration** utilizing Next.js standalone output, multi-stage builds, non-root security enforcement, and automated container healthcheck probes.

---

## 🚀 Key Docker Architectural Features

- **Multi-Stage Build**: Separates dependency installation, Next.js compilation, and runtime execution.
- **Next.js Standalone Mode**: Only the files required to run the application are copied into the final runner image, shrinking disk footprint from ~1.2 GB to **~126 MB**.
- **Non-Root Execution**: Runs under the unprivileged `node` user (UID/GID 1000) adhering to Docker and CIS security benchmarks.
- **Built-in Health Checks**: Features a dedicated `/api/health` endpoint with active container health monitoring.
- **Zero Host Dependencies**: Build and run anywhere Docker is installed without needing Node.js or local dependencies on your machine.
- **Fast Startup**: Optimized standalone server boots in under **120 milliseconds**.

---

## 📋 Prerequisites

- **Docker Desktop** (version 24+ recommended) or **Docker Engine**
- **Docker Compose** (v2+)
- A valid `.env` file (see `.env.example`)

---

## ⚡ Quick Start

### 1. Configure Environment Variables

Ensure `.env` contains:
- `DATABASE_URL` and `DIRECT_URL` (Supabase PostgreSQL)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` (Clerk Auth)
- `GEMINI_API_KEY` (Google Gemini AI)

---

### 2. Run with Docker Compose (Recommended)

From inside the `intellipath` directory:

```bash
# Build and start in detached background mode
docker compose up --build -d
```

View real-time logs:

```bash
docker compose logs -f
```

Stop the containers:

```bash
docker compose down
```

The application will be accessible at: **[http://localhost:3000](http://localhost:3000)**

---

### 3. Run with Pure Docker CLI

```bash
docker build -t intellipath-ai:latest .

docker run -d \
  --name intellipath-ai \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  intellipath-ai:latest
```

---

## 🛠️ Interactive Local Development with Docker

```bash
docker compose -f docker-compose.dev.yml up
```

Code edits will immediately reflect in the running container via volume binds!

---

## 🩺 Health Check & Monitoring

```bash
curl http://localhost:3000/api/health
```

Example response:

```json
{
  "status": "healthy",
  "service": "intellipath-ai",
  "timestamp": "2026-10-31T13:30:18.694Z",
  "uptime": 38.18
}
```

Check Docker container health status directly:

```bash
docker inspect --format='{{json .State.Health.Status}}' intellipath-ai-app
# Output: "healthy"
```

---

## 🗄️ Database Migrations with Docker

To push Prisma schema updates to your Supabase PostgreSQL database using Docker:

```bash
# Run schema push inside the running container
docker compose exec app npx prisma db push

# Or run database seed
docker compose exec app node prisma/seed.js
```

