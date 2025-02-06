FROM node:20-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat openssl

FROM base AS build
WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM base AS runer
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g serve

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

CMD ["serve", "-s", "dist", "-l", "3000"]
