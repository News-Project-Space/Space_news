const Report = require('../Models/reportModel');
const Comment = require('../Models/CommentModel');

// الإبلاغ عن تعليق
exports.reportComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId, reason } = req.body;

  try {
    // التحقق من وجود التعليق
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'التعليق غير موجود.' });
    }

    // إنشاء تقرير جديد
    const report = new Report({
      commentId,
      userId,
      reason,
    });
    await report.save();

    res.status(201).json({ message: 'تم الإبلاغ عن التعليق بنجاح.', report });
  } catch (error) {
    console.error("❌ خطأ في الإبلاغ عن التعليق:", error);
    res.status(500).json({ message: 'حدث خطأ أثناء الإبلاغ عن التعليق.', error: error.message });
  }
};

// جلب جميع التقارير (للأدمن)
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find({ resolved: false })
      .populate('commentId')
      .populate('userId')
      .sort({ createdAt: -1 });

    res.status(200).json({ reports });
  } catch (error) {
    console.error("❌ خطأ في جلب التقارير:", error);
    res.status(500).json({ message: 'حدث خطأ أثناء جلب التقارير.', error: error.message });
  }
};

// حذف التعليق (Soft Delete)
exports.resolveReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: 'التقرير غير موجود.' });
    }

    // تحديث حالة التقرير إلى "تم التعامل معه"
    report.resolved = true;
    await report.save();

    // Soft Delete للتعليق
    const comment = await Comment.findById(report.commentId);
    if (comment) {
      comment.deletedAt = new Date();
      await comment.save();
    }

    res.status(200).json({ message: 'تم التعامل مع التقرير بنجاح.', report });
  } catch (error) {
    console.error("❌ خطأ في التعامل مع التقرير:", error);
    res.status(500).json({ message: 'حدث خطأ أثناء التعامل مع التقرير.', error: error.message });
  }
};