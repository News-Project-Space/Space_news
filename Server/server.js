require("dotenv").config();  
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");  
const jwt = require("jsonwebtoken");  
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/signupRouter");  

// Routes
const articleRoutes = require("./Routes/articlesRoute");
const newArticleRoutes = require ('./Routes/newArticleRoute');
const journalistRouter = require('./Routes/journalistRouter');
const authMiddleware = require('./Middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cookiesParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    // origin: "http://localhost:5174", 
    credentials: true,
  })
);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register Routes
app.use("/api/auth", authRoutes);  
app.use('/api', journalistRouter);
app.use("/api/articles", articleRoutes);
app.use("/api/articles", newArticleRoutes);

// Connect to MongoDB using connectDB function
connectDB();




app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



