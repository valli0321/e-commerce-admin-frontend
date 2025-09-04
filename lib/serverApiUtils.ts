import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    // Prefer error from backend if available
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    throw message;
  }
  throw new Error('An unexpected error occurred');
}

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'API request failed'
    );
  }
  return error instanceof Error ? error.message : 'Something went wrong';
};

// Helper to create config with JWT token from cookies
export const createServerApiClient = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  // Add response interceptor for token refresh if needed
  // instance.interceptors.response.use(
  //   (response) => response,
  //   async (error: AxiosError) => {
  //     const originalRequest = error.config;
      
  //     // If 401 error and not a refresh request
  //     if (error.response?.status === 401 && !originalRequest?.url?.includes('/refresh-token')) {
  //       try {
  //         // Attempt to refresh tokens
  //         const refreshToken = cookieStore.get('refreshToken')?.value;
  //         if (refreshToken) {
  //           const refreshResponse = await axios.post(`${baseURL}/api/users/refresh-token`, 
  //             {}, 
  //             {
  //               headers: {
  //                 Cookie: `refreshToken=${refreshToken}`,
  //               },
  //               withCredentials: true
  //             }
  //           );

  //           // Update cookies with new tokens
  //           if (refreshResponse.data.accessToken) {
  //             originalRequest!.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
  //             return instance(originalRequest!);
  //           }
  //         }
  //       } catch (refreshError) {
  //         console.error('Token refresh failed:', refreshError);
  //         // Clear tokens if refresh fails
  //         originalRequest!.headers.Authorization = '';
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return instance;
};

// Auth verification
export const verifySession = async <T>(): Promise<T> => {
  try {
    const api = await createServerApiClient();
    const res: any = await api.get<T>('/users/verify');
    return res?.data
  } catch (error) {
    // console.log(error);
    redirect(`/sign-in?session=expired`);
  }
};

export const serverGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const api = await createServerApiClient();
    const response = await api.get<T>(url, config);
    return response.data;
  } catch (error) {
    // throw new Error(extractErrorMessage(error));
    handleApiError(error)
  }
};

export const serverPost = async <T, D = unknown>(
  url: string, 
  data?: D, 
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const api = await createServerApiClient();
    const response = await api.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const serverPut = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const api = await createServerApiClient();
    const response = await api.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const serverDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const api = await createServerApiClient();
    const response = await api.delete<T>(url, config);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// import axios, { AxiosRequestConfig, AxiosError } from 'axios';
// import { cookies, headers } from 'next/headers';
// import { redirect } from 'next/navigation';

// const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// interface ApiError extends Error {
//   status?: number;
// }

// const createApiError = (error: unknown): ApiError => {
//   if (axios.isAxiosError(error)) {
//     return {
//       name: 'API Error',
//       message: error.response?.data?.message || error.message,
//       status: error.response?.status
//     };
//   }
//   return error instanceof Error ? error : new Error('Unknown error occurred');
// };

// export const createServerApiClient = async () => {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get('accessToken')?.value;
//   const forwardedHeaders = await headers();

//   const instance = axios.create({
//     baseURL,
//     timeout: 10000,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
//     },
//   });

//   return instance;
// };

// // Auth verification
// export const verifySession = async (): Promise<{ userId: string }> => {
//   try {
//     const api = await createServerApiClient();
//     const res = await api.get<{ userId: string }>('/users/verify');
//     console.log(res);
//     return res?.data
//   } catch (error) {
//     redirect(`/sign-in?session=expired`);
//   }
// };

// export const serverGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//   const api = await createServerApiClient();
//   try {
//     const response = await api.get<T>(url, config);
//     return response.data;
//   } catch (error) {
//     const apiError = createApiError(error);
//     if (apiError.status === 401) redirect('/sign-in');
//     throw apiError;
//   }
// };

// export const serverPost = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//   const api = await createServerApiClient();
//   try {
//     const response = await api.post<T>(url, config);
//     return response.data;
//   } catch (error) {
//     const apiError = createApiError(error);
//     if (apiError.status === 401) redirect('/sign-in');
//     throw apiError;
//   }
// };

// export const serverPut = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//   const api = await createServerApiClient();
//   try {
//     const response = await api.put<T>(url, config);
//     return response.data;
//   } catch (error) {
//     const apiError = createApiError(error);
//     if (apiError.status === 401) redirect('/sign-in');
//     throw apiError;
//   }
// };

// export const serverDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//   const api = await createServerApiClient();
//   try {
//     const response = await api.delete<T>(url, config);
//     return response.data;
//   } catch (error) {
//     const apiError = createApiError(error);
//     if (apiError.status === 401) redirect('/sign-in');
//     throw apiError;
//   }
// };

