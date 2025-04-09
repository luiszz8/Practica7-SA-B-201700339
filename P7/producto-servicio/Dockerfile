# Usa una imagen base con Node.js
FROM node:18-slim

# Establecer directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar la aplicación (si usa TypeScript)
RUN npm run build

# Exponer el puerto en el que corre NestJS
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
