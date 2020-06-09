const expressJwt = require("express-jwt");
const config = require("../../config.json");

const jwt = () => {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      { url: "/users/login/auth-token" },
      { url: "/users/register", methods: ["POST"] },
      //will change routes to regex
    ],
  });
};

module.exports = jwt;

//expressJWT serves as a middleware which  keeps an eye on requests and validate JWT headers
