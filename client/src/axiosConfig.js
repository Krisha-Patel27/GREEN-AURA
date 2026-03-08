import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true; // 🔥 VERY IMPORTANT


export default axios;

// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true, // ✅ send cookies
// });

// export default instance;