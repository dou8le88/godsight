import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      // vitest-chrome's `main` is a CJS build that does `require('vitest')`,
      // which Vitest refuses to load. Point at the ESM build instead.
      'vitest-chrome': 'vitest-chrome/lib/index.esm.js',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    // Replaying a full raid through the panel can take longer than the default.
    testTimeout: 30_000,
    setupFiles: ['./src/test/setup.ts'],
  },
});
