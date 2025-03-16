const express = require('express');
const router = express.Router();
const commentController = require('../Controllers/commentController');

// إنشاء تعليق جديد
router.post('/comments', commentController.createComment);

// جلب جميع التعليقات لمقال معين
router.get('/comments/article/:articleId', commentController.getCommentsByArticleId);

// تحديث تعليق
router.put('/comments/:id', commentController.updateComment);

// حذف تعليق
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;