const Article = require("../Models/articlesModel");

  
// ✅ Get All Articles (Pagination & Sorting)
exports.getAllArticles = async (req, res) => {
    try {
      let { page = 1, limit = 10, sort = "-createdAt", category, author, search } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
  
      const query = {};
      if (category) query.category = category;
      if (author) query.author = author;
      if (search) query.title = { $regex: search, $options: "i" };
  
      const articles = await Article.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);
  
      const total = await Article.countDocuments(query);
  
      res.status(200).json({ success: true, articles, total, page, totalPages: Math.ceil(total / limit) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };