/**
 * @file compare.test.tsx
 */

// Mocks
import Button from './mock/Button';
import button from './mock/Button.png';

// Vendors
import { expect, test } from 'vitest';
import diff from 'vitest-design-diff';

test('Empty', () => {
    expect(() =>
        diff({
            designDraft: undefined,
            component: undefined,
        }),
    ).rejects.toThrowError('Invalid designDraft');
});

test('Empty component', () => {
    expect(() =>
        diff({
            designDraft: button,
            component: undefined,
        }),
    ).rejects.toThrowError('Invalid component');
});

test('Empty design draft', () => {
    expect(() =>
        diff({
            designDraft: undefined,
            component: <Button />,
        }),
    ).rejects.toThrowError('Invalid designDraft');
});
