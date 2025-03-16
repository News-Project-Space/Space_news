import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [userId, setUserId] = useState('123');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/articles/articles/${id}`);
        setArticle(response.data);
        fetchAuthor(response.data.authorId); // جلب بيانات الناشر بعد جلب المقال
      } catch (error) {
        console.error('Error fetching article:', error);
        setError(error.message || 'حدث خطأ أثناء جلب البيانات');
      } finally {
        setLoading(false);
      }
    };

    const fetchAuthor = async (authorId) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${authorId}`);
        setAuthor(response.data);
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/articles/${id}/like`);
      setArticle((prevArticle) => ({ ...prevArticle, likesCount: response.data.likesCount }));
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/articles/${id}/comment`, {
        userId,
        text: commentText,
      });

      setArticle((prevArticle) => ({
        ...prevArticle,
        comments: [...prevArticle.comments, { userId, text: commentText, createdAt: new Date() }],
      }));

      setCommentText('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleAddToBookmark = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/articles/${id}/bookmark`, {
        userId,
      });
      if (response.data.success) {
        alert('Article added to bookmarks successfully!');
      }
    } catch (error) {
      console.error('Error adding to bookmark:', error);
      alert('Failed to add article to bookmarks.');
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
      <h1 className="text-3xl font-bold text-center my-8">تفاصيل المقال</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
        <div className="mb-4">
          {article.featuredImage && article.featuredImage.length > 0 && (
            <img
              src={article.featuredImage[0]}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>
        <p className="text-gray-700 mb-4">{article.content}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">التصنيف: {article.category}</span>
          <span className="text-sm text-gray-600">عدد المشاهدات: {article.viewsCount}</span>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">تفاصيل الناشر</h3>
          {author && (
            <div className="flex items-center">
              <img
                src={author.profileImage}
                alt={author.fullName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-lg font-semibold">{author.fullName}</p>
                <p className="text-sm text-gray-600">{author.bio}</p>
              </div>
            </div>
          )}
        </div>
        <div className="mb-4">
          <button
            onClick={handleLike}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            أعجبني ({article.likesCount})
          </button>
          <button
            onClick={handleAddToBookmark}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg ml-2"
          >
            إضافة إلى المفضلة
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">التعليقات</h3>
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="أضف تعليقًا..."
              className="w-full p-2 border rounded-lg"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
            >
              إرسال
            </button>
          </form>
          <div>
            {article.comments && article.comments.length > 0 ? (
              article.comments.map((comment, index) => (
                <div key={index} className="mb-2 p-2 border-b">
                  <p className="text-gray-700">{comment.text}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">لا توجد تعليقات حتى الآن.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;