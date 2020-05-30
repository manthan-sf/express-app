const Product = require("../models/Product");
const express = require("express");
const router = express.Router();
const authorize = require("../auth/authorization");
const Roles = require("../auth/roles");

router.get("/", (req, res) => {
  Product.findAll()
    .then((products) => {
      products
        ? res.status(200).send(products)
        : res.status(200).send("No Product");
    })
    .catch((err) => res.status(400).send(err));
});

router.post("/", authorize(Roles.Admin), (req, res) => {
  const reqProductBody = { ...req.body };

  Product.create(reqProductBody)
    .then((product) => {
      if (product) {
        return res.status(201).send(product);
      } else return res.status(500).send("Could not create Product");
    })
    .catch((err) => res.status(400).send(err));
});

router.put("/:id", authorize(Roles.Admin), (req, res) => {
  const id = req.params.id;
  const updatedProductData = { ...req.body };

  Product.update(updatedProductData, { where: { id: id } })
    .then((product) => {
      console.log(product[0]);
      product[0] ? res.sendStatus(204) : res.sendStatus(404);
    })
    .catch((err) => res.status(400).send(err));
});

router.delete("/:id", authorize(Roles.Admin), (req, res) => {
  const id = req.params.id;

  Product.destroy({ where: { id: id } })
    .then((response) => {
      console.log(response);
      response ? res.sendStatus(200) : res.sendStatus(404);
    })
    .catch((err) => res.status(400).send(err));
});
module.exports = router;
