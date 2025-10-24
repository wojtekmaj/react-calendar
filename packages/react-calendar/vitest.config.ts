import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

import type { ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
      provider: playwright(),
    },
    setupFiles: 'vitest.setup.ts',
    watch: false,
  },
});

export default config;
