const express = require("express");
const { getAllArticles } = require("../Controllers/articlesController");


const router = express.Router();

// ✅ Route to get all articles with pagination & sorting
router.get("/filter", getAllArticles);


module.exports = router;
