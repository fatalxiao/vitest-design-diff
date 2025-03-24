/**
 * @file compare.ts
 */

// Vendors
import { diffImages, getImagesSSIM, loadImage, renderScreenshot } from './';

// Types
import type { ReactNode } from 'react';

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
     * The threshold of pixel diff between component screenshot and design draft.
     *
     * @default 0.1
     */
    diffThreshold?: number;
    /**
     * The diff result image path between component screenshot and design draft.
     */
    diffResultPath?: string;
    /**
     * A hook called before component screenshot. You can set global styles, load fonts or do some interaction here.
     */
    beforeScreenshot?: () => Promise<unknown> | unknown;
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
 * @param diffThreshold
 * @param diffResultPath
 * @param beforeScreenshot
 */
const compare = async ({
    designDraft,
    component,
    diffThreshold,
    diffResultPath,
    beforeScreenshot,
}: Options): Promise<Result> => {
    const {
        width,
        height,
        dataURL: designDraftDataURL,
        imageData: designDraftImageData,
    } = await loadImage(designDraft);

    // Write the screenshot of component to a png file
    const { base64: screenshotBase64 } = await renderScreenshot(component, {
        width,
        height,
        beforeScreenshot,
    });
    const screenshotDataURL = `data:image/png;base64,${screenshotBase64}`;

    // Get the difference between images
    const { diffResultSrc, diffPixelCount } = await diffImages(
        designDraftDataURL,
        screenshotDataURL,
        {
            threshold: diffThreshold,
            diffResultPath,
        },
    );

    // Calculate the ssim between images
    const { imageData: screenshotImageData } =
        await loadImage(screenshotDataURL);
    const ssim = getImagesSSIM(screenshotImageData, designDraftImageData);

    return { ssim, diffResultSrc, diffPixelCount };
};

export default compare;
