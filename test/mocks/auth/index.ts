import { SignInDto } from '@/modules/auth/dto';
import { faker } from '@faker-js/faker';

export const mockSignInDto = (overrides?: Partial<SignInDto>): SignInDto => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...overrides,
  };
};
