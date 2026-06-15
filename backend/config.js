import { createSecretKey } from "crypto";
import dotenv from "dotenv"

dotenv.config()

export const config = {
    JWT: {
        secret: process.env.JWT_Secret_Key
    },

    email: {
        user_email: process.env.USER_EMAIL,
        user_password: process.env.USER_PASSWORD,
    },

    cloudinary: {
        cloud_name: process.env.CLOUDINRY_CLOUD_NAME,
        api_key: process.env.CLOUDIANRY_API_KEY,
        api_secret: process.env.CLOUDIANRY_API_SECRET
    }
}