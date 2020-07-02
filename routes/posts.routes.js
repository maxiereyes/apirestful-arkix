const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  createPosts,
  deletePosts,
} = require("../controllers/posts/posts.controller");

router.get("/", getAllPosts);

router.post("/", createPosts);

router.delete("/:id", deletePosts);

module.exports = router;
