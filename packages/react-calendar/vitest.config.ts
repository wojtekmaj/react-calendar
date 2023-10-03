import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: 'vitest.setup.ts',
    watch: false,
  },
});
