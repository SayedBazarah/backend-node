const express = require("express");
const router = express.Router();

const controller = require("../controller/productController");
const authorization = require("../middleware/Authorization");
//End-Point /api/product
router.get("/", controller.getAllProducts);
router.get("/simple", controller.getBasicProductsData);
router.get("/category/:name", controller.getCategoryProducts);
router.get("/search", controller.searchProducts);
router.get("/slugs", controller.productsSlug);
router.get("/:slug", controller.getProductBySlug);

//End-Points need Authorization
router.post("/", authorization, controller.addProduct);
router.put("/:slug", authorization, controller.updateProduct);
router.delete("/:slug", authorization, controller.deleteProduct);

module.exports = router;
