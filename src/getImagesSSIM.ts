/**
 * @file getImagesSSIM.ts
 */

// Vendors
import * as iq from 'image-q';

/**
 * Calculate the ssim (Structural Similarity Index Measure) result between component screenshot and design draft.
 * @param imageData1
 * @param imageData2
 */
const getImagesSSIM = (imageData1: ImageData, imageData2: ImageData) => {
    return iq.quality.ssim(
        iq.utils.PointContainer.fromImageData(imageData1),
        iq.utils.PointContainer.fromImageData(imageData2),
    );
};

export default getImagesSSIM;
