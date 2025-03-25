/**
 * @file index.ts
 */

// Export default
import diff from './diff';
export default diff;

// Export utils
export { default as diffImages } from './diffImages';
export { default as getImagesSSIM } from './getImagesSSIM';
export { default as loadImage } from './loadImage';
export { default as loadStylesheet } from './loadStylesheet';
export { default as renderScreenshot } from './renderScreenshot';

// Export types
export type { Options, Result } from './diff';
export type { Options as DiffImagesOptions } from './diffImages';
export type { ImageInfo } from './loadImage';
export type { Options as RenderScreenshotOptions } from './renderScreenshot';
