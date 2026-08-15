# Estación de Monitoreo - Proyecto  (Reutilización de código)

## Backend
```
cd backend
npm install
npx knex migrate:latest --knexfile knexfile.js
npm run dev
```
Servidor en http://localhost:3000

Endpoints:
- GET    /api/lecturas            -> lista completa
- GET    /api/lecturas?dias=7     -> historial filtrado por rango de días
- GET    /api/lecturas/ultima     -> última lectura (panel principal)
- POST   /api/lecturas            -> insertar lectura manual
- POST   /api/lecturas/clima      -> consulta OpenWeatherMap y guarda la lectura obtenida
- PATCH  /api/lecturas/:id        -> actualizar parcialmente
- PUT    /api/lecturas/:id        -> actualizar completamente
- DELETE /api/lecturas/:id        -> eliminar

## Integración con API de clima (OpenWeatherMap) Pruebas con api de Temperatura
1. Crea una cuenta gratuita en https://openweathermap.org/api y genera una API Key.
2. En backend/.env agrega:
   ```
   OPENWEATHER_API_KEY=tu_api_key
   OPENWEATHER_CITY=Quito,EC
   ```
3. Con el servidor corriendo, prueba con Postman: `POST http://localhost:3000/api/lecturas/clima` (sin body).
4. Guarda temperatura y humedad reales de la ciudad configurada; voltaje y amperaje se simulan hasta contar con el sensor Arduino real.

## Frontend
```
cd frontend
npm install
npm run dev
```
