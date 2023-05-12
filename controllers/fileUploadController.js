const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

const bucket = 'frank-booking-app';

const uploadToS3 = async (path, originalFilename, mimetype) => {
    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }
    });

    const parts = originalFilename.split(".");
    const ext = parts[parts.length - 1];
    const newFilename = Date.now() + "." + ext;

    await client.send(new PutObjectCommand({
        Bucket: bucket,
        Body: fs.readFileSync(path),
        Key: newFilename,
        ContentType: mimetype,
        ACL: 'public-read'
    }));

    return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}


const fileUpload = async (req, res) => {
    const uploadedFiles = [];
    const files = req.files;
    for (let i = 0; i < files.length; i++) {
        const { path, originalname, mimetype } = files[i]
        
        const url = await uploadToS3(path, originalname, mimetype);
        uploadedFiles.push(url)
    }
    
    res.status(200).json(uploadedFiles)
}



module.exports = {
    fileUpload
}