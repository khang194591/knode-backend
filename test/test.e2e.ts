import * as fg from 'fast-glob';
import * as path from 'node:path';

const specs = fg.sync(
  path.join(__dirname, '/modules/**/*.test.ts').replace(/\\/g, '/'),
);

specs.forEach((file) => {
  require(file);
});

afterAll(() => {});
