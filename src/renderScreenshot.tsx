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
    const renderResult = render(
        <ScreenshotContainer offset={options?.offset}>
            {component}
        </ScreenshotContainer>,
    );

    // Set viewport by image width and height.
    await page.viewport(size.width, size.height);

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

    // Do something like load css or fonts before screenshot.
    await options?.beforeScreenshot?.();

    // Do screenshot.
    const result = await page.screenshot({
        base64: true,
        element: renderResult.container,
        // @ts-ignore
        omitBackground: true,
    });

    // Do something after screenshot.
    await options?.afterScreenshot?.();

    return result;
};

export default renderScreenshot;
