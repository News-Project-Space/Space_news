import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch, FaThLarge, FaList, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [searchQuery, setSearchQuery] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("-createdAt"); // Default to latest
  const itemsPerPage = 12;
  const navigate = useNavigate();


  const handleArticleClick = (articleId) => {
    navigate(`/ArticleDetails/${articleId}`);
  };

  const categories = [
    "The Solar System",
    "Astrobiology & Alien Life",
    "Astronomy & Space Science",
    "Space Technology & Innovation",
  ];

  const sortOptions = {
    "Latest": "-createdAt",
    "Newest": "createdAt",
    "Most Viewed": "-viewsCount",
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/articles/filter", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search: searchQuery,
            category: categoryFilter,
            sort: sortBy,
          },
        });
        setArticles(response.data.articles);
        setTotalResults(response.data.total);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch articles");
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, searchQuery, categoryFilter, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-8">News</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </form>

      {/* Filters and View Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
          {/* Category Filter */}
          <select
            className="border px-4 py-2 rounded text-gray-700"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            className="border px-4 py-2 rounded text-gray-700"
            value={sortBy} // Ensure the displayed value matches the selected key
            onChange={(e) => setSortBy(e.target.value)} // Update state with the selected key
            >
            <option value="">SORT BY</option>
            {Object.keys(sortOptions).map((key, index) => (
                <option key={index} value={key}>{key}</option> // Keep value as key, not the query
            ))}
            </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <p className="text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, totalResults)} of {totalResults} results
          </p>
          <div className="flex ml-4">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "text-blue-600" : "text-gray-400"}`}
              aria-label="Grid view"
            >
              <FaThLarge size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "text-blue-600" : "text-gray-400"}`}
              aria-label="List view"
            >
              <FaList size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Articles Grid/List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <p>Loading articles...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
          {articles.map((article) => (
            <div key={article._id} onClick={() => handleArticleClick(article._id)} className={viewMode === "list" ? " flex space-x-4" : ""}>
              <div className="block cursor-pointer">
                <div className={`${viewMode === "list" ? "w-36 h-36" : "w-full h-48"} overflow-hidden mb-2`}>
                  <img
                    src={article.featuredImage[0] || "/images/default-news.jpg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <Link to={`/category/${article.category.toLowerCase()}`} className="text-blue-700 font-medium block mb-2">
                  {article.category}
                </Link>
                <Link to={`/article/${article._id}`} className="block">
                  <h2 className="text-xl font-bold mb-2 hover:text-blue-700">{article.title}</h2>
                </Link>
                <p className="text-gray-500">
                  {new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(article.createdAt))}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination could be added here */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded mr-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * itemsPerPage >= totalResults}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsList;
