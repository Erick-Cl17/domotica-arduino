const { SerialPort } = require("serialport");
const readline = require("readline");
const Lectura = require("../models/Lectura");

const PUERTO_ARDUINO = process.env.ARDUINO_PORT || "COM5";

const arduino = new SerialPort({
    path: PUERTO_ARDUINO,
    baudRate: 9600,
    autoOpen: true
});

arduino.on("open", () => {
    console.log(`Arduino conectado en ${PUERTO_ARDUINO}`);
});

arduino.on("error", (err) => {
    console.error("Error de comunicación con Arduino:", err.message);
});

const lecturaSerial = readline.createInterface({
    input: arduino
});

lecturaSerial.on("line", async (linea) => {

    try {

        console.log("Datos recibidos de Arduino:", linea);
        if (!linea.trim().startsWith("{")) {
            return;
        }

        const datos = JSON.parse(linea);

        console.log("Temperatura:", datos.temperatura);
        console.log("Humedad:", datos.humedad);
        console.log("Voltaje:", datos.voltaje);
        console.log("Amperaje:", datos.amperaje);
        console.log("Estado del foco:", datos.estadoFoco);
        
        await Lectura.query().insert({
            temperatura: datos.temperatura,
            humedad: datos.humedad,
            voltaje: datos.voltaje,
            amperaje: datos.amperaje
        });

        console.log("Lectura guardada correctamente en MySQL");

    } catch (error) {

        console.error(
            "No se pudo procesar la información de Arduino:",
            error.message
        );
    }
});

const enviarComandoArduino = async (comando) => {

    return new Promise((resolve, reject) => {

        if (!arduino.isOpen) {
            return reject(
                new Error("El puerto de Arduino no está conectado")
            );
        }

        arduino.write(`${comando}\n`, (error) => {

            if (error) {
                return reject(error);
            }

            console.log(`Comando enviado a Arduino: ${comando}`);

            resolve(true);
        });
    });
};

module.exports = {
    enviarComandoArduino
};
