import { UserRole } from '@prisma/client'

export const ROLE_PERMISSIONS = {
  VIEWER: ['read'],
  ANALYST: ['read', 'create_report'],
  MANAGER: ['read', 'create_report', 'edit', 'delete'],
  ADMIN: ['read', 'create_report', 'edit', 'delete', 'manage_users', 'manage_roles']
}

export function hasPermission(userRole: UserRole, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole] || []
  return permissions.includes(permission)
}

export function canEditData(userRole: UserRole): boolean {
  return hasPermission(userRole, 'edit')
}

export function canManageUsers(userRole: UserRole): boolean {
  return hasPermission(userRole, 'manage_users')
}

export function canCreateReport(userRole: UserRole): boolean {
  return hasPermission(userRole, 'create_report')
}

export function canDelete(userRole: UserRole): boolean {
  return hasPermission(userRole, 'delete')
}
