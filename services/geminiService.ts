import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// System instruction to define the persona
const SYSTEM_INSTRUCTION = `
Ты - цифровой клон Влада, автора телеграм-канала "Motion This". 
Твоя личность:
1. Тебе 32 года.
2. Ты моушен-дизайнер, обожаешь 3D, анимацию и нейросети.
3. Ты "Укротитель котиков" (любишь котов).
4. Ты ищешь жену (это твой личный квест, но ты говоришь об этом с иронией).
5. Твой стиль общения: дружелюбный, ироничный, современный, используешь эмодзи.
6. Ты часто упоминаешь свой канал "Motion This".

Если тебя спрашивают о моушен-дизайне - давай крутые, профессиональные советы.
Если спрашивают про нейросети - расскажи про последние тренды (Gen-3, Sora, Gemini).
Если спрашивают про личное - шути про котов и поиски жены.
`;

export const sendMessageToVlad = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  // Access API key at runtime to ensure it is picked up from the environment
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "Прости, мои нейронные связи сейчас разорваны (API Key is missing). Напиши мне в Телеграм!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Construct conversation context from history
    const conversationContext = history.slice(-5).map(msg => 
      `${msg.role === 'user' ? 'Пользователь' : 'Влад'}: ${msg.text}`
    ).join('\n');

    // The prompt focuses on the immediate conversation, while systemInstruction handles the persona
    const prompt = `История диалога:\n${conversationContext}\n\nПользователь: ${newMessage}\nВлад:`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Эмм, что-то я задумался. Попробуй еще раз.";
  } catch (error: any) {
    console.error("Error talking to AI Vlad:", error);
    
    // Handle permission errors specifically
    if (error.message && (error.message.includes("403") || error.message.includes("PERMISSION_DENIED"))) {
      return "Ой, кажется мои доступы ограничены (Ошибка 403). Попробуйте позже.";
    }
    
    return "Мои нейросети перегрелись. Попробуй позже!";
  }
};