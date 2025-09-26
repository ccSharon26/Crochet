import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser } = useContext(ShopContext);
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (isSignIn && !name)) {
      alert("Please fill all required fields");
      return;
    }

    loginUser(name, email);


    navigate("/profile");
  };

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-md rounded-lg p-6 space-y-4"
      >

        <div className="flex justify-around mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${
              isSignIn ? "bg-pink-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${
              !isSignIn ? "bg-pink-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsSignIn(false)}
          >
            Log In
          </button>
        </div>

        {isSignIn && (
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        )}

        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />

        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
        >
          {isSignIn ? "Sign In" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
