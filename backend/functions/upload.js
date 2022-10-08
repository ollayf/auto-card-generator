import AWS from 'aws-sdk'
import { config } from '../config.js'
import got from "got"
import { v4 as uuidv4 } from 'uuid';

export async function upload(image_url) {

    const imageName = uuidv4() + '.webp';

    AWS.config.update({
        region: config.awsRegion,
        credentials: {
            accessKeyId: config.awsAccessKey,
            secretAccessKey: config.awsSecretKey
        }
    });
    
    var s3 = new AWS.S3({apiVersion: '2006-03-01'});
    
    const uploadParams = {
        Bucket: config.bucketName,
        Key: imageName,
        Body: ""
    };
    
    // console.log(got.stream(EXAMPLE_PATH))
    uploadParams.Body = got.stream(image_url);
    
    s3.upload (uploadParams, (err, data) => {
        if (err) {
            console.log(err);
            return err;
        } if (data) {
            console.log(data);
            return imageName;
        }
    })
}
