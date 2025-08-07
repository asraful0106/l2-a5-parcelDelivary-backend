import mongoose from "mongoose";
import { TErrorSourch, TGenericErrorResponse } from "../interfaces/error.types";

export const handleValidationError = (err: mongoose.Error.ValidationError) : TGenericErrorResponse => {
    const errorSourch: TErrorSourch[] = [];
    const errors = Object.values(err.errors);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors.forEach((errorObject: any) => errorSourch.push({
        path: errorObject.path,
        message: errorObject.message
    }));
    
    return{
        statusCode: 400,
        message: "Validation Error.",
        source: errorSourch
    }
}