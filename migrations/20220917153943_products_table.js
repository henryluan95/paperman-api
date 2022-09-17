exports.up = function (knex) {
  return (
    knex.schema
      //Create products table
      .createTable("products", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.boolean("is_liked").defaultTo(0);
        table.integer("price").notNullable();
      })
      //Create model table
      .createTable("models", (table) => {
        table.increments("id").primary();
        table.string("model").notNullable();
        table
          .integer("product_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("products")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
  );
};

exports.down = function (knex) {
  //Drop models table
  //Drop products table
  return knex.schema.dropTable("models").dropTable("products");
};
