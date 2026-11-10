# syntax=docker/dockerfile:1

# ---------- Сборка ----------
FROM node:22-bookworm-slim AS build
WORKDIR /app

# NODE_ENV на этапе сборки НЕ выставляется в production: @nuxt/eslint объявлен
# в nuxt.config.ts (modules), но стоит в devDependencies, и с production-режимом
# `npm ci` его пропустит — сборка упадёт с «module @nuxt/eslint could not be loaded».
# Сам `nuxt build` при записи .output использует production-режим — отдельно его ставить не нужно.
# NUXT_TELEMETRY_DISABLED — отключает анонимную телеметрию Nuxt.
ENV NUXT_TELEMETRY_DISABLED=1

# Зависимости отдельным слоем — пересобираются только при смене lock-файла.
# postinstall (`nuxt prepare`) здесь безопасен: package.json уже скопирован,
# а nuxt.config.ts подтянется на следующем слое перед `nuxt build`.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# ---------- Запуск ----------
# .output самодостаточен: Nitro кладёт нужные зависимости в .output/server/node_modules
FROM node:22-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    NUXT_TELEMETRY_DISABLED=1 \
    HOST=0.0.0.0 \
    PORT=3011

COPY --from=build --chown=node:node /app/.output ./.output

USER node
EXPOSE 3011

# Главная пререндерится (routeRules '/'), поэтому отвечает и без бэкенда.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3011) + '/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", ".output/server/index.mjs"]
