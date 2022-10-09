import AWS from 'aws-sdk'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from '../config.js'
import got from "got"
import { v4 as uuidv4 } from 'uuid';
import { PassThrough } from 'stream';

export async function upload(image_url) {
    console.log("");
    console.log(image_url)
    console.log("Type of: ", typeof image_url)

    const imageName = uuidv4() + '.webp';

    await AWS.config.update({
        region: config.awsRegion,
        credentials: {
            accessKeyId: config.awsAccessKey,
            secretAccessKey: config.awsSecretKey
        }
    });

    // console.log("finished updating");
    
    var s3 = await new AWS.S3();

    // console.log("new instance")
    
    const uploadParams = {
        Bucket: config.bucketName,
        Key: imageName,
        Body: ""
    };

    // console.log("set up params")
    
    // console.log(got.stream(EXAMPLE_PATH))
    uploadParams.Body = await got.stream(image_url);

    // console.log(typeof uploadParams.Body)
    // console.log(uploadParams.Body)
    
    await s3.upload (uploadParams, (err, data) => {
        if (err) {
            console.log("ERR!!!!", err);
            return err;
        } if (data) {
            console.log(data);
            return imageName;
        }
    })
}

export async function upload2(image_url) {
    console.log("");
    console.log(image_url)
    console.log("Type of: ", typeof image_url)

    const imageName = uuidv4() + '.webp';

    const client = new S3Client({
        region: config.awsRegion,
        credentials: {
            accessKeyId: config.awsAccessKey,
            secretAccessKey: config.awsSecretKey
        }
    });
    console.log("HGERREEW")
    const stream_i = await got.stream(image_url);
    const input = {
        Body: stream_i,
        Bucket: "cards-generator",
        Key: imageName
    };
    console.log("HGERREEewfqerewqrqwrwer")
    const command = new PutObjectCommand(input);
    console.log("HGERREEewfqerewqrqwrwerwerfqwhjrewkrbjq")
    const response = await client.send(command)
    console.log(response)
    
}
// upload2("https://openailabsprodscus.blob.core.windows.net/private/user-l8STrI12Dy5OY9ANetL7pjFD/generations/generation-TBQdu0eWSEj8EjHTFaEclL3g/image.webp?st=2022-10-08T23%3A14%3A35Z&se=2022-10-09T01%3A12%3A35Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-08T22%3A00%3A08Z&ske=2022-10-15T22%3A00%3A08Z&sks=b&skv=2021-08-06&sig=RDw6qGcnuuuasyBlDver35lsywqq5MBZjyPfpqE%2BqGA%3D")