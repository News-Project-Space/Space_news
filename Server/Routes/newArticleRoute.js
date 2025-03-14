const express = require("express");
const { createArticle } = require("../Controllers/newArticleController");
// const { authMiddleware } = require("../Middlewares/authMiddleware");
const router = express.Router();

router.post("/create", createArticle);

module.exports = router;