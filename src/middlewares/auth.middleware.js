import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/index.js';

export async function authenticate(req, _, next){
    try {
        const accessToken = req?.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!accessToken) throw new ApiError(401, "Unauthorized request.");

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
        const user = await User.findById(decodedToken._id).select("-__v -refreshToken");
        if(!user) throw new ApiError(401, "Invalid access token.");

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.log("Error in UserController.logout: ", error);
        throw new ApiError(500, "Error in middleware.authenticate");
    }
};