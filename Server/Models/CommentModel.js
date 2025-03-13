const CommentSchema = new mongoose.Schema(
    {
      articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true, index: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      content: { type: String, required: true },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Comments", CommentSchema);
  