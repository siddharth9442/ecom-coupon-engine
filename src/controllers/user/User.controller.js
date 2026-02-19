import { User } from '../../models/index.js';
import { sendResponse } from '../../utils/response.js';
import { ApiError } from '../../utils/ApiError.js';

export async function googleCallback(req, res) {
    try {
        const user = await User.findById(req.user._id);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        await User.findByIdAndUpdate(user._id, {
            $set: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        });
        return res.redirect(`${process.env.BASE_URL}/user?token=${accessToken}`);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.log("Error in UserController.googleCallback: ", error);
        throw new ApiError(500, "Failed to login user");
    }
}

export async function logout(req, res) {
    try {
        const userId = req.user._id;
        await User.findByIdAndUpdate(userId, {
            $unset: {
                accessToken: 1
            }
        });
        
        return sendResponse(res, {
            statusCode: 200,
            message: "User logged out successfully",
            data: null
        });
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.log("Error in UserController.logout: ", error);
        throw new ApiError(500, "Failed to logout user");
    }
}