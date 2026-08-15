# Estación de Monitoreo Ambiental (Reutilización de Software)

Aplicación domótica full-stack para el monitoreo de temperatura, humedad, voltaje y
amperaje, con control de un foco real mediante Arduino, backend en Node.js y
dashboard en React.

## Backend

```
cd BACKEND
npm install
npx knex migrate:latest --knexfile knexfile.js
npm run dev
```

Servidor en http://localhost:3000

### Endpoints — Lecturas

- `GET    /api/lecturas`                    -> historial completo
- `GET    /api/lecturas?dias=7`              -> historial filtrado por rango de días
- `GET    /api/lecturas/ultima`              -> última lectura (panel principal)
- `POST   /api/lecturas`                     -> insertar lectura manual
- `POST   /api/lecturas/clima`               -> consulta OpenWeatherMap y guarda la lectura obtenida
- `PATCH  /api/lecturas/:id`                 -> actualizar parcialmente
- `PUT    /api/lecturas/:id`                 -> actualizar completamente
- `DELETE /api/lecturas/:id`                 -> eliminar
- `GET    /api/lecturas/potencia/actual`     -> potencia calculada (voltaje × amperaje) de la última lectura
- `GET    /api/lecturas/export/excel`        -> genera y descarga el historial completo en .xlsx (desde el backend)

### Endpoints — Dispositivo (foco)

- `GET    /api/dispositivos/foco`            -> consulta el estado actual del foco
- `PATCH  /api/dispositivos/foco`            -> enciende/apaga el foco (persiste en la base de datos)

## Variables de entorno (`BACKEND/.env`)

Este archivo **no se sube al repositorio** (está en `.gitignore` por seguridad). Cada
integrante debe crear el suyo con esta estructura:

```
# Base de datos MySQL (Aiven Cloud)
DB_HOST=tu_host_de_aiven
DB_PORT=tu_puerto_de_aiven
DB_USER=avnadmin
DB_PASSWORD=tu_contraseña
DB_NAME=defaultdb

# API de clima (solo para datos simulados de prueba, opcional)
OPENWEATHER_API_KEY=tu_api_key
OPENWEATHER_CITY=Quito,EC
CLIMA_INTERVALO_MINUTOS=10
```

**Nota sobre Aiven:** la conexión requiere SSL. El `knexfile.js` ya incluye
`ssl: { rejectUnauthorized: false }`, no es necesario configurarlo aparte.

## Integración con API de clima (OpenWeatherMap) — solo para pruebas

Esta integración se usó como **fuente de datos simulada** mientras se armaba el
hardware, y no debe usarse en conjunto con el Arduino real (ver sección siguiente).

1. Crea una cuenta gratuita en https://openweathermap.org/api y genera una API Key.
2. Agrega `OPENWEATHER_API_KEY` y `OPENWEATHER_CITY` en `BACKEND/.env` (ver arriba).
3. Con el servidor corriendo, prueba con Postman: `POST http://localhost:3000/api/lecturas/clima` (sin body).
4. Esto guarda temperatura y humedad reales de la ciudad configurada; voltaje y amperaje se simulan.

**Importante:** una vez que el Arduino esté enviando datos reales, comenta o elimina
`OPENWEATHER_API_KEY` del `.env` para que el sistema deje de generar lecturas simuladas
y solo se guarden las mediciones reales del hardware.

## Arduino

Carpeta `ARDUINO/` — contiene el sketch (`.ino`) con las conexiones del DHT11, el
divisor de voltaje, el sensor ACS712 y el relé que controla el foco real.

La conexión entre el Arduino y el backend se gestiona desde
`BACKEND/src/serial/arduinoConnection.js`, mediante comunicación serial.

## Frontend

```
cd FRONTEND
npm install
npm run dev
```

Aplicación en http://localhost:5173

Incluye: panel con lecturas en tiempo real, control del foco, historial con gráficos
y filtros, exportación (Excel, CSV, JSON, PDF), ChatBot de preguntas frecuentes,
reloj mundial y selector de unidades (°C/°F).

## Librerías principales

| Backend | Frontend |
|---|---|
| Express, Knex.js, Objection.js | React + Vite |
| Joi (validación) | React Router |
| Nodemon | Recharts |
| ExcelJS (exportación) | jsPDF + jspdf-autotable |
| dotenv, cors | xlsx |
```
