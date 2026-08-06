// Rutas de exportación a Excel y cálculo de potencia.
const express = require("express");
const router = express.Router();
const exportController = require("../controllers/export.controller");

// Este router se monta en index.js bajo el prefijo "/api/lecturas" (junto al router
// de lecturas ya existente), por lo que las rutas finales quedan:

// GET /api/lecturas/export/excel
router.get("/export/excel", exportController.exportarExcel);

// GET /api/lecturas/potencia/actual
router.get("/potencia/actual", exportController.obtenerPotenciaActual);

module.exports = router;
