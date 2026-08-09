import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
async function main() {
  try {
    const prompt = `Crie 1 questões objetivas sobre os seguintes assuntos, focadas no que é cobrado no concurso SEFAZ-BA (Auditor Fiscal):
Assuntos: Direito Tributário - Impostos Estaduais

As questões DEVEM ser inspiradas no estilo e padrão de cobrança da banca FCC.
No estilo FCC, cada questão deve ter 5 alternativas (A, B, C, D, E).

Para cada questão, forneça:
1. O enunciado.
2. As alternativas (array de strings).
3. O índice (0 a N-1) da alternativa correta.
4. O comentário/explicação detalhada para CADA alternativa (array de strings na mesma ordem das alternativas), explicando o motivo de estar certa ou errada.

Retorne APENAS um array JSON de objetos com esta exata estrutura:
[
  {
    "statement": "texto do enunciado",
    "options": ["alt 1", "alt 2", "alt 3", "alt 4", "alt 5"],
    "correctIndex": 0,
    "explanations": ["explicação da alt 1", "explicação da alt 2", "explicação da alt 3", "explicação da alt 4", "explicação da alt 5"]
  }
]`;
    const res = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });
    console.log("RESPONSE:", res.text);
  } catch(e) {
    console.error(e.message);
  }
}
main();
