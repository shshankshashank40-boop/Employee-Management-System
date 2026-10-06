import axios from 'axios';

// Use VITE_API_URL from environment or fallback to localhost:5001/api
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for consistent error extraction
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let customMessage = 'An unexpected error occurred. Please try again.';
    if (error.response && error.response.data && error.response.data.message) {
      customMessage = error.response.data.message;
    } else if (error.message) {
      customMessage = error.message;
    }
    return Promise.reject(new Error(customMessage));
  }
);

export default api;
