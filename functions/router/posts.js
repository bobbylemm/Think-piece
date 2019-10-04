const express = require("express");
const { getPosts } = require("../controller/posts");

const router = express.Router();

router.get("/", getPosts);
module.exports = router;
