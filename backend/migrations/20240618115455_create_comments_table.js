// migrations/20240618115455_create_comments_table.js
export const up = function(knex) {
    return knex.schema.createTable('comments', function(table) {
      table.increments('id').primary();
      table.integer('product_id').unsigned().notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.text('content').notNullable();
      table.timestamps(true, true);
  
      table.foreign('product_id').references('ID').inTable('products');
      table.foreign('user_id').references('ID').inTable('user');
    });
  };
  
  export const down = function(knex) {
    return knex.schema.dropTable('comments');
  };
  