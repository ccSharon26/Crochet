import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import TrackOrder from "./pages/TrackOrder";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="w-full min-h-screen flex flex-col bg-gray-50">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-pink-100 shadow-sm">
          <Navbar />
        </div>

        <div className="pt-[74px] flex-grow">
          <SearchBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/track-order/:id" element={<TrackOrder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
