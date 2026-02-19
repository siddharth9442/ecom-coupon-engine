import { model, Schema } from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    fullName: { type: String },
    email: { type: String, trim: true },
    mobileNo: { type: String, trim: true },
    avatarUrl: { type: String },
    authProvider: { type: String, enum: [ "google" ] },
    providerId: { type: String },
    accessToken: { type: String },  // storing temporarily as dont have frontend to store
    refreshToken: { type: String },
});

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            fullName: this.fullName,
            email: this.email,
            avatarUrl: this.avatarUrl
        },
        process.env.ACCESS_TOKEN_SECRETE,
        {
            expiresIn: "15m"
        }
    );
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRETE,
        {
            expiresIn: "7d"
        }
    )
}

const User = model('Users', userSchema, "users");
export default User;