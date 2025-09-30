import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latest, setLatest] = useState([]);

  
  useEffect(() => {
    const latestProducts = products.slice(-8);
    setLatest(latestProducts);
  }, [products]);

  return (
    <div className="my-10">
      <Title text1="LATEST" text2="COLLECTION" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
        {latest.length > 0 ? (
          latest.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No latest products</p>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;

