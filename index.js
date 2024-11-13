import express from "express";

import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import {v2 as cloudinary} from 'cloudinary';
import bodyParser  from "body-parser";
import imageRoute from "./src/Routes/ImageRoutes.js";
dotenv.config()

const app  = express();


// Set size on the incoming request body.
app.use(bodyParser.json({limit : "50mb"}));
app.use(morgan("dev"));



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


app.use("/api", imageRoute);


app.listen(3022, () =>{
    console.log(`Serving one port 3022`);
});