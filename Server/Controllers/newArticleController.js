const Article = require("../Models/articlesModel");
const upload = require("../Multer/multerConfig"); 

exports.createArticle = async (req, res) => {
  try {
    const { title, content, category, tags, featuredVideo, authorId } = req.body;


    const featuredImage = req.files.map(file => `/uploads/${file.filename}`);

    if (!title || !content || !category || !tags || featuredImage.length === 0) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const formattedTags = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim());

    const newArticle = new Article({
      title,
      content,
      featuredImage,
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
