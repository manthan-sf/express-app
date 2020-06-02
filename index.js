const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/config/database");
const jwt = require("./src/middlewares/authenticate");
const errorHandler = require("./src/errors/errorHandler");
const UserCartRelation = require('./src/models/relations/cartAndUserRelation')
/// Test DB
db.authenticate()
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.log(err));

db.sync({alter: true});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(jwt());

app.use("/users", require("./src/routes/userRoutes"));
app.use("/products", require("./src/routes/productRoutes"));
app.use("/shoppingCarts", require("./src/routes/shoppingCartRoutes"));

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, console.log("listening at " + port));
