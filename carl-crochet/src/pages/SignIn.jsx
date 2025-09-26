import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();           
    if (!email) return alert("Email is required");
    const user = { name, email };
    setUser(user);
    navigate("/orders");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
