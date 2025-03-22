/**
 * @file loadImage.ts
 */

export interface ImageInfo {
    imageEl: HTMLImageElement;
    width: number;
    height: number;
    dataURL: string;
    imageData: ImageData;
}

/**
 * Load image and return info
 * @param path
 */
const loadImage = (path: string) => {
    return new Promise<ImageInfo>((resolve, reject) => {
        const imageEl = new Image();
        imageEl.onload = () => {
            const { width, height } = imageEl;

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(imageEl, 0, 0);

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
