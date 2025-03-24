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

export interface Options {
    /**
     * Viewport width.
     */
    width?: number;

    /**
     * Viewport height.
     */
    height?: number;

    /**
     * A hook called before component screenshot. You can set global styles, load fonts or do some interaction here.
     */
    beforeScreenshot?: () => Promise<unknown> | unknown;
}

/**
 * Render a React component and return its screenshot.
 * @param component
 * @param options
 */
const renderScreenshot = async (component: ReactNode, options?: Options) => {
    // Render the React component.
    render(<ScreenshotContainer>{component}</ScreenshotContainer>);

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
    await page.viewport(options?.width, options?.height);

    // Do screenshot.
    return await page.screenshot({
        // @ts-ignore
        omitBackground: true,
        base64: true,
    });
};

export default renderScreenshot;
