import { SignInCommand } from '@/modules/auth/commands';
import { SignInDto } from '@/modules/auth/dto';
import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import TestAgent from 'supertest/lib/agent';
import errorJSON from '@/i18n/enUS/error.json';
import { mockSignInDto } from 'test/mocks/auth';

const url = '/auth/sign-in';

describe(`${SignInCommand.name}`, () => {
  let agent: TestAgent;
  beforeAll(async () => {
    agent = globalThis.testContext.agent;
  });

  afterEach(async () => {});

  it('Invalid body', async () => {
    const req = plainToInstance(SignInDto, {});

    const { body, status } = await agent.post(url).send(req);

    expect(status).toBe(HttpStatus.BAD_REQUEST);
    expect(body.message).toBe(errorJSON.validation);
  });

  it('Invalid credentials (email)', async () => {
    const req = plainToInstance(SignInDto, mockSignInDto());

    const { body, status } = await agent.post(url).send(req);

    expect(status).toBe(HttpStatus.UNAUTHORIZED);
    expect(body.message).toBe(errorJSON.invalidCredentials);
  });

  it('Invalid credentials (email)', async () => {
    const req = plainToInstance(SignInDto, mockSignInDto());

    const { body, status } = await agent.post(url).send(req);

    expect(status).toBe(HttpStatus.UNAUTHORIZED);
    expect(body.message).toBe(errorJSON.invalidCredentials);
  });
});
