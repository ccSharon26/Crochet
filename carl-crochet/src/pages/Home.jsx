import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";


const Home = () => {
  const { products } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item) =>
          item.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('frontend_assets/background.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/20 -z-10"></div>

      {/* --- Intro Section --- */}
      <div className="flex flex-col items-center justify-center text-center text-white pt-28 pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-md">
          Handmade <span className="text-pink-400">Latest Arrivals</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow-sm">
          Explore unique crochet designs crafted with love ❤️
        </p>

        {/* Category Tabs */}
        <div className="mt-10 flex gap-4 bg-white/25 backdrop-blur-md rounded-full px-4 py-2">
          {["all", "men", "women"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-white text-pink-600 shadow-md"
                  : "text-white hover:bg-white/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* --- Featured Products Section --- */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-[90%] md:w-4/5 mx-auto p-8 md:p-12 mb-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Featured Products
          </h2>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={`frontend_assets/${item.image}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
