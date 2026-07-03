import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

// Safety Settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Stateful chat session using the new @google/genai SDK
const chat = ai.chats.create({
  model: "gemini-2.5-flash",
  config: {
    ...generationConfig,
    safetySettings,
  },
});

// Wrapper that keeps the same `chatSession.sendMessage(text)` ->
// `res.response.text()` shape the rest of the app already uses,
// so no other files need to change.
export const chatSession = {
  sendMessage: async (message) => {
    const response = await chat.sendMessage({ message });
    return {
      response: {
        text: () => response.text,
      },
    };
  },
};
