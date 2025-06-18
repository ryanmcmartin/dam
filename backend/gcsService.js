import { Storage } from "@google-cloud/storage"
import { v4 as uuid } from 'uuid';
import {format} from "util";

const gcsUpload = async (file) => {
    const storage = new Storage();
    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET)

    // const param = {
    //     Bucket: process.env.GCLOUD_STORAGE_BUCKET,
    //     FileName: `appname/${uuid()}-${file.originalname}`,
    //     Body: file.buffer
    // }

    // if (!req.file) {
    //     res.status(400).send('No file uploaded.');
    //     return;
    // }

    // Create a new blob in the bucket and upload the file data.
    const fileName = `app123/${uuid()}-${file.originalname}`
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
        next(err);
    });

    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );

        //return publicUrl
        //res.status(200).send(publicUrl);
    });

    blobStream.end(file.buffer);

    //return await publicUrl
    
}

export default gcsUpload