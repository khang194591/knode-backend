export const PermissionMap = {
  Super: 'super',
  Admin: 'admin',
};

export const permissionList = [
  'super',
  'admin',
  'role:create',
  'role:view',
  'role:update',
  'role:delete',
] as const;

export type IPermission = (typeof permissionList)[number];
