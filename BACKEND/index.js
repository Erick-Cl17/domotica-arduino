// Reutilizado y adaptado de: index.js (proyecto Países)
// Misma estructura exacta (express + morgan + cors + montaje de rutas bajo /api), solo cambia el nombre del router importado.
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("./src/config/db");

const app = express();
const PORT = 3000;

const lecturaRouter = require("./src/routers/lectura.routes");
const exportRouter = require("./src/routers/export.routes");
const dispositivoRouter = require("./src/routers/dispositivo.routes");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/lecturas", lecturaRouter);
app.use("/api/lecturas", exportRouter);
app.use("/api/dispositivos", dispositivoRouter);

app.listen(PORT, () => {
    console.log('El servidor esta corriendo en http://localhost:' + PORT);
});

const Lectura = require("./src/models/Lectura");
const { obtenerClimaActual } = require("./src/services/clima.service");

// --- Consulta automática de la API de clima cada X minutos ---
const INTERVALO_MINUTOS = Number(process.env.CLIMA_INTERVALO_MINUTOS) || 10;

const registrarClimaAutomatico = async () => {
    if (!process.env.OPENWEATHER_API_KEY) {
        console.log("Clima automático desactivado: falta OPENWEATHER_API_KEY en .env");
        return;
    }
    try {
        const datosClima = await obtenerClimaActual();
        await Lectura.query().insert(datosClima);
        console.log("Lectura automática de clima guardada:", datosClima);
    } catch (error) {
        console.error("Error al guardar lectura automática de clima:", error.message);
    }
};

if (process.env.OPENWEATHER_API_KEY) {
    registrarClimaAutomatico();
    setInterval(registrarClimaAutomatico, INTERVALO_MINUTOS * 60 * 1000);
}