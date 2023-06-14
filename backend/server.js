// type : "module" in package.json this requires to use only import not require
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

// <-------------------------------Middlewares------------------------------------------>
//middleware related to security of http requests TODO:Explore more
import helmet from "helmet";
//middleware to log the request http
import morgan from "morgan";
import bodyParser from "body-parser";
import multer from 'multer';


// <---------------------------------Routes---------------------------------------------->
import postRouter from "./Routes/postRouter.js";
import auth from "./Routes/auth.js";
import userRouter from "./Routes/userRouter.js";


//<-----------------------------------DontEnv Configs------------------------------------>
import dotenv from 'dotenv';
dotenv.config({path: '../backend/SECRETS.env'});


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//connect to the MONGODB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    autoIndex: true
  })
  .then(()=> {
     app.listen(process.env.PORT || 8900, () => {
        console.log("server started at 8900");
      });
  })
  .catch((error)=>{
     console.log(error.message);
  });


app.use(cors());
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({ extended: true, limit:"50mb"}))
app.use(morgan("common"))
app.use(helmet({
  crossOriginResourcePolicy: false,
}))




//<------------------------------------routers paths------------------------------------->
//we are basically setting the root path of router
app.use("/posts", postRouter);
app.use("/auth", auth);
app.use("/user", userRouter);


//multer 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Public/images')
  },
  filename: function (req, file, cb) {
    console.log(req.body);
    cb(null, req.body.name);
  }
})
const upload = multer({ storage: storage })
app.use("/images", express.static(path.join(__dirname, "Public/images")));
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.body.file);
  console.log(req.body.name);
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

