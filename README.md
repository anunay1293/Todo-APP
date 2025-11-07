# Full-Stack Todo List App

Stack: Next.js (App Router) + Tailwind + Express.js + Prisma + MySQL (TypeScript everywhere)

## Quick Start

### 1) Start MySQL (Docker)
```bash
cd server
cp .env.example .env         # Update if needed
docker compose up -d
```

### 2) Install & Migrate API
```bash
npm i
npm run prisma:generate
npm run prisma:migrate
npm run dev
# Server on http://localhost:4000
```

### 3) Install & Run Web
```bash
cd ../web
cp .env.local.example .env.local  # Ensure NEXT_PUBLIC_API_BASE_URL matches API
npm i
npm run dev
# Web on http://localhost:3000
```

## API Endpoints
- `GET /tasks` – list tasks
- `POST /tasks` – create task `{ title: string, color?: "RED"|"BLUE"|"GREEN", completed?: boolean }`
- `PUT /tasks/:id` – update task (any subset of fields)
- `DELETE /tasks/:id` – delete

## Notes
- Prisma enum `Color` uses `RED|BLUE|GREEN`. UI exposes Red/Blue/Green.
- Simple Zod validation and basic error handling.
- Home shows counts, toggle completion inline, delete with confirmation.
- Clicking a task opens edit page; Create/Edit share a reusable form.