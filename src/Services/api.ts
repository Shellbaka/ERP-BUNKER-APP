import axios from "axios";

const api = axios.create({
  baseURL: "https://12282389000194.bunkererp.com.br/v1",
});

api.interceptors.request.use(request => {
  console.log("➡️ Request:", request);
  return request;
});

api.interceptors.response.use(response => {
  console.log("⬅️ Response:", response);
  return response;
});

export default api;
