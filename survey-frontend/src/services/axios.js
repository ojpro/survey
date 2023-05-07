import axios from "axios";
import router from "./router.jsx";

const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

// set requests' header authorization token
Axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`;
  return config;
})

// Handle Unauthorized requests
Axios.interceptors.response.use(response => {
  return response;
}, error => {
  // if the response not authorized
  if (error.response && error.response.status === 401) {
    // redirect to the login page after
    localStorage.removeItem('TOKEN')
    // clearing Localstorage
    router.navigate("/login", {replace: true});

    return error;
  }
  throw error;
})
export default Axios
