import { Dalle } from "dalle-node";
import { config } from "../config.js"

export async function generate(words) {
    const dalle = new Dalle("sess-"+config.dalleKey);
    const generations = await dalle.generate(words);
    const generations2 = generations.data 
        generations2.map((generation) => {
            console.log(generation.generation)
        })
    return [generations2[0].generation.image_path, generations2[1].generation.image_path, generations2[2].generation.image_path, generations2[3].generation.image_path]
}

// generate("Knights of Bubbles");