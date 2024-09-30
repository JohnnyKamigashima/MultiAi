import { anthropicChatUrl, anthropicKey, anthropicModel } from "../src/environment/Anthropic.env"
import type { AnthropicOptionsDTO } from "../src/Antropic/interfaces/AnthropicDTO"
import type { OpenAiOptionsDTO } from "../src/OpenAi/interfaces/OpenAiOptionsDTO"
import { openAiChatUrl, openAiKey, openAiModel } from "../src/environment/OpenAi.env"
import type { PerplexityOptionsDTO } from "../src/Perplexity/interfaces/PerplexityOptionsDTO"
import { perplexityChatUrl, perplexityKey, perplexityModel } from "../src/environment/Perplexity.env"
import { AnthropicJS } from "../src/Antropic/Anthropic"
import { OpenAi } from "../src/OpenAi/OpenAi"
import { Perplexity } from "../src/Perplexity/Perplexity"

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
const anthropicResponse = AnthropicJS.chat(anthropicOptions)
const openAiResponse = OpenAi.chat(openAiOptions)
const perplexityResponse = Perplexity.chat(perplexityOptions)
Promise.all([anthropicResponse, openAiResponse, perplexityResponse]).then(async (values) => {
    const [anthropic, openAi, perplexity] = values

    openAiOptions.system = resumo
    openAiOptions.prompt = `Fonte 1: ${anthropic}\nFonte 2: ${openAi}\nFonte 3: ${perplexity}`

    const chatResponse = await OpenAi.chat(openAiOptions)
    console.log(`${chatResponse}`)
})
