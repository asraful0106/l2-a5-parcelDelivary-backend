import express, { Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";


const app = express();

// MidleWears
app.use(globalErrorHandler); //For handeling errors
app.use(notFound); //For handeling not found routes

app.get('/', (req: Request, res: Response) => {
    res.send("Hey!!! Server is running.");
})

export default app;