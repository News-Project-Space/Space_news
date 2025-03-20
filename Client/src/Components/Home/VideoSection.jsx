import React from "react";
import { useNavigate } from "react-router-dom";

const VideoSection = () => {
  const navigate =useNavigate()
  const handleReadMore = () => {
    navigate(`/videos`);
};
  return (
    <div className="flex flex-col md:flex-row bg-black text-white w-full relative overflow-hidden">
      {/* Information Sidebar */}
      <div className="w-full md:w-1/3 p-4 md:p-8 flex flex-col justify-center bg-black bg-opacity-50">
        <div className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">FEATURED VIDEO</div>
        <h1 className="text-2xl md:text-4xl font-bold mb-4">March 2025 Total Lunar Eclipse</h1>
        <p className="text-sm text-gray-300 mb-6">
          The Moon will pass into Earth's shadow and appear to turn red on the night of March 13 or early in the morning on March 14, depending on time zone.
        </p>
        <div className="mb-8">
                        <button
                            onClick={handleReadMore}
                            className="cursor-pointer bg-[#21209C] hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md inline-flex items-center"
                        >
                            Watch More Videos
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
      </div>

      {/* Video Container */}
      <div className="w-full md:w-2/3 relative" style={{ aspectRatio: "16/9" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/-KKwMhdFzqg?controls=1&showinfo=0&modestbranding=1&rel=0"
          title="YouTube Video"
          allow="fullscreen"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoSection;