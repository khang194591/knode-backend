import { SignInHandler } from './sign-in';
import { SignUpHandler } from './sign-up';
import { SwitchOrganizationHandler } from './switch-organization';

export * from './sign-in';
export * from './sign-up';
export * from './switch-organization';

export const commandHandlers = [
  SignInHandler,
  SignUpHandler,
  SwitchOrganizationHandler,
];
