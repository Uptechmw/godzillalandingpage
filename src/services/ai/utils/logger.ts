import { ModelKey } from '../registry';

export interface AuditLogEvent {
    eventId: string;
    timestamp: string;
    userId: string;
    requestId: string;
    idempotencyKey: string;
    modelKey: ModelKey;
    reservationId?: string;

    action: 'RESERVATION_CREATED' | 'COMMITTED' | 'REFUNDED' | 'ABORTED' | 'TIMEOUT';

    metrics?: {
        inputTokens: number;
        outputTokens: number;
        calculatedCost: number;
        latencyMs: number;
    };

    error?: string;
}

/**
 * Structured Audit Logger for Enterprise AI Brokerage.
 * Exclusively writes JSON to standard output to be ingested by tools like Datadog/ELK.
 */
export class AuditLogger {
    static log(event: Omit<AuditLogEvent, 'timestamp'>) {
        const fullEvent: AuditLogEvent = {
            ...event,
            timestamp: new Date().toISOString()
        };

        // In production, structure logs for ingestion.
        if (process.env.NODE_ENV === 'production') {
            console.log(JSON.stringify(fullEvent));
        } else {
            // Human-readable dev logs
            console.log(`[AUDIT:${fullEvent.action}]`, fullEvent);
        }
    }
}
