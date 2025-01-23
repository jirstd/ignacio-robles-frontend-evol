# Etapa 1: Construcción
FROM node:18 AS build

# Crear el directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el código fuente y construir el proyecto
COPY . .
RUN npm run build

# Etapa 2: Servir la aplicación
FROM nginx:1.21

# Copiar los archivos de construcción al servidor nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración personalizada de nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
