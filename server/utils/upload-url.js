import { nanoid } from "nanoid";
import { s3client } from "../configs/aws.config.js";

export const generateUploadURL = async () => {
    const date = new Date();
    const imageName = `${nanoid()}-${date.getTime()}`;

    return await s3client.getSignedUrlPromise('putObject', {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageName,
        Expires: 1000,
        ContentType: 'image/jpeg'
    })
}