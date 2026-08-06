// Reutilizado  de: db.js (proyecto Países) 
// Configuración de Knex + Objection es genérica y sirve para cualquier proyecto.
const {Model} = require("objection");
const Knex = require("knex");
const knexfile = require("../../knexfile");
const knex = Knex(knexfile.development);

Model.knex(knex);

module.exports = Knex;
