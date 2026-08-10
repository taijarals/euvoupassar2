import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
const envData = fs.readFileSync('/app/.dev.env.json', 'utf8');
const parsed = JSON.parse(envData);
const ai = new GoogleGenAI({ apiKey: parsed.GEMINI_API_KEY });
async function run() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: 'Oi',
  });
  console.log(response.text);
}
run().catch(console.error);
