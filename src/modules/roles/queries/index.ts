import { GetListRoleHandler } from './get-list-role';
import { GetRoleHandler } from './get-role';

export * from './get-list-role';
export * from './get-role';

export const queryHandlers = [GetListRoleHandler, GetRoleHandler];
