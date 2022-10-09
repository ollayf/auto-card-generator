import { sendPhoto } from "./telegram.js";
import { generate } from "./dalle.js";
import {classify} from './classifyDoc.js';
import { upload } from "./upload.js";
import { addCard, addImage } from "./database.js";
import AWS from 'aws-sdk'
import got from "got"
import { v4 as uuidv4 } from 'uuid';
import {config} from '../config.js'
import fs from 'fs';
import sharp from 'sharp';
import axios from 'axios'

export async function submit(senderName, recepientName, message, prompt, theme=null, telegram_chat_id) {
    const reverse_labels = {
        birthday: 1,
        encouragement: 2,
        melancholic: 3,
        thanksgiving: 4,
        administrative: 5,
        festive: 6,
        love: 7
    }

    // TODO CHOOSE TEMPLATE
    if (!theme) {
        theme = reverse_labels[classify(message)]; // must be integer
    }
    // TODO DALLE connection => return file path
    var [filepath1, filepath2, filepath3, filepath4] = await generate(prompt);
    // var filepath1 = "https://openailabsprodscus.blob.core.windows.net/private/user-l8STrI12Dy5OY9ANetL7pjFD/generations/generation-zGAgcvRi260TBaPCd36qBB47/image.webp?st=2022-10-09T01%3A37%3A07Z&se=2022-10-09T03%3A35%3A07Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-09T00%3A38%3A40Z&ske=2022-10-16T00%3A38%3A40Z&sks=b&skv=2021-08-06&sig=1Osc56vmcE%2B2649V7r9u1K7gQg78FcFwynlNqpoP7sM%3D";
    // TODO INSERT FILE PATH INTO S3 bucket
    // upload(filepath1)
    // await upload(filepath2)
    // await upload(filepath3)
    // var filepath1 = "https://openailabsprodscus.blob.core.windows.net/private/user-l8STrI12Dy5OY9ANetL7pjFD/generations/generation-TBQdu0eWSEj8EjHTFaEclL3g/image.webp?st=2022-10-08T23%3A14%3A35Z&se=2022-10-09T01%3A12%3A35Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-08T22%3A00%3A08Z&ske=2022-10-15T22%3A00%3A08Z&sks=b&skv=2021-08-06&sig=RDw6qGcnuuuasyBlDver35lsywqq5MBZjyPfpqE%2BqGA%3D"
    console.log("File path here ", filepath1)
    const imageName = uuidv4() + '.jpg';

    await AWS.config.update({
        region: config.awsRegion,
        credentials: {
            accessKeyId: config.awsAccessKey,
            secretAccessKey: config.awsSecretKey
        }
    });

    // upload to bucket
    var s3 = await new AWS.S3();
    // console.log("new instance")
    const uploadParams = {
        Bucket: config.bucketName,
        Key: imageName,
        Body: ""
    };
    // console.log("set up params")
    // console.log(got.stream(EXAMPLE_PATH))
    const imageResponse = await axios.get(filepath1, {
        responseType: 'arraybuffer',
    });
    const buffer = await sharp(imageResponse.data).toFormat('jpeg');
    // await buffer.toFile('./tmp.jpg')
    uploadParams.Body = buffer;
    s3.upload (uploadParams, async (err, data) => {
        if (err) {
            console.log("ERR!!!!", err);
            return err;
        } if (data) {
            console.log(data);
            addImage(prompt, data.Location);
            addCard(senderName, recepientName, prompt, message, reverse_labels[theme], telegram_chat_id, data.Location);    // SEND TO TELEGRAM
            // TODO COMBINE INTO ONE BIG CARD
            const card_path = data.Location;
            console.log("Adding card etc")
        
            // console.log(final_path);
            sendPhoto(telegram_chat_id, card_path);
            // console.log("Finishing uploading");
            // // TODO INSERT INTO DB
            // sendPhoto(telegram_chat_id, filepath2);
            // sendPhoto(telegram_chat_id, filepath3);
            // sendPhoto(telegram_chat_id, filepath4);
            
            // console.log(typeof uploadParams.Body)
            // console.log(uploadParams.Body)
        }
    })
}

// submit("hi", "hi", "hi", "Plants versus Men", 1, 333647246)