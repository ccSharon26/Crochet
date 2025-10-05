import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link
      to={`/product/${id}`}
      className="text-gray-700 cursor-pointer"
      onClick={handleClick}
    >
      <div className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition">
        <img
          className="hover:scale-110 transition ease-in-out w-full h-60 object-cover"
          src={image}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-medium truncate">{name}</p>
      <p className="text-sm font-semibold">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
