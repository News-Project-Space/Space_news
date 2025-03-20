import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../helpers/dateHelper";
import Cookies from "js-cookie";
import Swal from 'sweetalert2'; // Import SweetAlert2
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [userId, setUserId] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const getUserIdFromToken = () => {
    const token = Cookies.get("token");
    if (!token) return null;

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken._id;
    } catch (error) {
      console.error("❌ Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    if (userIdFromToken) {
      setUserId(userIdFromToken);
    } else {
      console.error("❌ User ID not found in token.");
    }

    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/articles/articles/${id}`
        );
        setArticle(response.data);
        fetchAuthor(response.data.authorId);
        fetchComments();
      } catch (error) {
        console.error("Error fetching article:", error);
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAuthor = async (authorId) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/journalists/user/${authorId}`
        );
        setAuthor(response.data);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/articles/${id}/comments`
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleLike = async () => {
    if (!userId) {
      console.error("❌ User ID not found.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/articles/${id}/like`,
        { userId }
      );
      setArticle((prevArticle) => ({
        ...prevArticle,
        likesCount: response.data.likesCount,
      }));
      setHasLiked(true);
    } catch (error) {
      console.error("Error liking article:", error);
    }
  };

  const handleUnlike = async () => {
    if (!userId) {
      console.error("❌ User ID not found.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/articles/${id}/unlike`,
        { data: { userId } }
      );
      setArticle((prevArticle) => ({
        ...prevArticle,
        likesCount: response.data.likesCount,
      }));
      setHasLiked(false);
    } catch (error) {
      console.error("Error unliking article:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("❌ User ID not found.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/articles/${id}/comment`,
        {
          userId,
          content: commentText,
        }
      );

      setComments((prevComments) => [
        ...prevComments,
        response.data.comment,
      ]);

      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleAddToBookmark = async () => {
    if (!userId) {
      console.error("❌ User ID not found.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/articles/${id}/bookmark`,
        {
          userId,
        }
      );
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Added to Favorites!',
          text: 'The article has been added to your favorites.',
        });
      }
    } catch (error) {
      console.error("Error adding to bookmark:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add',
        text: 'Failed to add the article to favorites.',
      });
    }
  };

  const handleReportComment = async (commentId) => {
    const { value: reason } = await Swal.fire({
      title: 'Report Comment',
      input: 'text',
      inputLabel: 'Please enter the reason for reporting:',
      inputPlaceholder: 'Enter the reason here...',
      showCancelButton: true,
      confirmButtonText: 'Report',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter a reason!';
        }
      },
    });

    if (reason) {
      try {
        await axios.post(`http://localhost:8000/api/comments/${commentId}/report`, {
          userId,
          reason,
        });
        Swal.fire({
          icon: 'success',
          title: 'Reported Successfully!',
          text: 'Thank you for reporting this comment.',
        });
      } catch (error) {
        console.error("Error reporting comment:", error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Report',
          text: 'An error occurred while reporting the comment.',
        });
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8 text-[#23120B]">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Article on the left side */}
        <div className="md:col-span-2 bg-[#F1F1F1] rounded-lg shadow-lg overflow-hidden">
          {/* Article Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-[#23120B] mb-3">{article.title}</h2>
            <h2 className="text-sm text-[#21209C]">Article Date: {formatDate(article.createdAt)}</h2>
          </div>

          {/* Featured Image */}
          <div className="p-6">
            {article.featuredImage && article.featuredImage.length > 0 && (
              <img
                src={
                  article.featuredImage?.length > 0
                    ? `http://localhost:8000${article.featuredImage[0]}`
                    : "/images/default-news.jpg"
                }
                alt={article.title}
                className="w-full h-72 object-cover rounded-lg mb-6"
              />
            )}
            <p className="text-[#23120B] leading-relaxed mb-6">
              {article.content.split('\n').map((paragraph, index) => (
                <span key={index}>
                  {paragraph}
                  <br /><br />
                </span>
              ))}
            </p>
          </div>

          {/* Article Meta */}
          <div className="px-6 pb-6 flex items-center justify-between">
            <span className="text-sm text-[#21209C]">Category: {article.category}</span>
            <span className="text-sm text-[#21209C]">Views: {article.viewsCount}</span>
          </div>

          {/* Social Share Buttons */}
          <div className="p-6 border-t border-gray-200 flex justify-center gap-6">
            <FacebookShareButton url={window.location.href} quote={article.title}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <WhatsappShareButton url={window.location.href} title={article.title} separator=" - ">
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <TwitterShareButton url={window.location.href} title={article.title}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
          </div>

          {/* Interaction Buttons */}
          <div className="p-6 border-t border-gray-200 flex justify-center gap-4">
            {hasLiked ? (
              <button
                onClick={handleUnlike}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Remove Like ({article.likesCount})
              </button>
            ) : (
              <button
                onClick={handleLike}
                className="bg-[#21209C] text-white px-4 py-2 rounded-lg hover:bg-[#1a1a7e] transition"
              >
                Like ({article.likesCount})
              </button>
            )}
            <button
              onClick={handleAddToBookmark}
              className="bg-[#FDB827] text-white px-4 py-2 rounded-lg hover:bg-[#e5a523] transition"
            >
              Add to Favorites
            </button>
          </div>
        </div>

        {/* Author and Comments on the right side */}
        <div className="md:col-span-1 h-fit sticky top-0 self-start">
          {/* Author Section */}
          <div className="bg-[#F1F1F1] rounded-lg shadow-lg overflow-hidden p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 text-[#23120B]">Published By</h3>
            {author && (
              <div className="flex flex-col items-center">
                <img
                  src={`http://localhost:8000/${author.profileImage}`}
                  alt={author.fullName}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                <p className="text-sm text-[#21209C] mb-2 max-w-md">{author.bio}</p>
                <a
                  href={author.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#21209C] hover:underline"
                >
                  {author.portfolio}
                </a>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="bg-[#F1F1F1] rounded-lg shadow-lg overflow-hidden p-6">
            <h3 className="text-xl font-bold mb-4 text-[#23120B]">Comments</h3>
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21209C] mb-2"
                rows="3"
                required
              />
              <button
                type="submit"
                className="bg-[#FDB827] text-white px-4 py-2 rounded-lg hover:bg-[#e5a523] transition"
              >
                Submit
              </button>
            </form>
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
                    <p className="text-[#23120B]">
                      <strong>{comment.username}</strong>: {comment.content}
                    </p>
                    <p className="text-sm text-[#21209C]">
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleString()
                        : "Unknown date"}
                    </p>
                    <button
                      onClick={() => handleReportComment(comment._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Report
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-[#21209C]">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;