// Modelo Objection.js para el dispositivo (foco).
// Sigue el mismo patrón que Lectura.js (ya reutilizado de Pais.js), solo cambia tableName.
const { Model } = require("objection");

class Dispositivo extends Model {
    static get tableName() {
        return "dispositivo";
    }
}

module.exports = Dispositivo;
