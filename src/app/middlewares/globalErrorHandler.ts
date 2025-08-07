import { NextFunction, Request, Response } from "express";
import { envVars } from "../configs/env";
import { TErrorSourch } from "../interfaces/error.types";
import { handleCastError } from "../helpers/handelCastErrors";
import { handleZodError } from "../helpers/handleZodError";
import { handleValidationError } from "../helpers/handlevalidationError";
import AppError from "../errorHelpers/AppError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(envVars.NODE_ENV == "development"){
        // eslint-disable-next-line no-console
        console.log(err);
    }

    let statusCode = 500;
    let message = "Something went wrong";
    let errorSources : TErrorSourch[] =[];

    if(err.code === 11000){
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        
    } else if (err.name === "CastError"){
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    } else if (err.name === "ZodError") {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.source as TErrorSourch[]
    }
    //Mongoose Validation Error
    else if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.source as TErrorSourch[]
        message = simplifiedError.message
    } else if (err instanceof AppError){
        statusCode = err.statusCode;
        message = err.message;
    }else if (err instanceof Error){
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: envVars.NODE_ENV === "development" ? err : null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    });
}