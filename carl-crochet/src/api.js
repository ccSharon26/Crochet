// Detect if app is running on localhost
const isLocalhost = window.location.hostname === "localhost";

// Switch base URL depending on environment
const API_BASE_URL = isLocalhost
  ? "http://localhost:5000" // local backend
  : "https://crochet-production-7738.up.railway.app"; // deployed backend

export default API_BASE_URL;
