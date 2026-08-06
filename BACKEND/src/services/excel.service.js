// Servicio independiente para generar el archivo Excel del historial
// "Servicio independiente para generación de Excel").
// Usa ExcelJS. Los datos vienen SIEMPRE de la base de datos (tabla "lectura"), nunca se escriben a mano.
const ExcelJS = require("exceljs");
const { calcularPotencia } = require("../utils/potencia.util");

// Recibe el arreglo de lecturas (ya consultado en la base de datos por el controlador) y el estado actual del foco, y arma el libro de Excel en memoria.
const generarExcelHistorial = async (lecturas, estadoFocoActual) => {
    const libro = new ExcelJS.Workbook();
    libro.creator = "Estación de Monitoreo";
    libro.created = new Date();

    const hoja = libro.addWorksheet("Historial");

    hoja.columns = [
        { header: "ID", key: "id", width: 8 },
        { header: "Fecha", key: "fecha", width: 14 },
        { header: "Hora", key: "hora", width: 12 },
        { header: "Temperatura (°C)", key: "temperatura", width: 18 },
        { header: "Humedad (%)", key: "humedad", width: 14 },
        { header: "Voltaje (V)", key: "voltaje", width: 14 },
        { header: "Amperaje (A)", key: "amperaje", width: 14 },
        { header: "Potencia (W)", key: "potencia", width: 14 },
        { header: "Estado del foco", key: "estadoFoco", width: 16 }
    ];

    // Encabezados en negrilla.
    hoja.getRow(1).font = { bold: true };

    lecturas.forEach((lectura) => {
        const fechaCompleta = new Date(lectura.created_at);
        hoja.addRow({
            id: lectura.id,
            fecha: fechaCompleta.toLocaleDateString("es-EC"),
            hora: fechaCompleta.toLocaleTimeString("es-EC"),
            temperatura: lectura.temperatura,
            humedad: lectura.humedad,
            voltaje: lectura.voltaje,
            amperaje: lectura.amperaje,
            potencia: calcularPotencia(lectura.voltaje, lectura.amperaje),
            // La tabla "lectura" no guarda el estado del foco por cada medición
            // (el foco es un dispositivo aparte, tabla "dispositivo"), por lo que aquí
            // se refleja el estado del foco vigente al momento de generar el reporte.
            estadoFoco: estadoFocoActual ? "Encendido" : "Apagado"
        });
    });

    return libro.xlsx.writeBuffer();
};

module.exports = { generarExcelHistorial };
