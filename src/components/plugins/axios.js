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
    config.headers['Access-Control-Allow-Headers']="X-Api-KEY, Origin, X-Request_With, Content-Type, Accept,Access-Control-Request-Method";
    config.headers['Access-Control-Allow-Methods']='GET,POST,OPTIONS,PUT,DELETE';
    config.headers['Allow']='GET,POST,OPTIONS,PUT,DELETE';
    
    
    return config;
  },
  (err) => Promise.reject(err)
);
export default http;
