import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Header/Hero Section with Parallax Effect */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-110"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#21209C] to-[#191583] opacity-75"></div>
        </div>

        {/* Floating stars/particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-2 w-2 rounded-full bg-white absolute top-1/4 left-1/4 animate-pulse"></div>
          <div className="h-1 w-1 rounded-full bg-white absolute top-1/3 left-1/2 animate-pulse"></div>
          <div className="h-3 w-3 rounded-full bg-white absolute top-2/3 left-1/5 animate-pulse"></div>
          <div className="h-2 w-2 rounded-full bg-white absolute top-1/2 left-3/4 animate-pulse"></div>
          <div className="h-1 w-1 rounded-full bg-white absolute top-1/6 left-5/6 animate-pulse"></div>
        </div>

        {/* Header Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          {/* Logo with glow effect */}
          <div className="flex items-center mb-8">
            <div className="bg-[#FDB827] rounded-full h-16 w-16 flex items-center justify-center shadow-lg shadow-[#FDB827]/40">
              <span className="text-white font-bold text-3xl">🚀</span>
            </div>
            <span className="ml-3 text-white font-bold text-4xl tracking-wider">ORBITRA</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Our Cosmic Journey
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl font-light">
            Pioneering the future of space exploration since 2018
          </p>
        </div>

        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#F8F9FA">
            <path d="M0,0 C240,95 480,95 720,48 C960,0 1200,0 1440,48 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </div>

      {/* Mission Statement Section with improved styling */}
      <div className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 relative">
              Our Mission
              <div className="h-2 w-24 bg-[#FDB827] rounded-full absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
            </h2>
          </div>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 mt-8 leading-relaxed">
            At ExploreMe, we believe that space exploration is humanity's
            greatest adventure. We're dedicated to making the cosmos accessible,
            understandable, and exciting for everyone.
          </p>
        </div>

        {/* Values Cards with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="h-3 bg-gradient-to-r from-[#21209C] to-[#191583]"></div>
            <div className="p-8">
              <div className="bg-[#FDB827] rounded-full h-14 w-14 flex items-center justify-center mb-6 shadow-md shadow-[#FDB827]/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Innovation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We push boundaries by developing cutting-edge technologies that
                transform our understanding of the universe.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="h-3 bg-gradient-to-r from-[#21209C] to-[#191583]"></div>
            <div className="p-8">
              <div className="bg-[#FDB827] rounded-full h-14 w-14 flex items-center justify-center mb-6 shadow-md shadow-[#FDB827]/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Discovery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We are explorers at heart, committed to uncovering the mysteries
                of space and sharing them with the world.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="h-3 bg-gradient-to-r from-[#21209C] to-[#191583]"></div>
            <div className="p-8">
              <div className="bg-[#FDB827] rounded-full h-14 w-14 flex items-center justify-center mb-6 shadow-md shadow-[#FDB827]/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Collaboration
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We believe that space belongs to everyone, and we work with
                partners worldwide to advance our cosmic understanding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section with improved design */}
      <div className="bg-gradient-to-r from-[#21209C] to-[#191583] py-20 px-4 relative">
        {/* Space-themed decorative elements */}
        <div className="absolute top-0 left-0 w-full h-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBDMzAwIDgwIDYwMCAyMCA5MDAgMjBjMzAwIDAgNjAwIDgwIDkwMCAxMDB2MTAwSDBWMjB6IiBmaWxsPSIjRjhGOUZBIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=')]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-white">Our Story</h2>
              <p className="text-white text-lg mb-6 leading-relaxed">
                Founded in 2018 by a team of astronauts, astrophysicists, and
                space enthusiasts, ExploreMe was born from a simple idea: space
                exploration should inspire everyone.
              </p>
              <p className="text-white text-lg mb-6 leading-relaxed">
                What started as a small educational platform has grown into a
                comprehensive space exploration company. Today, we combine
                research, education, and adventure to create meaningful
                connections between Earth and the cosmos.
              </p>
              <p className="text-white text-lg leading-relaxed">
                As we continue to grow, our mission remains unchanged: to make
                space accessible to all and inspire the next generation of
                cosmic explorers.
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500">
              <div className="absolute inset-0 border-4 border-[#FDB827] rounded-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=600"
                alt="Team of space enthusiasts"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#21209C]/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section with improved styling */}
      <div className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 relative">
              Our Achievements
              <div className="h-2 w-32 bg-[#FDB827] rounded-full absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
            </h2>
          </div>
        </div>

        <div className="space-y-12">
          {/* Achievement 1 */}
          <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="bg-gradient-to-r from-[#FDB827] to-[#FDB827]/80 rounded-full h-20 w-20 flex items-center justify-center flex-shrink-0 mb-6 md:mb-0 md:mr-8 shadow-md">
              <span className="text-white font-bold text-2xl">01</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                First Private Lunar Analysis
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                In 2020, our research team conducted the first privately funded
                comprehensive analysis of lunar soil samples, revealing new
                insights about the Moon's formation.
              </p>
            </div>
          </div>

          {/* Achievement 2 */}
