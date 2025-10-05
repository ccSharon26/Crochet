import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const PlaceOrder = () => {
  const {
    currency,
    getCartAmount,
    navigate,
    pickupAgents,
    userCounty,
    setUserCounty,
    userAgent,
    setUserAgent,
    getDeliveryFee,
    placeOrder,
  } = useContext(ShopContext);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const subtotal = getCartAmount();
  const deliveryFee = getDeliveryFee();
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (!name || !email || !phone || !userCounty || !userAgent) {
      alert("Please fill in all details.");
      return;
    }

    const orderData = {
      name,
      email,
      phone,
      county: userCounty,
      agent: userAgent.name,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
      date: new Date().toLocaleDateString("en-GB"),
      status: "Pending",
    };

    placeOrder(orderData);

    if (paymentMethod === "cash") {
      navigate("/orders");
    } else {
      alert("Mpesa payment coming soon...");
    }
  };

  return (
    <div className="p-6 sm:p-16 bg-gray-50 min-h-screen">
      <div className="text-2xl sm:text-3xl mb-8 font-semibold text-center">
        <Title text1={"CHECKOUT"} text2={"DETAILS"} />
      </div>

      {/* Form & Summary Container */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Customer Info & Delivery */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md space-y-6">
          {/* Customer Info */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="border w-full p-3 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border w-full p-3 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border w-full p-3 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Delivery Details */}
          <div className="space-y-3">
            <label className="font-medium">County</label>
            <select
              className="border w-full p-3 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              value={userCounty}
              onChange={(e) => {
                setUserCounty(e.target.value);
                setUserAgent(null);
              }}
            >
              <option value="">-- Select County --</option>
              {Object.keys(pickupAgents).map((county) => (
                <option key={county} value={county}>
                  {county.charAt(0).toUpperCase() + county.slice(1)}
                </option>
              ))}
            </select>

            {userCounty && (
              <>
                <label className="font-medium">Pickup Mtaani Agent</label>
                <select
                  className="border w-full p-3 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                  value={userAgent ? userAgent.name : ""}
                  onChange={(e) =>
                    setUserAgent(
                      pickupAgents[userCounty].find(
                        (a) => a.name === e.target.value
                      )
                    )
                  }
                >
                  <option value="">-- Select Agent --</option>
                  {pickupAgents[userCounty].map((ag, idx) => (
                    <option key={idx} value={ag.name}>
                      {ag.name} ({currency} {ag.fee})
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="font-medium">Payment Method</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-pink-500"
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="mpesa"
                  checked={paymentMethod === "mpesa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-pink-500"
                />
                Mpesa
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px] bg-white p-6 rounded-lg shadow-md space-y-4">
          <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>
              {currency} {subtotal}.00
            </p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Fee</p>
            <p>
              {currency} {deliveryFee}.00
            </p>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <p>Total</p>
            <p>
              {currency} {total}.00
            </p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-3 mt-4 rounded-md hover:bg-pink-600 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
