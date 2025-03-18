const express = require("express");
const router = express.Router();
const { details, edit, addBookmark, favBookmarks } = require("../Controllers/userController.js");

router.get("/details/:id", details);
router.put("/update/:id", edit);
router.post("/favorites/:articleId", addBookmark);
router.get("/favorites", favBookmarks);

module.exports = router;
