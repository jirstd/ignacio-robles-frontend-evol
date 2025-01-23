# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'
# Proyecto Frontend - React + TypeScript + Vite

Este proyecto utiliza **React**, **TypeScript** y **Vite** como base para el desarrollo del frontend. La aplicación está lista para ejecutarse en **Docker** utilizando **Docker Compose**, y se conecta a un backend mediante una API REST.

## Tecnologías Utilizadas

- **React** con **Vite** para el frontend
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **Formik + Yup** para formularios
- **Docker** y **Docker Compose** para la contenedorización
- **Nginx** como servidor web

---

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

1. [Docker](https://www.docker.com/)
2. [Docker Compose](https://docs.docker.com/compose/)

---

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto para definir las variables de entorno necesarias. Por defecto, el archivo soporta las siguientes variables:

```env
# URL del backend para las solicitudes de la API
REACT_APP_API_URL=http://localhost:3000/api
```

---

## Cómo Ejecutar el Proyecto

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 1. Clona el Repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2. Construye la Imagen de Docker

Ejecuta el siguiente comando para construir la imagen del proyecto:

```bash
docker-compose build
```

### 3. Levanta el Contenedor

Levanta el contenedor del proyecto usando Docker Compose:

```bash
docker-compose up
```

El proyecto estará disponible en el navegador en: [http://localhost:3001](http://localhost:3001).

### 4. Detener el Contenedor

Para detener y eliminar los contenedores asociados al proyecto:

```bash
docker-compose down
```

---

## Estructura del Proyecto

```plaintext
src/
├── components/      # Componentes reutilizables
├── features/        # Funcionalidades específicas
├── hooks/           # Hooks personalizados
├── pages/           # Páginas de la aplicación
├── routes/          # Configuración de rutas
├── services/        # Servicios de API
├── store/           # Configuración de Redux
├── styles/          # Estilos globales
└── utils/           # Utilidades generales
```

---

## Configuración para Desarrollo Local

Si necesitas ejecutar el proyecto sin Docker, sigue estos pasos:

### 1. Instala las Dependencias

```bash
npm install
```

### 2. Inicia el Servidor de Desarrollo

```bash
npm run dev
```

El proyecto estará disponible en: [http://localhost:5173](http://localhost:5173).

---

## Docker Compose

Este proyecto utiliza un archivo `docker-compose.yml` para la configuración de Docker. La configuración básica es la siguiente:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3001:80"
    environment:
      - REACT_APP_API_URL=http://localhost:3000/api
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
```

---

## Notas Adicionales

- Asegúrate de que el backend esté disponible en el puerto `3000` para que las solicitudes de la API funcionen correctamente.
- Si necesitas cambiar el puerto del frontend, actualiza el archivo `docker-compose.yml` en la sección `ports`.

---

## Autor

**[Tu Nombre]**  
Proyecto desarrollado como parte de [Nombre del Proyecto/Organización]. 🚀


export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
