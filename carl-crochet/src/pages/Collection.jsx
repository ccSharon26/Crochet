import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Collection = () => {
  const { products, currency } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("relevant");

  useEffect(() => {
    handleSearchAndSort();
  }, [products, search, sort]);

  const handleSearchAndSort = () => {
    let filtered = products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-semibold text-gray-800">Our Collection</h2>

          <div className="flex items-center gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
            />

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                {/* Image Section */}
                <Link
                  to={`/product/${item._id}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <div className="relative w-full h-60 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={`frontend_assets/${
                        Array.isArray(item.image) ? item.image[0] : item.image
                      }`}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4 flex flex-col justify-between h-[160px]">
                  <div>
                    <h3 className="text-gray-800 font-medium text-base truncate">
                      {item.name}
                    </h3>
                    <p className="text-pink-600 font-semibold mt-1">
                      {currency}
                      {item.price}
                    </p>
                  </div>

                  {/* Shop Now Button */}
                  <Link
                    to={`/product/${item._id}`}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="mt-3 w-full text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition text-sm font-medium"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20 text-sm">
            No products found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Collection;
