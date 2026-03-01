// @ts-ignore - Prisma might not have generated the enum yet
import { AdminRole as PrismaAdminRole } from '@prisma/client';

// Local type fallback for AdminRole
export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'SUPPORT' | 'BILLING_ADMIN';

/**
 * High-level permissions for the Admin Dashboard.
 */
export enum AdminPermission {
    MANAGE_USERS = 'MANAGE_USERS',
    MANAGE_BILLING = 'MANAGE_BILLING',
    MANAGE_AI_MODELS = 'MANAGE_AI_MODELS',
    MANAGE_SECRETS = 'MANAGE_SECRETS', // SUPER_ADMIN only
    MANAGE_SETTINGS = 'MANAGE_SETTINGS',
    VIEW_ANALYTICS = 'VIEW_ANALYTICS',
    VIEW_AUDIT_LOGS = 'VIEW_AUDIT_LOGS'
}

/**
 * Mapping of Roles to Permissions.
 */
const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
    SUPER_ADMIN: [
        AdminPermission.MANAGE_USERS,
        AdminPermission.MANAGE_BILLING,
        AdminPermission.MANAGE_AI_MODELS,
        AdminPermission.MANAGE_SECRETS,
        AdminPermission.MANAGE_SETTINGS,
        AdminPermission.VIEW_ANALYTICS,
        AdminPermission.VIEW_AUDIT_LOGS
    ],
    ADMIN: [
        AdminPermission.MANAGE_USERS,
        AdminPermission.MANAGE_BILLING,
        AdminPermission.MANAGE_AI_MODELS,
        AdminPermission.MANAGE_SETTINGS,
        AdminPermission.VIEW_ANALYTICS,
        AdminPermission.VIEW_AUDIT_LOGS
    ],
    SUPPORT: [
        AdminPermission.MANAGE_USERS, // Restricted in UI/API later
        AdminPermission.VIEW_ANALYTICS
    ],
    BILLING_ADMIN: [
        AdminPermission.MANAGE_BILLING,
        AdminPermission.VIEW_ANALYTICS
    ]
};

export class RBACService {
    /**
     * Checks if a role has a specific permission.
     */
    static can(role: AdminRole, permission: AdminPermission): boolean {
        const permissions = ROLE_PERMISSIONS[role];
        return permissions ? permissions.includes(permission) : false;
    }

    /**
     * Returns all permissions for a role.
     */
    static getPermissions(role: AdminRole): AdminPermission[] {
        return ROLE_PERMISSIONS[role] || [];
    }
}
