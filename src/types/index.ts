// User types
export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'manager' | 'employee';
  manager_id?: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  manager?: User;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  role: 'manager' | 'employee';
  manager_id?: number;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface TokenData {
  email?: string;
}

// Feedback types
export interface Feedback {
  id: number;
  manager_id: number;
  employee_id: number;
  strengths: string;
  areas_to_improve: string;
  overall_sentiment: 'positive' | 'neutral' | 'negative';
  acknowledged: boolean;
  acknowledged_at?: string;
  created_at: string;
  updated_at?: string;
  manager?: User;
  employee?: User;
}

export interface FeedbackCreate {
  employee_id: number;
  strengths: string;
  areas_to_improve: string;
  overall_sentiment: 'positive' | 'neutral' | 'negative';
}

export interface FeedbackUpdate {
  strengths?: string;
  areas_to_improve?: string;
  overall_sentiment?: 'positive' | 'neutral' | 'negative';
}

// Dashboard types
export interface DashboardStats {
  total_feedback: number;
  positive_feedback: number;
  neutral_feedback: number;
  negative_feedback: number;
  team_members_count: number;
}

export interface DashboardData {
  feedback: Feedback[];
  stats: DashboardStats;
}

// Comment types
export interface FeedbackComment {
  id: number;
  feedback_id: number;
  user_id: number;
  comment: string;
  created_at: string;
  user: User;
}

export interface FeedbackCommentCreate {
  feedback_id: number;
  comment: string;
}

// Feedback request types
export interface FeedbackRequest {
  id: number;
  employee_id: number;
  manager_id: number;
  message?: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  completed_at?: string;
  employee?: User;
  manager?: User;
}

export interface FeedbackRequestCreate {
  message?: string;
}
