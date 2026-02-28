/**
 * API Client for Frontend and Desktop App
 * 
 * Provides type-safe methods for calling authentication endpoints
 */

const API_BASE = process.env.NEXT_PUBLIC_APP_URL || '';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  coins: number;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface VerifyOtpInput {
  email: string;
  code: string;
}

export interface ResendOtpInput {
  email: string;
}

/**
 * Register a new user account
 */
export async function register(input: RegisterInput): Promise<ApiResponse<{ user: User }>> {
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  return response.json();
}

/**
 * Login with email and password
 */
export async function login(input: LoginInput): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  return response.json();
}

/**
 * Verify email with OTP code
 */
export async function verifyOtp(input: VerifyOtpInput): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/api/auth/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  return response.json();
}

/**
 * Resend OTP verification code
 */
export async function resendOtp(input: ResendOtpInput): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/api/auth/resend-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  return response.json();
}

/**
 * Get current user profile (requires authentication)
 */
export async function getCurrentUser(token: string): Promise<ApiResponse<{ user: User }>> {
  const response = await fetch(`${API_BASE}/api/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
}

/**
 * Token storage utilities for client-side
 */
export const tokenStorage = {
  set(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      // Also set as cookie for middleware
      document.cookie = `auth_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
    }
  },

  get(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },

  remove() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      document.cookie = 'auth_token=; path=/; max-age=0';
    }
  },
};
