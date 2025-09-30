import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const filtered = products.filter(item => item.bestseller).slice(0, 4);
    setBestSellers(filtered);
  }, [products]);

  return (
    <div className="my-10">
      <Title text1="BEST" text2="SELLERS" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
        {bestSellers.length > 0 ? (
          bestSellers.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No best sellers available</p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
