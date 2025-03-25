const express = require('express');
const CommentController = require('../Controllers/commentController');

const router = express.Router();

router.post('/:articleId/comment', CommentController.addComment);
router.get('/:articleId/comments', CommentController.getComments);
router.put('/:commentId', CommentController.updateComment); // مسار جديد لتعديل التعليق

module.exports = router;