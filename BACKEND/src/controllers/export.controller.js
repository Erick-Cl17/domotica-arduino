// Controlador de exportación  y del cálculo de potencia (punto 6).
const Lectura = require("../models/Lectura");
const Dispositivo = require("../models/Dispositivo");
const { generarExcelHistorial } = require("../services/excel.service");
const { calcularPotencia } = require("../utils/potencia.util");
const { exito, error } = require("../utils/httpResponse");

// GET /api/lecturas/export/excel - Genera y descarga el historial completo en .xlsx
const exportarExcel = async (req, res) => {
    try {
        const lecturas = await Lectura.query().orderBy("created_at", "desc");
        const foco = await Dispositivo.query().findOne({ nombre: "Foco principal" });

        const buffer = await generarExcelHistorial(lecturas, foco ? foco.estado : false);

        const fecha = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const nombreArchivo = `reporte_domotico_${fecha}.xlsx`;

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", `attachment; filename="${nombreArchivo}"`);
        res.send(buffer);
    } catch (err) {
        console.error(err);
        return error(res, "Error al generar el archivo Excel", 500, err.message);
    }
};

// GET /api/lecturas/potencia/actual - Devuelve la última lectura junto con la
// potencia calculada en el backend (Potencia = Voltaje x Amperaje).
const obtenerPotenciaActual = async (req, res) => {
    try {
        const ultima = await Lectura.query().orderBy("created_at", "desc").first();
        if (!ultima) {
            return exito(res, { potencia: 0 }, "Todavía no hay lecturas registradas");
        }
        const potencia = calcularPotencia(ultima.voltaje, ultima.amperaje);
        return exito(res, { ...ultima, potencia }, "Potencia calculada correctamente");
    } catch (err) {
        console.error(err);
        return error(res, "Error al calcular la potencia", 500, err.message);
    }
};

module.exports = { exportarExcel, obtenerPotenciaActual };
