const db = require("../config/database");
const sequelize = require("sequelize");
const Product = db.define("product", {
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  image: {
    type: sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Product;
