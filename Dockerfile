# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar solo package.json y package-lock.json para instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto (incluyendo código fuente y archivos .env)
COPY . .

# Construir la app (esto generará la carpeta .next)
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

# Copiar solo los archivos necesarios para el entorno de producción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Copiar otros archivos necesarios (como .env.production, si es necesario)
COPY --from=builder /app/.env.production ./.env.production

# Exponer el puerto que utiliza Next.js por defecto (3000)
EXPOSE 3000

# Comando para ejecutar la aplicación en producción
CMD ["npm", "run", "start"]
