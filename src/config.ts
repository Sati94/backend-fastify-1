import dotenv from 'dotenv'

dotenv.config();

if (!process.env.DB_CONNECTON_STRING || !process.env.PORT) {
    throw new Error("Missing required environment variables (DATABASE_URL or PORT)");
}

export const config = {
    databaseURL: process.env.DB_CONNECTON_STRING,
    port: Number(process.env.PORT)
}