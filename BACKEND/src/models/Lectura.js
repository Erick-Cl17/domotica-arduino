// Adaptado de: Pais.js (proyecto Países)
// Mismo patrón exacto de modelo Objection, solo cambia tableName.
const {Model} = require("objection");

class Lectura extends Model {
    static get tableName() {
        return "lectura";
    }
}

module.exports = Lectura;