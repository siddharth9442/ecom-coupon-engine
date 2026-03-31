import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (localFilePath, folderName) => {
    try {
        // No file to upload
        if (!localFilePath) return null;

        // upload file to Cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, { folder: folderName });
        
        // Clean up temp file after upload
        if (result && result.secure_url) {
            fs.unlinkSync(localFilePath);
        }

        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image');
    }
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary deletion error:', error);
        throw new Error('Failed to delete image');
    }
};