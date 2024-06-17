/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('skin_type_ingredients', table => {
    table.increments('id').primary();
    table.string('skin_type').notNullable();
    table.string('ingredient').notNullable();
    table.boolean('is_desirable').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('skin_type_ingredients');
};
