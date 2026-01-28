export const validateImage = (file, maxSize = 3_000_000) => {
    console.log('validating')
    if (!file) return "No file selected";
    if (!file.type.startsWith("image/")) return "File must be an image";
    if (file.size > maxSize) "Image should not be larger than 3MB";

    return null;
}

/**
 * Compresses an image using the high-performance createImageBitmap API.
 * @param {File} file - The original image file.
 * @param {number} quality - Compression factor (0 to 1).
 * @returns {Promise<Blob>} - The resulting compressed binary data.
 */
export const compressImage = async (file, {
    maxWidth = 512,
    maxHeight = 512,
    quality = 0.7,
} = {}) => {
    // Convert the file into an ImageBitmap (high-performance decoding)
    const bitmap = await createImageBitmap(file);

    // Get image original width and height
    let { width, height } = bitmap;

    // Maintain aspect ratio
    if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
    }

    // Create an offscreen-style canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set dimensions to match the bitmap
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    // Draw the bitmap onto the canvas
    ctx.drawImage(bitmap, 0, 0, width, height);

    // Clean up memory by closing the bitmap
    bitmap.close();
    console.log('compressed')

    // Return a Promise that resolves with the compressed Blob
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, 'image/jpeg', quality);
    });
}