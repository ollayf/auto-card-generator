import { ComprehendClient, ClassifyDocumentCommand } from "@aws-sdk/client-comprehend"; // ES Modules import
import { config } from '../config.js'

// const { ComprehendClient, ClassifyDocumentCommand } = require("@aws-sdk/client-comprehend"); // CommonJS import
const client = new ComprehendClient({
    region: config.awsRegion,
    credentials: {
        accessKeyId: config.awsAccessKey,
        secretAccessKey: config.awsSecretKey
    }
});

export async function classify(text) {
    const input = {
        "EndpointArn": config.arn,
        "Text": text
    }
    const command = new ClassifyDocumentCommand(input);
    const response = await client.send(command);
    // console.log(response.Classes[0].Name);
    return response.Classes[0].Name
}

// console.log(classify("I LOVE YOU BABY LMAOOOOO HAPPY NEW YEAR"))