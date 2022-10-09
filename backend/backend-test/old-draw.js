// import fetch from "node-fetch";
// console.log("hello world")
//import  fs from 'fs';

const data = {
    SenderName:"Hosea",
    RecepientName: "YiXuan",
    Message: "Hello this card is for you",
    Prompt: "dove breaking chains",
    Theme: "Theme2",
    Theme2Details: {
        colour:"ff4040",
        messageHWXY:[260,260,63,72]
    }
}

// const { config } = JSON.parse(fs.readFileSync('./data.json'));
// import { data } from './data.json';
// assert { type: 'JSON' };
// const jsonData = require('./data.json')
// console.log(config);

const { registerFont, Image, createCanvas } = require("canvas");
registerFont('./fonts/comicsans.ttf', { family: 'Comic Sans' }) //whatever font Theme2 is
const fs = require("fs");
const { formatMessage } = require("./old-format-message");

//console.log(jsonData)

// Dimensions for the image
const width = 1200;
const height = 627;
// Extract the starting Y value for the message's position, which
// we'll move if we add a second line.
let messageX = messageXY[0];
let messageY = messageXY[1];
// Set the line height of the text, which varies based on the
// font size and family.
const lineHeight = 100;

//read json file on server
// fetch('./data.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));

// Instantiate the canvas object
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

// // Fill the rectangle with purple
// context.fillStyle = "#764abc";
// context.fillRect(0, 0, width, height);

const img = new Image()
img.onload = () => context.drawImage(img, 0, 0)
img.onerror = err => { throw err }
img.src = './images/CelesteSummit.png'

// OR if From a remote URL:
// img.src = 'http://picsum.photos/200/300'

// OR if From a `data:` URI:
// img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='


// Format message and render to the canvas.
context.font = '70pt "Comic Sans"'
context.textAlign = "center";
context.fillStyle = "#fff";
const messageAsImg = formatMessage(data.Message);
messageAsImg.onload = () => context.drawImage(messageAsImg, messageX, messageY)
messageAsImg.onerror = err => { throw err }

// const text = formatMessage(data.Message);
// context.fillText(text[0], messageX, messageY);

// // If we need a second line, we move use the messageY and lineHeight
// // to find the appropriate Y value.
// if (text[1]) context.fillText(text[1], 600, messageY + lineHeight);

// Write the image to file
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./image.png", buffer);