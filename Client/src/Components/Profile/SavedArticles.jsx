import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SavedArticles() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/favorites?userId=${userId}`
        );
        setSavedArticles(response.data.bookmarks); // Assuming the response has a 'bookmarks' field
      } catch (err) {
        setError("Failed to load saved articles");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSavedArticles();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="w-16 h-16 border-4 border-[#FDB827] border-t-[#23120B] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-[#FDB827] max-w-md w-full">
          <h2 className="text-2xl font-bold text-[#23120B] mb-2">Error</h2>
          <p className="text-[#23120B]">{error}</p>
        </div>
      </div>
    );
  }

  const handleReadClick = (articleId) => {
    navigate(`/ArticleDetails/${articleId}`);
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      <div className="bg-[#23120B] text-white py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold flex items-center">
            <svg
              className="w-8 h-8 mr-3 text-[#FDB827]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
            </svg>
            Reading Collection
          </h1>
          <div className="flex items-center gap-3">
            <span className="bg-[#FDB827] text-[#23120B] px-4 py-2 rounded-full font-bold flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              {savedArticles.length}{" "}
              {savedArticles.length === 1 ? "bookmark" : "bookmarks"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {savedArticles.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
            <div className="w-24 h-24 bg-[#FDB827] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-[#23120B]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#23120B] mb-3">
              Start Your Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              Bookmarked articles will appear here. Save something interesting
              to start building your personal library.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {savedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl overflow-hidden shadow-md border-l-4 border-[#FDB827] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-[#23120B] mb-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">{article.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleReadClick(article.id)}
                      className="bg-[#23120B] text-white py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-medium flex items-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Read
                    </button>
                    <button className="bg-white text-[#23120B] py-2 px-6 rounded-lg border border-[#23120B] hover:bg-[#F1F1F1] transition-colors font-medium flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {savedArticles.length > 0 && (
        <div className="fixed bottom-6 right-6">
          <div className="bg-[#FDB827] p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <svg
              className="w-6 h-6 text-[#23120B]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedArticles;
