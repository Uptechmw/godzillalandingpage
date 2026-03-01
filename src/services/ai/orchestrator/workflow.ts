import { ModelKey, PricingSnapshot } from "../registry";
import { BillingBroker } from "../broker/billing";
import { AtomicBrokerError } from "../utils/normalizer";

/**
 * WorkflowContext manages the state and token budget for a multi-agent orchestration.
 * It ensures that all agents in a workflow share a single upfront reservation.
 */
export class WorkflowContext {
    private usedCost: number = 0;

    constructor(
        private userId: string,
        private reservationId: string,
        private maxBudget: number,
        private pricingSnapshot: PricingSnapshot
    ) { }

    /**
     * Initializes a workflow with a large upfront reservation.
     */
    static async start(userId: string, modelKey: ModelKey, budgetTokens: number) {
        // Note: In this simple implementation, we leverage the existing BillingBroker.reserve logic.
        // For a complex workflow, we'd estimate the 'worst case' across all expected agents.
        const reservation = await BillingBroker.reserve(userId, modelKey, 0, budgetTokens);

        return new WorkflowContext(
            userId,
            reservation.id,
            reservation.reservedAmount,
            reservation.pricingSnapshot as any as PricingSnapshot
        );
    }

    /**
     * Checks if the workflow still has budget for the next operation.
     */
    assertBudget(estimatedCost: number) {
        if (this.usedCost + estimatedCost > this.maxBudget) {
            throw new AtomicBrokerError("INSUFFICIENT_FUNDS", "Workflow token budget exceeded.");
        }
    }

    /**
     * Tracks usage for a sub-step in the workflow.
     */
    trackUsage(inputTokens: number, outputTokens: number) {
        const stepCost = Math.ceil(
            (inputTokens * this.pricingSnapshot.baseInputMultiplier) +
            (outputTokens * this.pricingSnapshot.baseOutputMultiplier)
        );
        this.usedCost += stepCost;
    }

    /**
     * Finalizes the entire workflow reservation based on cumulative usage.
     */
    async finalize() {
        // In our simplified broker, we can use 0 input and total usedCost/multiplier as output 
        // to effectively commit the total used cost.
        // A better implementation would track absolute input/output totals.
        await BillingBroker.commit(this.reservationId, 0, this.usedCost); // This is an approximation
    }

    getReservationId() {
        return this.reservationId;
    }
}