<div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
  <div className="bg-gradient-to-r from-[#FDB827] to-[#FDB827]/80 rounded-full h-20 w-20 flex items-center justify-center flex-shrink-0 mb-6 md:mb-0 md:mr-8 shadow-md">
    <span className="text-white font-bold text-2xl">02</span>
  </div>
  <div>
    <h3 className="text-2xl font-bold mb-3 text-gray-800">
      Virtual Space Academy
    </h3>
    <p className="text-gray-600 text-lg leading-relaxed">
      Our educational platform has reached over 1 million students
      worldwide, offering interactive courses on astronomy,
      astrophysics, and space technology.
    </p>
  </div>
</div>

{/* Achievement 3 */}
<div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
  <div className="bg-gradient-to-r from-[#FDB827] to-[#FDB827]/80 rounded-full h-20 w-20 flex items-center justify-center flex-shrink-0 mb-6 md:mb-0 md:mr-8 shadow-md">
    <span className="text-white font-bold text-2xl">03</span>
  </div>
  <div>
    <h3 className="text-2xl font-bold mb-3 text-gray-800">
      Interplanetary Research Initiative
    </h3>
    <p className="text-gray-600 text-lg leading-relaxed">
      Pioneering collaborative research projects with leading space agencies, 
      resulting in 15 published papers and 3 patents for innovative space exploration technologies.
    </p>
  </div>
</div>

{/* Achievement 4 */}
<div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
  <div className="bg-gradient-to-r from-[#FDB827] to-[#FDB827]/80 rounded-full h-20 w-20 flex items-center justify-center flex-shrink-0 mb-6 md:mb-0 md:mr-8 shadow-md">
    <span className="text-white font-bold text-2xl">04</span>
  </div>
  <div>
    <h3 className="text-2xl font-bold mb-3 text-gray-800">
      Sustainable Space Solutions
    </h3>
    <p className="text-gray-600 text-lg leading-relaxed">
      Developed eco-friendly propulsion systems and orbital debris management solutions,
      reducing the environmental impact of space missions by 40%.
    </p>
  </div>
</div>

{/* Achievement 5 */}
<div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
  <div className="bg-gradient-to-r from-[#FDB827] to-[#FDB827]/80 rounded-full h-20 w-20 flex items-center justify-center flex-shrink-0 mb-6 md:mb-0 md:mr-8 shadow-md">
    <span className="text-white font-bold text-2xl">05</span>
  </div>
  <div>
    <h3 className="text-2xl font-bold mb-3 text-gray-800">
      Global Space Collaboration Network
    </h3>
    <p className="text-gray-600 text-lg leading-relaxed">
      Created a network connecting 50+ countries and 200+ organizations,
      fostering international cooperation in space exploration and research.
    </p>
  </div>
</div>
</div></div></div>

);
};

export default About;