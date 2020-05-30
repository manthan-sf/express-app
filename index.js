const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/config/database");
const jwt = require("./src/auth/authenticate");
const errorHandler = require("./src/errors/errorHandler");

/// Test DB
db.authenticate()
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.log(err));

// db.sync({ alter: true });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(jwt());

// User routes
app.use("/users", require("./src/routes/userRoutes"));
app.use('/products', require('./src/routes/productRoutes'))
// app.use("/auth", require("./src/routes/authRoutes"));

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, console.log("listening at " + port));
