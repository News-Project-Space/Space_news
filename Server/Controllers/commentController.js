const Comment = require('../Models/CommentModel');
const Article = require('../Models/articlesModel');
const User = require('../Models/UserModel');

exports.addComment = async (req, res) => {
  const { articleId } = req.params;
  const { userId, content } = req.body;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'المقالة غير موجودة.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود.' });
    }

    const comment = new Comment({
      articleId,
      userId,
      content,
      username: user.fullName,
    });
    await comment.save();

    article.comments.push(comment._id);
    await article.save();

    res.status(201).json({ message: 'تمت إضافة التعليق بنجاح.', comment });
  } catch (error) {
    console.error("❌ خطأ في إضافة التعليق:", error);
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة التعليق.', error: error.message });
  }
};

exports.getComments = async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'المقالة غير موجودة.' });
    }

    const comments = await Comment.find({ articleId, softDelete: false })
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    console.error("❌ خطأ في جلب التعليقات:", error);
    res.status(500).json({ message: 'حدث خطأ أثناء جلب التعليقات.', error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { content, userId } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'التعليق غير موجود.' });
    }

    // التحقق من أن المستخدم هو صاحب التعليق
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: 'غير مسموح بتعديل هذا التعليق.' });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ message: 'تم تعديل التعليق بنجاح.', comment });
  } catch (error) {
    console.error("❌ خطأ في تعديل التعليق:", error);
    res.status(500).json({ message: 'حدث خطأ أثناء تعديل التعليق.', error: error.message });
  }
};