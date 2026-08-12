// Controlador del dispositivo (foco).
// Mismo patrón try/catch usado en lectura.controller.js (findById + patch), pero aplicado al único registro del foco. Cubre los puntos 13.4, 13.5 y 16 de la guía.
const Dispositivo = require("../models/Dispositivo");
const { exito, error } = require("../utils/httpResponse");
const { enviarComandoArduino } = require("../serial/arduinoConnection");
// ^ Placeholder: aquí se conectaría con Arduino para enviar LIGHT_ON / LIGHT_OFF
//   una vez que se implemente esa parte del hardware (ver src/serial/arduinoConnection.js).

const NOMBRE_FOCO = "Foco principal";

// GET /api/dispositivos/foco - Consultar el estado actual del foco
const obtenerEstadoFoco = async (req, res) => {
    try {
        const foco = await Dispositivo.query().findOne({ nombre: NOMBRE_FOCO });
        if (!foco) {
            return error(res, "No se encontró el dispositivo del foco", 404);
        }
        return exito(res, foco, "Estado del foco obtenido correctamente");
    } catch (err) {
        console.error(err);
        return error(res, "Error al obtener el estado del foco", 500, err.message);
    }
};

// PATCH /api/dispositivos/foco - Encender o apagar el foco
const cambiarEstadoFoco = async (req, res) => {
    try {
        const { estado } = req.body;

        const foco = await Dispositivo.query().findOne({ nombre: NOMBRE_FOCO });
        if (!foco) {
            return error(res, "No se encontró el dispositivo del foco", 404);
        }

        await Dispositivo.query().findById(foco.id).patch({
            estado,
            updated_at: new Date().toISOString()
        });
        
        // Enviar comando al Arduino
        await enviarComandoArduino(
            estado ? "LIGHT_ON" : "LIGHT_OFF"
        );

        const focoActualizado = await Dispositivo.query().findById(foco.id);
        
        return exito(res, focoActualizado, `Foco ${estado ? "encendido" : "apagado"} correctamente`);
    } catch (err) {
        console.error(err);
        return error(res, "Error al cambiar el estado del foco", 500, err.message);
    }
};

module.exports = { obtenerEstadoFoco, cambiarEstadoFoco };
