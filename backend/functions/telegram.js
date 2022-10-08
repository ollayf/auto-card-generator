import telegram from 'node-telegram-bot-api';
import {config} from '../config.js'

// const example_photo_url = "https://image.shutterstock.com/image-photo/macro-imagr-bee-beautiful-cosmos-260nw-1282844221.jpg"

var bot = new telegram(config.telegramBotKey, 
{
    polling: false
});

export function sendPhoto(chat_id, photo_url) {
    bot.sendPhoto(chat_id, photo_url);
} 
