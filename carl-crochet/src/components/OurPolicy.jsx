import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-6 text-center py-20 text-xs sm:text-sm md:text-base bg-pink-50 rounded-lg shadow-inner">
      
      {/* Exchange Policy */}
      <div className="transition transform hover:scale-105 hover:bg-white p-6 rounded-lg shadow-sm">
        <img src={assets.exchange_icon} className="w-14 m-auto mb-4" alt="exchange policy" />
        <p className="font-bold text-pink-600">Easy Exchange Policy</p>
        <p className="text-gray-500 mt-1">Hassle-free and quick exchanges.</p>
      </div>

      {/* Return Policy */}
      <div className="transition transform hover:scale-105 hover:bg-white p-6 rounded-lg shadow-sm">
        <img src={assets.quality_icon} className="w-14 m-auto mb-4" alt="return policy" />
        <p className="font-bold text-pink-600">7 Days Return Policy</p>
        <p className="text-gray-500 mt-1">Enjoy a no-questions-asked return.</p>
      </div>

      {/* Customer Support */}
      <div className="transition transform hover:scale-105 hover:bg-white p-6 rounded-lg shadow-sm">
        <img src={assets.support_img} className="w-14 m-auto mb-4" alt="customer support" />
        <p className="font-bold text-pink-600">Best Customer Support</p>
        <p className="text-gray-500 mt-1">We’re here for you 24/7 anytime.</p>
      </div>
    </div>
  );
};

export default OurPolicy;
