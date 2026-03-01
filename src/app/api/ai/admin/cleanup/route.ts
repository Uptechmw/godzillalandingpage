import { NextRequest, NextResponse } from "next/server";
import { RecoveryService } from "@/services/ai/utils/recovery";

/**
 * GET /api/ai/admin/cleanup
 * 
 * Internal cron task to clean up zombie token reservations.
 * In production, this should be protected by an internal secret or Vercel Cron header.
 */
export async function GET(req: NextRequest) {
    // Simple auth check for internal callers
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const processed = await RecoveryService.cleanupZombies();

    return NextResponse.json({
        success: true,
        processed,
        timestamp: new Date().toISOString()
    });
}
