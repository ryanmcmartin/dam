//import {format} from "util";
import express, { json } from "express"
import dotenv from "dotenv"
import multer from "multer"
//import { Storage } from "@google-cloud/storage"
import gcsUpload from "./gcsService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000
//const upload = multer({dest: './uploads/'})
const upload = multer({storage: multer.memoryStorage()})
// const storage = new Storage();
// const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET)

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.post("/upload", upload.single('file'), async (req, res, next) => {
    //const file = req.file
    const result = await gcsUpload(req.file)
    res.status(200).json({message: "file uploaded successfully", result})
})

// app.post("/upload_old", upload.single('file'), (req, res, next) => {
//     // console.log(req.file)
//     // res.status(200).json({message: "file uploaded successfully"})
//     if (!req.file) {
//         res.status(400).send('No file uploaded.');
//         return;
//     }

//     // Create a new blob in the bucket and upload the file data.
//   const blob = bucket.file(req.file.originalname);
//   const blobStream = blob.createWriteStream();

//   blobStream.on('error', err => {
//     next(err);
//   });

//   blobStream.on('finish', () => {
//     // The public URL can be used to directly access the file via HTTP.
//     const publicUrl = format(
//       `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//     );
//     res.status(200).send(publicUrl);
//   });

//   blobStream.end(req.file.buffer);
//   console.log(req.file)
   
// })

app.listen(PORT, () => {
    //connectToMongoDB()
    console.log(`Server Running on Port ${PORT}`)
})