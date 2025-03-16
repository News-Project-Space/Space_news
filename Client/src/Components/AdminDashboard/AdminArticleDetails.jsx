// src/Components/AdminDashboard/ArticleDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ArticleDetails component mounted");
    console.log("Param ID =>", id);
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching article with ID:", id); // Debug log

        // FIXED: Use template literals with backticks
        const res = await axios.get(
          `http://localhost:8000/api/admin/articles/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Response data:", res.data); // Debug log

        // Ensure we correctly set the article if present
        if (res.data && res.data.article) {
          setArticle(res.data.article);
        } else {
          setError("No article data found.");
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mb-4 bg-red-50 border-l-4 border-red-500 text-red-700">
        <p className="font-medium">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="p-4 mb-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700">
        <p className="font-medium">No Article Found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        &larr; Back to Articles
      </button>
      <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
      <p className="mt-2 text-gray-600 italic">{article.category}</p>
      <p className="mt-4 text-gray-700">{article.content}</p>

      {article.featuredImage?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Images</h3>
          <div className="grid grid-cols-2 gap-4">
            {article.featuredImage.map((img, idx) => (
              // FIXED: Correctly use template literals in alt
              <img
                key={idx}
                src={img}
                alt={`Featured ${idx + 1}`}
                className="w-full h-40 object-cover rounded"
              />
            ))}
          </div>
        </div>
      )}

      {article.featuredVideo && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Video</h3>
          <iframe
            className="w-full h-64 rounded"
            src={article.featuredVideo}
            title="Featured Video"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="mt-6 flex items-center space-x-4">
        <span className="text-gray-500">Views: {article.viewsCount}</span>
        <span className="text-gray-500">Likes: {article.likesCount}</span>
        <span className="text-gray-500">Comments: {article.commentsCount}</span>
      </div>
    </div>
  );
};

export default AdminArticleDetails;
