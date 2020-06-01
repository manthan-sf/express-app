const expressJwt = require("express-jwt");
const config = require("../../config.json");

const jwt = () => {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      { url: "/users/authenticate" },
      { url: "/users", methods: ["POST", "GET"] },
      { url: "/products", methods: ["GET"] },
      { url: "/products/:id", methods: ["GET"] },
      { url: "/shoppingCarts", methods: ["GET", "POST"] },
      { url: "/shoppingCartItems", methods: ["GET", "POST"] },
    ],
  });
};

module.exports = jwt;

//expressJWT serves as a middleware which  keeps an eye on requests and validate JWT headers