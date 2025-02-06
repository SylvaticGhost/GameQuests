FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=production
COPY . .
RUN npm install --only=development
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

ARG PORT=3001
ENV PORT=$PORT
EXPOSE $PORT

CMD ["node", "dist/main.js"]
