import { supabase } from './supabase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Standardized API client for Godzilla Coder Backend
 */
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        const headers = new Headers(options.headers || {});
        if (session?.access_token) {
            headers.set('Authorization', `Bearer ${session.access_token}`);
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
            throw new Error(data.details ? `${data.error} | Details: ${data.details}` : (data.error || 'API Request Failed'));
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
