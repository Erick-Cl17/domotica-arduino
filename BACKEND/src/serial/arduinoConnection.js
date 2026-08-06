// PLACEHOLDER.
// AQUÍ VA EL CÓDIGO DE ARDUINO / LA CONEXIÓN SERIAL O HTTP CON LA PLACA.
//
// Cuando se implemente el hardware, este archivo deberá:
//   1) Abrir el puerto serial (por ejemplo con la librería "serialport") o exponer
//      un endpoint HTTP para que un ESP32/ESP8266 envíe sus datos directamente.
//   2) Leer/parsear el JSON que llega de Arduino:
//      { "temperatura": 24.5, "humedad": 65, "voltaje": 12.1, "amperaje": 1.8, "estadoFoco": true }
//   3) Insertar esa lectura reutilizando el modelo Lectura (src/models/Lectura.js).
//   4) Exportar una función para enviar comandos hacia Arduino, por ejemplo:
//      enviarComandoArduino("LIGHT_ON") / enviarComandoArduino("LIGHT_OFF")
//      Esa función sería la que llamaría dispositivo.controller.js al cambiar el foco.
//
// Por ahora este módulo no hace nada; se deja listo para no tener que reorganizar
// la estructura de carpetas cuando se conecte la placa física.

module.exports = {
    // enviarComandoArduino: async (comando) => { /* pendiente */ }
};
