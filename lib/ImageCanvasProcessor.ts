
export interface Dimensions {
  width: number;
  height: number;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Loads an image from a file object onto a canvas element.
 * @param file The image file to load.
 * @param canvas The canvas element to draw the image on.
 * @returns A promise that resolves with the loaded HTMLImageElement.
 */
export const loadImageOnCanvas = (file: File, canvas: HTMLCanvasElement): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Could not get canvas context.'));
        }
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(img);
      };
      img.onerror = reject;
      img.src = event.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Resizes an image to the specified dimensions.
 * @param image The source HTMLImageElement.
 * @param dimensions The target width and height.
 * @returns A data URL of the resized image.
 */
export const resizeImage = (image: HTMLImageElement, dimensions: Dimensions): string => {
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = dimensions.width;
  offscreenCanvas.height = dimensions.height;
  const ctx = offscreenCanvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get offscreen canvas context.');
  }
  ctx.drawImage(image, 0, 0, dimensions.width, dimensions.height);
  return offscreenCanvas.toDataURL(); // Default is PNG
};

/**
 * Crops an image to the specified area.
 * @param image The source HTMLImageElement.
 * @param cropArea The source x, y, width, and height to crop from the image.
 * @returns A data URL of the cropped image.
 */
export const cropImage = (image: HTMLImageElement, cropArea: CropArea): string => {
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = cropArea.width;
  offscreenCanvas.height = cropArea.height;
  const ctx = offscreenCanvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get offscreen canvas context.');
  }
  ctx.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    cropArea.width,
    cropArea.height
  );
  return offscreenCanvas.toDataURL();
};

/**
 * Triggers a browser download for a data URL.
 * @param dataUrl The data URL of the image to download.
 * @param filename The desired filename for the downloaded file.
 */
export const downloadImage = (dataUrl: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Converts a data URL to a specified image format and quality.
 * @param dataUrl The source data URL.
 * @param format The target format ('jpeg' or 'png').
 * @param quality The quality for JPEG format (0.0 to 1.0).
 * @returns A promise that resolves with the new data URL.
 */
export const convertImageFormat = (dataUrl: string, format: 'jpeg' | 'png', quality: number = 0.92): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error('Could not get canvas context for conversion.'));
            }
            ctx.drawImage(img, 0, 0);
            const convertedDataUrl = canvas.toDataURL(`image/${format}`, quality);
            resolve(convertedDataUrl);
        };
        img.onerror = reject;
        img.src = dataUrl;
    });
};
