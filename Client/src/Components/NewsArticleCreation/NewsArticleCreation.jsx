import { useState, useEffect } from "react";
import axios from "axios";

const NewsArticleCreation = ({ user }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    featuredImage: "",
    featuredVideo: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authorId, setAuthorId] = useState("");

  useEffect(() => {
    if (user && user.id) {
      setAuthorId(user.id);
    } else {
      fetchAuthorId();
    }
  }, [user]);

  const fetchAuthorId = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true });
      setAuthorId(response.data.id);
    } catch (error) {
      console.error("Error fetching authorId:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!authorId) {
      setError("User not authenticated.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/articles/create",
        {
          ...formData,
          featuredImage: formData.featuredImage.split(",").map((img) => img.trim()), 
          tags: formData.tags.split(",").map((tag) => tag.trim()), 
          authorId,
        },
        { withCredentials: true } 
      );

      setSuccess("Article created successfully!");
      setFormData({
        title: "",
        content: "",
        category: "",
        tags: "",
        featuredImage: "",
        featuredVideo: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create article");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-10 mb-10">
  <div className="w-full p-6 bg-white shadow-lg rounded-lg border-t-4 border-t-[#FDB827]">
    <h2 className="text-3xl font-bold text-center mb-6 text-[#FDB827]">
      Create a New Article
    </h2>

    {error && (
      <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
        {error}
      </div>
    )}
    {success && (
      <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700">
        {success}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Article Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDB827] focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Category</label>
          <input
            type="text"
            name="category"
            placeholder="Solar System, Alien Life, etc."
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDB827] focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-medium">Content</label>
        <textarea
          name="content"
          placeholder="Write your article content here..."
          value={formData.content}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:ring-2 focus:ring-[#FDB827] focus:border-transparent"
          required
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="exclusive, trending (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDB827] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Featured Video URL
          </label>
          <input
            type="text"
            name="featuredVideo"
            placeholder="https://youtube.com/..."
            value={formData.featuredVideo}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDB827] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          Featured Image URLs
        </label>
        <input
          type="text"
          name="featuredImage"
          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          value={formData.featuredImage}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDB827] focus:border-transparent"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#FDB827] text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-[#e9a91f] transition duration-300 shadow-md"
      >
        Publish Article
      </button>
    </form>
  </div>
</div>
  
  );
};

export default NewsArticleCreation;