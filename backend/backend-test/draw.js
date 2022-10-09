//example from JSON
const data = {
    SenderName: "Hosea",
    RecipientName: "YiXuan",
    Message: "Hello this card is for you",
    Prompt: "dove breaking chains",
    Theme: "Encouragement",
}

const template = {
    SenderName: {
        "XYWHpos": [559, 396],
        "font": "Source Serif Pro",
        "font-size": 12
    },
    RecipientName: {
        "XYWHpos": [12, 34],
        "font": "Source Serif Pro",
        "font-size": 12
    },
    Message: {
        "font": "Source Serif Pro",
        "font-size": 12
    },
    Theme: {
        "Encouragement": {
            "colour": "#000000",
            "MessageXYWH": [
                63,
                72,
                260.87,
                269.16
            ],
            "SenderName": {
                "XYWHpos": [
                    438,
                    339,
                    105,
                    28
                ],
                "font": "Source Serif Pro",
                "font-size": 12
            },
            "RecipientName": {
                "XYWHpos": [
                    81,
                    12,
                    120.75,
                    28
                ],
                "font": "Source Serif Pro",
                "font-size": 12
            },
            "artXYWH": [
                363.91,
                19.31,
                175.45,
                175.45
            ]
        }
    },
}


function formatMessage(_message) {
    // var m = context.measureText(_message)
    // var fontsize = m.fontBoundingBoxAscent+m.fontBoundingBoxDescent
    // var height = m.actualBoundingBoxAscent+m.actualBoundingBoxDescent
    // var width = m.width
    // var diffh = height - data.Theme2Details.messageHWXY[0]
    // var diffw = width - data.Theme2Details.messageHWXY[1]
    // var z = Math.max(Math.abs(diffh),Math.abs(diffw))
    // var scalefactor = 1
    // if (diffh > 0 && diffw > 0){
    //     //scale down
    //     if (Math.abs(diffh)>Math.abs(diffw)){
    //         scalefactor = (h-z/h)
    //     }
    //     else{
    //         scalefactor = (w-z/w) 
    //     }
    // }
    // if (diffh < 0 && diffw < 0){
    //     //scale up
    //     if (Math.abs(diffh)>Math.abs(diffw)){
    //         scalefactor = (h+z/h)
    //     }
    //     else{
    //         scalefactor = (w+z/w) 
    //     }
    // }
    // newsize = scalefactor*(fontsize)
    // // const Weight = '400' //normal
    // // const Style = 'normal'
    // // const FontSize = newsize
    // const FontFamily = 'Proxima Nova Condensed'
    // context.font = newsize+'px'+FontFamily
    // console.log(context.font)
    // console.log(m.fontBoundingBoxAscent,m.fontBoundingBoxDescent)
    // console.log(scalefactor,fontsize)
    // console.log(m)


    const getMaxNextLine = (input, maxChars = 20) => {
        // Split the string into an array of words.
        const allWords = input.split(" ");
        // Find the index in the words array at which we should stop or we will exceed
        // maximum characters.
        const lineIndex = allWords.reduce((prev, cur, index) => {
            if (prev?.done) return prev;
            const endLastWord = prev?.position || 0;
            const position = endLastWord + 1 + cur.length;
            return position >= maxChars ? { done: true, index } : { position, index };
        });
        // Using the index, build a string for this line ...
        const line = allWords.slice(0, lineIndex.index).join(" ");
        // And determine what's left.
        const remainingChars = allWords.slice(lineIndex.index).join(" ");
        // Return the result.
        return { line, remainingChars };
    };

    let output = [];
    // If the Message is 40 characters or longer, look to add ellipses at the end of
    // the second line.
    if (_message?.length >= 40) {
        const firstLine = getMaxNextLine(_message);
        const secondLine = getMaxNextLine(firstLine.remainingChars);
        output = [firstLine.line];
        let fmSecondLine = secondLine.line;
        if (secondLine.remainingChars.length > 0) fmSecondLine += " ...";
        output.push(fmSecondLine);
    }
    // If 20 characters or longer, add the entire second line, using a max of half
    // the characters, making the first line always slightly shorter than the
    // second.
    else if (_message?.length >= 20) {
        const firstLine = getMaxNextLine(_message, _message?.length / 2);
        output = [firstLine.line, firstLine.remainingChars];
    }
    // Otherwise, return the short Message.
    else {
        output = [_message];
    }

    return output;
};

// Setup
const { registerFont, Image, createCanvas, loadImage } = require("canvas");
registerFont('./fonts/SourceSerifPro.ttf', { family: 'Source Serif Pro' }) //whatever font Theme2 is
const fs = require("fs");

// Dimensions for the card
const width = 559;
const height = 396;

let Encouragement = data.Theme
console.log(Encouragement)
let messageX = template.Theme.Encouragement.MessageXYWH[0];
let messageY = template.Theme.Encouragement.MessageXYWH[1];
console.log(messageX, messageY) // 63,72
// Set the line height of the text, which varies based on the
// font size and family.
const lineHeight = 18; //hardcoded for message

// Instantiate the canvas object
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");
// setting the card background
const bg = new Image()
bg.onload = () => context.drawImage(bg, 0, 0)
bg.onerror = err => { throw err }
bg.src = './images/sample_card_bg.png'
// OR if From a remote URL:
// img.src = 'http://picsum.photos/200/300'
// OR if From a `data:` URI:
// img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='

// Check Position of Textboxes
context.fillStyle = "#764abc";
context.fillRect(63, 72, 260.87, 269.16); //message XYWH
context.fillRect(438, 339, 105, 28); //sendername XYWH
context.fillRect(81, 12, 120.75, 28); //recipientname XYWH


// Format message and render to the canvas.
context.font = '12px "Source Serif Pro"'
context.textAlign = "left";
context.fillStyle = template.Theme.Encouragement.colour;
const formatted = formatMessage(data.Message);
context.fillText(formatted[0], messageX, (messageY+template.Theme.Encouragement.MessageXYWH[3]/2)); //take note of textAlign property
// // If we need a second line, we move use the messageY and lineHeight
// // to find the appropriate Y value.
if (formatted[1]) context.fillText(formatted[1], messageX, messageY + lineHeight);

//SenderName
context.font = '12px "Source Serif Pro"'
context.textAlign = "left";
context.fillStyle = template.Theme.Encouragement.colour;
context.fillText(data.SenderName, template.Theme.Encouragement.SenderName.XYWHpos[0], template.Theme.Encouragement.SenderName.XYWHpos[1]+(template.Theme.Encouragement.SenderName.XYWHpos[3]/2));

//RecipientName
context.font = '12px "Source Serif Pro"'
context.textAlign = "left";
context.fillStyle = template.Theme.Encouragement.colour;
context.fillText(data.RecipientName, template.Theme.Encouragement.RecipientName.XYWHpos[0], template.Theme.Encouragement.RecipientName.XYWHpos[1]+(template.Theme.Encouragement.RecipientName.XYWHpos[3]/2));

// Set the coordinates for the image position.
const imagePosition = {
    // w: 400,
    // h: 88,
    // x: 400,
    // y: 75,
    x: 363.91,
    y: 19.31,
    w: 175.45,
    h: 175.45
};

//Encouragement.artXYWH

// Load the logo file and then render it on the screen.
loadImage("./public/logo192.png").then((image) => {
    const { w, h, x, y } = imagePosition;
    context.drawImage(image, x, y, w, h);

    // Write final card to file
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./image.png", buffer);
})