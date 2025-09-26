import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 px-6 md:px-16 text-sm">
        
        {/* Brand Info */}
        <div>
          <Link to="/">
            <h1 className="w-36 mb-5 font-bold text-2xl text-pink-600">
              CarlCrochet
            </h1>
          </Link>
          <p className="w-full md:w-2/3 text-gray-600">
            Handmade crochet fashion made with love 💕. Explore our latest
            collections and shop unique pieces that inspire confidence and style.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li><Link to="/" className="hover:text-pink-600">Home</Link></li>
            <li><Link to="/about" className="hover:text-pink-600">About Us</Link></li>
            <li><Link to="/collection" className="hover:text-pink-600">Collection</Link></li>
            <li><Link to="/privacy" className="hover:text-pink-600">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>📞 +254 712 345 678</li>
            <li>📧 carlcrochet@gmail.com</li>
            <li>
              📸 <a href="https://instagram.com/carlcrochet" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">@carlcrochet</a>
            </li>
            <li>
              📘 <a href="https://facebook.com/carlcrochet" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">Carl Crochet</a>
            </li>
            <li>
              🐦 <a href="https://twitter.com/carlcrochet" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">@carlcrochet</a>
            </li>
            <li>
              🎵 <a href="https://tiktok.com/@carlcrochet" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">@carlcrochet</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} carlcrochet.com - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
