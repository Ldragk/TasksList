import * as path from 'path';
import { defineConfig } from "vitest/config";


const files = path.resolve(__dirname, '../..');

export default defineConfig({
  resolve: {
    alias: {
      '@src': path.join(__dirname, './src'),
    },
 }
});

