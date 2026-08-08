import express from 'express';
import cors from 'cors';
import { db } from './db/index.js';
import { weeks, goals, materials } from './db/schema.js';
import { eq } from 'drizzle-orm';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

createServer();
