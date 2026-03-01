import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const products = await prisma.tokenProduct.findMany({
            where: { active: true },
            orderBy: { priceAmount: 'asc' }
        });

        // Transform JSON features back to array if stored as string
        const transformed = products.map((p: any) => ({
            ...p,
            features: typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || [])
        }));

        return NextResponse.json(transformed);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
