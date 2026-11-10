# syntax=docker/dockerfile:1

# Сборка статики и серверной части Nuxt, затем запуск готового Nitro-сервера.
# Образ дефолтный (Debian-slim): @tailwindcss/oxide и unrs-resolver
# в pnpm-workspace.yaml отключены в allowBuilds, поэтому проще не зависеть от libc.

ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-slim AS base
ENV NUXT_TELEMETRY_DISABLED=1
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:${NODE_VERSION}-slim AS runner
ENV NODE_ENV=production \
    NUXT_TELEMETRY_DISABLED=1 \
    HOST=0.0.0.0 \
    PORT=3011
WORKDIR /app
COPY --from=build /app/.output ./.output
USER node
EXPOSE 3011
CMD ["node", ".output/server/index.mjs"]
