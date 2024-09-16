# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

COPY . .

# Build the app
RUN pnpm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist .

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
