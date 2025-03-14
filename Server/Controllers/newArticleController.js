const Article = require("../Models/articlesModel");

exports.createArticle = async (req, res) => {
  try {
    const { title, content, category, tags, featuredImage, featuredVideo, authorId } = req.body;


    if (!title || !content || !category || !tags || !featuredImage || featuredImage.length === 0) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const formattedTags = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim());
    const formattedImages = Array.isArray(featuredImage) ? featuredImage : featuredImage.split(",").map(img => img.trim());

    const newArticle = new Article({
      title,
      content,
      featuredImage: formattedImages,
      featuredVideo,
      category,
      tags: formattedTags,
      authorId,
    });

    await newArticle.save();
    res.status(201).json({ success: true, article: newArticle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
