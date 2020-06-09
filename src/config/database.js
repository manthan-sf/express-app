const Sequelize = require("sequelize").Sequelize;

module.exports = new Sequelize("bayview", "manthan", "incorrect", {
  host: "localhost",
  dialect: "postgres",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
