// src/api/cloudinary.js
// MOCK API for Cloudinary Image Uploads (B)
export const uploadImageToCloudinary = async (file) => {
    if (!file) return null;
    console.log(`MOCK: Uploading file: ${file.name}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUrl = `https://res.cloudinary.com/exza-cloud/image/upload/v123456/${file.name.replace(/\s/g, '_')}`;
    return mockUrl;
};