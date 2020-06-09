const Product = require("../models/Product");
const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorization");
const Roles = require("../config/roles");
const productService = require("../services/productService");

router.get("/", async (req, res, next) => {
  let productsResponse;
  try {
    productsResponse = await productService.getProducts();
    res.status(productsResponse.status).json({
      data: productsResponse.data,
      message: productsResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", authorize(Roles.Admin), async (req, res, next) => {
  let productsResponse;
  let productPayload = { ...req.body };
  try {
    productsResponse = await productService.addProduct(productPayload);
    res.status(productsResponse.status).json({
      data: productsResponse.data,
      message: productsResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authorize(Roles.Admin), async (req, res, next) => {
  let productsResponse;
  let productPayload = { ...req.body };
  let id = req.params.id;
  console.log(id, productPayload);
  try {
    productsResponse = await productService.updateProduct(id, productPayload);
    res.status(productsResponse.status).json({
      data: productsResponse.data,
      message: productsResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authorize(Roles.Admin), async (req, res, next) => {
  let productsResponse;
  let id = req.params.id;

  try {
    productsResponse = await productService.deleteProduct(id);
    res.status(productsResponse.status).json({
      data: productsResponse.data,
      message: productsResponse.message,
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
