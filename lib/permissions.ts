import { UserRole } from '@prisma/client'
import { JWTPayload } from './auth'

export type Permission =
  | 'view_reports'
  | 'create_report'
  | 'edit_own_report'
  | 'edit_any_report'
  | 'delete_any_report'
  | 'publish_report'
  | 'manage_users'
  | 'manage_api_keys'
  | 'view_analytics'
  | 'manage_meeting_notes'
  | 'manage_company_tables'

/**
 * Define permissions for each role
 */
const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.VIEWER]: ['view_reports'],

  [UserRole.ANALYST]: [
    'view_reports',
    'create_report',
    'edit_own_report',
    'view_analytics',
  ],

  [UserRole.EDITOR]: [
    'view_reports',
    'create_report',
    'edit_own_report',
    'edit_any_report',
    'delete_any_report',
    'publish_report',
    'view_analytics',
    'manage_meeting_notes',
    'manage_company_tables',
  ],

  [UserRole.ADMIN]: [
    'view_reports',
    'create_report',
    'edit_own_report',
    'edit_any_report',
    'delete_any_report',
    'publish_report',
    'manage_users',
    'manage_api_keys',
    'view_analytics',
    'manage_meeting_notes',
    'manage_company_tables',
  ],
}

/**
 * Check if a user has a specific permission
 */
export function hasPermission(
  user: JWTPayload | null,
  permission: Permission
): boolean {
  if (!user) return false

  const permissions = rolePermissions[user.role] || []
  return permissions.includes(permission)
}

/**
 * Check if a user can edit a specific report
 */
export function canEditReport(
  user: JWTPayload | null,
  reportAuthorId: string
): boolean {
  if (!user) return false

  // Can edit if they have edit_any_report permission
  if (hasPermission(user, 'edit_any_report')) return true

  // Can edit if they have edit_own_report permission and they're the author
  if (hasPermission(user, 'edit_own_report') && user.userId === reportAuthorId) {
    return true
  }

  return false
}

/**
 * Check if a user can delete a report
 */
export function canDeleteReport(user: JWTPayload | null): boolean {
  return hasPermission(user, 'delete_any_report')
}

/**
 * Check if a user can publish a report
 */
export function canPublishReport(user: JWTPayload | null): boolean {
  return hasPermission(user, 'publish_report')
}

/**
 * Check if a user is an admin
 */
export function isAdmin(user: JWTPayload | null): boolean {
  return user?.role === UserRole.ADMIN
}

/**
 * Check if a user is an editor or higher
 */
export function isEditorOrHigher(user: JWTPayload | null): boolean {
  if (!user) return false
  return user.role === UserRole.ADMIN || user.role === UserRole.EDITOR
}

/**
 * Get all permissions for a user
 */
export function getUserPermissions(user: JWTPayload | null): Permission[] {
  if (!user) return []
  return rolePermissions[user.role] || []
}

/**
 * Require a specific permission (throws error if not authorized)
 */
export function requirePermission(
  user: JWTPayload | null,
  permission: Permission
): void {
  if (!hasPermission(user, permission)) {
    throw new Error('Unauthorized: Insufficient permissions')
  }
}

/**
 * Require admin role (throws error if not admin)
 */
export function requireAdmin(user: JWTPayload | null): void {
  if (!isAdmin(user)) {
    throw new Error('Unauthorized: Admin access required')
  }
}
