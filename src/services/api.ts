import axios from 'axios';
import type {
  User,
  LoginRequest,
  RegisterRequest,
  Token,
  Feedback,
  FeedbackCreate,
  DashboardStats,
  DashboardData
} from '../types';

// Get API URL from environment variables
const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Re-export types for convenience
export type {
  User,
  LoginRequest,
  RegisterRequest,
  Token,
  Feedback,
  FeedbackCreate,
  FeedbackRequest,
  FeedbackRequestCreate,
  DashboardStats,
  DashboardData
} from '../types';

// Auth API
export const authAPI = {
  login: async (data: LoginRequest) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  
  register: async (data: RegisterRequest) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  getTeamMembers: async (): Promise<User[]> => {
    const response = await api.get('/users/team');
    return response.data;
  },
  
  getManagers: async (): Promise<User[]> => {
    const response = await api.get('/users/managers');
    return response.data;
  },
};

// Feedback API
export const feedbackAPI = {
  createFeedback: async (data: FeedbackCreate): Promise<Feedback> => {
    const response = await api.post('/feedback/', data);
    return response.data;
  },
  
  getFeedback: async (): Promise<Feedback[]> => {
    const response = await api.get('/feedback/');
    return response.data;
  },
  
  updateFeedback: async (id: number, data: Partial<FeedbackCreate>): Promise<Feedback> => {
    const response = await api.put(`/feedback/${id}`, data);
    return response.data;
  },
  
  acknowledgeFeedback: async (id: number) => {
    const response = await api.post(`/feedback/${id}/acknowledge`);
    return response.data;
  },
  
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await api.get('/feedback/dashboard');
    return response.data;
  },

  // Feedback Request API
  createFeedbackRequest: async (data: FeedbackRequestCreate): Promise<FeedbackRequest> => {
    const response = await api.post('/feedback/request', data);
    return response.data;
  },

  getFeedbackRequests: async (): Promise<FeedbackRequest[]> => {
    const response = await api.get('/feedback/requests');
    return response.data;
  },

  completeFeedbackRequest: async (requestId: number) => {
    const response = await api.post(`/feedback/requests/${requestId}/complete`);
    return response.data;
  },

  cancelFeedbackRequest: async (requestId: number) => {
    const response = await api.delete(`/feedback/requests/${requestId}`);
    return response.data;
  },
};

export default api;
