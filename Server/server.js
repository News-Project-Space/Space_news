require("dotenv").config(); // Ensure dotenv is loaded first
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Your MongoDB connection logic (ensure this is correct)
const jwt = require("jsonwebtoken"); // For handling JWT (if needed later)
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/signupRouter"); // Import your auth routes for registration
const user = require("./Routes/user");
const articleRoutes = require("./Routes/articlesRoute");
const contactRoutes = require("./Routes/contactRouter");
const adminRouter = require("./Routes/adminRouter");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cookiesParser());
app.use(
  cors({
    origin: "*", // Make sure this is the correct frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Make sure cookies are included if you're using JWT in cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register Routes
app.use("/api/auth", authRoutes); // Use authRoutes for handling the registration and login routes
app.use("/api/admin", adminRouter);
app.use("/api", contactRoutes);
app.use("/api/articles", articleRoutes);

// Connect to MongoDB using connectDB function
connectDB();

// Routes
const journalistRouter = require("./Routes/journalistRouter");
const authMiddleware = require("./Middlewares/authMiddleware");

app.use("/api", journalistRouter);
app.use("/api/articles", articleRoutes);
app.use("/api/user", user);

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
