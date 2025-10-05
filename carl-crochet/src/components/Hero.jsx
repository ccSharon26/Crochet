import { useState } from "react";

const Hero = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState("Men");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryChange(category.toLowerCase());
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center text-white"
      style={{
        backgroundImage: "url('/frontend_assets/background.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Handmade <span className="text-pink-400">Latest Arrivals</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10">
          Explore unique crochet designs crafted with love ❤️
        </p>

        {/* Category Tabs */}
        <div className="flex justify-center gap-6 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 w-fit mx-auto">
          {["Men", "Women"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-white text-pink-600"
                  : "text-white hover:bg-white/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-200 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
