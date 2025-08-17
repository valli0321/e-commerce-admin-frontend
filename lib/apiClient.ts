import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios';

import { store } from '../redux/store';
import { refreshTokens, logoutUser } from '../redux/slices/authSlice';

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  return config;
});

// Response interceptor
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as RetryConfig
    
//     if (error.response?.status === 401 && 
//         !originalRequest.url?.includes('/refresh-token')) {
//       try {
//         // Attempt to refresh tokens
//         await store.dispatch(refreshTokens()).unwrap();
        
//         // Retry the original request
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         // If refresh fails, logout the user
//         await store.dispatch(logoutUser());
//         if (typeof window !== 'undefined') {
//           window.location.href = '/sign-in';
//         }
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

export default apiClient;

// apiClient.ts
// import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios';

// import { store } from '../redux/store';
// import { refreshTokens, logoutUser } from '../redux/slices/authSlice';

// interface ApiError {
//   message: string;
//   status?: number;
//   data?: any;
// }

// interface RetryConfig extends InternalAxiosRequestConfig {
//     _retry?: boolean;
// }

// const apiClient: AxiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   timeout: 10000,
//   withCredentials: true,
// });

// apiClient.interceptors.response.use(
//   response => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as RetryConfig;
    
//     // Handle 401 errors (unauthorized)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         await store.dispatch(refreshTokens()).unwrap();
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         await store.dispatch(logoutUser());
//         throw {
//           message: 'Session expired. Please login again.',
//           status: 401,
//           data: null
//         } as ApiError;
//       }
//     }

//     // Format all other errors consistently
//     throw {
//       message: error.response?.data?.message || error.message,
//       status: error.response?.status,
//       data: error.response?.data
//     } as ApiError;
//   }
// );

// export default apiClient;