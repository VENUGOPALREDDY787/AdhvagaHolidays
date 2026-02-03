import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apikey,
  api_secret: process.env.apisecreateKey,
});

export default cloudinary;
