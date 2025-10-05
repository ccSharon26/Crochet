import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../api.js";

const ADMIN_PASSCODE = "carl12345";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "Women",
    subCategory: "Topwear",
    bestseller: false,
    sizes: [],
    inStock: true,
  });

  const [productEdits, setProductEdits] = useState({});
  const [orderEdits, setOrderEdits] = useState({});

  const token = localStorage.getItem("token");

  // Fetch products & orders
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const [prodRes, orderRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/products`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_BASE_URL}/api/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setProducts(prodRes.data);
      setOrders(orderRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load products/orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (unlocked) fetchData();
  }, [unlocked]);

  // ===== Product Actions =====
  const handleAddProduct = async () => {
    try {
      const payload = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        sizes: newProduct.sizes.map((s) => s.trim()),
        bestseller: Boolean(newProduct.bestseller),
        inStock: Boolean(newProduct.inStock),
        image: newProduct.image.trim(),
      };
      const res = await axios.post(
        `${API_BASE_URL}/api/admin/products`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts([res.data, ...products]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "Women",
        subCategory: "Topwear",
        sizes: [],
        inStock: true,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to add product. Please try again.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete product. Please try again.");
    }
  };

  const handleProductEditChange = (id, field, value) => {
    setProductEdits({
      ...productEdits,
      [id]: { ...productEdits[id], [field]: value },
    });
  };

  const handleSaveProductEdits = async (id) => {
    try {
      const updates = productEdits[id];
      if (!updates) return;

      const payload = {
        ...updates,
        sizes: updates.sizes ? updates.sizes.map((s) => s.trim()) : undefined,
        inStock: updates.inStock !== undefined ? updates.inStock : undefined,
      };

      const res = await axios.put(
        `${API_BASE_URL}/api/admin/products/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts(products.map((p) => (p._id === id ? res.data : p)));
      setProductEdits({ ...productEdits, [id]: {} });
    } catch (err) {
      console.error(err);
      setError("Failed to update product. Please try again.");
    }
  };

  // ===== Order Actions =====
  const handleOrderEdit = (orderId, field, value) => {
    setOrderEdits({
      ...orderEdits,
      [orderId]: { ...orderEdits[orderId], [field]: value },
    });
  };

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      const edits = orderEdits[orderId] || {};
      const payload = { status, ...edits };

      const res = await axios.put(
        `${API_BASE_URL}/api/admin/orders/${orderId}/status`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders((prev) => prev.map((o) => (o._id === orderId ? res.data : o)));
      setOrderEdits({ ...orderEdits, [orderId]: {} });
    } catch (err) {
      console.error("Order update failed:", err.response?.data || err.message);
      setError("Failed to update order status. Please try again.");
    }
  };

  if (!unlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-pink-600">Enter Admin Passcode</h1>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Enter passcode"
          className="border rounded-md p-2 mb-4 focus:outline-pink-500 focus:ring-1 focus:ring-pink-500"
        />
        <button
          className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
          onClick={() => {
            if (passcode === ADMIN_PASSCODE) setUnlocked(true);
            else alert("Wrong passcode");
          }}
        >
          Unlock
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Admin Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Add Product */}
      <div className="mb-8 border p-4 rounded-xl shadow-sm bg-white">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-pink-200">Add Product</h2>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border rounded-md p-2 flex-1 min-w-[120px]"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border rounded-md p-2 min-w-[80px]"
          />
          <input
            type="text"
            placeholder="Image Filename"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="border rounded-md p-2 flex-1 min-w-[150px]"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="border rounded-md p-2 flex-1 min-w-[200px]"
          />
          <input
            type="text"
            placeholder="Sizes (S,M,L)"
            value={newProduct.sizes.join(",")}
            onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value.split(",") })}
            className="border rounded-md p-2 min-w-[120px]"
          />
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="border rounded-md p-2"
          >
            <option value="Women">Women</option>
            <option value="Men">Men</option>
          </select>
          <select
            value={newProduct.subCategory}
            onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
            className="border rounded-md p-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
          </select>
          <label className="flex items-center gap-1 ml-2">
            <input
              type="checkbox"
              checked={newProduct.inStock}
              onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
              className="rounded"
            />{" "}
            In Stock
          </label>
          <button
            onClick={handleAddProduct}
            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-pink-200">Products</h2>
        {products.map((p) => {
          const edits = productEdits[p._id] || {};
          return (
            <div key={p._id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white shadow-sm rounded-xl p-4 mb-4 hover:bg-pink-50 transition-colors">
              <div className="flex items-center gap-4">
                <img
                  src={`frontend_assets/${p.image}`}
                  alt={p.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border"
                />
                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  <p className="font-medium text-gray-800">{p.name}</p>
                  <p>Ksh. {p.price}</p>
                  <p>{p.description}</p>
                  <p>
                    Sizes:{" "}
                    <input
                      type="text"
                      defaultValue={p.sizes.join(", ")}
                      onChange={(e) =>
                        handleProductEditChange(p._id, "sizes", e.target.value.split(","))
                      }
                      className="border rounded-md p-1 text-sm"
                    />
                  </p>
                  <p>
                    In Stock:{" "}
                    <input
                      type="checkbox"
                      checked={edits.inStock ?? p.inStock}
                      onChange={(e) => handleProductEditChange(p._id, "inStock", e.target.checked)}
                    />
                  </p>
                  <button
                    onClick={() => handleSaveProductEdits(p._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md mt-1 hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => handleDeleteProduct(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-pink-200">Orders</h2>
        {orders.map((o) => {
          const edits = orderEdits[o._id] || {};
          const isToBeShipped = (edits.status || o.status) === "To Be Shipped";
          const isDelivered = (edits.status || o.status) === "Delivered";

          return (
            <div
              key={o._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 bg-white shadow-sm rounded-xl p-4 mb-4 hover:bg-pink-50 transition-colors"
            >
              <div className="flex flex-col gap-1 text-sm text-gray-600">
                <p>
                  <strong>{o.customer?.name}</strong> ({o.customer?.email})
                </p>
                <p>Total: Ksh. {o.total}</p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-bold px-2 py-1 rounded-full text-white ${
                      edits.status === "Pending" || (!edits.status && o.status === "Pending")
                        ? "bg-orange-500"
                        : edits.status === "To Be Shipped" || (!edits.status && o.status === "To Be Shipped")
                        ? "bg-blue-500"
                        : edits.status === "Delivered" || (!edits.status && o.status === "Delivered")
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  >
                    {edits.status || o.status}
                  </span>
                </p>
                {(isToBeShipped || isDelivered) && (
                  <p>
                    To be shipped on: <strong>{edits.shippingDay || o.shippingDay}</strong>,{" "}
                    {new Date(edits.shippingDate || o.shippingDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center mt-2 md:mt-0">
                {/* Status selector */}
                <select
                  value={edits.status || o.status}
                  onChange={(e) => handleOrderEdit(o._id, "status", e.target.value)}
                  className="border rounded-md p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="To Be Shipped">To Be Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {/* Shipping day/date */}
                {isToBeShipped && (
                  <div className="flex gap-2 items-center mt-1 md:mt-0">
                    <select
                      value={edits.shippingDay || o.shippingDay || ""}
                      onChange={(e) => handleOrderEdit(o._id, "shippingDay", e.target.value)}
                      className="border rounded-md p-1"
                    >
                      <option value="">Select Day</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                    <input
                      type="date"
                      value={(edits.shippingDate || o.shippingDate)?.split("T")[0] || ""}
                      onChange={(e) => handleOrderEdit(o._id, "shippingDate", e.target.value)}
                      className="border rounded-md p-1"
                    />
                  </div>
                )}

                {/* Save button */}
                <button
                  onClick={() => handleOrderStatusChange(o._id, edits)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors mt-1 md:mt-0"
                >
                  Save
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
