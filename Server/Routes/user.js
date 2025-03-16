const express = require("express");
const router = express.Router();
const { details, edit } = require("../Controllers/userController.js");

router.get("/details/:id", details);
router.put("/update/:id", edit);

module.exports = router;
