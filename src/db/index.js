import mongoose from "mongoose";
import { DB_NAME } from '../config/config.js';

const url = `${process.env.MONGODB_URI}/${DB_NAME}`;
export async function connectDB(){
    try {
        await mongoose.connect(url);
    } catch (error) {
       console.log("Error in connectDB: ", error); 
    }
}