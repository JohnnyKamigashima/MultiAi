import { describe, expect, it } from "bun:test"
import type { PerplexityOptionsDTO } from "../../src/Perplexity/interfaces/PerplexityOptionsDTO"
import { perplexityChatUrl, perplexityKey, perplexityModel } from "../../src/environment/Perplexity.env"
import { Perplexity } from "../../src/Perplexity/Perplexity"

const PerplexityOptions: PerplexityOptionsDTO = {
    prompt: 'Ola, tudo bem?',
    system: "Como um assistente participativo, responda à pergunta em português do Brasil.",
    perplexityModel: perplexityModel as string,
    perplexityChatUrl: perplexityChatUrl as string,
    perplexityKey: perplexityKey as string
}
describe('Teste o acesso ao endpoint da Perplexity AI.', () => {

    it('Testa o chat da Perplexity.', async () => {
        const chatResponse = await Perplexity.chat(PerplexityOptions)
        console.log(chatResponse)
        expect(chatResponse).not.toBeUndefined()
    })
})