import type { PerplexityOptionsDTO } from './interfaces/PerplexityOptionsDTO'

export class Perplexity {
    static async chat(options: PerplexityOptionsDTO) {
        const body = {
            "model": options.perplexityModel,
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

        const resposta = await fetch(options.perplexityChatUrl as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${options.perplexityKey}`
            },
            body: JSON.stringify(body)
        })

        const dados = await resposta.json()
        return dados.choices[0].message.content
    }

}