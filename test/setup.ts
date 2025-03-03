import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

export interface ITestContext {
  app: INestApplication;
  module: TestingModule;
}

declare global {
  // eslint-disable-next-line no-var
  var testContext: ITestContext;
}

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const testApp: INestApplication = moduleFixture.createNestApplication();

  await testApp.init();

  await testApp.listen(0);

  global.testContext = {
    app: testApp,
    module: moduleFixture,
  };
});

afterAll(async () => {
  if (global.testContext) {
    await global.testContext.app.close();
  }
});
