/**
 * @file compare.test.tsx
 */

// Vendors
import { expect, test } from 'vitest';
import diff from 'vitest-design-diff';

test('Basic', () => {
    expect(() => {
        diff({
            designDraft: '',
            component: <></>,
        });
    }).not.toThrow();
});
