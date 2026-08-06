// Adaptado de: pais.controller.js (proyecto Países)
// Se reutiliza el mismo patrón de controlador (try/catch, status codes, findById + patch, deleteById) usado en listarPaises/insertarPais/ actualizarPais/eliminarPais. 
// Se añade PUT (no existía en Países) y un filtro de historial por rango de días.
const Lectura = require("../models/Lectura");
const { obtenerClimaActual } = require("../services/clima.service");

// GET - Listar lecturas (con filtro opcional ?dias=7)
const listarLecturas = async (req, res) => {
    try {
        const { dias } = req.query;
        let query = Lectura.query().orderBy("created_at", "desc");

        if (dias) {
            const fechaLimite = new Date();
            fechaLimite.setDate(fechaLimite.getDate() - Number(dias));
            query = query.where("created_at", ">=", fechaLimite.toISOString());
        }

        const lecturas = await query;
        res.json(lecturas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las lecturas", message: error.message });
    }
};

// GET - Obtener la última lectura (para el panel principal)
const ultimaLectura = async (req, res) => {
    try {
        const lectura = await Lectura.query().orderBy("created_at", "desc").first();
        res.json(lectura || {});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener la última lectura", message: error.message });
    }
};

// POST - Insertar lectura (mismo patrón "método corto" de pais.controller.js)
const insertarLectura = async (req, res) => {
    try {
        const { temperatura, humedad, voltaje, amperaje } = req.body;
        const resultado = await Lectura.query().insert({ temperatura, humedad, voltaje, amperaje });
        res.status(201).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar la lectura", message: error.message });
    }
};

// PATCH - Actualizar parcialmente (idéntico patrón a actualizarPais)
const patchLectura = async (req, res) => {
    try {
        const { id } = req.params;
        const datosAActualizar = req.body;

        const filasActualizadas = await Lectura.query().findById(id).patch(datosAActualizar);

        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: "Lectura no encontrada" });
        }

        const lecturaActualizada = await Lectura.query().findById(id);
        res.status(200).json({ mensaje: "Lectura actualizada con éxito", data: lecturaActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, mensaje: "Error al actualizar lectura" });
    }
};

// PUT - Actualizar completamente (nuevo respecto a Países, mismo patrón de findById+patch)
const putLectura = async (req, res) => {
    try {
        const { id } = req.params;
        const { temperatura, humedad, voltaje, amperaje } = req.body;

        const filasActualizadas = await Lectura.query()
            .findById(id)
            .patch({ temperatura, humedad, voltaje, amperaje });

        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: "Lectura no encontrada" });
        }

        const lecturaActualizada = await Lectura.query().findById(id);
        res.status(200).json({ mensaje: "Lectura reemplazada con éxito", data: lecturaActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, mensaje: "Error al reemplazar lectura" });
    }
};

// DELETE - Eliminar (idéntico patrón a eliminarPais)
const eliminarLectura = async (req, res) => {
    try {
        const { id } = req.params;
        const filasBorradas = await Lectura.query().deleteById(id);

        if (filasBorradas === 0) {
            return res.status(404).json({ mensaje: "Lectura no encontrada" });
        }

        res.status(200).json({ mensaje: `Lectura con ID ${id} eliminada correctamente` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, mensaje: "Error al eliminar lectura" });
    }
};

// POST - Consultar la API de clima (OpenWeatherMap) e insertar la lectura obtenida automáticamente. 
// Reutiliza el mismo patrón try/catch .
const obtenerYGuardarClima = async (req, res) => {
    try {
        const datosClima = await obtenerClimaActual();
        const resultado = await Lectura.query().insert(datosClima);
        res.status(201).json({ mensaje: "Lectura obtenida de la API de clima", data: resultado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos del clima", message: error.message });
    }
};

module.exports = {
    listarLecturas,
    ultimaLectura,
    insertarLectura,
    patchLectura,
    putLectura,
    eliminarLectura,
    obtenerYGuardarClima
};
