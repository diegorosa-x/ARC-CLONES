import { PRODUCTS } from "@/cosntants/contants";
import type { AIResponse } from "../types/types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function getShoppingAdvice(userPrompt: string): Promise<AIResponse> {
  try {
    const productContext = PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      basePrice: p.basePrice,
      category: p.category,
      tags: p.tags,
      factories: p.factories?.map((f) => f.factory),
    }));

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Você é um assistente técnico de compras.
Responda em JSON no formato:
{
  "suggestion": "texto",
  "recommendedProductIds": ["id1", "id2"]
}

Catálogo:
${JSON.stringify(productContext)}

Pergunta do usuário:
${userPrompt}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // tenta parsear o JSON
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const raw = jsonStart >= 0 && jsonEnd >= 0 ? text.slice(jsonStart, jsonEnd + 1) : "{}";

    const parsed = JSON.parse(raw) as AIResponse;

    return {
      suggestion: parsed.suggestion ?? "Ok! Me diga sua preferência de modelo/estilo.",
      recommendedProductIds: parsed.recommendedProductIds ?? [],
    };
  } catch {
    return {
      suggestion: "Não consegui processar agora. Tente novamente em alguns segundos.",
      recommendedProductIds: [],
    };
  }
}
