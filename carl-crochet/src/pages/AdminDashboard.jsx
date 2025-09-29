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
      };
      const res = await axios.post(`${API_BASE_URL}/api/admin/products`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([res.data, ...products]);
      setNewProduct({
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
    } catch (err) {
      console.error(err);
      setError("Failed to add product. Please try again.");
    }
  };

  const handleUpdateProduct = async (id, updatedFields) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/admin/products/${id}`, updatedFields, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      console.error(err);
      setError("Failed to update product. Please try again.");
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

  // Update sizes & stock together
  const handleProductChange = (product, field, value) => {
    if (field === "sizes") {
      const sizes = value.split(",").map((s) => s.trim());
      handleUpdateProduct(product._id, { sizes });
    }
    if (field === "inStock") {
      handleUpdateProduct(product._id, { inStock: value });
    }
  };

  // ===== Order Actions =====
  const handleOrderStatusChange = async (orderId, status) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/admin/orders/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) => prev.map((o) => (o._id === orderId ? res.data : o)));
    } catch (err) {
      console.error(err);
      setError("Failed to update order status. Please try again.");
    }
  };

  if (!unlocked) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Enter Admin Passcode</h1>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Enter passcode"
          className="border p-2 mr-2"
        />
        <button
          className="bg-pink-500 text-white py-1 px-3 rounded"
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

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
          placeholder="Image"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Sizes (S,M,L)"
          value={newProduct.sizes.join(",")}
          onChange={(e) =>
            setNewProduct({ ...newProduct, sizes: e.target.value.split(",") })
          }
          className="border p-1 mr-2"
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="border p-1 mr-2"
        >
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Kids">Kids</option>
        </select>
        <select
          value={newProduct.subCategory}
          onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
          className="border p-1 mr-2"
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Accessories">Accessories</option>
        </select>
        <label className="mr-2">
          <input
            type="checkbox"
            checked={newProduct.bestseller}
            onChange={(e) => setNewProduct({ ...newProduct, bestseller: e.target.checked })}
          />{" "}
          Bestseller
        </label>
        <label className="ml-4">
          <input
            type="checkbox"
            checked={newProduct.inStock}
            onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
          />{" "}
          In Stock
        </label>
        <button
          onClick={handleAddProduct}
          className="bg-pink-500 text-white py-1 px-3 rounded hover:bg-pink-600 ml-2"
        >
          Add
        </button>
      </div>

      {/* Products List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        {products.map((p) => (
          <div key={p._id} className="flex items-center gap-4 border-b py-2 justify-between">
            <div className="flex items-center gap-4">
              <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
              <div>
                <p>{p.name}</p>
                <p>Ksh. {p.price}</p>
                <p>{p.description}</p>
                <p>
                  Sizes:{" "}
                  <input
                    type="text"
                    defaultValue={p.sizes.join(", ")}
                    onBlur={(e) => handleProductChange(p, "sizes", e.target.value)}
                    className="border p-1 text-sm"
                  />
                </p>
                <p>
                  In Stock:{" "}
                  <input
                    type="checkbox"
                    checked={p.inStock}
                    onChange={(e) => handleProductChange(p, "inStock", e.target.checked)}
                  />
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDeleteProduct(p._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
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
              <p>
                <strong>{o.customer?.name}</strong> ({o.customer?.email})
              </p>
              <p>Total: Ksh. {o.total}</p>
              <p>Status: {o.status}</p>
            </div>
            <select
              value={o.status}
              onChange={(e) => handleOrderStatusChange(o._id, e.target.value)}
              className="border p-1 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
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
