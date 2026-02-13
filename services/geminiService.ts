
import { GoogleGenAI, Type } from "@google/genai";
import { RecognitionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function recognizeObject(base64Image: string): Promise<RecognitionResult | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: base64Image } },
            { text: "Identify the main object in this image and provide its name in English, French, and Chinese (Simplified). Return as JSON only." }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            objectName: { type: Type.STRING },
            translations: {
              type: Type.OBJECT,
              properties: {
                en: { type: Type.STRING },
                fr: { type: Type.STRING },
                zh: { type: Type.STRING }
              },
              required: ["en", "fr", "zh"]
            },
            confidence: { type: Type.NUMBER }
          },
          required: ["objectName", "translations", "confidence"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as RecognitionResult;
  } catch (error) {
    console.error("Gemini Recognition Error:", error);
    return null;
  }
}

export async function generateQuizOptions(objectName: string, language: string): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 3 incorrect but plausible distractors for the ${language} translation of '${objectName}'. Return as a JSON array of 3 strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Distractor Generation Error:", error);
    return ["Option A", "Option B", "Option C"];
  }
}
