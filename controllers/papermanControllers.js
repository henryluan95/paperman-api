const papermanModels = require("../models/papermanModels");

const getProducts = async (_req, res) => {
  try {
    //Get all products
    const products = await papermanModels.getProductsData();

    //response with that result set!
    return res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve product data" });
  }
};

const getProduct = async (req, res) => {
  try {
    const requestedId = Number(req.params.productId);
    //Get the product
    const product = await papermanModels.getProductData(requestedId);

    //response with that result set!
    return res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve product data" });
  }
};

module.exports = { getProducts, getProduct };
