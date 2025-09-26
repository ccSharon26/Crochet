import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-16 bg-gradient-to-b from-pink-50 via-white to-pink-50 rounded-2xl shadow-sm py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-sm sm:text-base text-gray-600 mt-3">
          Discover our newest handmade crochet pieces — soft, stylish, and made
          with love for every occasion.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 sm:px-8">
        {latestProducts.map((item, index) => (
          <div
            key={index}
            className="transform transition duration-300 hover:scale-105 hover:shadow-lg rounded-xl bg-white p-2"
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
