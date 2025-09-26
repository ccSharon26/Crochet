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

    // Save order in context
    placeOrder(orderData);

    if (paymentMethod === "cash") {
      navigate("/orders");
    } else {
      alert("Mpesa payment coming soon...");
    }
  };

  return (
    <div className="p-6">
      <div className="text-2xl mb-6">
        <Title text1={"CHECKOUT"} text2={"DETAILS"} />
      </div>

      {/* Customer Info */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Full Name"
          className="border w-full p-2 mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="border w-full p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="border w-full p-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Delivery Details */}
      <div className="mb-6">
        <label className="block mb-2">County</label>
        <select
          className="border w-full p-2 mb-3"
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
            <label className="block mb-2">Pickup Mtaani Agent</label>
            <select
              className="border w-full p-2"
              value={userAgent ? userAgent.name : ""}
              onChange={(e) =>
                setUserAgent(
                  pickupAgents[userCounty].find((a) => a.name === e.target.value)
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
      <div className="mb-6">
        <label className="block mb-2">Payment Method</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              value="mpesa"
              checked={paymentMethod === "mpesa"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Mpesa
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="border p-4 mb-6">
        <h3 className="font-semibold mb-2">Order Summary</h3>
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
        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>
            {currency} {total}.00
          </p>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="bg-black text-white py-3 px-6 w-full"
      >
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrder;
