// Mocks
import Component from './Component';
import designDraft from './designDraft.png';

// Vendors
import { expect, test } from 'vitest';
import diff from 'vitest-design-diff';

test('Big Rectangle - basic', async () => {
    const { ssim, diffPixelCount } = await diff({
        designDraft,
        component: <Component />,
    });

    expect(ssim).toEqual(1);
    expect(diffPixelCount).toEqual(0);
});

test('Big Rectangle - All Empty', async () => {
    await expect(
        async () =>
            await diff({
                designDraft: undefined,
                component: undefined,
            }),
    ).rejects.toThrowError('Invalid design draft');
});

test('Big Rectangle - Empty Component', async () => {
    await expect(
        async () =>
            await diff({
                designDraft,
                component: undefined,
            }),
    ).rejects.toThrowError('Invalid component');
});

test('Big Rectangle - Empty Design Draft', async () => {
    await expect(
        async () =>
            await diff({
                designDraft: undefined,
                component: <Component />,
            }),
    ).rejects.toThrowError('Invalid design draft');
});
