import express from 'express';
import cors from 'cors';
import { db } from './db/index.js';
import { weeks, goals, materials, questions, questionAttempts } from './db/schema.js';
import { eq, inArray } from 'drizzle-orm';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'fs';
import { GoogleGenAI } from '@google/genai';

// Handle __dirname for both ESM and CJS
let _dirname: string;
if (typeof __dirname !== 'undefined') {
  _dirname = __dirname;
} else {
  const _filename = fileURLToPath(import.meta.url);
  _dirname = path.dirname(_filename);
}

// Lazy initialization of Gemini API client
let ai: GoogleGenAI | null = null;
function getAiClient() {
  if (!ai) {
    let key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY' || key === 'undefined') {
      try {
        const envData = fs.readFileSync('/app/.dev.env.json', 'utf8');
        const parsed = JSON.parse(envData);
        if (parsed.GEMINI_API_KEY) {
          key = parsed.GEMINI_API_KEY;
        }
      } catch (e) {
        console.error('Failed to read .dev.env.json', e);
      }
    }
    
    ai = new GoogleGenAI({
      apiKey: key,
    });
  }
  return ai;
}

async function createServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  
  app.get('/api/weeks', async (req, res) => {
    try {
      const allWeeks = await db.select().from(weeks).orderBy(weeks.number);
      const allGoals = await db.select().from(goals).orderBy(goals.number);
      const allMaterials = await db.select().from(materials);
      
      const weeksData = allWeeks.map(week => {
        const weekGoals = allGoals.filter(g => g.weekId === week.id).map(goal => {
          return {
            ...goal,
            materials: allMaterials.filter(m => m.goalId === goal.id)
          };
        });
        return {
          ...week,
          goals: weekGoals
        };
      });
      
      res.json(weeksData);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar dados' });
    }
  });

  app.post('/api/weeks', async (req, res) => {
    try {
      const { number, title } = req.body;
      const result = await db.insert(weeks).values({ number, title }).returning();
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar semana' });
    }
  });

  app.delete('/api/weeks/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await db.delete(weeks).where(eq(weeks.id, id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir semana' });
    }
  });

  app.get('/api/goals/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const goal = await db.select().from(goals).where(eq(goals.id, id)).get();
      
      if (!goal) {
        return res.status(404).json({ error: 'Meta não encontrada' });
      }
      
      const goalWeek = await db.select().from(weeks).where(eq(weeks.id, goal.weekId)).get();
      const goalMaterials = await db.select().from(materials).where(eq(materials.goalId, id));
      
      res.json({ ...goal, week: goalWeek, materials: goalMaterials });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar meta' });
    }
  });

  app.post('/api/goals/:id/ai-summary', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const goal = await db.select().from(goals).where(eq(goals.id, id)).get();
      
      if (!goal) {
        return res.status(404).json({ error: 'Meta não encontrada' });
      }

      if (goal.aiSummary) {
        return res.json({ aiSummary: goal.aiSummary });
      }

      const prompt = `Crie um resumo objetivo e didático sobre o seguinte assunto, focado no que costuma ser cobrado em concursos fiscais/SEFAZ. Escreva em português do Brasil, com no máximo 3 a 4 parágrafos curtos ou uma lista de pontos-chave.\n\nDisciplina: ${goal.discipline}\nAssunto: ${goal.subject}`;

      const aiClient = getAiClient();
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      const generatedSummary = response.text || '';
      
      await db.update(goals).set({ aiSummary: generatedSummary }).where(eq(goals.id, id));
      
      res.json({ aiSummary: generatedSummary });
    } catch (error: any) {
      console.error('Error generating AI summary:', error);
      res.status(500).json({ error: 'Erro ao gerar resumo da IA', details: error.message });
    }
  });

  app.post('/api/goals', async (req, res) => {
    try {
      const { weekId, number, discipline, subject, type, studyTip } = req.body;
      const result = await db.insert(goals).values({ weekId, number, discipline, subject, type, studyTip }).returning();
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar meta' });
    }
  });

  app.put('/api/goals/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { weekId, number, discipline, subject, type, studyTip } = req.body;
      const result = await db.update(goals).set({ weekId, number, discipline, subject, type, studyTip }).where(eq(goals.id, id)).returning();
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar meta' });
    }
  });

  app.delete('/api/goals/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await db.delete(goals).where(eq(goals.id, id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir meta' });
    }
  });

  app.post('/api/materials', async (req, res) => {
    try {
      const { goalId, description, type, link } = req.body;
      const result = await db.insert(materials).values({ goalId, description, type, link }).returning();
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar material' });
    }
  });

  app.put('/api/materials/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { description, type, link, completed } = req.body;
      
      const updateData: any = { description, type, link };
      if (completed !== undefined) {
        updateData.completed = completed;
        updateData.completedAt = completed ? new Date().toISOString() : null;
      }
      
      const result = await db.update(materials).set(updateData).where(eq(materials.id, id)).returning();
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar material' });
    }
  });

  app.delete('/api/materials/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await db.delete(materials).where(eq(materials.id, id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir material' });
    }
  });

  app.get('/api/questions', async (req, res) => {
    try {
      const allQuestions = await db.select().from(questions);
      const allAttempts = await db.select().from(questionAttempts);
      
      const allGoals = await db.select().from(goals);
      const allWeeks = await db.select().from(weeks);

      const enrichedQuestions = allQuestions.map(q => {
        const goal = allGoals.find(g => g.id === q.goalId);
        const week = goal ? allWeeks.find(w => w.id === goal.weekId) : undefined;
        return {
          ...q,
          options: JSON.parse(q.options),
          explanations: JSON.parse(q.explanations),
          attempts: allAttempts.filter(a => a.questionId === q.id),
          goal,
          week
        };
      });

      res.json(enrichedQuestions);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar questões' });
    }
  });

  app.post('/api/questions/generate', async (req, res) => {
    try {
      const { goalIds, source, banca, quantity = 5 } = req.body;
      
      if (!goalIds || !goalIds.length) {
        return res.status(400).json({ error: 'Nenhuma meta selecionada' });
      }

      const selectedGoals = await db.select().from(goals).where(inArray(goals.id, goalIds));

      if (!selectedGoals.length) {
        return res.status(400).json({ error: 'Metas não encontradas' });
      }

      const aiClient = getAiClient();
      const savedQuestions = [];
      let remainingQuantity = quantity;
      
      for (let i = 0; i < selectedGoals.length; i++) {
        const goal = selectedGoals[i];
        
        const qForThisGoal = Math.ceil(remainingQuantity / (selectedGoals.length - i));
        
        if (qForThisGoal <= 0) break;
        
        let prompt = `Crie ${qForThisGoal} questões objetivas sobre o seguinte assunto, focadas no que é cobrado no concurso SEFAZ-BA (Auditor Fiscal):\nDisciplina: ${goal.discipline}\nAssunto: ${goal.subject}\n\n`;
        
        if (source === 'ia_estilo_concurso' && banca) {
          prompt += `As questões DEVEM ser inspiradas no estilo e padrão de cobrança da banca ${banca}. IMPORTANTE: NÃO afirme, não sugira e não inclua textos indicando que são questões reais de provas passadas. São questões INÉDITAS criadas agora, apenas imitando o estilo da banca ${banca}.\n`;
          if (banca === 'CESPE/CEBRASPE') {
            prompt += `No estilo CESPE/CEBRASPE, cada questão deve ter exatamente duas alternativas: "Certo" e "Errado".\n`;
          } else {
            prompt += `No estilo ${banca}, cada questão deve ter 5 alternativas (A, B, C, D, E).\n`;
          }
        } else {
          prompt += `Crie questões originais, com 5 alternativas (A, B, C, D, E).\n`;
        }

        prompt += `
Para cada questão, forneça:
1. O enunciado.
2. As alternativas (array de strings).
3. O índice (0 a N-1) da alternativa correta.
4. O comentário/explicação detalhada para CADA alternativa (array de strings na mesma ordem das alternativas), explicando o motivo de estar certa ou errada.

Retorne APENAS um array JSON de objetos com esta exata estrutura:
[
  {
    "statement": "texto do enunciado",
    "options": ["alt 1", "alt 2", ...],
    "correctIndex": 0,
    "explanations": ["explicação da alt 1", "explicação da alt 2", ...]
  }
]
`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
        });

        const responseText = response.text || '';
        
        const startIndex = responseText.indexOf('[');
        const endIndex = responseText.lastIndexOf(']');
        
        if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
           console.error('Failed to parse AI response as JSON:', responseText);
           continue;
        }

        const jsonString = responseText.substring(startIndex, endIndex + 1);
        let generatedQuestions;
        try {
          generatedQuestions = JSON.parse(jsonString);
        } catch (parseError) {
          console.error('JSON Parse error:', parseError, 'Raw string:', jsonString);
          continue;
        }
        
        for (const q of generatedQuestions) {
           const result = await db.insert(questions).values({
             goalId: goal.id,
             source,
             banca: source === 'ia_estilo_concurso' ? banca : null,
             statement: q.statement,
             options: JSON.stringify(q.options),
             correctIndex: q.correctIndex,
             explanations: JSON.stringify(q.explanations)
           }).returning();
           savedQuestions.push(result[0]);
        }
        
        remainingQuantity -= qForThisGoal;
      }
      
      res.json(savedQuestions);
    } catch (error: any) {
      console.error('Error generating questions:', error);
      res.status(500).json({ error: 'Erro ao gerar questões', details: error.message });
    }
  });

  app.post('/api/questions/:id/answer', async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      const { selectedIndex } = req.body;
      
      const question = await db.select().from(questions).where(eq(questions.id, questionId)).get();
      if (!question) {
        return res.status(404).json({ error: 'Questão não encontrada' });
      }

      const isCorrect = selectedIndex === question.correctIndex;

      await db.insert(questionAttempts).values({
        questionId,
        selectedIndex,
        isCorrect
      });

      res.json({
        isCorrect,
        correctIndex: question.correctIndex,
        explanations: JSON.parse(question.explanations)
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar tentativa' });
    }
  });

  app.get('/api/questions/stats', async (req, res) => {
    try {
      // In a real app we'd filter by the query params, 
      // but for simplicity we fetch all attempts and questions and filter in JS
      const { weekId, goalId, discipline, subject, source } = req.query;

      const allAttempts = await db.select().from(questionAttempts);
      const allQuestions = await db.select().from(questions);
      const allGoals = await db.select().from(goals);

      // Join data manually for the stats
      let validAttempts = allAttempts.map(a => {
        const q = allQuestions.find(q => q.id === a.questionId);
        const g = q ? allGoals.find(g => g.id === q.goalId) : undefined;
        return { ...a, question: q, goal: g };
      }).filter(a => a.question && a.goal);

      // Apply filters
      if (weekId) validAttempts = validAttempts.filter(a => a.goal.weekId === parseInt(weekId as string));
      if (goalId) validAttempts = validAttempts.filter(a => a.goal.id === parseInt(goalId as string));
      if (discipline) validAttempts = validAttempts.filter(a => a.goal.discipline === discipline);
      if (subject) validAttempts = validAttempts.filter(a => a.goal.subject === subject);
      if (source) validAttempts = validAttempts.filter(a => a.question.source === source);

      const totalAttempts = validAttempts.length;
      const correctAttempts = validAttempts.filter(a => a.isCorrect).length;
      
      const byDiscipline: Record<string, { total: number, correct: number }> = {};
      validAttempts.forEach(a => {
        const d = a.goal.discipline;
        if (!byDiscipline[d]) byDiscipline[d] = { total: 0, correct: 0 };
        byDiscipline[d].total++;
        if (a.isCorrect) byDiscipline[d].correct++;
      });

      res.json({
        total: totalAttempts,
        correct: correctAttempts,
        byDiscipline
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
  });

  app.get('/api/stats', async (req, res) => {
    try {
      const allGoals = await db.select().from(goals);
      const allMaterials = await db.select().from(materials);
      
      let completedGoalsCount = 0;
      allGoals.forEach(goal => {
        const goalMaterials = allMaterials.filter(m => m.goalId === goal.id);
        if (goalMaterials.length > 0 && goalMaterials.every(m => m.completed)) {
          completedGoalsCount++;
        }
      });
      
      res.json({
        totalGoals: allGoals.length,
        completedGoals: completedGoalsCount,
        totalMaterials: allMaterials.length,
        completedMaterials: allMaterials.filter(m => m.completed).length,
        byType: {
          videoaula: {
            total: allMaterials.filter(m => m.type === 'videoaula').length,
            completed: allMaterials.filter(m => m.type === 'videoaula' && m.completed).length,
          },
          pdf: {
            total: allMaterials.filter(m => m.type === 'pdf').length,
            completed: allMaterials.filter(m => m.type === 'pdf' && m.completed).length,
          },
          questoes: {
            total: allMaterials.filter(m => m.type === 'questoes').length,
            completed: allMaterials.filter(m => m.type === 'questoes' && m.completed).length,
          },
          tarefa: {
            total: allMaterials.filter(m => m.type === 'tarefa').length,
            completed: allMaterials.filter(m => m.type === 'tarefa' && m.completed).length,
          }
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
  });

  // Serve Vite in development or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

createServer();
