import apiClient from './apiClient';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    // Prefer error from backend if available
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    throw message;
  }
  throw new Error('An unexpected error occurred');
}

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  } catch (error) {
    handleApiError(error)
  }
}
  
export async function apiPost<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error)
    }
}

export async function apiPut<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
      try {
        const response = await apiClient.put<T>(url, data, config);
        return response.data;
      } catch (error) {
        handleApiError(error)
      }
  }
  
export async function apiPatch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error)
    }
}

  export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.delete<T>(url, config);
      return response.data;
    } catch (error) {
      handleApiError(error)
    }
  }