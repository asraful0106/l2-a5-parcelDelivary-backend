/* eslint-disable no-console */
import mongoose from "mongoose";

export const connectWithDb = async (url: string) =>{
    try{
        mongoose.connect(url);
        console.log("Connected with DB!");
    }catch(err) {
        console.log("Database Connection Error: ", err);
    }
}