import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, token_key } from '@/constants/api.constants';
import type { ApiErrorResponse } from '@/types/api.types';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach auth token if available in the browser
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(token_key)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor - pass errors through without modifying localStorage
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// Helper to extract error message from API response or network failure
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

export default apiClient;
