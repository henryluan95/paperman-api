const productsData = require("../seed_data/products");
const modelsData = require("../seed_data/models");

exports.seed = async function (knex) {
  // Deletes ALL existing entries --> insert data from products
  await knex("products").del();
  await knex("products").insert(productsData);

  // Deletes ALL existing entries --> insert data from models
  await knex("models").del();
  await knex("models").insert(modelsData);
};
