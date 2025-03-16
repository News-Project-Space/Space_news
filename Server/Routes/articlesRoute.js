const express = require("express");
const { getAllArticles, getArticleById } = require("../Controllers/articlesController");



const router = express.Router();

// ✅ Route to get all articles with pagination & sorting
router.get("/filter", getAllArticles);
router.get('/articles/:id', getArticleById);
router.get("/get/:id", getArticleById);



module.exports = router;
