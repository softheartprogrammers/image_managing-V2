import express from "express";

import dotenv from "dotenv";
import mongoose from "mongoose";
import {v2 as cloudinary} from 'cloudinary';
import bodyParser  from "body-parser";
dotenv.config()





mongoose.connect(process.env.DB_URL)
    .then(() =>{
        console.log("DB connection was successful")
    })
    .catch(err => {
        console.log(err)
    })

    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
      });


const app  = express();


app.listen(3022, () =>{
    console.log(`Serving one port 3022`)
});