import { config } from '../config.js'
import mysql from 'mysql'
import { RDSDataClient, ExecuteStatementCommand } from "@aws-sdk/client-rds-data";



const input = {
    secretArn: config.dbSecretArn,
    resourceArn: config.databaseARN,
    database: config.databaseName,
    sql: "",
    parameters: []
}

export async function checkPassword(username, password) {
    console.log(username, password)
    input.sql = "SELECT password_hash FROM users WHERE username = :username;"
    input.parameters = [
        {
            name: "username",
            value: {
                stringValue: username
            }
        }
    ]
    const res = await runCommand(input);
    return res[0].stringValue == password
}

export async function addImage(prompt, bucket_path) {
    console.log(prompt, bucket_path);
    input.sql = "INSERT INTO images_gen (prompt, bucket_path) VALUES (:prompt, :bucket_path);"
    // input.sql = "INSERT INTO images_gen (owner_id, prompt, bucket_path) VALUES (:user_id, :promp)"
    input.parameters = [
        {
            name: "prompt",
            value: {
                stringValue: prompt
            }
        },
        {
            name: "bucket_path",
            value: {
                stringValue: bucket_path
            }
        }
    ]
    await runCommand(input);
    console.log("DONE HEere")
}

export async function addCard(senderName, recepientName, prompt, message, theme_id, telegram_chat_id, bucket_path) {
    console.log("Started adding card")
    input.sql = "INSERT INTO cards (sender_name, recepient_name, prompt, message, bucket_path) VALUES (:senderName, :recepientName, :prompt, :message, :bucket_path);"
    input.parameters = [
        {
            name: "senderName",
            value: {
                stringValue: senderName
            }
        },
        {
            name: "recepientName",
            value: {
                stringValue: recepientName
            }
        },
        {
            name: "prompt",
            value: {
                stringValue: prompt
            }
        },
        {
            name: "message",
            value: {
                stringValue: message
            }
        },
        {
            name: "bucket_path",
            value: {
                stringValue: bucket_path
            }
        }
    ]
    await runCommand(input);
    console.log("DONE Adding card")
}

async function runCommand(input) {
    const client = new RDSDataClient({
        region: config.awsRegion,
        credentials: {
            accessKeyId: config.awsAccessKey,
            secretAccessKey: config.awsSecretKey
        },
        // endpoint: config.databaseEP,
    
    });
    const command = new ExecuteStatementCommand(input);
    const response = await client.send(command);
    // console.log(response.records[0])
    return response;
}

// console.log(await checkPassword("ollayf", "hello"))