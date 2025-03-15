
import React from "react";

const VideoSection = () => {
  return (
    <div className="flex bg-black text-white w-full relative overflow-hidden h-150" style={{ aspectRatio: "16/9" }}>
      {/* YouTube Video Background (غير نشط) */}
      <div className="absolute right-3 w-250 h-full ">
        <iframe
          className="absolute inset-0 w-full h-120 mt-10"
          src="https://www.youtube.com/embed/-KKwMhdFzqg?controls=1&showinfo=0&modestbranding=1&rel=0"
          title="YouTube Video"
          allow="fullscreen"
          frameBorder="0"
        ></iframe>
      </div>

      {/* Information sidebar */}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 p-8 flex flex-col justify-center  bg-opacity-50">
        <div className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">FEATURED VIDEO</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">March 2025 Total Lunar Eclipse</h1>
        <p className="text-sm text-gray-300 mb-6">
          The Moon will pass into Earth's shadow and appear to turn red on the night of March 13 or early in the morning on March 14, depending on time zone.
        </p>
      </div>
    </div>
  );
};

export default VideoSection;

