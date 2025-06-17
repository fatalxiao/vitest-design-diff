// Mocks
import Rectangle from './mock/Rectangle';
import rectangle from './mock/rectangle.png';

// Vendors
import { expect, test } from 'vitest';
import diff from 'vitest-design-diff';

test('Rectangle - basic', async () => {
    const { ssim, diffPixelCount } = await diff({
        designDraft: rectangle,
        component: <Rectangle />,
    });

    expect(ssim).toEqual(1);
    expect(diffPixelCount).toEqual(0);
});

test('Rectangle - All Empty', () => {
    expect(
        async () =>
            await diff({
                designDraft: undefined,
                component: undefined,
            }),
    ).rejects.toThrowError('Invalid designDraft');
});

test('Rectangle - Empty Component', () => {
    expect(
        async () =>
            await diff({
                designDraft: rectangle,
                component: undefined,
            }),
    ).rejects.toThrowError('Invalid component');
});

test('Rectangle - Empty Design Draft', () => {
    expect(
        async () =>
            await diff({
                designDraft: undefined,
                component: <Rectangle />,
            }),
    ).rejects.toThrowError('Invalid designDraft');
});
