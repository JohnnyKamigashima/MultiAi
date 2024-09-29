import { describe, expect, it } from "bun:test"

import { AnthropicJS } from "../../src/Antropic/Anthropic"
import type { AnthropicOptionsDTO } from "../../src/Antropic/interfaces/AnthropicDTO"
import { anthropicChatUrl, anthropicKey, anthropicModel } from "../../src/environment/Anthropic.env"

const antropicOptions: AnthropicOptionsDTO = {
    prompt: 'Ola, tudo bem?',
    system: "Como um assistente participativo, responda à pergunta em português do Brasil.",
    anthropicModel: anthropicModel as string,
    anthropicChatUrl: anthropicChatUrl as string,
    anthropicKey: anthropicKey as string
}
describe('Teste o acesso ao endpoint da Antropic.', () => {

    it('Testa o chat da Antropic.', async () => {
        const chatResponse = await AnthropicJS.chat(antropicOptions)
        console.log(chatResponse)
        expect(chatResponse).not.toBeUndefined()
    })
})