const express = require("express");
const router = express.Router();
const {
  createUsers,
  getUsers,
} = require("../controllers/users/users.controller");

router.post("/signup", createUsers);

router.post("/signin", getUsers);

module.exports = router;
