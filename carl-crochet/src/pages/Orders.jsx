import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const Orders = () => {
  const { orders, currency, products } = useContext(ShopContext);

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
            
              {Object.keys(order.items).length > 0 && (
                <img
                  className="w-16 sm:w-20"
                  src={
                    products.find(
                      (p) => p._id === Object.keys(order.items)[0]
                    )?.image[0]
                  }
                  alt="order item"
                />
              )}
              <div>
                <p className="text-base font-medium">
                  {order.customer.name} ({order.customer.phone})
                </p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {order.total}
                  </p>
                  <p>Payment: {order.payment}</p>
                </div>
                <p className="mt-2">
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
                <p className="mt-1">
                  Date:{" "}
                  <span className="text-gray-500 font-medium">
                    {order.date}
                  </span>
                </p>
              </div>
            </div>

            {/* Track Button */}
            <div className="flex justify-end">
              <Link to={`/track-order/${order._id}`}>
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
