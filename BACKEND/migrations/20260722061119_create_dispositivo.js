// MIGRACIÓN - Tabla "dispositivo" para representar el foco (punto 12.2 de la guía).

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("dispositivo", (table) => {
        table.increments("id").primary();
        table.string("nombre").notNullable().defaultTo("Foco principal");
        table.string("tipo").notNullable().defaultTo("foco");
        table.boolean("estado").notNullable().defaultTo(false);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    }).then(() => {
        // Se inserta un único registro inicial: el foco que controla el dashboard.
        return knex("dispositivo").insert({ nombre: "Foco principal", tipo: "foco", estado: false });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("dispositivo");
};
