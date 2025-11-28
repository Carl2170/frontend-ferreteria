# # Build
# FROM node:18-alpine AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# #RUN npm run build

# # Production
# FROM node:18-alpine

# WORKDIR /app/.next/standalone

# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package*.json ./

# EXPOSE 3000

# #CMD ["node", "server.js"]
# CMD ["sh", "-c", "npm run build && npm start"]

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run build && npm start"]
