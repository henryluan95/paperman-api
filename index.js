const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
app.use(express.json());

const productsRoutes = require("./routes/productsRoutes");
app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on ${PORT}`);
});
