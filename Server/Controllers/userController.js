const User = require("../Models/userModel");
const Article = require("../Models/articlesModel");
const Bookmark = require("../Models/BookmarkModel");

exports.details = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user data" });
  }
};

exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, preferences } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fullName on the user model
    user.fullName = fullName;
    user.preferences = preferences;
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Error updating user data" });
  }
};

exports.addBookmark = async (req, res) => {
  const { userId } = req.body; // Getting userId from the body
  const { articleId } = req.params; // Getting articleId from the URL params

  // Validate input
  if (!userId || !articleId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID and Article ID are required" });
  }

  try {
    // Check if the article exists
    const article = await Article.findById(articleId);
    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the article is already bookmarked by the user
    const existingBookmark = await Bookmark.findOne({ userId, articleId });
    if (existingBookmark) {
      return res
        .status(400)
        .json({ success: false, message: "Article already bookmarked" });
    }

    // Create a new bookmark
    const newBookmark = new Bookmark({ userId, articleId });
    await newBookmark.save();

    return res.status(201).json({
      success: true,
      message: "Article added to bookmarks successfully",
    });
  } catch (error) {
    console.error("Error adding bookmark:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.favBookmarks = async (req, res) => {
  const { userId } = req.query; // Accessing userId from query parameters

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }
  console.log(userId);

  try {
    // Fetch bookmarks for the user
    const bookmarks = await Bookmark.find({ userId });

    if (!bookmarks || bookmarks.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No bookmarks found" });
    }

    // Optionally, fetch article details if needed
    const bookmarkedArticles = await Promise.all(
      bookmarks.map(async (bookmark) => {
        const article = await Article.findById(bookmark.articleId);
        return {
          id: article._id,
          title: article.title,
          date: article.date, // Add more fields as necessary
        };
      })
    );

    return res
      .status(200)
      .json({ success: true, bookmarks: bookmarkedArticles });
  } catch (err) {
    console.error("Error fetching bookmarks:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
