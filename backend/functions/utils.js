import { sendPhoto } from "./telegram.js";
import { generate } from "./dalle.js";
import {classify} from './classifyDoc.js';
import { upload } from "./upload.js";
import { addCard, addImage } from "./database.js";

export async function submit(user_id, senderName, recepientName, message, prompt, theme=null, telegram_chat_id) {
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
    const [filepath1, filepath2, filepath3, filepath4] = await generate(prompt);
    // TODO INSERT FILE PATH INTO S3 bucket
    // upload(filepath1)
    // upload(filepath2)
    // upload(filepath3)
    const final_path = upload(filepath4)
    // TODO INSERT INTO DB
    addImage(telegram_chat_id, prompt, final_path)
    // TODO COMBINE INTO ONE BIG CARD
    const card_path = 'generated here';
    addCard(senderName, recepientName, prompt, message, reverse_labels[theme], telegram_chat_id, card_path);    // SEND TO TELEGRAM
    sendPhoto(telegram_chat_id, filepath1);
    // sendPhoto(telegram_chat_id, filepath2);
    // sendPhoto(telegram_chat_id, filepath3);
    // sendPhoto(telegram_chat_id, filepath4);
}

// submit("hi", "hi", "hi", "Plants versus Men", 1, 333647246)