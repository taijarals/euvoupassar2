# Modelo de Dados e API

## Tabelas (Drizzle ORM, `db/schema.ts`)

### `weeks`
| Coluna  | Tipo    | Descrição                          |
|---------|---------|-------------------------------------|
| id      | integer | PK, auto-incremento                 |
| number  | integer | Número da semana (1, 2, 3...)       |
| title   | text    | Título de exibição (ex: "Semana 1") |

### `goals` (metas)
| Coluna     | Tipo    | Descrição                                                        |
|------------|---------|--------------------------------------------------------------------|
| id         | integer | PK, auto-incremento                                                 |
| weekId     | integer | FK → `weeks.id` (cascade delete)                                   |
| number     | integer | Número da meta dentro da semana (1 a ~10)                          |
| discipline | text    | Disciplina (ex: "Direito Tributário")                              |
| subject    | text    | Assunto específico da meta                                          |
| type       | text    | `"teoria"` ou `"revisao"`                                          |
| studyTip   | text    | Texto livre com dica de estudo + resumo do conteúdo (opcional)     |
| aiSummary  | text    | Resumo objetivo gerado por IA (Gemini) sobre o assunto (opcional)  |

### `materials` (materiais de estudo)
| Coluna      | Tipo    | Descrição                                                         |
|-------------|---------|----------------------------------------------------------------------|
| id          | integer | PK, auto-incremento                                                    |
| goalId      | integer | FK → `goals.id` (cascade delete)                                      |
| type        | text    | `"videoaula"`, `"pdf"`, `"questoes"` ou `"tarefa"`                    |
| description | text    | Descrição do material (ex: "Videoaula: 1 a 6")                        |
| link        | text    | URL do material (pode ser nulo em metas do tipo "tarefa")            |
| completed   | boolean | Se o material foi concluído (default `false`)                        |
| completedAt | text    | Data ISO de conclusão (nulo se não concluído)                         |

O tipo `"tarefa"` é usado nas metas de Revisão Geral (sem link externo), onde cada disciplina revisada vira um item de checklist.

## Relação entre tabelas

```
weeks (1) ──< goals (N) ──< materials (N)
```

Uma semana tem várias metas; cada meta tem vários materiais. O progresso de uma meta é calculado a partir da proporção de materiais concluídos; o progresso de uma semana, a partir da proporção de metas concluídas (ou de materiais, dependendo da implementação da tela).

## Campo `studyTip`

Contém dois blocos de texto extraídos do PDF "Guia do Aprovado" de cada semana:
- **Dicas** — pontos de atenção práticos ("Gran Dica do conteúdo" no PDF original)
- **Resumo do conteúdo** — resumo teórico estruturado por subtópicos ("Gran Resumo do conteúdo" no PDF original)

Esse campo é opcional e foi preenchido incrementalmente, semana a semana, via prompts colados no AI Studio (ver `PROGRESSO.md`).

## API (Express, `server.ts`)

| Método | Rota                | Descrição                                  |
|--------|----------------------|----------------------------------------------|
| GET    | `/api/weeks`         | Lista todas as semanas com metas e materiais aninhados |
| POST   | `/api/weeks`         | Cria uma nova semana                          |
| DELETE | `/api/weeks/:id`     | Remove uma semana (cascade em metas/materiais) |
| GET    | `/api/goals/:id`     | Detalhe de uma meta específica                |
| POST   | `/api/goals`         | Cria uma nova meta                            |
| PUT    | `/api/goals/:id`             | Atualiza uma meta (incluindo `studyTip`)      |
| DELETE | `/api/goals/:id`             | Remove uma meta                               |
| POST   | `/api/goals/:id/ai-summary`  | Gera ou retorna o resumo via Gemini API       |
| POST   | `/api/materials`             | Cria um novo material                         |
| PUT    | `/api/materials/:id` | Atualiza um material (ex: marcar `completed`) |
| DELETE | `/api/materials/:id` | Remove um material                            |
| GET    | `/api/stats`         | Estatísticas gerais de progresso              |

## Banco de dados: geração e reset

O banco (`sqlite.db`) **não é commitado no Git**. Para (re)criar do zero:

```bash
rm -f sqlite.db
npx tsx db/seed.ts
```

Isso roda as migrations da pasta `drizzle/` e popula os dados iniciais definidos em `db/seed.ts`.

## Sobre os scripts `patch_week*`

Os arquivos `patch_week7_seed.cjs`, `patch_week8_seed.cjs`, `patch_week9_seed.cjs`, `patch_week11_seed.cjs`, `patch_week12_seed.cjs`, `patch_week13_seed.cjs`, `patch_week13.py`, `patch_week15.py` e `db/update-tips.ts` foram scripts de uso único, gerados pelo Gemini no AI Studio para inserir os dados de cada semana (metas, materiais, links e `studyTip`) incrementalmente, sem apagar as semanas já existentes.

Depois de rodados uma vez (e com os dados já persistidos via `db/seed.ts` ou direto no banco), esses arquivos não precisam mais ser executados novamente. Recomenda-se, em algum momento, consolidar todo esse conteúdo dentro de `db/seed.ts` (para que `npx tsx db/seed.ts` sozinho já recrie o banco completo com todas as semanas) e então apagar os scripts de patch para manter o repositório limpo.
