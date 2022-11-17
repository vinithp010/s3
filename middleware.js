import aws from 'aws-sdk'
import multerS3 from 'multer-s3'    
import multer from 'multer'
import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()

const spaceEndPoint = new aws.Endpoint("sgp1.digitaloceanspaces.com");
const s3 = new aws.S3({
    endpoint: spaceEndPoint,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
})

var upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'frego-space',
        key: async function (req, file, cb) {
            
            file.s3Name = Math.floor(Math.random() * 10000) + Date.now() + path.extname(file.originalname).toString();
            req.s3Name = file.s3Name
            cb(null, file.s3Name);
        }
    })
});

export default upload;