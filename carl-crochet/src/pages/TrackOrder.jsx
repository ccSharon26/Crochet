import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import API_BASE_URL from "../api.js";

const TrackOrder = () => {
  const { id } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders/${id}`);
        const data = await res.json();
        if (res.ok) {
          setOrder(data);
        } else {
          setOrder(null);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setOrder(null);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Order not found</h2>
        <p className="text-gray-500">Please check your orders again.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Title text1={"TRACK"} text2={"ORDER"} />

      <div className="mt-6 border rounded-md shadow-sm bg-white p-6 space-y-6">
        {/* Order Info */}
        <div>
          <p className="font-semibold text-lg">Order ID: {order.id}</p>
          <p className="text-sm text-gray-600">
            Placed on {new Date(order.date).toLocaleString()}
          </p>
          {order.shippingDay && order.shippingDate && (
            <p className="mt-1 text-sm text-gray-600">
              Scheduled Shipping: {order.shippingDay},{" "}
              {new Date(order.shippingDate).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Customer Info */}
        <div>
          <p className="font-medium">Customer Info</p>
          <p>{order.customer.name}</p>
          <p>{order.customer.phone}</p>
        </div>

        {/* Items */}
        <div>
          <p className="font-medium">Items</p>
          <ul className="space-y-2 mt-2">
            {Object.keys(order.items).map((productId) => {
              const product = products.find((p) => p._id === productId);
              const sizes = order.items[productId];

              return Object.keys(sizes).map((size) => {
                const qty = sizes[size];
                return (
                  <li
                    key={`${productId}-${size}`}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex items-center gap-2">
                      {product?.image && (
                        <img
                          className="w-12 h-12 object-cover rounded"
                          src={`frontend_assets/${product.image}`}
                          alt={product.name}
                        />
                      )}
                      <span>
                        {product?.name || "Unknown Product"} ({size}) × {qty}
                      </span>
                    </div>
                    <span>
                      {currency}
                      {product ? product.price * qty : 0}
                    </span>
                  </li>
                );
              });
            })}
          </ul>
        </div>

        {/* Total */}
        <div className="flex justify-between font-medium">
          <p>Total:</p>
          <p>
            {currency}
            {order.total}
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 mt-4">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
          <p className="text-gray-700">Current Status: {order.status}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
