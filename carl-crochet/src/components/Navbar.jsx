import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { getCartCount } = useContext(ShopContext);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const navLinkStyle =
    "relative flex flex-col items-center gap-1 text-gray-700 hover:text-pink-500 transition duration-300";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-pink-50 via-white to-pink-50 shadow-md z-[60]">
      <div className="flex items-center justify-between py-5 px-6 font-medium">
        {/* Logo */}
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
              </NavLink>
            );
          })}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-6">
          {/* Profile Dropdown */}
          <div className="group relative">
            <img
              src="frontend_assets/profile_icon.png"
              className="w-6 cursor-pointer hover:scale-110 transition"
              alt="profile icon"
            />
            <div className="group-hover:block hidden absolute right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-40 px-3 py-5 bg-white shadow-lg border rounded-xl text-gray-600">
                {user ? (
                  <>
                    <Link to="/profile" className="hover:text-pink-500">My Profile</Link>
                    <Link to="/orders" className="hover:text-pink-500">Orders</Link>
                    <button onClick={handleLogout} className="text-left hover:text-pink-500">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="hover:text-pink-500">Login</Link>
                    <Link to="/signup" className="hover:text-pink-500">Sign Up</Link>
                    <Link to="/orders" className="hover:text-pink-500">Orders</Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src="frontend_assets/cart_icon.png"
              className="w-6 min-w-6 hover:scale-110 transition"
              alt="cart icon"
            />
            <p className="absolute right-[-5px] bottom-[5px] w-4 text-center leading-4 bg-pink-600 text-white aspect-square rounded-full text-[10px]">
              {getCartCount()}
            </p>
          </Link>

          {/* Admin */}
          <Link to="/admin" className="relative">
            <img
              src="frontend_assets/bin_icon.png"
              className="w-6 hover:scale-110 transition"
              alt="admin dashboard icon"
            />
          </Link>

          {/* Mobile Menu Button */}
          <img
            onClick={() => setVisible(!visible)}
            src="frontend_assets/menu_icon.png"
            alt="menu-icon"
            className="w-6 cursor-pointer sm:hidden"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {visible && (
        <div className="absolute top-full right-0 w-full bg-white shadow-md sm:hidden z-[50] animate-slideIn">
          <div className="flex flex-col text-gray-700">
            {["/", "/collection", "/about", "/contact"].map((path, i) => {
              const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setVisible(false)}
                  className="py-4 pl-10 hover:bg-pink-50 hover:text-pink-500 border-b transition"
                >
                  {labels[i]}
                </NavLink>
              );
            })}

            <div className="flex flex-col gap-2 mt-4 pl-10 pb-4">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setVisible(false)} className="hover:text-pink-500">
                    My Profile
                  </Link>
                  <Link to="/orders" onClick={() => setVisible(false)} className="hover:text-pink-500">
                    Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setVisible(false);
                    }}
                    className="text-left hover:text-pink-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setVisible(false)} className="hover:text-pink-500">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setVisible(false)} className="hover:text-pink-500">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
