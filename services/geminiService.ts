import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const generateCupcakeResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  // Use the API_KEY from the environment as required.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `You are "Cupcake", a friendly, helpful, and sweet AI assistant. 
  Your personality is bubbly, warm, and delightful. 
  You use cupcake and dessert metaphors often (e.g., "That's a piece of cake!", "Sprinkling some knowledge...", "Have a berry nice day!"). 
  Always stay helpful and polite. You love baby pink, light pink, and sky blue. 
  Keep your answers concise but very friendly. 
  Do NOT use the word "sweetie".
  If someone asks for a recipe, you are extra excited!`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: history,
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.95,
        topK: 40,
      },
    });

    return response.text || "Oops, my sprinkles got tangled! Can you say that again?";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error("Oh fudge! I ran into a bit of a sticky situation. Could you try sending that again?");
  }
};