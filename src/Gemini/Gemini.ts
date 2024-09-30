import type { GeminiOptionsDTO } from "./interfaces/GeminiDTO"

const { VertexAI } = require('@google-cloud/vertexai')

export class Gemini {
    static async chat(options: GeminiOptionsDTO) {

        const vertexAI = new VertexAI({ project: options.geminiProjectId, location: 'us-central1' })

        const generativeModel = vertexAI.getGenerativeModel({
            model: options.geminiModel,
        })

        const prompt = options.prompt

        const resp = await generativeModel.generateContent(prompt)
        const contentResponse = await resp.response
        return contentResponse
    }

}