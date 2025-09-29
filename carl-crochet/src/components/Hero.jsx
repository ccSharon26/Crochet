
const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-pink-50 rounded-lg shadow-md overflow-hidden">
      {/* Left side - Image */}
      <div className="w-full sm:w-1/2">
        <img
          src="/frontend_assets/hero_img.png" 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          alt="Carl Crochet Hero"
        />
      </div>

      {/* Right Side - Text */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-12 px-6 sm:px-10">
        <div className="text-[#414141] text-center sm:text-left">
          {/* Tagline */}
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
            <p className="w-10 h-[2px] bg-pink-600"></p>
            <p className="font-medium text-sm md:text-base text-pink-600 tracking-wide">
              ✨ OUR BESTSELLERS
            </p>
          </div>

          {/* Title */}
          <h1 className="prata-regular text-3xl lg:text-5xl leading-snug text-gray-800">
            Handmade <span className="text-pink-600">Latest Arrivals</span>
          </h1>
          <p className="mt-4 text-gray-500 text-sm md:text-base">
            Explore unique crochet designs crafted with love ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
