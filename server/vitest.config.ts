const { resolve } = require('path');
const { defineConfig } = require('vitest/config')
const AutoImport = require('unplugin-auto-import/vite')

module.exports = defineConfig({
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
      '@test': resolve(__dirname, './test'),
    },
  },
  test: {
    clearMocks: true,
    includeSource: ['./src/**/*.{ts}'],
    testEnvironment: 'node',
    globals: true,    
  },
  plugins: [
    AutoImport({
      imports: ['vitest'],
      dts: true,
    }),
  ],
});

