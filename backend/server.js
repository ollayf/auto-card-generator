import express from 'express';
// import { insert } from './csv-related/utils.js';
import { sendPhoto } from './functions/telegram.js';
import cors from 'cors';
import { generate } from './functions/dalle.js';
import { submit } from './functions/utils.js';
import { checkPassword } from './functions/database.js';
import bodyParser from 'body-parser';

const app = express()
const port = 3000
app.use(cors())
app.options('*', cors()); // Have fun with this
app.use(express.json())
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

app.get('/credentials', (req, res) => {
    res.status(200).send("Credentials Accepted!");
});

app.post('/submission', async function(req, res) {
    const template = {
        'senderName': String,
        'recepientName': String,
        'message': String,
        'prompt': String,
        'theme': Number, // 1 to 7
        'telegram_chat_id': Number
    }
    submit(req.body.senderName, req.body.recepientName, req.body.message, req.body.prompt, req.body.theme, req.body.telegram_chat_id);
    res.status(200).send("Added your job to queue");
});

app.get('/checkPassword', async function(req, res) {
    const correct = await checkPassword(req.body.username, req.body.password)
    if (correct) {
        res.status(200).send("Accepted Creds");
    } else {
        res.status(202).send("Issue occurred");
    }
})

// app.get('/simpleInsert', (.body, res) => {
//     console.log(req.body);
//     insert(req.body);

//     res.status(200).send("Done with simple insert");
// })

// app.post('/findEntries', async function(req, res) {
//     console.log(req.body)
//     const finalJson = await findEntries(req.body)
//     console.log(finalJson);
//     console.log('HEREHRJEWHE');
//     res.json(finalJson);
// })

// app.put('/updateEntries', (req, res) => {
//     const finalJson = updateEntries(req.body);
//     res.status(200).send("Updated!");
// })
// app.delete('/deleteEntries', (req, res) => {
//     const finalJson = deleteEntries(req.body);
//     res.status(200).send("Deleted!");
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})