export interface User {
  id: string;
  name: string;
  email: string;
  created_at?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
