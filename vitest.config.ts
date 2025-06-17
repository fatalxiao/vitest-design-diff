import react from '@vitejs/plugin-react';
import path from 'path';
import url from 'url';
import { defineProject } from 'vitest/config';
const _dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineProject({
    plugins: [react()],
    test: {
        include: ['test/**/*.test.[tj]s(x)?'],
        browser: {
            provider: 'playwright',
            enabled: true,
            instances: [{ browser: 'chromium' }],
            headless: true,
        },
    },
    resolve: {
        alias: {
            'vitest-design-diff': path.resolve(_dirname, './src/index.ts'),
        },
    },
});
