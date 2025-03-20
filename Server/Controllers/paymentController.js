const Payment = require("../Models/paymentModel"); // Assuming you have your Payment model already defined
const mongoose = require("mongoose");

const createPayment = async (req, res) => {
  try {
    // Get the user ID from cookies (make sure you're using cookie-parser in your app)
    const userId = req.cookies.userId; 

    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    // Create a new payment document
    const newPayment = new Payment({
      subscriber: mongoose.Types.ObjectId(userId), // user ID from cookies
      subscriptionCard: req.body.subscriptionCard, // Assuming you have a SubscriptionCard in your system
      amount: req.body.amount,
      payment_status: "Completed", // Default, can be updated based on actual payment status
    });

    // Save the payment to the database
    await newPayment.save();

    res.status(201).json({
      message: "Payment created successfully",
      payment: newPayment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = { createPayment };
