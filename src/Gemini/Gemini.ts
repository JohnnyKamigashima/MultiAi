import type { GeminiOptionsDTO } from "./interfaces/GeminiDTO"

const { GoogleGenerativeAI } = require("@google/generative-ai")

export class Gemini {
    static async chat(options: GeminiOptionsDTO) {

        const genAI = new GoogleGenerativeAI(options.geminiKey)

        const model = genAI.getGenerativeModel({ model: options.geminiModel })

        const result = await model.generateContent("System: " + options.system + "User: " + options.prompt)
        const response = await result.response
        return response.text()
    }

}