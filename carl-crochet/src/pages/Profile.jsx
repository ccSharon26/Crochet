import { useState, useEffect } from "react";
import Title from "../components/Title";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // separate toggles
  const [showProfilePassword, setShowProfilePassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (formData.currentPassword !== user.password) {
      alert("Current password is incorrect!");
      return;
    }

    const updatedUser = { ...user, password: formData.newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("Password updated successfully!");
    setIsEditing(false);
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p className="text-lg">You’re not logged in.</p>
        <p className="text-sm mt-2">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="pt-[100px] pb-16 px-6 md:px-20">
      <Title text1={"MY"} text2={"PROFILE"} />

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
        {/* Email */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="text"
            value={user.email}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Password Section */}
        {!isEditing ? (
          <>
            <div className="mb-6 relative">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type={showProfilePassword ? "text" : "password"}
                value={user.password || ""}
                readOnly
                style={{ color: "black", backgroundColor: "#fff" }}
                className="w-full px-4 py-2 border rounded-lg pr-10 cursor-pointer"
              />
              <img
                src={
                  showProfilePassword
                    ? "frontend_assets/eye_open.png"
                    : "frontend_assets/eye_closed.png"
                }
                alt="toggle visibility"
                onClick={() => setShowProfilePassword(!showProfilePassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 cursor-pointer opacity-70 hover:opacity-100"
              />
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2 mt-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Change Password
            </button>
          </>
        ) : (
          <>
            {/* Current Password */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Current Password
              </label>
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-pink-400 pr-10"
              />
              <img
                src={
                  showCurrentPassword
                    ? "frontend_assets/eye_open.png"
                    : "frontend_assets/eye_closed.png"
                }
                alt="toggle visibility"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 cursor-pointer opacity-70 hover:opacity-100"
              />
            </div>

            {/* New Password */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-pink-400 pr-10"
              />
              <img
                src={
                  showNewPassword
                    ? "frontend_assets/eye_open.png"
                    : "frontend_assets/eye_closed.png"
                }
                alt="toggle visibility"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 cursor-pointer opacity-70 hover:opacity-100"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6 relative">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Confirm New Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-pink-400 pr-10"
              />
              <img
                src={
                  showConfirmPassword
                    ? "frontend_assets/eye_open.png"
                    : "frontend_assets/eye_closed.png"
                }
                alt="toggle visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 cursor-pointer opacity-70 hover:opacity-100"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
