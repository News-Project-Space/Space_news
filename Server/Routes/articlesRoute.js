const express = require("express");
const { getAllArticles } = require("../Controllers/articlesController");
const { getArticleById } = require("../Controllers/articlesController");


const router = express.Router();

// ✅ Route to get all articles with pagination & sorting
router.get("/filter", getAllArticles);
router.get("/get/:id", getArticleById);



module.exports = router;
