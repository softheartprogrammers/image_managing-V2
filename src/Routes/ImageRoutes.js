import { Router } from "express";
import {v2 as cloudinary} from 'cloudinary';

import Image from '../../model/ImageModel.js' ;


const imageRoute = Router();

imageRoute.post("/upload", async(req, res) => {
    try{
        const {image, title} = req.body;
        if (!image){
            return res.status(400).json({
                message: "Image no found"
            });
        }

        const validateBase64Image = (image) => {
            const formats = {
                jpeg: "data:image/jpeg;base64,",
                png: "data:image/png;base64,",
            }
            

            // Check if the image starts with any valid format prefix

            for(const prefix of Object.values(formats)){
                // For each iteration checks if the image string begins with the current prefix using the startsWith method.

                if (image.startsWith(prefix)) {  // image.startsWith(prefix) return true if the image starts with the specified prefix, indicating that the image format is valid and matches one of the supported formats (JPEG OR PNG)
                    return true;
                }
                return false;
            }
        }


        // Validate Image format
        if(!validateBase64Image(image)){
            return res.status(400).json({
                message: "Invalid base64 image format"
            })
        }

        const result = await cloudinary.uploader.upload_large(image)
        console.log(result);

        await new Image({title, imageUrl:result.secure_url, public_id: result.public_id}).save();
        res.status(201).json({
            message: "Image successfully uploaded."
        });


    }catch(error){
        res.status(500).json({ message :
            error.message || "Server error"})
    }

    
});


imageRoute.get("/allImages", async(req, res) => {
    try {
        const AllImages = await Image.find() // get all images.

        if(!AllImages.length){
            return res.status(404).json({message: "No Image was found"})
        }

        res.status(200).json(AllImages)
    } catch (error) {
        res.status(500).json({message: error})
    }
});

export default imageRoute;