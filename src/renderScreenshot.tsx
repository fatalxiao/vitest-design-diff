/**
 * @file renderScreenshot.ts
 */

// Components
import ScreenshotContainer from './ScreenshotContainer';

// Vendors
import { page } from '@vitest/browser/context';
import React from 'react';
import { vi } from 'vitest';
import { render } from 'vitest-browser-react';

// Types
import type { ReactNode } from 'react';
import type { ScreenshotOptions } from './diff';

export interface Size {
    /**
     * Viewport width.
     */
    width: number;

    /**
     * Viewport height.
     */
    height: number;
}

/**
 * Render a React component and return its screenshot.
 * @param component
 * @param size
 * @param options
 */
const renderScreenshot = async (
    component: ReactNode,
    size: Size,
    options?: ScreenshotOptions,
) => {
    // Render the React component.
    render(
        <ScreenshotContainer offset={options?.offset}>
            {component}
        </ScreenshotContainer>,
    );

    // Do something like load css or fonts before screenshot.
    await options?.beforeScreenshot?.();

    // Waiting for font set ready.
    await vi.waitFor(
        () =>
            Promise.all([
                // Wait for all fonts loaded
                document.fonts.ready,
                // Wait for all images loaded
                Promise.all(
                    Array.from(document.images).map(
                        (img) =>
                            new Promise((resolve, reject) => {
                                const image = new Image();
                                image.onload = resolve;
                                image.onerror = reject;
                                image.src = img.src;
                            }),
                    ),
                ),
            ]),
        15000,
    );

    // Set viewport by image width and height.
    await page.viewport(size.width, size.height);

    // Do screenshot.
    return await page.screenshot({
        base64: true,
        // @ts-ignore
        omitBackground: true,
    });
};

export default renderScreenshot;
