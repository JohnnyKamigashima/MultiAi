import { geminiKey } from './../../environment/Gemini.env'
export interface GeminiOptionsDTO {
    prompt: string
    system: string
    geminiModel: string
    geminiChatURL: string
    geminiProjectId: string
    geminiKey: string
}
