import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
const envData = fs.readFileSync('/app/.dev.env.json', 'utf8');
const parsed = JSON.parse(envData);
const ai = new GoogleGenAI({ apiKey: parsed.GEMINI_API_KEY });

async function generateContentWithRetry(aiClient: any, prompt: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await aiClient.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });
    } catch (error: any) {
      console.error(`Attempt ${i + 1} failed:`, error.message || error);
      if (i === retries - 1) throw error;
      const errorStr = String(error.message || error);
      if (errorStr.includes('503') || errorStr.includes('UNAVAILABLE') || errorStr.includes('429')) {
        const delay = Math.pow(2, i) * 1000;
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

async function run() {
  const response = await generateContentWithRetry(ai, 'Oi');
  console.log(response.text);
}
run().catch(console.error);
