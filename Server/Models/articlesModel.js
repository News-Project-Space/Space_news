const ArticleSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      featuredImage: { type: String, default: "" },
      featuredVideo: { type: String, default: "" },
      category: { type: String, required: true },
      tags: { type: [String], default: [] },
      authorId: { type: mongoose.Schema.Types.ObjectId, ref: "Journalist", required: true },
      status: { type: String, enum: ["draft", "pending", "approved", "rejected"], default: "pending" },
      viewsCount: { type: Number, default: 0 },
      likesCount: { type: Number, default: 0 },
      commentsCount: { type: Number, default: 0 },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Articles", ArticleSchema);
  