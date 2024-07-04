#FROM node:18-alpine AS base
#
#FROM base AS deps
#RUN apk add --no-cache libc6-compat
#WORKDIR /app
#COPY package*.json ./
#RUN npm install --frozen-lockfile

#
#FROM base AS builder
#WORKDIR /app
#COPY --from=deps /app/node_modules ./node_modules
#COPY . .
#RUN npm run build
#
#FROM base AS production
#WORKDIR /app
#COPY --from=builder /app/.next/standalone ./
#COPY --from=builder /app/.next/static ./.next/static
#COPY --from=builder /app/public ./public
#
#EXPOSE 3000
#CMD ["node", "server.js"]

FROM node:18-alpine as development

WORKDIR /usr/src/app
COPY */package*.json ./
RUN npm install --include=optional sharp
COPY . .
EXPOSE 3000

CMD [ "npm","run","dev" ]

