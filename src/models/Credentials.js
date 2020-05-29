const sequelize = require("sequelize");
const db = require("../config/database");

const Credentials = db.define("credentials", {
  userId: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Credentials;
