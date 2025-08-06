import dotenv from "dotenv";

// Configure Environment Variable
dotenv.config();

export interface IEnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production",
}

const loadEnvVar  = (): IEnvConfig => {
    const requiredEnvVar: string[] = ["PORT", "DB_URL", "NODE_ENV"];
    requiredEnvVar.forEach(envKey => {
        if(!process.env[envKey]){
            new Error(`Missing required environment variable key: ${envKey}`);
        }
    });
    return{
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URl as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production"
    }
}

export const envVars = loadEnvVar();