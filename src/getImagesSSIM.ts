/**
 * @file getImagesSSIM.ts
 */

// Vendors
import * as iq from 'image-q';

const getImagesSSIM = (imageData1: ImageData, imageData2: ImageData) => {
    return iq.quality.ssim(
        iq.utils.PointContainer.fromImageData(imageData1),
        iq.utils.PointContainer.fromImageData(imageData2),
    );
};

export default getImagesSSIM;
