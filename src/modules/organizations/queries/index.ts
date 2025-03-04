import { GetListOrganizationQueryHandler } from './get-list-organization';
import { GetOrganizationQueryHandler } from './get-organization';

export * from './get-list-organization';
export * from './get-organization';

export const queryHandlers = [
  GetListOrganizationQueryHandler,
  GetOrganizationQueryHandler,
];
