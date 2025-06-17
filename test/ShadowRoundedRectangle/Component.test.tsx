// Mocks
import Component from './Component';
import designDraft from './designDraft.png';

// Vendors
import { expect, test } from 'vitest';
import diff from 'vitest-design-diff';

test('Shadow Rounded Rectangle - basic', async () => {
    const { ssim, diffPixelCount } = await diff({
        designDraft,
        component: <Component />,
        screenshotOptions: {
            offset: [4],
        },
    });

    expect(ssim).toBeGreaterThan(0.7);
    expect(diffPixelCount).toEqual(0);
});

test('Shadow Rounded Rectangle - All Empty', async () => {
    await expect(
        async () =>
            await diff({
                designDraft: undefined,
                component: undefined,
            }),
    ).rejects.toThrowError('Invalid design draft');
});

test('Shadow Rounded Rectangle - Empty Component', async () => {
    await expect(
        async () =>
            await diff({
                designDraft,
                component: undefined,
            }),
    ).rejects.toThrowError('Invalid component');
});

test('Shadow Rounded Rectangle - Empty Design Draft', async () => {
    await expect(
        async () =>
            await diff({
                designDraft: undefined,
                component: <Component />,
            }),
    ).rejects.toThrowError('Invalid design draft');
});
