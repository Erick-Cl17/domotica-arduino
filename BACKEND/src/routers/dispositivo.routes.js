// Rutas del dispositivo (foco).
// Mismo patrón que lectura.routes.js: validate() encadenado antes del controlador.
const express = require("express");
const router = express.Router();
const dispositivoController = require("../controllers/dispositivo.controller");
const validate = require("../middlewares/validate"); // se reutiliza el middleware ya existente
const { cambiarEstadoSchema } = require("../validators/dispositivo.validator");

// GET /api/dispositivos/foco - Consultar el estado actual del foco
router.get("/foco", dispositivoController.obtenerEstadoFoco);

// PATCH /api/dispositivos/foco - Encender o apagar el foco
router.patch("/foco", validate(cambiarEstadoSchema, "body"), dispositivoController.cambiarEstadoFoco);

module.exports = router;
