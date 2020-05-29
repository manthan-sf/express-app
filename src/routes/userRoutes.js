const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");
const Credentials = require("../models/Credentials");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config.json");
const Roles = require("../auth/roles");
const authorize = require("../auth/authorization");

router.get("/", authorize([Roles.Admin, Roles.User]), (req, res, next) => {
  User.findAll({
    include: [
      {
        model: Credentials,
      },
    ],
  })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => res.status(400).send(err));
});

router.post("/", (req, res) => {
  let credentialsPayload = { password: req.body.password, userId: null };
  const userPayload = { ...req.body };
  delete userPayload.password;

  try {
    User.create(userPayload)
      .then(async (user) => {
        credentialsPayload.password = await bcrypt.hash(
          credentialsPayload.password,
          8
        );
        credentialsPayload = { ...credentialsPayload, userId: user.id };
        Credentials.create(credentialsPayload)
          .then((credential) => {
            res.status(201).send(user);
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (err) {
    throw err;
  }
});

router.delete("/:id", authorize([Roles.Admin, Roles.User]), (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((user) => {
      user
        .destroy()
        .then(() => res.sendStatus(204))
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
});

router.put("/:id", authorize([Roles.Admin, Roles.User]), (req, res) => {
  const id = req.params.id;
  const updateUserData = { ...req.body };
  User.findByPk(id)
    .then((user) => {
      user
        .update(updateUserData)
        .then(() => {
          res.sendStatus(204);
        })
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
});

router.get("/:id", authorize([Roles.Admin, Roles.User]), (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => res.sendStatus(404));
});

router.post("/change-password/:id", authorize([Roles.Admin, Roles.User]), (req, res) => {
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
});

router.post("/authenticate", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user)
        return res.status(400).send("Username or password is incorrect");

      Credentials.findOne({ where: { userId: user.id } })
        .then(async (credential) => {
          if (!credential)
            return res.status(400).send("Username or password is incorrect");

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
