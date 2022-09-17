const knex = require("knex")(require("../knexfile"));

const getProductsData = async () => {
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

  return Object.values(cleanedUpProductsData);
};

const getProductData = async (productId) => {
  //Get all products
  const products = await getProductsData();

  //Find product
  const foundProduct = products.find(
    (product) => product.product_id === productId
  );

  return foundProduct;
};

module.exports = { getProductsData, getProductData };
