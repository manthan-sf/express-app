const exceptions = require("../errors/errors.json").exception_message;

function errorHandler(err, req, res, next) {
  if (err.name === exceptions.unauthorized) {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }
}

module.exports = errorHandler;
