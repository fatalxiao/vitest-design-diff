/**
 * @file compareWithDesignDraft.ts
 */

// Vendors
import {
    diffImages,
    getImagesSSIM,
    loadImage,
    renderScreenshot,
} from './index';

// Types
import type { ReactNode } from 'react';

export interface Options {
    designDraft: string;
    component: ReactNode;
    diffPath?: string;
    beforeScreenshot?: () => Promise<unknown> | void;
}

export interface CompareResult {
    ssim: number;
    diffSrc: string;
    diffPixelCount: number;
}

let defaultOptions: Options;

const compareWithDesignDraft = async (options: Options) => {
    const { designDraft, component, diffPath, beforeScreenshot } = {
        ...defaultOptions,
        ...options,
    };

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
    const { diffSrc, diffPixelCount } = await diffImages(
        designDraftDataURL,
        screenshotDataURL,
        {
            diffPath,
        },
    );

    // Calculate the ssim between images
    const { imageData: screenshotImageData } =
        await loadImage(screenshotDataURL);
    const ssim = getImagesSSIM(screenshotImageData, designDraftImageData);

    return { ssim, diffSrc, diffPixelCount };
};

compareWithDesignDraft.config = (options: Options) => {
    defaultOptions = options;
};

export default compareWithDesignDraft;
