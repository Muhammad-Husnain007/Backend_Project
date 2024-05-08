import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME|| 'drj6zra5d', 
    api_key: process.env.CLOUDINARY_API_KEY || '735237695617333', 
    api_secret: process.env.CLOUDINARY_API_SECRET|| 'hSEMn5dn61HZgPT3CWEN_kwr-YE' ,
});
const fileUploadCloudinary = async (localFilePath) => {
  try {
    if(!localFilePath) return null 
    const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto"
    })
    // console.log("File Uploaded Successfully")
    
    fs.unlinkSync(localFilePath)
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null
  }
}

export default fileUploadCloudinary; 