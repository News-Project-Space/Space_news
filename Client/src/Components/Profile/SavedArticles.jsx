import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SavedArticles() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/favorites?userId=${userId}`);
        setSavedArticles(response.data.bookmarks); // Assuming the response has a 'bookmarks' field
      } catch (err) {
        setError('Failed to load saved articles');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSavedArticles();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleReadClick = (articleId) => {
    navigate(`/ArticleDetails/${articleId}`)
  };

  return (
    <div id="saved-articles" className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">Saved Articles</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {savedArticles.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2 text-gray-500 text-lg">No saved articles yet.</p>
            <p className="text-gray-400 text-sm mt-1">Articles you save will appear here</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {savedArticles.map((article) => (
              <li key={article.id} className="hover:bg-gray-50 transition duration-150">
                <div className="p-5">
                  <h3 className="font-semibold text-xl text-gray-800 mb-1">{article.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-3">
                    <span className="text-gray-500 text-sm flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {article.date}
                    </span>
                    <div className="flex space-x-3">
                      <button
                        className="px-4 py-1.5 bg-blue-50 rounded-lg text-blue-600 font-medium text-sm hover:bg-blue-100 transition duration-150 flex items-center"
                        onClick={() => handleReadClick(article.id)}
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Read
                      </button>
                      <button className="px-4 py-1.5 bg-red-50 rounded-lg text-red-600 font-medium text-sm hover:bg-red-100 transition duration-150 flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SavedArticles;
