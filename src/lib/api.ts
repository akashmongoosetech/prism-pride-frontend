import axios, { 
  AxiosInstance, 
  AxiosError, 
  InternalAxiosRequestConfig, 
  AxiosResponse 
} from 'axios';

/**
 * Base URL for the Prism Community REST API
 */
export const API_BASE_URL: string = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || '/api/v1';

/**
 * Custom error class for API failures with status code and details
 */
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

// Optional dynamic token provider from AuthContext
let authTokenProvider: (() => string | null) | null = null;

/**
 * Register a dynamic token getter function from AuthContext
 */
export const setAuthTokenProvider = (provider: () => string | null): void => {
  authTokenProvider = provider;
};

/**
 * Pre-configured Axios instance for the Prism REST API at '/api/v1'
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request Interceptor: Attach Authorization headers from AuthContext / localStorage
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token: string | null = null;

    // 1. Try dynamic AuthContext token provider if registered
    if (authTokenProvider) {
      try {
        token = authTokenProvider();
      } catch (err) {
        console.warn('[apiClient] Error retrieving token from AuthContext provider:', err);
      }
    }

    // 2. Fallback to localStorage
    if (!token) {
      try {
        token = localStorage.getItem('prism_auth_token');
      } catch {
        // Safe localStorage access
      }
    }

    // 3. Attach Bearer token if present
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Uniform error formatting & 401 token invalidation
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<any>) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      const message = 
        data?.message || 
        data?.error || 
        `API request failed with status code ${status}`;

      // Invalidate expired session token on 401
      if (status === 401) {
        try {
          localStorage.removeItem('prism_auth_token');
        } catch {
          // ignore
        }
      }

      return Promise.reject(new ApiError(message, status, data?.errors, data));
    } else if (error.request) {
      return Promise.reject(
        new ApiError(
          'Network Error: Could not connect to API server. Please check your connection.',
          0,
          null
        )
      );
    } else {
      return Promise.reject(new ApiError(error.message || 'Unknown request error', 0));
    }
  }
);

export default apiClient;
