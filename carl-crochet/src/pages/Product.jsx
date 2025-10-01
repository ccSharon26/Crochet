import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
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
      const imagesArray = Array.isArray(product.image) ? product.image : [product.image];
      setProductData({ ...product, image: imagesArray });
      setImage(imagesArray[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Image Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full no-scrollbar">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={`frontend_assets/${item}`}
                key={index}
                alt="product-image"
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={image ? `${import.meta.env.BASE_URL}frontend_assets/${image}` : ""}
              alt="image"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <h1 className="font-medium mt-2 text-2xl">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} className="w-3.5" src={`frontend_assets/star_icon.png`} alt="star" />
            ))}
            <img className="w-3.5" src={`frontend_assets/star_dull_icon.png`} alt="star" />
            <p className="pl-2">{122}</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          {/* Stock Status */}
          <p className="mt-2 text-sm font-medium">
            {productData.inStock ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>

          {/* Delivery Info */}
          <p className="mt-2 text-sm font-medium text-gray-600">
            Delivery Days: Tuesday & Saturday
          </p>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {(productData.sizes || []).map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 cursor-pointer ${
                    item === size ? "border-orange-500 bg-gray-400" : "bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
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
            className={`px-8 py-3 text-sm ${
              productData.inStock === false
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-black text-white"
            }`}
            disabled={productData.inStock === false}
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

      {/* Tabs */}
      <div className="mt-20">
        <div className="flex border-b">
          <button
            className={`px-5 py-3 text-sm ${
              activeTab === "description" ? "border-b-2 border-black font-bold" : ""
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
            Reviews ({10})
          </button>
        </div>

        <div className="flex flex-col gap-4 border p-6 text-sm text-gray-600">
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
                <button className="mt-2 bg-black text-white px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
