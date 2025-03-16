const express = require("express");
const router = express.Router();
const journalistController = require("../Controllers/journalistController");
const authMiddleware = require("../Middlewares/authMiddleware");

// إنشاء صحفي جديد
router.post(
  "/journalists",
  journalistController.upload.single("profileImage"),
  journalistController.createJournalist
);

// جلب جميع الصحفيين
router.get("/journalists", authMiddleware, journalistController.getAllJournalists);

// جلب صحفي عبر ID
router.get("/journalists/:id", authMiddleware, journalistController.getJournalistById);

// تحديث بيانات الصحفي
router.put(
  "/journalists/:id",
  authMiddleware,
  journalistController.upload.single("profileImage"),
  journalistController.updateJournalist
);

// حذف صحفي
router.delete("/journalists/:id", authMiddleware, journalistController.deleteJournalist);

module.exports = router;
