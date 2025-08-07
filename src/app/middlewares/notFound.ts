import { NextFunction, Request, Response } from "express";
import httpStatusCodes from "http-status-codes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatusCodes.NOT_FOUND).json({
        success: false,
        message: "Route not found."
    });
}