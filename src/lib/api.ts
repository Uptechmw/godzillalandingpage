import { supabase } from './supabase';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Standardized API client for Godzilla Backend
 */
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        const customToken = Cookies.get('auth_token');

        const headers = new Headers(options.headers || {});
        // Prioritize our custom token if available, fallback to Supabase
        const token = customToken || session?.access_token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');

        // Sanitize API_URL and endpoint to prevent double slashes.
        const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;

        // Ensure endpoint starts with '/'
        let path = endpoint;
        if (!path.startsWith('/')) {
            path = `/${path}`;
        }

        // If API_URL is '/api' and endpoint is '/auth/login', url = '/api/auth/login'
        // If endpoint is already '/api/auth/login', prevent '/api/api/auth/login'
        if (baseUrl === '/api' && path.startsWith('/api/')) {
            path = path.substring(4);
        }

        const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${path}`;

        const response = await fetch(url, {
            ...options,
            headers,
        });

        const data = await response.json().catch(() => ({ error: 'Invalid JSON response from server' }));

        if (!response.ok) {
            if (data.details) {
                console.error('[API Error Details]:', data.details);
            }
            const errorMsg = data.details ? `${data.error} | Details: ${data.details}` : (data.error || 'API Request Failed');

            // Create a custom error with the API response data attached
            const error: any = new Error(errorMsg);
            error.data = data;
            throw error;
        }

        return data;
    } catch (error: any) {
        console.error('[API Network Error]', error);

        if (error.message === 'Failed to fetch') {
            throw new Error('Network error: Unable to reach the server. Please check your connection or backend URL.');
        }
        throw error;
    }
}

/**
 * Convenience methods
 */
export const api = {
    get: (endpoint: string) => apiRequest(endpoint, { method: 'GET' }),
    post: (endpoint: string, body: any) => apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    patch: (endpoint: string, body: any) => apiRequest(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (endpoint: string) => apiRequest(endpoint, { method: 'DELETE' }),
};
