import { describe, expect, it } from "bun:test"
import { OpenAi } from "../../src/OpenAi/OpenAi"
import type { OpenAiOptionsDTO } from "../../src/OpenAi/interfaces/OpenAiOptionsDTO"
import { openAiChatUrl, openAiKey, openAiModel } from "../../src/environment/OpenAi.env"

const openAiOptions: OpenAiOptionsDTO = {
    prompt: 'Ola, tudo bem?',
    system: "Como um assistente participativo, responda à pergunta em português do Brasil.",
    openAiModel: openAiModel as string,
    openAiChatUrl: openAiChatUrl as string,
    openAiKey: openAiKey as string
}
describe('Teste o acesso ao endpoint da OpenAI.', () => {

    it('Testa o chat da OpenAI.', async () => {
        const chatResponse = await OpenAi.chat(openAiOptions)
        console.log(chatResponse)
        expect(chatResponse).not.toBeUndefined()
    })
})