import { CreateOrganizationCommandHandler } from './create-organization';
import { DeleteOrganizationCommandHandler } from './delete-organization';
import { UpdateOrganizationCommandHandler } from './update-organization';

export * from './create-organization';
export * from './delete-organization';
export * from './update-organization';

export const commandHandlers = [
  CreateOrganizationCommandHandler,
  DeleteOrganizationCommandHandler,
  UpdateOrganizationCommandHandler,
];
