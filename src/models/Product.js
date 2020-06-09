const db = require("../config/database");
const sequelize = require("sequelize");
const Product = db.define("product", {
  name: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
});

module.exports = Product;
