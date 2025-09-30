const isLocalhost = window.location.hostname === "localhost";

const API_BASE_URL = isLocalhost
  ? "http://localhost:5000"
  : "https://crochet-production-7738.up.railway.app";

export default API_BASE_URL;
