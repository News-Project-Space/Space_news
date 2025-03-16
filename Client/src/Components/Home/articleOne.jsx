// import { useState, useEffect } from "react";
// import axios from "axios";

// const Articleone = () => {
//   const  id  = "67d6ab73bd1a71723bfe3b6e";
//   const [article, setArticle] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/articles/get/${id}`);
//         setArticle(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Error fetching article");
//       }
//     };

//     if (id) {
//       fetchArticle();
//     }
//   }, [id]);

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!article) return <p>Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
//       <p className="text-gray-600 mt-2">{article.content}</p>
//     </div>
//   );
// };

// export default Articleone;

import { useState, useEffect } from "react";
import axios from "axios";

const Articleone = () => {
  const id = "67d6ab73bd1a71723bfe3b6e";
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/articles/get/${id}`);
        setArticle(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching article");
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!article) return <p>Loading...</p>;

  return (
    <div 
      className="relative w-full h-screen  bg-cover bg-center"
      style={{ backgroundImage: `url(${article.featuredImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          {article.title}
        </h1>
        <p className="text-lg text-white mb-6 max-w-2xl">
          {article.content.substring(0, 200)}...
        </p>
        <button className="bg-red-600 text-white px-6 py-2 rounded-full w-fit flex items-center space-x-2">
          <span>Listen</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Articleone;
