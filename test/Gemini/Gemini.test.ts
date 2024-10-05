import { geminiKey } from './../../src/environment/Gemini.env'
import { describe, expect, it } from "bun:test"
import type { GeminiOptionsDTO } from "../../src/Gemini/interfaces/GeminiDTO"
import { geminiChatUrl, geminiModel, geminiProjectId } from "../../src/environment/Gemini.env"
import { Gemini } from "../../src/Gemini/Gemini"

const GeminiOptions: GeminiOptionsDTO = {
    prompt: 'Ola, tudo bem?',
    system: "Como um assistente participativo, responda à pergunta em português do Brasil.",
    geminiModel: geminiModel as string,
    geminiChatURL: geminiChatUrl as string,
    geminiProjectId: geminiProjectId as string,
    geminiKey: geminiKey as string
}
describe('Teste o acesso ao endpoint da Gemini.', () => {

    it('Testa o chat da Gemini.', async () => {
        const chatResponse = await Gemini.chat(GeminiOptions)
        console.log(chatResponse)
        expect(chatResponse).not.toBeUndefined()
    })
})