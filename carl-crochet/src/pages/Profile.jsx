import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Navigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, logoutUser, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/api/orders?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <p><span className="font-medium">Name:</span> {user.name}</p>
      <p><span className="font-medium">Email:</span> {user.email}</p>

      {/* Orders Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">My Orders</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet. Place your first order!</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded-md shadow-sm">
                <p>
                  <span className="font-medium">Order ID:</span> {order._id}
                </p>
                <p>Status: {order.status}</p>
                <p>
                  Total: {currency}
                  {order.total}
                </p>
                <Link
                  to={`/track-order/${order._id}`}
                  className="text-pink-600 hover:underline"
                >
                  Track Order →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={logoutUser}
        className="mt-6 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
