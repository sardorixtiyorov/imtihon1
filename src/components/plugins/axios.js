import axios from "axios";

const http = axios.create({
  baseURL: "http://34.125.211.64:3300/api",
});
http.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Language"] = localStorage.getItem("lang");
    config.headers['Access-Control-Allow-Origin']= '*';

    
    
    return config;
  },
  (err) => Promise.reject(err)
);
export default http;
