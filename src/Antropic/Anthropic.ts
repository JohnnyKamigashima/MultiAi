import type { AnthropicOptionsDTO } from "./interfaces/AnthropicDTO"
import Anthropic from "@anthropic-ai/sdk"
export class AnthropicJS {

    static async chat(options: AnthropicOptionsDTO) {
        const anthropic = new Anthropic({
            apiKey: options.anthropicKey,
        })

        const msg: any = await anthropic.messages.create({
            model: options.anthropicModel,
            max_tokens: 4000,
            temperature: 0,
            system: options.system,
            messages: [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": options.prompt
                        }
                    ]
                }
            ]
        })

        return msg.content[0].text
    }

}