import type { OpenAiOptionsDTO } from './interfaces/OpenAiOptionsDTO'

export class OpenAi {
    static async chat(options: OpenAiOptionsDTO) {
        const body = {
            "model": options.openAiModel,
            "messages": [
                {
                    "role": "system",
                    "content": options.system
                },
                {
                    "role": "user",
                    "content": options.prompt
                }
            ]
        }

        const resposta = await fetch(options.openAiChatUrl as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${options.openAiKey}`
            },
            body: JSON.stringify(body)
        })

        const dados = await resposta.json()
        return dados.choices[0].message.content
    }

}