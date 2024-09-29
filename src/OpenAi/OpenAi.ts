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

    //     // Exemplo de uso
    //     const args = process.argv.slice(2)
    //     const prompt = args[0]

    //     obterRespostaGPT4o(prompt)
    //     .then(resposta => console.log(resposta))
    //     .catch (error => console.error(error))

}