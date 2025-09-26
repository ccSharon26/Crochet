import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  const navLinkStyle =
    "relative flex flex-col items-center gap-1 text-gray-700 hover:text-pink-500 transition duration-300";

  return (
    <div className="flex items-center justify-between py-5 px-6 font-medium bg-gradient-to-r from-pink-50 via-white to-pink-50 shadow-sm">
      <Link to="/">
        <h1 className="font-bold text-2xl text-pink-600">CarlCrochet</h1>
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden sm:flex gap-8 text-sm">
        {["/", "/collection", "/about", "/contact"].map((path, i) => {
          const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
          return (
            <NavLink key={path} to={path} className={navLinkStyle}>
              <p>{labels[i]}</p>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          );
        })}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Profile Dropdown */}
        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-6 cursor-pointer hover:scale-110 transition"
            alt="profile icon"
          />

          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-40 px-3 py-5 bg-white shadow-lg border rounded-xl text-gray-600">
              <Link
                to="/profile"
                className="cursor-pointer hover:text-pink-500"
              >
                My Profile
              </Link>
              <Link
                to="/orders"
                className="cursor-pointer hover:text-pink-500"
              >
                Orders
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login"; 
                }}
                className="text-left hover:text-pink-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-6 min-w-6 hover:scale-110 transition"
            alt="cart icon"
          />
          <p className="absolute right-[-5px] bottom-[5px] w-4 text-center leading-4 bg-pink-600 text-white aspect-square rounded-full text-[10px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Button */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu-icon"
          className="w-6 cursor-pointer sm:hidden"
        />
      </div>

      {/* Small Screen Menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white shadow-lg transition-all ${
          visible ? "w-3/4" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center cursor-pointer gap-4 p-4 border-b"
          >
            <img
              src={assets.dropdown_icon}
              alt="close-menu-icon"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>
          {["/", "/collection", "/about", "/contact"].map((path, i) => {
            const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
            return (
              <NavLink
                key={path}
                onClick={() => setVisible(false)}
                className="py-4 pl-10 hover:bg-pink-50 hover:text-pink-500 transition border-b"
                to={path}
              >
                {labels[i]}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
