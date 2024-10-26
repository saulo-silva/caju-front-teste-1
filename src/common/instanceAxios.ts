import axios from "axios";

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  timeout: 5000
});

export default instanceAxios;
