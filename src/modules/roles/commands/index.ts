import { CreateRoleHandler } from './create-role';
import { DeleteRoleHandler } from './delete-role';
import { UpdateRoleHandler } from './update-role';

export * from './create-role';
export * from './delete-role';
export * from './update-role';

export const commandHandlers = [
  CreateRoleHandler,
  DeleteRoleHandler,
  UpdateRoleHandler,
];
