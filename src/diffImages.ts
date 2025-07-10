/**
 * @file diffImages.ts
 */

// Vendors
import { server } from '@vitest/browser/context';
import pixelmatch from 'pixelmatch';
import { expect } from 'vitest';
import loadImage from './loadImage';

export interface Options {
    /**
     * Diff threshold (0 to 1); smaller is more sensitive.
     *
     * @default 0.1
     */
    threshold?: number;

    /**
     * The diff result image path between component screenshot and design draft.
     */
    getDiffResultPath?: () => string;
}

const defaultOptions: Options = {
    threshold: 0.1,
    getDiffResultPath: () =>
        `./__screenshots__/${expect.getState()?.testPath?.split?.('/')?.pop?.()}/${expect.getState()?.currentTestName?.replaceAll?.(' ', '-')}-diff.png`,
};

/**
 * Diff the component screenshot with the design draft, and generate the diff result image.
 * @param designDraftDataURL
 * @param screenshotDataURL
 * @param options
 */
const diffImages = async (
    designDraftDataURL: string,
    screenshotDataURL: string,
    options?: Options,
) => {
    // Merge options
    const mergedOptions: Options = {
        threshold: options?.threshold || defaultOptions.threshold,
        getDiffResultPath:
            options?.getDiffResultPath || defaultOptions.getDiffResultPath,
    };

    // Load images by data url
    const {
        width: designDraftWidth,
        height: designDraftHeight,
        imageData: designDraftImageData,
    } = await loadImage(designDraftDataURL);
    const {
        width: screenshotWidth,
        height: screenshotHeight,
        imageData: screenshotImageData,
    } = await loadImage(screenshotDataURL);

    // Create canvas for diff
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = Math.max(designDraftWidth, screenshotWidth);
    canvas.height = Math.max(designDraftHeight, screenshotHeight);
    const diffImgData = context.createImageData(canvas.width, canvas.height);

    // Do diff
    const diffPixelCount = pixelmatch(
        designDraftImageData.data,
        screenshotImageData.data,
        diffImgData.data,
        canvas.width,
        canvas.height,
        { threshold: mergedOptions.threshold },
    );

    // Write diff result to file
    context.putImageData(diffImgData, 0, 0);
    const diffResultSrc = canvas.toDataURL();
    const diffResultPath =
        (mergedOptions.getDiffResultPath &&
            typeof mergedOptions.getDiffResultPath === 'function' &&
            mergedOptions.getDiffResultPath()) ||
        undefined;
    diffResultPath &&
        (await server.commands.writeFile(
            diffResultPath,
            diffResultSrc.split('data:image/png;base64,')[1],
            { encoding: 'base64' },
        ));

    return { diffResultSrc, diffPixelCount };
};

export default diffImages;
