import { TErrorSourch, TGenericErrorResponse } from "../interfaces/error.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleZodError = (err: any): TGenericErrorResponse => {
    const errorSource: TErrorSourch[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err.issue.forEach((issue: any) => errorSource.push({
        path: issue.path[issue.path.length - 1],
        message: issue.message
    }));

    return {
        statusCode: 400,
        message: "Zod Error",
        source: errorSource
    }
}