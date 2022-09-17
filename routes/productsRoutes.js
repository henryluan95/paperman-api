const router = require("express").Router();
const papermanControllers = require("../controllers/papermanControllers");

router.get("/", papermanControllers.getProducts);
router.get("/:productId", papermanControllers.getProduct);

module.exports = router;
