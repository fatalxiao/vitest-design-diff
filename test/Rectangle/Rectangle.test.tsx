// Mocks
import Rectangle from './Rectangle';
import designDraft from './designDraft.png';

// Vendors
import { expect, test } from 'vitest';
import diff from 'vitest-design-diff';

test('Rectangle - basic', async () => {
    const { ssim, diffPixelCount } = await diff({
        designDraft,
        component: <Rectangle />,
    });

    expect(ssim).toEqual(1);
    expect(diffPixelCount).toEqual(0);
});

test('Rectangle - All Empty', async () => {
    await expect(
        async () =>
            await diff({
                designDraft: undefined,
                component: undefined,
            }),
    ).rejects.toThrowError('Invalid design draft');
});

test('Rectangle - Empty Component', async () => {
    await expect(
        async () =>
            await diff({
                designDraft,
                component: undefined,
            }),
    ).rejects.toThrowError('Invalid component');
});

test('Rectangle - Empty Design Draft', async () => {
    await expect(
        async () =>
            await diff({
                designDraft: undefined,
                component: <Rectangle />,
            }),
    ).rejects.toThrowError('Invalid design draft');
});
