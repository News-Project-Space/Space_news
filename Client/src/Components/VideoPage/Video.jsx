import React, { useState } from 'react';

const Video = () => {
  // State for video modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  // Sample data for space and astronomy videos
  const heroVideo = {
    category: "SCIENCE",
    title: "Cosmic Horizons",
    subtitle: "Official Season 1 Trailer",
    views: "1.2M",
    date: "2 months ago",
    thumbnail: "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?q=80&w=1000",
    videoId: "wV-kq4P9TNw" // The Universe: Cosmic Horizons | Space Documentary
  };

  const gridVideos = [
    {
      category: "SPACE",
      title: "Dark Matter",
      author: "Jane Doe",
      date: "2 months ago",
      views: "876K",
      thumbnail: "https://images.unsplash.com/photo-1534841090574-cba2d662b62e?q=80&w=1000",
      videoId: "J3xLuZNKhlY" // What is Dark Matter? | PBS Space Time
    },
    {
      category: "SCIENCE",
      title: "Exoplanets",
      author: "Jane Doe",
      date: "2 months ago",
      views: "543K",
      thumbnail: "https://images.unsplash.com/photo-1545156521-77bd85671d30?q=80&w=1000",
      videoId: "NO3hNUU3t3w" // How Do We Find Exoplanets? | SciShow Space
    },
    {
      category: "SPACE SPORTS",
      title: "Zero Gravity",
      author: "Jane Doe",
      date: "2 months ago",
      views: "321K",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
      videoId: "lMtXfwk7PXg" // What Happens to Your Body in Zero Gravity? | Veritasium
    },
    {
      category: "TECHNOLOGY",
      title: "Space Telescopes",
      author: "Jane Doe",
      date: "2 months ago",
      views: "754K",
      thumbnail: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1000",
      videoId: "Gp14qXKuvU4" // James Webb vs. Hubble Telescope | NASA
    },
    {
      category: "EXPLORATION",
      title: "Mars Mission",
      author: "Jane Doe",
      date: "2 months ago",
      views: "432K",
      thumbnail: "https://images.unsplash.com/photo-1614314107768-6018061b5b72?q=80&w=1000",
      videoId: "qz5whYgZNso" // NASA's Mars Rover Mission Explained
    },
    {
      category: "FOOD SCIENCE",
      title: "Space Cuisine",
      author: "Jane Doe",
      date: "2 months ago",
      views: "654K",
      thumbnail: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      videoId: "a4tFXz2K7qc" // How Astronauts Eat in Space | NASA
    }
  ];


  // Function to play video
  const playVideo = (videoId) => {
    setCurrentVideoId(videoId);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideoId(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-96 md:h-screen/2 lg:h-screen/2  overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute min-w-full min-h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/10800208/10800208-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          <img
            src="/path-to-nebula-image.jpg"
            alt="Cosmic Nebula"
            className="absolute min-w-full min-h-full object-cover"
          />
        </video>
      </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-20">
          <span className="text-white text-xs md:text-sm font-semibold">{heroVideo.category}</span>
          <h1 className="text-white text-4xl md:text-6xl font-bold mt-2">{heroVideo.title}</h1>
          <p className="text-white text-xl md:text-2xl mt-2">{heroVideo.subtitle}</p>
          <p className="text-gray-300 text-sm mt-4">NOW AVAILABLE ON STREAMING SERVICES</p>
          <div className="flex items-center mt-4 ">
          <button
  onClick={() => playVideo(heroVideo.videoId)}
  className="w-20 h-20 bg-black bg-opacity-30 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-all cursor-pointer"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
</button>

            <div className="ml-4 flex items-center">
              <span className="text-white text-sm">{heroVideo.views} views</span>
              <span className="mx-2 text-white">•</span>
              <span className="text-white text-sm">{heroVideo.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid View */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridVideos.map((video, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group">
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => playVideo(video.videoId)} 
                    className="w-30 h-30 bg-opacity-30 rounded-full flex items-center justify-center group-hover:bg-opacity-50 transition-all cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-18 w-18 text-white" fill="none" viewBox="0 0 35 35" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-gray-800 bg-opacity-75 rounded">{video.category}</span>
                  <h3 className="mt-2 text-xl font-bold text-white">{video.title}</h3>
                  <p className="text-sm text-gray-300">By {video.author} • {video.date}</p>
                  <div className="flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="ml-1 text-xs text-gray-300">{video.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <div className="relative w-full max-w-4xl mx-6">
      {/* Close button */}
      <button 
        onClick={closeModal}
        className="absolute -top-10 right-0 text-white hover:text-gray-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Video player */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, width: '100%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${currentVideoId}`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Video;