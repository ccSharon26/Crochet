import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Ksh.";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const pickupAgents = {
    nairobi: [
      { name: "Westlands Pickup", fee: 150 },
      { name: "CBD Pickup", fee: 120 },
      { name: "Embakasi Pickup", fee: 160 },
    ],
    kiambu: [
      { name: "Thika Pickup", fee: 170 },
      { name: "Ruiru Pickup", fee: 140 },
      { name: "Kiambu Town Pickup", fee: 150 },
    ],
  };

  const [userCounty, setUserCounty] = useState("");
  const [userAgent, setUserAgent] = useState(null);

  const getDeliveryFee = () => {
    if (!userAgent) return 0;
    return userAgent.fee;
  };

  const addToCart = (itemId, size) => {
    if (!size) {
      alert("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const placeOrder = async (orderData) => {
    const orderPayload = {
      items: structuredClone(cartItems),
      total: getCartAmount() + getDeliveryFee(),
      delivery: userAgent,
      payment: orderData.paymentMethod,
      customer: {
        name: orderData.name,
        phone: orderData.phone,
        email: orderData.email,
        county: orderData.county,
        address: orderData.address,
      },
      status: "Pending",
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (res.ok) {
        setOrders((prev) => [...prev, data.order]); 
        setCartItems({});
        navigate("/orders"); 
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong. Please try again.");
    }
  };


  const fetchOrdersByEmail = async (email) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders?email=${email}`);
      const data = await res.json();
      if (res.ok) {
        setOrders(data); 
      } else {
        console.error("Failed to fetch orders:", data.message);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const value = {
    products,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,

    pickupAgents,
    userCounty,
    setUserCounty,
    userAgent,
    setUserAgent,
    getDeliveryFee,

    orders,
    placeOrder,
    fetchOrdersByEmail,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
