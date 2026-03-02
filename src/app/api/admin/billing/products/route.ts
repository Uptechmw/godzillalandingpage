import { NextRequest, NextResponse } from 'next/server';
import { requireAdminRole, unauthorizedResponse } from '@/lib/rbac-helper';
import { jsonError, getRequestId } from '@/lib/http/errors';
import { AdminBillingService } from '@/services/admin/billing/admin-billing.service';

export async function GET(req: NextRequest) {
    const { error, requestId } = await requireAdminRole(req, ['SUPER_ADMIN', 'ADMIN', 'BILLING_ADMIN']);
    if (error) return unauthorizedResponse(error);

    try {
        const products = await AdminBillingService.listProducts();
        return NextResponse.json(products, { headers: { 'x-request-id': requestId! } });
    } catch (error: any) {
        return jsonError(req, 500, 'INTERNAL_ERROR', error.message);
    }
}

export async function POST(req: NextRequest) {
    const { error, session, requestId } = await requireAdminRole(req, ['SUPER_ADMIN', 'BILLING_ADMIN']);
    if (error) return unauthorizedResponse(error);

    try {
        const body = await req.json();
        const product = await AdminBillingService.createProduct(body, session!.adminId);
        return NextResponse.json(product, { headers: { 'x-request-id': requestId! } });
    } catch (error: any) {
        return jsonError(req, 500, 'INTERNAL_ERROR', error.message);
    }
}

export async function PATCH(req: NextRequest) {
    const { error, session, requestId } = await requireAdminRole(req, ['SUPER_ADMIN', 'BILLING_ADMIN']);
    if (error) return unauthorizedResponse(error);

    try {
        const { id, ...data } = await req.json();
        if (!id) return jsonError(req, 400, 'VALIDATION_ERROR', 'Product ID required');

        const product = await AdminBillingService.updateProduct(id, data, session!.adminId);
        return NextResponse.json(product, { headers: { 'x-request-id': requestId! } });
    } catch (error: any) {
        return jsonError(req, 500, 'INTERNAL_ERROR', error.message);
    }
}

export async function DELETE(req: NextRequest) {
    const { error, session, requestId } = await requireAdminRole(req, ['SUPER_ADMIN', 'BILLING_ADMIN']);
    if (error) return unauthorizedResponse(error);

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return jsonError(req, 400, 'VALIDATION_ERROR', 'Product ID required');

        await AdminBillingService.deleteProduct(id, session!.adminId);
        return NextResponse.json({ success: true, requestId }, { headers: { 'x-request-id': requestId! } });
    } catch (error: any) {
        return jsonError(req, 500, 'INTERNAL_ERROR', error.message);
    }
}
