import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800">
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-8 my-10 mt-20 px-6 md:px-16 text-sm">
        
        {/* Brand Info */}
        <div>
          <Link to="/">
            <h1 className="w-36 mb-5 font-bold text-2xl text-pink-600">CarlCrochet</h1>
          </Link>
          <p className="w-full md:w-2/3 text-gray-600">
            Handmade crochet fashion made with love 💕. Explore our latest collections and shop unique pieces that inspire confidence and style.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li><Link to="/" className="hover:text-pink-600 transition-colors duration-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-pink-600 transition-colors duration-300">About Us</Link></li>
            <li><Link to="/collection" className="hover:text-pink-600 transition-colors duration-300">Collection</Link></li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="flex items-center gap-2">
              <img src="frontend_assets/phone.png" alt="Phone" className="w-5 h-5" />
              +254 712 345 678
            </li>
            <li className="flex items-center gap-2">
              <img src="frontend_assets/email.png" alt="Email" className="w-5 h-5" />
              carlcrochet@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <img src="frontend_assets/instagram.png" alt="Instagram" className="w-5 h-5" />
              <a href="https://instagram.com/carlcrochet" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors duration-300">@carlcrochet</a>
            </li>
            <li className="flex items-center gap-2">
              <img src="frontend_assets/facebook.png" alt="Facebook" className="w-5 h-5" />
              <a href="https://facebook.com/carlcrochet" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors duration-300">Carl Crochet</a>
            </li>
            <li className="flex items-center gap-2">
              <img src="frontend_assets/twitter.png" alt="Twitter" className="w-5 h-5" />
              <a href="https://twitter.com/carlcrochet" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors duration-300">@carlcrochet</a>
            </li>
            <li className="flex items-center gap-2">
              <img src="frontend_assets/tiktok.png" alt="TikTok" className="w-5 h-5" />
              <a href="https://tiktok.com/@carlcrochet" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors duration-300">@carlcrochet</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-200">
        <p className="py-5 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} carlcrochet.com - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
