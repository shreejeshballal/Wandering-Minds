import { nanoid } from "nanoid";
import { s3client } from "../configs/aws.config.js";
import { CustomError } from "../middleware/error-handler.js";

export const generateUploadURL = async (contentType) => {

    const validFileTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/webp",
    ];
    if (!validFileTypes.includes(contentType)) {
        throw new CustomError('Invalid file type');
    }
    const date = new Date();
    const imageName = `${nanoid()}-${date.getTime()}`;

    return await s3client.getSignedUrlPromise('putObject', {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageName,
        Expires: 1000,
        ContentType: contentType
    })
}