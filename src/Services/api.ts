import axios from "axios";

export const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(request => {
  console.log("➡️ Request:", request);
  return request;
});

api.interceptors.response.use(response => {
  console.log("✅ Response:", response);
  return response;
});

export default api;
