const Comment = require('../Models/CommentModel');

// إنشاء تعليق جديد
exports.createComment = async (req, res) => {
  try {
    const { articleId, userId, content } = req.body;

    const comment = new Comment({
      articleId,
      userId,
      content,
    });

    await comment.save();
    res.status(201).json({ message: 'تم إنشاء التعليق بنجاح', comment });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في الخادم', error: error.message });
  }
};

// جلب جميع التعليقات لمقال معين
exports.getCommentsByArticleId = async (req, res) => {
  try {
    const { articleId } = req.params;

    const comments = await Comment.find({ articleId }).populate('userId', 'username'); // يمكنك تعديل الحقول التي تريد جلبها من النموذج User
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في الخادم', error: error.message });
  }
};

// تحديث تعليق
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: 'لم يتم العثور على التعليق' });
    }

    res.status(200).json({ message: 'تم تحديث التعليق بنجاح', comment });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في الخادم', error: error.message });
  }
};

// حذف تعليق
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).json({ message: 'لم يتم العثور على التعليق' });
    }

    res.status(200).json({ message: 'تم حذف التعليق بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في الخادم', error: error.message });
  }
};