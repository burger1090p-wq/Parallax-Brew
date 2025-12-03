import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

let chatSession: Chat | null = null;

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

const SYSTEM_INSTRUCTION = `
You are 'Barista Bot', the friendly, knowledgeable AI barista of Parallax Brew.
Your tone is warm, inviting, and sophisticated but accessible.
You know everything about coffee origins, brewing methods (V60, Aeropress, Espresso), and our menu.
Our menu includes:
- Ethiopian Yirgacheffe (Floral, Citrus)
- Colombian Supremo (Nutty, Caramel)
- House Espresso Blend (Dark chocolate, berries)
- Cold Brew (Smooth, low acidity)
- Croissants (Butter, Almond)
- Matcha Latte (Grade A Ceremonial)

Keep your answers concise (under 80 words) unless asked for a detailed recipe.
If asked about non-coffee topics, politely steer the conversation back to coffee or the cafe atmosphere.
`;

export const initializeChat = async (): Promise<void> => {
  try {
    const ai = getAiClient();
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    // Don't throw, we'll handle lazy init later
  }
};

export const sendMessageToBarista = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }
  
  if (!chatSession) {
     return "I'm having trouble waking up (Connection Error). Please try again later.";
  }

  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({ message });
    return result.text || "I brewed a response, but it seems empty.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I spilled the beans! (Something went wrong with my connection).";
  }
};