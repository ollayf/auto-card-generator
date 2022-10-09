import sharp from 'sharp'
import got from 'got';
import request from 'request'
import axios from 'axios'
import fs from 'fs'

const test_file = 'https://openailabsprodscus.blob.core.windows.net/private/user-l8STrI12Dy5OY9ANetL7pjFD/generations/generation-MnHgrAp0cS1xHj6giOV2ypUJ/image.webp?st=2022-10-09T02%3A24%3A15Z&se=2022-10-09T04%3A22%3A15Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-09T01%3A26%3A41Z&ske=2022-10-16T01%3A26%3A41Z&sks=b&skv=2021-08-06&sig=lNtIkZ5KmkNVPJBp0T0UZcFKfOFreLpe4o/PRPK6oro%3D'
const  temp_file = './temp.jpg'
const temp_webp = './temp.webp'

async function get() {
    // const newFile = await fs.createWriteStream(temp_webp);
    // await got.stream(test_file).pipe(newFile)
    // sharp(temp_webp).jpeg().toFile(temp_file)
    const imageResponse = await axios.get(test_file, {
        responseType: 'arraybuffer',
    });
    const img = await sharp(imageResponse.data).toFormat('jpeg').toFile(temp_file);
}

get()