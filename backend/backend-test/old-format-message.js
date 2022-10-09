// const getMaxNextLine = (input, maxChars = 20) => {
//     // Split the string into an array of words.
//     const allWords = input.split(" ");
//     // Find the index in the words array at which we should stop or we will exceed
//     // maximum characters.
//     const lineIndex = allWords.reduce((prev, cur, index) => {
//       if (prev?.done) return prev;
//       const endLastWord = prev?.position || 0;
//       const position = endLastWord + 1 + cur.length;
//       return position >= maxChars ? { done: true, index } : { position, index };
//     });
//     // Using the index, build a string for this line ...
//     const line = allWords.slice(0, lineIndex.index).join(" ");
//     // And determine what's left.
//     const remainingChars = allWords.slice(lineIndex.index).join(" ");
//     // Return the result.
//     return { line, remainingChars };
//   };

// exports.formatMessage = (Message) => {
//     let output = [];
//     // If the Message is 40 characters or longer, look to add ellipses at the end of
//     // the second line.
//     if (Message?.length >= 40) {
//       const firstLine = getMaxNextLine(Message);
//       const secondLine = getMaxNextLine(firstLine.remainingChars);
//       output = [firstLine.line];
//       let fmSecondLine = secondLine.line;
//       if (secondLine.remainingChars.length > 0) fmSecondLine += " ...";
//       output.push(fmSecondLine);
//     }
//     // If 20 characters or longer, add the entire second line, using a max of half
//     // the characters, making the first line always slightly shorter than the
//     // second.
//     else if (Message?.length >= 20) {
//       const firstLine = getMaxNextLine(Message, Message?.length / 2);
//       output = [firstLine.line, firstLine.remainingChars];
//     }
//     // Otherwise, return the short Message.
//     else {
//       output = [Message];
//     }

// return output;
// };
import "./card.css";
const { MyComponent } = require("./messageComponent.js");

// function MyComponent(_message) {
//   return (
//     <div>
//       <div className="parent" id="myMessage">
//         <div className="text-container">
//           <span className="text">
//             {_message}
//           </span>
//         </div>
//       </div>
//       <script src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js" integrity="sha512-01CJ9/g7e8cUmY0DFTMcUw/ikS799FHiOA0eyHsUWfOetgbx/t6oV4otQ5zXKQyIrQGTHSmRVPIgrgLcZi/WMA==" crossorigin="anonymous"></script>
//     </div>
//   )
// };
{/* DOM-to-image cdn */ }
exports.formatMessage = (Message) => {
  let myMessage = MyComponent(Message);
  const isOverflown = ({ clientHeight, scrollHeight }) => scrollHeight > clientHeight

  const resizeText = ({ element, elements, minSize = 10, maxSize = 512, step = 1, unit = 'px' }) => {
    (elements || [element]).forEach(el => {
      let i = minSize
      let overflow = false

      const parent = el.parentNode

      while (!overflow && i < maxSize) {
        el.style.fontSize = `${i}${unit}`
        overflow = isOverflown(parent)

        if (!overflow) i += step
      }

      // revert to last state where no overflow happened
      el.style.fontSize = `${i - step}${unit}`
    })
  }

  resizeText({
    elements: document.querySelectorAll('.text'),
    step: 0.5
  })

  //const myMessage = document.getElementById("myMessage");
  let messageAsImg;
  (async () => {
    try {
      const dataUrl = await domtoimage.toPng(myMessage)
      messageAsImg = new Image();
      img.src = dataUrl;
      // div.appendChild(img);
    } catch (error) {
      console.error('Oops, could not convert DOM to image!', error);
    }
  })()
  return messageAsImg;
};
