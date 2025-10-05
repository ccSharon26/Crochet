import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category, subCategory }) => {
  const { products, currency } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {related.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center hover:shadow-lg transition"
          >
            <Link
              to={`/product/${item._id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full"
            >
              <img
                src={`frontend_assets/${item.image}`}
                alt={item.name}
                className="w-full h-56 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="mt-3 text-sm font-semibold text-gray-800">{item.name}</p>
            <p className="text-gray-600 text-sm">{currency}{item.price}</p>

            <Link
              to={`/product/${item._id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-3 w-full text-center bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
