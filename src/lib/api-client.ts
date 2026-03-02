/**
 * API Client for Frontend and Desktop App
 * 
 * Provides type-safe methods for calling authentication endpoints
 */

import { toastNotify } from '@/components/ui/toast';
import { resolveErrorUI } from '@/lib/errorMap';

const API_BASE = process.env.NEXT_PUBLIC_APP_URL || '';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  errorCode?: string;
  message?: string;
  requestId?: string;
  details?: any;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  coins: number;
}

export interface AuthResponse {
  token: string;
  user: User;
  redirectTo?: string;
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
 * Hardened API Request Wrapper
 * Handles: Auth headers, RequestId logging, Global status code mapping, and Toast notifications.
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = tokenStorage.get();
  const headers = new Headers(options.headers);

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const requestId = response.headers.get('x-request-id') || undefined;

    // 401: Unauthorized / Session Expired
    if (response.status === 401) {
      tokenStorage.remove();
      toastNotify({
        message: 'Session expired. Please log in again.',
        severity: 'warning',
        requestId,
        persistent: true
      });
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
        window.location.href = '/auth/login';
      }
      return { success: false, errorCode: 'AUTH_REQUIRED', requestId };
    }

    const data: ApiResponse<T> = await response.json();
    data.requestId = data.requestId || requestId;

    if (!response.ok || !data.success) {
      const errorUI = resolveErrorUI(data.errorCode || 'INTERNAL_ERROR', data.message);

      toastNotify({
        message: errorUI.message,
        severity: errorUI.severity,
        requestId: data.requestId,
        persistent: errorUI.persistent
      });

      return data;
    }

    return data;
  } catch (error: any) {
    console.error('[API Error]', error);
    toastNotify({
      message: 'Network error. Please check your connection.',
      severity: 'error'
    });
    return { success: false, errorCode: 'NETWORK_ERROR' };
  }
}

/**
 * Register a new user account
 */
export async function register(input: RegisterInput): Promise<ApiResponse<{ user: User }>> {
  return apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

/**
 * Login with email and password
 */
export async function login(input: LoginInput): Promise<ApiResponse<AuthResponse>> {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

/**
 * Verify email with OTP code
 */
export async function verifyOtp(input: VerifyOtpInput): Promise<ApiResponse<AuthResponse>> {
  return apiRequest('/api/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

/**
 * Resend OTP verification code
 */
export async function resendOtp(input: ResendOtpInput): Promise<ApiResponse> {
  return apiRequest('/api/auth/resend-otp', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

/**
 * Get current user profile (requires authentication)
 */
export async function getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
  return apiRequest('/api/auth/me');
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
