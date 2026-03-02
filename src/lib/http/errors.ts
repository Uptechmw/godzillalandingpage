import { NextRequest, NextResponse } from 'next/server';

/**
 * Standardized error response shape for Godzilla AI
 */
export interface CanonicalError {
    success: false;
    errorCode: string;
    message: string;
    details?: any;
    requestId: string;
}

/**
 * Extracts or generates a requestId from a request
 */
export function getRequestId(req: NextRequest | Request): string {
    const existing = req.headers.get('x-request-id');
    if (existing) return existing;
    return crypto.randomUUID();
}

/**
 * Returns a canonical JSON error response
 */
export function jsonError(
    req: NextRequest | Request,
    status: number,
    errorCode: string,
    message: string,
    details?: any
) {
    const requestId = getRequestId(req);
    return NextResponse.json(
        {
            success: false,
            errorCode,
            message,
            details,
            requestId
        } as CanonicalError,
        {
            status,
            headers: { 'x-request-id': requestId }
        }
    );
}
