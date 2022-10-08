import { config } from '../config.js'
import mysql from 'mysql'
import { RDSDataClient, ExecuteStatementCommand } from "@aws-sdk/client-rds-data";



const input = {
    secretArn: config.dbSecretArn,
    resourceArn: config.databaseARN,
    database: config.databaseName,
    sql: ""
}

export async function checkPassword(username, password) {
    console.log(username, password)
    input.sql = "SELECT password_hash FROM users WHERE username = :username"
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

export async function addImage(user_id, prompt, bucket_path) {
    input.sql = "INSERT INTO images_gen (owner_id, prompt, bucket_path) VALUES (:user_id, :prompt, :bucket_path)"
    input.parameters = [
        {
            name: "user_id",
            value: {
                stringValue: user_id
            }
        },
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
}

export async function addCard(senderName, recepientName, prompt, message, theme_id, telegram_chat_id, bucket_path) {
    input.sql = "INSERT INTO cards (senderName, recepientName, prompt, message, theme_id, telegram_chat_id, bucket_path) VALUES (:senderName, :recepientName, :prompt, :message, :theme_id, :telegram_chat_id, :bucket_path)"
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
            name: "theme_id",
            value: {
                stringValue: theme_id
            }
        },
        {
            name: "telegram_chat_id",
            value: {
                stringValue: telegram_chat_id
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
}

async function getInfo(username) {
    
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
    return response.records[0];
}

// console.log(await checkPassword("ollayf", "hello"))