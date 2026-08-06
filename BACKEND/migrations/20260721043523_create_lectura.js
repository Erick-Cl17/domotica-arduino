/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("lectura", (table) => {
        table.increments("id").primary();
        table.decimal("temperatura", 5, 2).notNullable();
        table.decimal("humedad", 5, 2).notNullable();
        table.decimal("voltaje", 6, 2).notNullable();
        table.decimal("amperaje", 6, 2).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("lectura");
};
