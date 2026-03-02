import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const plans = await prisma.tokenProduct.findMany({
            where: { active: true },
            orderBy: { priceAmount: 'asc' },
        });

        // Transform DB data to standard frontend pricing structure
        const formattedPlans = plans.map((plan) => ({
            id: plan.id,
            name: plan.name,
            description: plan.description,
            coins: plan.coins,
            price: plan.priceAmount,
            currency: plan.currency,
            features: plan.features || [],
            isPopular: plan.name.toLowerCase().includes('pro') || plan.name.toLowerCase().includes('popular'),
            ctaText: 'Select Plan',
        }));

        return NextResponse.json({
            success: true,
            data: {
                title: "Enterprise Token Economy",
                subtitle: "Scalable access to world-class AI models.",
                plans: formattedPlans
            }
        });
    } catch (error) {
        console.error('[Pricing API Error]:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch pricing infrastructure.' },
            { status: 500 }
        );
    }
}
