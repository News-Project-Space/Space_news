import React from 'react';

function SavedArticles() {
  const savedArticles = [
    { id: 1, title: 'The Future of AI', date: 'Feb 12, 2025' },
    { id: 2, title: 'Exploring Mars', date: 'Jan 30, 2025' },
    { id: 3, title: 'Ancient Civilizations', date: 'Jan 15, 2025' },
  ];

  return (
    <div id="saved-articles">
      <h1 className="text-2xl font-bold mb-6">Saved Articles</h1>
      <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
        {savedArticles.map((article) => (
          <div key={article.id} className="p-4 hover:bg-gray-50">
            <h3 className="font-medium text-lg">{article.title}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-500 text-sm">{article.date}</span>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800">Read</button>
                <button className="text-red-600 hover:text-red-800">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedArticles;
