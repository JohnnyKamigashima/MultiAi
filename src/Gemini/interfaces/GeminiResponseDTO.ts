import type { HarmCategory } from "./GeminiRequestBodyDTO"

export enum FinishReason {
    FINISH_REASON_UNSPECIFIED = 'FINISH_REASON_UNSPECIFIED',
    FINISH_REASON_STOP = 'FINISH_REASON_STOP',
    FINISH_REASON_SAFETY = 'FINISH_REASON_SAFETY',
    FINISH_REASON_RECITATION = 'FINISH_REASON_RECITATION',
    FINISH_REASON_OTHER = 'FINISH_REASON_OTHER'
}

export enum HarmProbability {
    HARM_PROBABILITY_UNSPECIFIED = 'HARM_PROBABILITY_UNSPECIFIED',
    NEGLIGIBLE = 'NEGLIGIBLE',
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export interface GeminiResponseDTO {
    "candidates": [
        {
            "content": {
                "parts": [
                    {
                        "text": string
                    }
                ]
            },
            "finishReason": FinishReason,
            "safetyRatings": [
                {
                    "category": HarmCategory,
                    "probability": HarmProbability,
                    "blocked": boolean
                }
            ],
            "citationMetadata": {
                "citations": [
                    {
                        "startIndex": number,
                        "endIndex": number,
                        "uri": string,
                        "title": string,
                        "license": string,
                        "publicationDate": {
                            "year": number,
                            "month": number,
                            "day": number
                        }
                    }
                ]
            }
        }
    ],
    "usageMetadata": {
        "promptTokenCount": number,
        "candidatesTokenCount": number,
        "totalTokenCount": number
    }
}