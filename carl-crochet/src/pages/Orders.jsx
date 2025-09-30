import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import API_BASE_URL from "../api.js";

const Orders = () => {
  const { currency, products } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders`);
        const data = await res.json();

        if (res.ok) {
          setOrders(data);
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No orders yet</h2>
        <p className="text-gray-500">Place your first order to see it here.</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orders.map((order) => (
          <div
            key={order._id}
            className="py-6 border-t border-b text-gray-700 flex flex-col gap-6"
          >
            <div className="flex items-start gap-6 text-sm">
              {/* Show first product in the order */}
              {Object.keys(order.items).length > 0 && (
                <img
                  className="w-16 sm:w-20"
                  src={
                    products.find((p) => p._id === Object.keys(order.items)[0])
                      ?.image
                  }
                  alt="order item"
                />
              )}
              <div>
                <p className="text-base font-medium">
                  {order.customer?.name} ({order.customer?.phone})
                </p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {order.total}
                  </p>
                  <p>Payment: {order.payment}</p>
                </div>
                <p className="mt-2">
                  Date:{" "}
                  <span className="text-gray-500 font-medium">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Pending"
                        ? "text-yellow-600"
                        : order.status === "Processing"
                        ? "text-blue-600"
                        : order.status === "Shipped"
                        ? "text-purple-600"
                        : "text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
            </div>

            {/* Track Button */}
            <div className="flex justify-end">
              <Link to={`/track-order/${order.id}`}>
                <button className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100">
                  Track Order
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
