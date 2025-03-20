const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: "articles", required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    content: { type: String, required: true },
    username: { type: String, required: true },
    softDelete: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comments", CommentSchema);