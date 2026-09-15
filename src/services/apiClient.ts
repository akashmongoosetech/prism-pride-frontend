import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError, 
  InternalAxiosRequestConfig 
} from 'axios';

// Base URL targeting '/api/v1' by default, or configurable via environment variable
export const API_BASE_URL: string = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || '/api/v1';

export class ApiError extends Error {
  statusCode: number;
  errors?: any;
  data?: any;

  constructor(message: string, statusCode: number, errors?: any, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = data;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Axios instance pre-configured for the Prism REST API at '/api/v1'
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request Interceptor: inject authentication token from localStorage
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      const token = localStorage.getItem('prism_auth_token');
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
    } catch {
      // Ignore localStorage access issues in restricted environments
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: unwrap errors and format into structured ApiError
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<any>) => {
    if (error.response) {
      // Server responded with an error status (4xx, 5xx)
      const status = error.response.status;
      const data = error.response.data;
      const message = 
        data?.message || 
        data?.error || 
        `Request failed with status ${status}`;
      
      // If 401 Unauthorized, safely clear token
      if (status === 401) {
        try {
          localStorage.removeItem('prism_auth_token');
        } catch {
          // ignore
        }
      }

      return Promise.reject(new ApiError(message, status, data?.errors, data));
    } else if (error.request) {
      // Request was made but no response received (network error or timeout)
      return Promise.reject(
        new ApiError(
          'Network error: unable to reach the server. Please check your connection.',
          0,
          null
        )
      );
    } else {
      // Error setting up the request
      return Promise.reject(new ApiError(error.message || 'Unknown request error', 0));
    }
  }
);

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
}

/**
 * Generic typed request helper routed through axios
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const method = (options.method || 'GET').toUpperCase();
  
  // Accept data via options.data or options.body
  let requestData = options.data !== undefined ? options.data : options.body;
  if (typeof requestData === 'string') {
    try {
      requestData = JSON.parse(requestData);
    } catch {
      // Keep as string if not JSON
    }
  }

  const response = await apiClient.request<any>({
    url: endpoint,
    method,
    data: requestData,
    params: options.params,
    headers: options.headers
  });

  // Handle empty responses
  if (response.status === 204 || !response.data) {
    return {} as T;
  }

  // Unpack standardized { success, data, message } payload if present
  if (response.data && response.data.data !== undefined) {
    return response.data.data as T;
  }

  return response.data as T;
}

export default apiClient;

