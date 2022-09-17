const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));

router.route("/").get(async (req, res) => {
  try {
    //GET /products
    //use knex --> to get the data from the database!
    const productsData = await knex
      .select("*")
      .from("products")
      .join("models", "products.id", "models.product_id");

    //Clean up data, join all models of each product into an array using reduce
    const cleanedUpProductsData = productsData.reduce(
      (acc, { product_id, title, image, is_liked, price, model }) => {
        acc[product_id] ??= {
          product_id: product_id,
          title: title,
          is_liked: is_liked,
          image: image,
          price: price,
          model: [],
        };
        if (Array.isArray(model))
          // if it's array type then concat
          acc[product_id].model = acc[product_id].value.concat(model);
        else acc[product_id].model.push(model);

        return acc;
      },
      {}
    );

    //response with that result set!
    res.json(Object.values(cleanedUpProductsData));
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve product data" });
  }
});

module.exports = router;
