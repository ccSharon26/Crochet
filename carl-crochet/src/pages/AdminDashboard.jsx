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
        bestseller: false,
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
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Image Filename"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
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
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          className="border p-1 mr-2"
        >
          <option value="Women">Women</option>
          <option value="Men">Men</option>
        </select>
        <select
          value={newProduct.subCategory}
          onChange={(e) =>
            setNewProduct({ ...newProduct, subCategory: e.target.value })
          }
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
            onChange={(e) =>
              setNewProduct({ ...newProduct, bestseller: e.target.checked })
            }
          />{" "}
          Bestseller
        </label>
        <label className="ml-4">
          <input
            type="checkbox"
            checked={newProduct.inStock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, inStock: e.target.checked })
            }
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
        {products.map((p) => {
          const edits = productEdits[p._id] || {};
          return (
            <div
              key={p._id}
              className="flex items-center gap-4 border-b py-2 justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`frontend_assets/${p.image}`}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p>{p.name}</p>
                  <p>Ksh. {p.price}</p>
                  <p>{p.description}</p>
                  <p>
                    Sizes:{" "}
                    <input
                      type="text"
                      defaultValue={p.sizes.join(", ")}
                      onChange={(e) =>
                        handleProductEditChange(
                          p._id,
                          "sizes",
                          e.target.value.split(",")
                        )
                      }
                      className="border p-1 text-sm"
                    />
                  </p>
                  <p>
                    In Stock:{" "}
                    <input
                      type="checkbox"
                      checked={edits.inStock ?? p.inStock}
                      onChange={(e) =>
                        handleProductEditChange(
                          p._id,
                          "inStock",
                          e.target.checked
                        )
                      }
                    />
                  </p>
                  <button
                    onClick={() => handleSaveProductEdits(p._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mt-1 hover:bg-green-600"
                  >
                    Save
                  </button>
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
          );
        })}
      </div>

      {/* Orders List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        {orders.map((o) => {
          const edits = orderEdits[o._id] || {};
          const isToBeShipped = (edits.status || o.status) === "To Be Shipped";
          const isDelivered = (edits.status || o.status) === "Delivered";

          return (
            <div
              key={o._id}
              className="border-b py-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
            >
              <div>
                <p>
                  <strong>{o.customer?.name}</strong> ({o.customer?.email})
                </p>
                <p>Total: Ksh. {o.total}</p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      edits.status === "Pending" ||
                      (!edits.status && o.status === "Pending")
                        ? "text-orange-500"
                        : edits.status === "To Be Shipped" ||
                          (!edits.status && o.status === "To Be Shipped")
                        ? "text-blue-500"
                        : edits.status === "Delivered" ||
                          (!edits.status && o.status === "Delivered")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {edits.status || o.status}
                  </span>
                </p>

                {(isToBeShipped || isDelivered) && (
                  <p>
                    To be shipped on:{" "}
                    <strong>{edits.shippingDay || o.shippingDay}</strong>,{" "}
                    {new Date(
                      edits.shippingDate || o.shippingDate
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                {/* Status selector */}
                <select
                  value={edits.status || o.status}
                  onChange={(e) =>
                    handleOrderEdit(o._id, "status", e.target.value)
                  }
                  className="border p-1 rounded"
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
                      onChange={(e) =>
                        handleOrderEdit(o._id, "shippingDay", e.target.value)
                      }
                      className="border p-1 rounded"
                    >
                      <option value="">Select Day</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                    <input
                      type="date"
                      value={
                        (edits.shippingDate || o.shippingDate)?.split("T")[0] ||
                        ""
                      }
                      onChange={(e) =>
                        handleOrderEdit(o._id, "shippingDate", e.target.value)
                      }
                      className="border p-1 rounded"
                    />
                  </div>
                )}

                {/* Save button */}
                <button
                  onClick={() => handleOrderStatusChange(o._id, edits)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-1 md:mt-0"
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
