import { describe, expect, it } from "bun:test"
import { anthropicChatUrl, anthropicKey, anthropicModel } from "../src/environment/Anthropic.env"
import type { AnthropicOptionsDTO } from "../src/Antropic/interfaces/AnthropicDTO"
import type { OpenAiOptionsDTO } from "../src/OpenAi/interfaces/OpenAiOptionsDTO"
import { openAiChatUrl, openAiKey, openAiModel } from "../src/environment/OpenAi.env"
import type { PerplexityOptionsDTO } from "../src/Perplexity/interfaces/PerplexityOptionsDTO"
import { perplexityChatUrl, perplexityKey, perplexityModel } from "../src/environment/Perplexity.env"
import { AnthropicJS } from "../src/Antropic/Anthropic"
import { OpenAi } from "../src/OpenAi/OpenAi"
import { Perplexity } from "../src/Perplexity/Perplexity"
import type { GeminiOptionsDTO } from "../src/Gemini/interfaces/GeminiDTO"
import { geminiChatUrl, geminiKey, geminiModel, geminiProjectId } from "../src/environment/Gemini.env"
import { Gemini } from "../src/Gemini/Gemini"

const prompt = 'O Node.js possui suporte a TypeScript? Como ativo esse suporte de forma que nao precise gerar arquivos transpilados?'
const system = "Como um assistente participativo, responda à pergunta em português do Brasil."
const resumo = "Baseado em tres fontes de resposta distintas, de a melhor resposta baseado nas respostas consolidadas."

const anthropicOptions: AnthropicOptionsDTO = {
    prompt: prompt,
    system: system,
    anthropicModel: anthropicModel as string,
    anthropicChatUrl: anthropicChatUrl as string,
    anthropicKey: anthropicKey as string
}

const openAiOptions: OpenAiOptionsDTO = {
    prompt: prompt,
    system: system,
    openAiModel: openAiModel as string,
    openAiChatUrl: openAiChatUrl as string,
    openAiKey: openAiKey as string
}

const perplexityOptions: PerplexityOptionsDTO = {
    prompt: prompt,
    system: system,
    perplexityModel: perplexityModel as string,
    perplexityChatUrl: perplexityChatUrl as string,
    perplexityKey: perplexityKey as string
}

const GeminiOptions: GeminiOptionsDTO = {
    prompt: 'Ola, tudo bem?',
    system: "Como um assistente participativo, responda à pergunta em português do Brasil.",
    geminiModel: geminiModel as string,
    geminiChatURL: geminiChatUrl as string,
    geminiProjectId: geminiProjectId as string,
    geminiKey: geminiKey as string
}

describe('Teste em tres IA ao mesmo tempo', () => {

    it('Envia pergunta para tres IS e resume a resposta', async () => {
        const anthropicResponse = AnthropicJS.chat(anthropicOptions)
        const openAiResponse = OpenAi.chat(openAiOptions)
        const perplexityResponse = Perplexity.chat(perplexityOptions)
        const geminiResponse = Gemini.chat(GeminiOptions)

        Promise.all([anthropicResponse, openAiResponse, perplexityResponse, geminiResponse]).then((values) => {
            const [anthropic, openAi, perplexity, gemini] = values

            openAiOptions.system = resumo
            openAiOptions.prompt = `Fonte 1: ${anthropic}\nFonte 2: ${openAi}\nFonte 3: ${perplexity}\nFonte 4: ${gemini}`
        })

        const chatResponse = await OpenAi.chat(openAiOptions)
        console.log(`Resumo das respostas: ${chatResponse}`)
        expect(chatResponse).not.toBeUndefined()
    })
})