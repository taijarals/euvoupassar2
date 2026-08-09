import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const weeks = sqliteTable("weeks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  number: integer("number").notNull(),
  title: text("title").notNull(),
});

export const goals = sqliteTable("goals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  weekId: integer("week_id").notNull().references(() => weeks.id, { onDelete: 'cascade' }),
  number: integer("number").notNull(),
  discipline: text("discipline").notNull(),
  subject: text("subject").notNull(),
  type: text("type").notNull(), // 'teoria', 'revisao'
  studyTip: text("study_tip"),
  aiSummary: text("ai_summary"),
});

export const materials = sqliteTable("materials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  goalId: integer("goal_id").notNull().references(() => goals.id, { onDelete: 'cascade' }),
  type: text("type").notNull(), // 'videoaula', 'pdf', 'questoes', 'tarefa'
  description: text("description").notNull(),
  link: text("link"),
  completed: integer("completed", { mode: 'boolean' }).notNull().default(false),
  completedAt: text("completed_at"), // ISO date string
});

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  goalId: integer("goal_id").notNull().references(() => goals.id, { onDelete: 'cascade' }),
  source: text("source").notNull(), // 'ia_nova' | 'ia_estilo_concurso'
  banca: text("banca"), // 'CESPE/CEBRASPE', 'FGV', 'FCC'
  statement: text("statement").notNull(),
  options: text("options", { mode: 'json' }).notNull(),
  correctIndex: integer("correct_index").notNull(),
  explanations: text("explanations", { mode: 'json' }).notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const questionAttempts = sqliteTable("question_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id").notNull().references(() => questions.id, { onDelete: 'cascade' }),
  selectedIndex: integer("selected_index").notNull(),
  isCorrect: integer("is_correct", { mode: 'boolean' }).notNull(),
  answeredAt: text("answered_at").notNull().default(new Date().toISOString()),
});
