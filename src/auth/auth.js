const expressJwt = require("express-jwt");
const config = require("../../config.json");

const jwt = () => {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      { url: "/users/authenticate" },
      { url: "/users", methods: ["POST"] },
    ],
  });
};

module.exports = jwt;
