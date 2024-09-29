export enum HarmCategory {
    HARM_CATEGORY_SEXUALLY_EXPLICIT = 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    HARM_CATEGORY_HATE_SPEECH = 'HARM_CATEGORY_HATE_SPEECH',
    HARM_CATEGORY_HARASSMENT = 'HARM_CATEGORY_HARASSMENT',
    HARM_CATEGORY_DANGEROUS_CONTENT = 'HARM_CATEGORY_DANGEROUS_CONTENT',
}

export enum HarmBlockThreshold {
    BLOCK_NONE = 'BLOCK_NONE',
    BLOCK_LOW_AND_ABOVE = 'BLOCK_LOW_AND_ABOVE',
    BLOCK_MED_AND_ABOVE = 'BLOCK_MED_AND_ABOVE',
    BLOCK_ONLY_HIGH = 'BLOCK_ONLY_HIGH',
}

export interface GeminiBody {
    "contents": [
        {
            "role": string,
            "parts": [
                {
                    // Union field data can be only one of the following:
                    "text": string,
                    "inlineData": {
                        "mimeType": string,
                        "data": string
                    },
                    "fileData": {
                        "mimeType": string,
                        "fileUri": string
                    },
                    // End of list of possible types for union field data.

                    "videoMetadata": {
                        "startOffset": {
                            "seconds": number,
                            "nanos": number
                        },
                        "endOffset": {
                            "seconds": number,
                            "nanos": number
                        }
                    }
                }
            ]
        }
    ],
    "systemInstruction": {
        "role": string,
        "parts": [
            {
                "text": string
            }
        ]
    },
    "tools": [
        {
            "functionDeclarations": [
                {
                    "name": string,
                    "description": string,
                    "parameters": {

                    }
                }
            ]
        }
    ],
    "safetySettings": [
        {
            "category": HarmCategory,
            "threshold": HarmBlockThreshold
        }
    ],
    "generationConfig": {
        "temperature": number,
        "topP": number,
        "topK": number,
        "candidateCount": number,
        "maxOutputTokens": number,
        "stopSequences": [
            string
        ],
        "responseMimeType": string
    }
}