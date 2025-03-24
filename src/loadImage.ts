/**
 * @file loadImage.ts
 */

export interface ImageInfo {
    /**
     * The <img/> element which loads the image.
     */
    imageEl: HTMLImageElement;

    /**
     * Image width.
     */
    width: number;

    /**
     * Image height.
     */
    height: number;

    /**
     * Image data URL.
     */
    dataURL: string;

    /**
     * Image data.
     */
    imageData: ImageData;
}

/**
 * Load image and return info.
 * @param path
 */
const loadImage = (path: string) => {
    return new Promise<ImageInfo>((resolve, reject) => {
        const imageEl = new Image();
        imageEl.onload = () => {
            // Get the size of image.
            const { width, height } = imageEl;

            // Create canvas.
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            // Draw image.
            const ctx = canvas.getContext('2d');
            ctx.drawImage(imageEl, 0, 0);

            // Return image infomation.
            resolve({
                imageEl,
                width,
                height,
                dataURL: canvas.toDataURL(),
                imageData: ctx.getImageData(0, 0, width, height),
            });
        };
        imageEl.onerror = reject;
        imageEl.src = path;
    });
};

export default loadImage;
