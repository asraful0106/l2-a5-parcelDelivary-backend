import express, { Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";


const app = express();

// MidleWears
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
    res.send("Hey!!! Server is running.");
})

export default app;