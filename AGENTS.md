# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Reservoir Fill Level Dashboard for Istanbul & Izmir. Three-tier architecture: PostgreSQL 16 (Docker) → NestJS backend (port 3003) → Next.js frontend (port 3000). A Python analysis script (`backend/scripts/analiz.py`) runs linear regression and is invoked as a subprocess by the backend.

### Services

| Service | Port | Start command |
|---------|------|---------------|
| PostgreSQL | 5431 | `sudo docker compose up -d` (from repo root) |
| Backend (NestJS) | 3003 | `npm run start:dev` (from `backend/`) |
| Frontend (Next.js) | 3000 | `npm run dev` (from `frontend/`) |

### Important caveats

- **Docker must be started manually**: `sudo dockerd &>/tmp/dockerd.log &` then wait a few seconds before running `sudo docker compose up -d`.
- **Database seed**: Run `npm run seed` from `backend/` after first DB startup (or hit `POST /seed` on the running backend). Only needed once unless the database volume is removed.
- **Backend `.env`**: Must exist at `backend/.env` with `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and `PORT=3003`. Credentials match `docker-compose.yml` (user: `iz_ist_dam`, password: `izmiristanbul@15032!!`, db: `dam_datas`, port: `5431`).
- **Frontend `.env.local`**: Set `NEXT_PUBLIC_API_URL=http://localhost:3003` (defaults to this if unset).
- **Python deps**: `pandas`, `scikit-learn`, `numpy`, `psycopg2-binary` must be installed for the dashboard endpoint (`/cities/:name/dashboard`) to work.
- **Pre-existing lint error**: `backend/src/reservoirs/reservoirs.service.ts` has an unused import (`NotFoundException`). This is in the existing codebase.
- **Pre-existing build error**: `frontend/src/components/FillRateChart.tsx:31` has a TypeScript type error (`string | number` not assignable to `string`). `npm run dev` works fine; `npm run build` fails.
- **Lint commands**: `npm run lint` in `backend/` and `frontend/`.
- **Test commands**: `npm run test` in `backend/` (Jest). No automated tests in `frontend/`.
- **Swagger docs**: Available at `http://localhost:3003/api` when backend is running.
