import react from '@vitejs/plugin-react';
import path from 'path';
import url from 'url';
import { defineWorkspace } from 'vitest/config';
const _dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineWorkspace([
    {
        // @ts-ignore
        plugins: [react()],
        test: {
            include: ['**/__tests__/**/*.test.[tj]s(x)?'],
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
    },
]);
