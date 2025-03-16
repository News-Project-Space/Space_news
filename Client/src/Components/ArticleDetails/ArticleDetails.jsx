import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../helpers/dateHelper";
import Cookies from "js-cookie"; // استيراد مكتبة js-cookie

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [userId, setUserId] = useState(null); // سيتم تعبئتها من التوكن
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState([]); // حالة جديدة لتخزين التعليقات

  // دالة لاستخراج userId من التوكن
  const getUserIdFromToken = () => {
    const token = Cookies.get("token");
    if (!token) return null;

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken._id;
    } catch (error) {
      console.error("❌ خطأ في فك تشفير التوكن:", error);
      return null;
    }
  };

  useEffect(() => {
    // استخراج userId من التوكن عند تحميل المكون
    const userIdFromToken = getUserIdFromToken();
    if (userIdFromToken) {
      setUserId(userIdFromToken);
    } else {
      console.error("❌ لم يتم العثور على userId في التوكن.");
    }

    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/articles/articles/${id}`
        );
        setArticle(response.data);
        fetchAuthor(response.data.authorId);
        fetchComments(); // جلب التعليقات بعد جلب المقالة
      } catch (error) {
        console.error("Error fetching article:", error);
        setError(error.message || "حدث خطأ أثناء جلب البيانات");
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
        setComments(response.data.comments); // تحديث حالة التعليقات
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleLike = async () => {
    if (!userId) {
      console.error("❌ لم يتم العثور على userId.");
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
      console.error("❌ لم يتم العثور على userId.");
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
      console.error("❌ لم يتم العثور على userId.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/articles/${id}/comment`,
        {
          userId,
          content: commentText, // تأكد من أن الحقل اسمه "content"
        }
      );

      // تحديث حالة التعليقات لإضافة التعليق الجديد
      setComments((prevComments) => [
        ...prevComments,
        response.data.comment, // استخدم التعليق الذي تم إرجاعه من الـbackend
      ]);

      setCommentText(""); // مسح حقل التعليق بعد الإرسال
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleAddToBookmark = async () => {
    if (!userId) {
      console.error("❌ لم يتم العثور على userId.");
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
        alert("تمت إضافة المقالة إلى المفضلة بنجاح!");
      }
    } catch (error) {
      console.error("Error adding to bookmark:", error);
      alert("فشل في إضافة المقالة إلى المفضلة.");
    }
  };

  if (loading) {
    return <div className="text-center mt-8">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
  <div className="container mx-auto p-4">
  <div className="bg-[#F1F1F1] p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4 text-[#23120B]">{article.title}</h2>
    <h2 className="text-sm text-[#21209C]">Article Date: {formatDate(article.createdAt)}</h2>
    <div className="mb-4">
      {article.featuredImage && article.featuredImage.length > 0 && (
        <img
          src={
            article.featuredImage?.length > 0
              ? `http://localhost:8000${article.featuredImage[0]}`
              : "/images/default-news.jpg"
          }
          alt={article.title}
          className="w-full h-64 object-cover" // Fixed height for all article images
        />
      )}
    </div>
    <p className="text-[#23120B] mb-4">{article.content}</p>
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-[#21209C]">
        Category: {article.category}
      </span>
      <span className="text-sm text-[#21209C]">
        Views: {article.viewsCount}
      </span>
    </div>
    <div className="mb-4 text-center">
      <h3 className="text-xl font-bold mb-4 text-[#23120B]">Published By</h3>
      {author && (
        <div className="flex flex-col items-center">
          <img
            src={`http://localhost:8000/${author.profileImage}`}
            alt={author.fullName}
            className="w-24 h-24 rounded-full mb-4"
          />
          <p className="text-sm text-[#21209C] mb-2 max-w-xl">{author.bio}</p>
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
    <div className="mb-4">
      {hasLiked ? (
        <button
          onClick={handleUnlike}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Remove Like ({article.likesCount})
        </button>
      ) : (
        <button
          onClick={handleLike}
          className="bg-[#21209C] text-white px-4 py-2 rounded-lg"
        >
          Like ({article.likesCount})
        </button>
      )}
      <button
        onClick={handleAddToBookmark}
        className="bg-[#FDB827] text-white px-4 py-2 rounded-lg ml-2"
      >
        Add to Favorites
      </button>
    </div>
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2 text-[#23120B]">Comments</h3>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-[#FDB827] text-white px-4 py-2 rounded-lg mt-2"
        >
          Submit
        </button>
      </form>
      <div>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="mb-2 p-2 border-b">
              <p className="text-[#23120B]">
                <strong>{comment.username}</strong>: {comment.content}
              </p>
              <p className="text-sm text-[#21209C]">
                {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : "Unknown date"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-[#21209C]">No comments yet.</p>
        )}
      </div>
    </div>
  </div>
</div>
  );
};

export default ArticleDetails;