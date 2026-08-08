# Gerenciador de Estudos SEFAZ-BA

Aplicativo web pessoal para acompanhar a preparação para o concurso SEFAZ-BA (Auditor Fiscal), baseado no "Guia do Aprovado" (Gran Cursos/GranXperts). Organiza o plano de estudos em Semanas → Metas → Materiais, permitindo marcar progresso e acompanhar o que falta.

## Stack

- **Frontend:** React 19 + Vite + Tailwind CSS + wouter (roteamento) + TanStack Query
- **Backend:** Express 5 (server.ts), servindo a API e o front compilado
- **Banco de dados:** SQLite via libSQL, com Drizzle ORM (schema + migrations em `db/` e `drizzle/`)

## Como rodar localmente

```bash
npm install
npx tsx db/seed.ts   # cria o banco (sqlite.db) e popula os dados iniciais
npm run dev           # inicia o servidor (Express + Vite) em modo desenvolvimento
```

O servidor sobe por padrão em `http://localhost:3000` (front e API juntos).

> **Importante:** o arquivo `sqlite.db` **não é versionado no Git** (está no `.gitignore`). Cada ambiente (Replit, AI Studio, sua máquina) precisa gerar o próprio banco rodando `npx tsx db/seed.ts`. Isso evita o problema que já aconteceu uma vez: um `sqlite.db` corrompido foi commitado e quebrou o app em outro ambiente.

## Regras de Negócio

Veja [`BUSINESS_RULES.md`](./BUSINESS_RULES.md) para o comportamento esperado do app, cálculos de progresso e regras de navegação.

## Estrutura de dados

Veja [`DATA_MODEL.md`](./DATA_MODEL.md) para o detalhamento das tabelas (`weeks`, `goals`, `materials`) e da API.

## Progresso do plano de estudos

Veja [`PROGRESSO.md`](./PROGRESSO.md) para saber quais semanas do Guia do Aprovado já foram cadastradas no app e quais ainda faltam.

## Histórico do projeto

Este projeto foi originalmente criado no Replit. O código-fonte real não chegou a ser versionado no GitHub nessa fase inicial (só a configuração do workspace subiu). O app foi reconstruído a partir do zero no Google AI Studio (Gemini), usando prompts detalhados com o modelo de dados e o conteúdo extraído dos PDFs do "Guia do Aprovado" semana a semana. Scripts de patch pontuais (`patch_week*.cjs`, `patch_week*.py`) foram usados para popular semanas específicas incrementalmente — ver observação em `DATA_MODEL.md` sobre limpeza desses arquivos.
