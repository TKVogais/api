const aws = require('aws-sdk/clients/s3')
const fs = require('fs')
require('dotenv').config()

const bucket = process.env.NODE_S3_BUCKET
const region = process.env.NODE_S3_BUCKET_REGION
const accessKeyId = process.env.NODE_AWS_ID
const secretAccessKey = process.env.NODE_S3_SECRET_ACESS_KEY


const s3 = new aws({
    region,
    accessKeyId,
    secretAccessKey
})
const uploadS3 = (file) => {
    console.log("FILE PATH: " + file.path)
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: bucket,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
}



exports.uploadFile = uploadS3