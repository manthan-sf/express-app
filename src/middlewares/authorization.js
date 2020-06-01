const authorize = (Role) => {
  if (typeof Role === "string") {
    Role = [Role];
  }

  return (req, res, next) => {
    console.log("user roleeeeeee", req.user);
    if (!Role.includes(req.user.role)) {
      return res.status(401).send("Unauthorized error");
    }

    next();
  };
};

module.exports = authorize;
