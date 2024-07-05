FROM node:18.20.3-alpine3.19 AS deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18.20.3-alpine3.19 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18.20.3-alpine3.19 AS runner
WORKDIR /app

ENV NODE_ENV development

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
