/**
 * @file diff.ts
 */

// Vendors
import { diffImages, getImagesSSIM, loadImage, renderScreenshot } from './';

// Types
import type { ReactNode } from 'react';

export interface ScreenshotOptions {
    /**
     * The offset of the component when screenshotting.
     */
    offset?: [x?: number, y?: number];

    /**
     * A hook called before component screenshot. You can set global styles, load fonts or do some interaction here.
     */
    beforeScreenshot?: () => Promise<unknown> | unknown;
}

export interface Options {
    /**
     * The path of design draft.
     */
    designDraft: string;

    /**
     * The component to be compared.
     */
    component: ReactNode;

    /**
     * The options of screenshot.
     */
    screenshotOptions?: ScreenshotOptions;

    /**
     * The threshold of pixel diff between component screenshot and design draft.
     *
     * @default 0.1
     */
    threshold?: number;

    /**
     * The diff result image path between component screenshot and design draft.
     */
    diffResultPath?: string;
}

export interface Result {
    /**
     * The ssim (Structural Similarity Index Measure) result between component screenshot and design draft.
     *
     * @range [0, 1]
     */
    ssim: number;

    /**
     * The data URL of the diff result image.
     */
    diffResultSrc: string;

    /**
     * The number of different pixel between component screenshot and design draft.
     */
    diffPixelCount: number;
}

/**
 * Compare component with design draft.
 * @param designDraft
 * @param component
 * @param screenshotOptions
 * @param threshold
 * @param diffResultPath
 */
const diff = async ({
    designDraft,
    component,
    screenshotOptions,
    threshold,
    diffResultPath,
}: Options): Promise<Result> => {
    if (!designDraft) {
        throw new Error('Invalid design draft');
    }

    if (!component) {
        throw new Error('Invalid component');
    }

    const {
        width,
        height,
        dataURL: designDraftDataURL,
        imageData: designDraftImageData,
    } = await loadImage(designDraft);

    // Write the screenshot of component to a png file
    const { base64: screenshotBase64 } = await renderScreenshot(
        component,
        {
            width,
            height,
        },
        screenshotOptions,
    );
    const screenshotDataURL = `data:image/png;base64,${screenshotBase64}`;

    // Get the difference between images
    const { diffResultSrc, diffPixelCount } = await diffImages(
        designDraftDataURL,
        screenshotDataURL,
        {
            threshold: threshold,
            diffResultPath,
        },
    );

    // Calculate the ssim between images
    const { imageData: screenshotImageData } =
        await loadImage(screenshotDataURL);
    const ssim = getImagesSSIM(screenshotImageData, designDraftImageData);

    return { ssim, diffResultSrc, diffPixelCount };
};

export default diff;
