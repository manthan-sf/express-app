const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");
const Credentials = require("../models/Credentials");
const ShoppingCart = require("../models/ShoppingCart");
const bcrypt = require("bcryptjs");
const config = require("../../config.json");
const Roles = require("../config/roles");
const authorize = require("../middlewares/authorization");
const userService = require("../services/userService");
const credentialsService = require("../services/credentialsService");
const shoppingCartService = require("../services/shoppingCartService");

router.get("/", async (req, res, next) => {
  try {
    const userResponse = await userService.getUsers();
    res.status(userResponse.status).json({
      data: userResponse.data,
      message: userResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  const { password, ...userPayload } = req.body;
  let credentialPayload = {
    password: await bcrypt.hash(password, 8),
    userId: null,
  };
  try {
    const userResponse = await userService.addUser(userPayload);
    credentialPayload = { ...credentialPayload, userId: userResponse.data.id };
    const credentialsResponse = await credentialsService.addCredential(
      credentialPayload
    );

    res.status(userResponse.status).json({
      data: userResponse.data,
      message: userResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/:id",
  authorize([Roles.Admin, Roles.User]),
  async (req, res, next) => {
    const id = req.params.id;
    let userResponse;

    try {
      userResponse = await userService.deleteUser(id);
      res.status(userResponse.status).json({
        data: userResponse.data,
        message: userResponse.message,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.put(
  "/:id",
  authorize([Roles.Admin, Roles.User]),
  async (req, res, next) => {
    const id = req.params.id;
    const updateUserData = { ...req.body };
    let userResponse;
    try {
      userResponse = await userService.updateUser(id, updateUserData);
      res.sendStatus(userResponse.status);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id",
  authorize([Roles.Admin, Roles.User]),
  async (req, res, next) => {
    const id = req.params.id;
    let userResponse;
    try {
      userResponse = await userService.getUser(id);
      res.status(userResponse.status).json({
        data: userResponse.data,
        message: userResponse.message,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/change-password/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const credentialPayload = { ...req.body };
  let credentialResponse;
  try {
    credentialResponse = await userService.changePassword(
      userId,
      credentialPayload
    );
    res.status(credentialResponse.status).json({
      data: credentialResponse.data,
      message: credentialResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login/auth-token", async (req, res, next) => {
 
  const authenticationPayload = { ...req.body };
  console.log(authenticationPayload)
  let authenticationResponse;
  try {
    authenticationResponse = await userService.authenticate(
      authenticationPayload
    );
    res.status(authenticationResponse.status).json({
      data: authenticationResponse.data,
      message: authenticationResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
