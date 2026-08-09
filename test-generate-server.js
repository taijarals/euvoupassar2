import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
async function main() {
  try {
    const prompt = `Crie 1 questões objetivas sobre os seguintes assuntos, focadas no que é cobrado no concurso SEFAZ-BA (Auditor Fiscal):\nAssuntos: Direito Tributário - Impostos Estaduais\n\nAs questões DEVEM ser inspiradas no estilo e padrão de cobrança da banca FCC. IMPORTANTE: NÃO afirme, não sugira e não inclua textos indicando que são questões reais de provas passadas. São questões INÉDITAS criadas agora, apenas imitando o estilo da banca FCC.\nNo estilo FCC, cada questão deve ter 5 alternativas (A, B, C, D, E).\n\nPara cada questão, forneça:\n1. O enunciado.\n2. As alternativas (array de strings).\n3. O índice (0 a N-1) da alternativa correta.\n4. O comentário/explicação detalhada para CADA alternativa (array de strings na mesma ordem das alternativas), explicando o motivo de estar certa ou errada.\n\nRetorne APENAS um array JSON de objetos com esta exata estrutura:\n[\n  {\n    "statement": "texto do enunciado",\n    "options": ["alt 1", "alt 2", ...],\n    "correctIndex": 0,\n    "explanations": ["explicação da alt 1", "explicação da alt 2", ...]\n  }\n]\n`;
    
    const res = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });
    console.log("RESPONSE:", res.text);
    const responseText = res.text || '';
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
       console.error('Failed to parse AI response as JSON:', responseText);
    } else {
       console.log('JSON matched.');
    }
  } catch(e) {
    console.error(e.message);
  }
}
main();
