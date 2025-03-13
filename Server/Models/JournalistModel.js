const JournalistSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      fullName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      portfolio: { type: String, required: true },
      bio: { type: String, required: true },
      status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Journalist", JournalistSchema);
  