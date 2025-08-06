import { Server } from "http";
import app from "./app";
import { connectWithDb } from "./app/database/db";
import { envVars } from "./app/configs/env";

let server: Server;

const startServer = async () => {
    try {
        await connectWithDb(envVars.DB_URL)
        // eslint-disable-next-line no-console
        server = app.listen(envVars.PORT, () => console.log(`Server is running at port: ${envVars.PORT}`));
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
    }
}

// Handeling the server starting logic
(async () => {
    await startServer();
})(); // effie funtion



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleServerError = (massage: string, err: any, server: Server) => {
    // eslint-disable-next-line no-console
    console.log(massage, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
}

// Handeling the unhandledRejection Error.
process.on("unhandledRejection", (err) => {
    handleServerError("Unhandeled rejection detected!.....Server is shuting down. Err: ", err, server);
});

// Handleing the uncaughtexcteption Error.
process.on("uncaughtException", (err) => {
    handleServerError("Uncaught exception detected!.....Server is shuting down. Err: ", err, server);
});

// SIGTERM -> error throw by the cloud/service provider
process.on("SIGTERM", (err) => {
    handleServerError("'SIGTERM' detected!...Server is shuting down. Err: ", err, server);
});