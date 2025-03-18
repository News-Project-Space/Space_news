const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscriptionCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionCard",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
      default: "Completed", // This can be changed based on actual payment status
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("payments", PaymentSchema);
