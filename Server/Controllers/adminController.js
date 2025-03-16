const Article = require("../Models/articlesModel");
const Journalist = require("../Models/JournalistModel");
const User = require("../Models/userModel");
const Comment = require("../Models/CommentModel");

// Get various metrics for the admin dashboard
exports.getDashboardMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalArticles = await Article.countDocuments();
    const pendingArticles = await Article.countDocuments({ status: "pending" });
    const approvedArticles = await Article.countDocuments({
      status: "approved",
    });
    const totalJournalists = await User.countDocuments({ role: "journalist" });
    const pendingJournalists = await Journalist.countDocuments({
      status: "pending",
    });
    const totalComments = await Comment.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalArticles,
        pendingArticles,
        approvedArticles,
        totalJournalists,
        pendingJournalists,
        totalComments,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single article by ID
exports.getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;
    console.log("Fetching article with ID:", articleId); // debug
    const article = await Article.findById(articleId);
    console.log("Article found:", article); // Add this extra log

    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }
    return res.status(200).json({ success: true, article });
  } catch (error) {
    console.error("Error in getArticleById:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an article's status (approve or reject)
exports.updateArticleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Expected status: 'approved' or 'rejected'
    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status provided" });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedArticle) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }
    res.status(200).json({ success: true, article: updatedArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve all journalist requests/accounts
exports.getJournalists = async (req, res) => {
  try {
    const journalists = await Journalist.find();
    res.status(200).json({ success: true, journalists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a journalist's status (approve or reject)
exports.updateJournalistStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Expected status: 'approved' or 'rejected'
    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status provided" });
    }

    const updatedJournalist = await Journalist.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedJournalist) {
      return res
        .status(404)
        .json({ success: false, message: "Journalist not found" });
    }
    res.status(200).json({ success: true, journalist: updatedJournalist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all registered users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all comments for moderation or review
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
