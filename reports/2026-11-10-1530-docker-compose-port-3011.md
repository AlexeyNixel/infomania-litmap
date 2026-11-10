# 2026-11-10 — Docker: образ и docker-compose на порту 3011

## Что сделано
- `Dockerfile` — multi-stage (deps → build → runner), Node 22 slim, `npm ci` по `package-lock.json`, `npm run build`, запуск `.output/server/index.mjs` от пользователя `node`.
- `docker-compose.yml` — сервис `frontend`, образ `litmap-frontend:latest`, порт `3011:3011`, `PORT=3011` внутри контейнера, `restart: unless-stopped`.
- `.dockerignore` — исключены `node_modules`, `.output`, `.nuxt`, `.git`, `.env*`, `temp`, `reports`.

## Как запускать
```bash
docker compose up --build
```
Сайт: http://localhost:3011

## Чем проверено
Только чтением конфигов: Docker в текущем окружении не установлен (`docker` — CommandNotFoundException), поэтому сборку и запуск контейнера проверить не удалось.

## Что осталось
- Прогнать `docker compose up --build` там, где есть Docker (ожидаемое время первой сборки — несколько минут).
- Возможные проблемы при сборке: shim для `esbuild` (нужен при `npm run build`), pre-render главной (`/`) при сборке.
- `pnpm-workspace.yaml` (allowBuilds) в окружении образа не используется, так как сборка идёт через npm — это сознательно, pnpm в репозитории и локально не установлен.
