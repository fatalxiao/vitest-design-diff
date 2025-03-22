import { defineConfig } from 'father';

export default defineConfig({
    platform: 'browser',
    esm: { output: 'es', ignores: ['**/__tests__/**'] },
    cjs: {
        output: 'lib',
        ignores: ['**/__tests__/**'],
    },
    umd: { name: 'VitestDesignDiff', output: 'dist' },
});
