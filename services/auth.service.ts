import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api.constants';
import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
  User,
} from '@/types/auth.types';

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    API_ENDPOINTS.AUTH.SIGNUP,
    payload
  );
  return data;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    payload
  );
  return data;
}

export async function getMe(): Promise<{ user: User }> {
  const { data } = await apiClient.get<{ user: User }>(API_ENDPOINTS.AUTH.ME);
  return data;
}
