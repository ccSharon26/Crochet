import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description"); // NEW

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full no-scrollbar">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt="product-image"
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="image" />
          </div>
        </div>

        {/* info */}
        <div className="flex-1">
          <h1 className="font-medium mt-2 text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_dull_icon} alt="" />
            <p className="pl-2">{122}</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500 bg-gray-400" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* description / reviews tabs */}
      <div className="mt-20">
        <div className="flex border-b">
          <button
            className={`px-5 py-3 text-sm ${
              activeTab === "description"
                ? "border-b-2 border-black font-bold"
                : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-5 py-3 text-sm ${
              activeTab === "reviews" ? "border-b-2 border-black font-bold" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({122})
          </button>
        </div>

        <div className="flex flex-col gap-4 border p-6 text-sm text-gray-600">
          {activeTab === "description" ? (
            <p>{productData.description}</p>
          ) : (
            <div className="space-y-4">
              {/* Example static reviews — later can be fetched from backend */}
              <div>
                <p className="font-medium">John D.</p>
                <p>Great product! Exactly as described.</p>
              </div>
              <div>
                <p className="font-medium">Mary K.</p>
                <p>Good value for money, shipping was fast.</p>
              </div>
              <div>
                <textarea
                  placeholder="Write your review..."
                  className="w-full border rounded-md p-2"
                ></textarea>
                <button className="mt-2 bg-black text-white px-4 py-2 rounded-sm text-sm">
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
