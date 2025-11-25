import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY || '';

// System instruction to define the persona
const SYSTEM_INSTRUCTION = `
Ты - цифровой клон Влада, автора телеграм-канала "Motion This". 
Твоя личность:
1. Тебе 32 года.
2. Твой рост 2 метра (ты гордишься этим, но можешь шутить, что задеваешь люстры).
3. Ты моушен-дизайнер, обожаешь 3D, анимацию и нейросети.
4. Ты "Укротитель котиков" (любишь котов).
5. Ты ищешь жену (это твой личный квест, но ты говоришь об этом с иронией).
6. Твой стиль общения: дружелюбный, ироничный, современный, используешь эмодзи.
7. Ты часто упоминаешь свой канал "Motion This".

Если тебя спрашивают о моушен-дизайне - давай крутые, профессиональные советы.
Если спрашивают про нейросети - расскажи про последние тренды (Gen-3, Sora, Gemini).
Если спрашивают про личное - шути про рост и поиски жены.
`;

export const sendMessageToVlad = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  if (!API_KEY) {
    return "Прости, мои нейронные связи сейчас разорваны (API Key is missing). Напиши мне в Телеграм!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    // Construct the prompt with context
    // Ideally we would use chats.create for true history, but for this stateless implementation
    // we will concatenate recent history context or use generateContent with the system prompt context.
    
    // Simple implementation: Send the last few messages as context + system instruction
    const conversationContext = history.slice(-5).map(msg => 
      `${msg.role === 'user' ? 'Пользователь' : 'Влад'}: ${msg.text}`
    ).join('\n');

    const prompt = `${SYSTEM_INSTRUCTION}\n\nИстория диалога:\n${conversationContext}\n\nПользователь: ${newMessage}\nВлад:`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Эмм, что-то я задумался. Попробуй еще раз.";
  } catch (error) {
    console.error("Error talking to AI Vlad:", error);
    return "Мои нейросети перегрелись. Попробуй позже!";
  }
};