const expressJwt = require("express-jwt");
const config = require("../../config.json");

const jwt = () => {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      { url: "/users/login/auth-token" },
      { url: "/users/register", methods: ["POST"] },
      { url: "/users" },
      { url: "/products", methods: ["GET"] },
      { url: "/products/:id", methods: ["GET"] },
      { url: "/shoppingCarts", methods: ["POST"] },
      { url: "/shoppingCarts/:id", methods: ["GET", "DELETE", "PUT"] },
      { url: "/shoppingCarts/:userId/item", methods: ["POST"] },
      { url: "/orders" },
      { url: "/orders/:orderId" },
      //will change routes to regex
    ],
  });
};

module.exports = jwt;

//expressJWT serves as a middleware which  keeps an eye on requests and validate JWT headers
