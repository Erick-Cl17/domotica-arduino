// Adaptado de: pais.routes.js (proyecto Países)
// Mismo patrón de router con middleware validate() encadenado antes del controlador. Se agrega la ruta PUT (no existía en Países).
const express = require("express");
const router = express.Router();
const lecturaController = require("../controllers/lectura.controller");

const validate = require("../middlewares/validate");
const {
    insertarLecturaSchema,
    patchLecturaSchema,
    putLecturaSchema,
    idParamSchema
} = require("../validators/lectura.validator");

// GET- Listar lecturas (con filtro opcional ?dias=7)
router.get("/", lecturaController.listarLecturas);
router.get("/ultima", lecturaController.ultimaLectura);

// POST- Insertar lectura (mismo patrón "método corto" de pais.routes.js)
router.post("/", validate(insertarLecturaSchema, "body"), lecturaController.insertarLectura);

// POST- Obtener temperatura/humedad reales de OpenWeatherMap y las guarda
router.post("/clima", lecturaController.obtenerYGuardarClima);

// PATCH - Actualizar parcialmente (idéntico patrón a pais.routes.js)
router.patch("/:id",
    validate(idParamSchema, "params"),
    validate(patchLecturaSchema, "body"),
    lecturaController.patchLectura
);

// PUT - Actualizar completamente (nuevo respecto a Países, mismo patrón de findById+patch)
router.put("/:id",
    validate(idParamSchema, "params"),
    validate(putLecturaSchema, "body"),
    lecturaController.putLectura
);

// DELETE - Eliminar lectura
router.delete("/:id",
    validate(idParamSchema, "params"),
    lecturaController.eliminarLectura
);

module.exports = router;
