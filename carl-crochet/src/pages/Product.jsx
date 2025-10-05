import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaShoppingCart } from "react-icons/fa";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      const imagesArray = Array.isArray(product.image)
        ? product.image
        : [product.image];
      setProductData({ ...product, image: imagesArray });
      setImage(imagesArray[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-10 pb-20 transition-opacity ease-in duration-500 opacity-100 bg-gray-50">
      <div className="max-w-7xl mx-auto flex gap-10 flex-col sm:flex-row bg-white p-6 rounded-2xl shadow-md">
        {/* Left Side - Images */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-2 sm:w-[20%] w-full justify-center">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={`frontend_assets/${item}`}
                key={index}
                alt="product-thumbnail"
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  item === image ? "border-pink-500" : "border-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              className="w-full max-h-[450px] object-contain rounded-lg"
              src={image ? `frontend_assets/${image}` : ""}
              alt="product-main"
            />
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="font-semibold text-3xl text-gray-800">{productData.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  className="w-4"
                  src={`frontend_assets/star_icon.png`}
                  alt="star"
                />
              ))}
              <img
                className="w-4"
                src={`frontend_assets/star_dull_icon.png`}
                alt="star"
              />
              <p className="pl-2 text-sm text-gray-600">(122 reviews)</p>
            </div>

            {/* Price */}
            <p className="mt-5 text-3xl font-medium text-pink-600">
              {currency}
              {productData.price}
            </p>

            {/* Stock & Delivery Info */}
            <div className="mt-3 text-sm text-gray-700">
              <p>
                <span
                  className={`font-semibold ${
                    productData.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {productData.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p className="text-gray-500 mt-1">
                Delivery Days: Tuesday & Saturday
              </p>
            </div>

            {/* Size Selection */}
            <div className="mt-8">
              <p className="font-medium text-gray-700 mb-2">Select Size:</p>
              <div className="flex gap-2 flex-wrap">
                {(productData.sizes || []).map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    key={index}
                    className={`border py-2 px-4 rounded-md cursor-pointer text-sm ${
                      item === size
                        ? "border-pink-600 bg-pink-100 text-pink-600"
                        : "border-gray-300 hover:border-pink-400"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                if (!size) {
                  alert("Please select a size before adding to cart");
                  return;
                }
                if (productData.inStock === false) {
                  alert("Sorry, this product is out of stock");
                  return;
                }
                addToCart(productData._id, size);
              }}
              className={`mt-8 px-8 py-3 flex items-center justify-center gap-2 rounded-lg text-white text-sm font-medium shadow-md transition ${
                productData.inStock
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={productData.inStock === false}
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <hr className="mt-8" />
            <div className="text-sm text-gray-500 mt-4 space-y-1">
              <p>✅ 100% Original Product</p>
              <p>💵 Cash on delivery available</p>
              <p>🔁 Easy return & exchange within 7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-20 max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <div className="flex border-b">
          <button
            className={`px-5 py-3 text-sm font-medium ${
              activeTab === "description"
                ? "border-b-2 border-pink-600 text-pink-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-5 py-3 text-sm font-medium ${
              activeTab === "reviews"
                ? "border-b-2 border-pink-600 text-pink-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (10)
          </button>
        </div>

        <div className="flex flex-col gap-4 border-t p-6 text-sm text-gray-600">
          {activeTab === "description" ? (
            <p>{productData.description}</p>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="font-medium">Jonny C.</p>
                <p>Great product! Exactly as described.</p>
              </div>
              <div>
                <p className="font-medium">Shar K.</p>
                <p>Good value for money, shipping was fast.</p>
              </div>
              <div>
                <textarea
                  placeholder="Write your review..."
                  className="w-full border p-2 rounded"
                ></textarea>
                <button className="mt-2 bg-pink-600 text-white px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto mt-10">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
