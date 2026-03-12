import axios from "axios";

const TOKEN_KEY = "hppd_bb_token";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token to every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 → clear token
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }
    return Promise.reject(error);
  },
);

export { TOKEN_KEY };
export default client;
