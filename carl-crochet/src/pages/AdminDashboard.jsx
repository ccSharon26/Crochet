import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch products & orders
  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, orderRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/products", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:5000/api/orders", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setProducts(prodRes.data);
      setOrders(orderRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch admin data error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add a new product
  const handleAddProduct = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/products",
        newProduct,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts([res.data, ...products]);
      setNewProduct({ name: "", price: "", image: "" });
    } catch (err) {
      console.error("Add product error:", err);
      alert("Failed to add product");
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? res.data : order))
      );
    } catch (err) {
      console.error("Update order status error:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading && <p>Loading...</p>}

      {/* Add Product */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Add Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="border p-1 mr-2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-pink-500 text-white py-1 px-3 rounded hover:bg-pink-600"
        >
          Add
        </button>
      </div>

      {/* Products List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        {products.map((p) => (
          <div key={p._id} className="flex items-center gap-4 border-b py-2">
            <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
            <div>
              <p>{p.name}</p>
              <p>Ksh. {p.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Orders List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        {orders.map((o) => (
          <div key={o._id} className="border-b py-2 flex justify-between items-center">
            <div>
              <p><strong>{o.customer?.name}</strong> ({o.customer?.email})</p>
              <p>Status: {o.status}</p>
              <p>Total: Ksh. {o.total}</p>
            </div>
            <select
              value={o.status}
              onChange={(e) => updateOrderStatus(o._id, e.target.value)}
              className="border p-1 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
