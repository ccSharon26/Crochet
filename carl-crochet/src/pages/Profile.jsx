import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config"; 

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user")) || { name: "", email: "" };
  
  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUser({ name: data.name, email: data.email });
        localStorage.setItem("user", JSON.stringify(data)); 
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate, token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ name: data.name, email: data.email });
        localStorage.setItem("user", JSON.stringify(data));
        setEditMode(false);
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">My Profile</h2>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Name:</label>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          ) : (
            <p className="p-2 border rounded">{user.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email:</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          ) : (
            <p className="p-2 border rounded">{user.email}</p>
          )}
        </div>
        <div className="flex justify-between">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-500 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-500 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
