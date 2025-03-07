import { fromValidationErrors } from '@/shared/utils';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { AppModule } from '../src/app.module';

export interface ITestContext {
  app: INestApplication;
  module: TestingModule;
  agent: TestAgent;
}

declare global {
  // eslint-disable-next-line no-var
  var testContext: ITestContext;
}

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const testApp = moduleFixture.createNestApplication<INestApplication>();

  testApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: fromValidationErrors,
    }),
  );

  await testApp.init();

  await testApp.listen(0);

  global.testContext = {
    app: testApp,
    module: moduleFixture,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    agent: request(testApp.getHttpServer()),
  };
});

afterAll(async () => {
  if (global.testContext) {
    await global.testContext.app.close();
  }
});
