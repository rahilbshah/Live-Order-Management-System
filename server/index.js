import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();


const connect=async ()=>{
    try {
      await  mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDb");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDb Disconnected");
})


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(8300,()=>{
    connect()
    console.log("connected to backend");
})
