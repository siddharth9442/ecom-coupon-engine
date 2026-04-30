import Product from "../../models/Product.model.js";
import { sendResponse } from "../../utils/response.js";
import { ApiError } from "../../utils/ApiError.js";
import { uploadToCloudinary } from "../../utils/cloudinary.js";
import pLimit from "p-limit";

// add update
export async function add(req, res) {
    try {
        const reqBody = req.body;
        // const limit = pLimit(3); // Limit concurrent uploads to 3

        // let images = [];
        // await Promise.all(
        //     req.files.map((file, index) =>
        //         limit(async () => {
        //             let imageLink = await uploadToCloudinary(file.path, "products");
        //             images.push({
        //                 url: imageLink,
        //                 order: index + 1
        //             });
        //         })
        //     )
        // );

        let product = await Product.findOne({ name: reqBody.name.toUpperCase() }).select("_id");
        console.log("product: ", product);
        
        let payload = {
            displayName: reqBody.name,
            ...reqBody
        };

        let message = product ? "Product updated successfully" : "Product created successfully";
        if (product) {
            // Update existing product
            product = await Product.findByIdAndUpdate(product._id, payload, { new: true });
        } else {
            // Create new product
            console.log("payload: ", payload);
            product = await Product.create(payload);
        }
        return sendResponse(res, {
            statusCode: 201,
            message: message,
            data: product
        });
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.log("Error in ProductController.add: ", error);
        throw new ApiError(500, "Failed to create product");
    }
}

// list
export async function list(req, res) {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        return sendResponse(res, {
            statusCode: 200,
            message: "Products retrieved successfully",
            data: products
        });
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.log("Error in ProductController.list: ", error);
        throw new ApiError(500, "Failed to list products");
    }
}

// get
export async function get(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            throw new ApiError(404, "Product not found");
        }
        return sendResponse(res, {
            statusCode: 200,
            message: "Product retrieved successfully",
            data: product
        });
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.log("Error in ProductController.get: ", error);
        throw new ApiError(500, "Failed to get product");
    }
}

export async function remove(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new ApiError(404, "Product not found");
        }
        return sendResponse(res, {
            statusCode: 200,
            message: "Product deleted successfully",
            data: product
        });
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.log("Error in ProductController.remove: ", error);
        throw new ApiError(500, "Failed to remove product");
    }
}