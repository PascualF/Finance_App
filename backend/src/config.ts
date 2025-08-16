import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_EN || 'development';
dotenv.config( { path: path.resolve(__dirname, `../.env.${env}`)} )

export const JWT_SECRET = process.env.JWT_SECRET
export const DB_URL = process.env.DB_URL
export const PORT = process.env.PORT || 4000