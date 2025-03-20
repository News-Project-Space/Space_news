const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comments", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  reason: { type: String, required: true },
  resolved: { type: Boolean, default: false }, // لتحديد ما إذا كان التقرير تم التعامل معه
}, { timestamps: true });

module.exports = mongoose.model("Reports", ReportSchema);