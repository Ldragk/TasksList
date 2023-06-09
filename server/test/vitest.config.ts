const { resolve } = require('path');
const { defineConfig } = require('vitest/config')

const root = resolve(__dirname, '..');
const rootConfig = require(`${root}/vitest.config.ts`);

export default defineConfig({
  ...rootConfig, ...{
    test: {
      includeSource: ['./test/**/*.spec.ts'],
      setupFiles: ['./test/vitest-setup.ts'],
    }
  }
})