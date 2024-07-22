
# Monorepo para Angular Frontend y Node.js Backend

Este repositorio contiene un proyecto de frontend hecho con Angular y un proyecto de backend hecho con Node.js. Sigue las instrucciones a continuación para configurar, instalar las dependencias y ejecutar las aplicaciones.

## Estructura del Proyecto

```
my-monorepo/
|-- frontend/   # Proyecto de Angular
|-- backend/    # Proyecto de Node.js
|-- .gitignore  # Archivos a ignorar en el repositorio
```

## Configuración Inicial

### Backend

1. Clona el archivo `.env.sample` y renómbralo a `.env`.

   ```bash
   cp backend/.env.sample backend/.env
   ```

2. Edita el archivo `.env` con tus propias configuraciones.

### Frontend

El proyecto de Angular no requiere configuración especial inicial.

## Instalación de Dependencias

### Backend

1. Navega al directorio del backend.

   ```bash
   cd backend
   ```

2. Instala las dependencias utilizando `npm` o `yarn`.

   ```bash
   npm install
   ```

### Frontend

1. Navega al directorio del frontend.

   ```bash
   cd frontend
   ```

2. Instala las dependencias utilizando `npm` o `yarn`.

   ```bash
   npm install
   ```

## Ejecución del Proyecto

### Backend

1. Navega al directorio del backend (si aún no lo has hecho).

   ```bash
   cd backend
   ```

2. Ejecuta el servidor.

   ```bash
   npm start
   ```

### Frontend

1. Navega al directorio del frontend (si aún no lo has hecho).

   ```bash
   cd frontend
   ```

2. Ejecuta la aplicación Angular.

   ```bash
   npm start
   ```

## Scripts Útiles

### Backend

- `npm run start` - Inicia el servidor Node.js.
- `npm run dev` - Inicia el servidor en modo de desarrollo.
- `npm run build` - Construye el proyecto para producción.

### Frontend

- `npm start` - Inicia el servidor de desarrollo de Angular.
- `npm run build` - Construye el proyecto Angular para producción.
- `npm test` - Ejecuta las pruebas unitarias.
- `npm run lint` - Ejecuta el linter de código.
