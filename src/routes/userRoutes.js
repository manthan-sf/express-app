const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");
const Credentials = require("../models/Credentials");
const ShoppingCart = require("../models/ShoppingCart");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

router.post("/", async (req, res, next) => {
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

router.post(
  "/change-password/:id",
  authorize([Roles.Admin, Roles.User]),
  (req, res) => {
    const id = req.params.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    let bcryptedNewPassword = null;

    User.findByPk(id, {
      include: [
        {
          model: Credentials,
        },
      ],
    })
      .then(async (user) => {
        if (await bcrypt.compare(oldPassword, user.credential.password)) {
          bcryptedNewPassword = await bcrypt.hash(newPassword, 8);
          user.credential
            .update({
              password: bcryptedNewPassword,
            })
            .then((credential) => res.sendStatus(204))
            .catch((err) => res.status(400).send(err));
        } else res.status(400).send("Incorrect Password");
      })
      .catch((err) => res.status(404).send(err));
  }
);

router.post("/authenticate", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user)
        return res
          .status(400)
          .send("Username or password is incorrect and user not found");

      Credentials.findOne({ where: { userId: user.id } })
        .then(async (credential) => {
          if (!credential) {
            console.log(credential);
            return res.status(400).send("Username or password is incorrect");
          }

          if (await bcrypt.compare(password, credential.password)) {
            const { secret } = config;
            const token = jwt.sign({ sub: user.id, role: user.role }, secret);

            return res.status(200).send({ token: token, user });
          } else return res.status(400).send("Wrong Password");
        })
        .catch((err) => {
          res.status(401).send(err);
        });
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
