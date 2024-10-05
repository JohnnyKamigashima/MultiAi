import { anthropicChatUrl, anthropicKey, anthropicModel } from "./environment/Anthropic.env"
import type { AnthropicOptionsDTO } from "./Antropic/interfaces/AnthropicDTO"
import type { OpenAiOptionsDTO } from "./OpenAi/interfaces/OpenAiOptionsDTO"
import { openAiChatUrl, openAiKey, openAiModel } from "./environment/OpenAi.env"
import type { PerplexityOptionsDTO } from "./Perplexity/interfaces/PerplexityOptionsDTO"
import { perplexityChatUrl, perplexityKey, perplexityModel } from "./environment/Perplexity.env"
import { AnthropicJS } from "./Antropic/Anthropic"
import { OpenAi } from "./OpenAi/OpenAi"
import { Perplexity } from "./Perplexity/Perplexity"
import type { GeminiOptionsDTO } from "./Gemini/interfaces/GeminiDTO"
import { geminiChatUrl, geminiKey, geminiModel, geminiProjectId } from "./environment/Gemini.env"
import { Gemini } from "./Gemini/Gemini"

const prompt = process.argv[2]
const system = "Como um assistente participativo, responda à pergunta em português do Brasil."
const resumo = "Baseado em tres fontes de resposta distintas, de a melhor resposta baseado nas respostas consolidadas. Sem adicionar comentarios nem conclusões"

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
    prompt: prompt,
    system: system,
    geminiModel: geminiModel as string,
    geminiChatURL: geminiChatUrl as string,
    geminiProjectId: geminiProjectId as string,
    geminiKey: geminiKey as string
}
const anthropicResponse = AnthropicJS.chat(anthropicOptions)
const openAiResponse = OpenAi.chat(openAiOptions)
const perplexityResponse = Perplexity.chat(perplexityOptions)
const geminiResponse = Gemini.chat(GeminiOptions)

Promise.all([anthropicResponse, openAiResponse, perplexityResponse, geminiResponse]).then(async (values) => {
    const [anthropic, openAi, perplexity, gemini] = values

    openAiOptions.system = resumo
    openAiOptions.prompt = `Fonte 1: ${anthropic}\nFonte 2: ${openAi}\nFonte 3: ${perplexity}\nFonte 4: ${gemini}`

    const chatResponse = await OpenAi.chat(openAiOptions)
    console.log(`${chatResponse}`)
})
