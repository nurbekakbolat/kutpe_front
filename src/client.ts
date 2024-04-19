import axios from "axios";

export const getToken = () => {
    return localStorage.getItem("token");
  };

export const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: 15000
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Do something before the request is sent
      // For example, set authentication tokens
      config.headers["Authorization"] = "Bearer " + getToken();
      return config;
    },
    (error) => {
      // Do something with the error
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      // Any status code that lies within the range of 2xx causes this function to trigger
      return response;
    },
    (error) => {
      // Any status code outside the range of 2xx causes this function to trigger
      if (error.response && error.response.status === 401) {
        // Handle 401 errors globally, for example, redirect to login
        window.location.replace("/auth");
        localStorage.removeItem("token");
        console.log("401");
      }
      return Promise.reject(error);
    }
  );