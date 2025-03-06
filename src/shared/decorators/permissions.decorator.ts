import { IPermission } from '@/modules/permissions/enums';
import { SetMetadata } from '@nestjs/common';

export const RequirePermissionKey = 'permissions';

export const RequirePermission = (...permissions: IPermission[]) =>
  SetMetadata(RequirePermissionKey, permissions);
