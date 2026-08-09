# Regras de Negócio

Este documento descreve o comportamento esperado do Gerenciador de Estudos SEFAZ-BA — não a estrutura técnica (isso está em `DATA_MODEL.md`), mas como o app deve se comportar. Serve de referência para pedir ajustes ao Gemini sem que o comportamento atual se perca ou seja alterado sem querer.

## Cálculo de progresso

Todo progresso é calculado com base em **materiais concluídos**, não no número de metas — uma meta com 3 materiais pesa o mesmo que uma com 1.

- **Progresso de uma meta**: `materiais concluídos da meta / total de materiais da meta`. Se a meta não tiver materiais, o progresso é 0%.
- **Progresso de uma semana**: soma de todos os materiais concluídos de todas as metas da semana, dividido pelo total de materiais da semana.
- **Progresso geral (tela inicial)**: soma de materiais concluídos em todo o app, dividido pelo total de materiais em todo o app. Não é uma média das semanas — semanas com mais materiais pesam mais.
- **"Meta concluída"** (usado na contagem de `completedGoals`/`totalGoals`): uma meta só conta como concluída se tiver pelo menos 1 material **e** todos os seus materiais estiverem marcados como concluídos.

## Marcação de conclusão

- Cada material tem um botão de toggle (concluído / não concluído).
- Ao marcar como concluído, o campo `completedAt` recebe a data/hora atual (ISO). Ao desmarcar, `completedAt` volta a `null`.
- Não existe "desfazer automático" nem confirmação — marcar/desmarcar é uma ação direta e reversível a qualquer momento.

## Tipos de meta

- **`teoria`**: meta normal de estudo, com materiais reais (videoaula, PDF, questões) e links externos para a plataforma do Gran Cursos.
- **`revisao`**: meta de revisão geral, tipicamente a última de cada semana. Não tem link externo — vira um checklist de tarefas (materiais do tipo `tarefa`), um item por disciplina estudada naquela semana.

## Tipos de material

- **`videoaula`**: pode haver mais de uma por meta (ex: quando o assunto exige várias aulas em blocos separados). Nesse caso, cada uma é um material distinto.
- **`pdf`**: PDF completo do assunto. Toda meta de teoria deveria ter um.
- **`questoes`**: banco de questões relacionado ao assunto. **Pode não existir** quando o conteúdo é muito recente (ex: legislação nova como a LC 227/2026, na Semana 13) — nesse caso a meta não tem material do tipo `questoes`, e a orientação (registrada em `studyTip`) é resolver as questões dentro do próprio PDF.
- **`tarefa`**: usado só em metas de revisão, sem link.

## Navegação e "semana atual" (auto-expand)

Ao carregar a tela inicial, todas as semanas começam recolhidas, exceto uma, que abre automaticamente:

1. Percorre as semanas em ordem crescente de número.
2. A primeira semana cujo total de materiais for 0 **ou** que tenha algum material não concluído é considerada a "semana atual" e abre sozinha.
3. Se todas as semanas cadastradas estiverem 100% concluídas, abre a última semana (fallback).
4. Esse cálculo roda **uma única vez** ao carregar os dados (não reavalia a cada clique) — se o usuário fechar a semana atual manualmente, ela não reabre sozinha na mesma sessão.
5. O usuário pode expandir/recolher qualquer semana manualmente a qualquer momento, independente da lógica de auto-expand.

## Filtro por disciplina

A tela inicial tem um seletor de disciplina, com "Todas as disciplinas" como opção padrão.

- Com "Todas as disciplinas" selecionada, a tela funciona no modo padrão (accordion por semana, com a semana atual aberta automaticamente — ver seção "Navegação e 'semana atual'").
- Ao selecionar uma disciplina específica, a tela troca para uma lista plana com todas as metas daquela disciplina de todas as semanas juntas, ordenadas por número de semana crescente. O accordion por semana é substituído por essa lista enquanto o filtro estiver ativo.
- É um filtro puramente de exibição: não altera, cria nem apaga nada no banco de dados.
- As disciplinas listadas no seletor são extraídas dinamicamente das metas existentes (não é uma lista fixa) — uma disciplina só aparece no filtro se houver pelo menos uma meta cadastrada com ela.

## Campo `studyTip`

- É opcional — nem toda meta precisa ter.
- Quando presente, contém dois blocos: **Dicas** (pontos de atenção práticos) e **Resumo do conteúdo** (teoria resumida por subtópico), extraídos do PDF original "Guia do Aprovado" de cada semana.
- É só leitura na interface — o usuário não edita a dica pela tela do app hoje (se quiser mudar, precisa editar via API/banco ou pedir ajuste ao Gemini). Na tela de detalhe da meta, o studyTip não fica visível por padrão: aparece um botão/chip "Ver dica de estudo" que abre um modal com o conteúdo, separando visualmente as seções "Dicas" e "Resumo do conteúdo" (identificadas pelos marcadores de texto salvos no banco).

## Campo `aiSummary` (Resumo de IA)

- É gerado dinamicamente pela API do Gemini (prompt server-side) a partir da disciplina e do assunto da meta.
- O resumo foca no que costuma ser cobrado em concursos fiscais/SEFAZ, formatado de maneira objetiva e didática.
- Não usa o conteúdo dos PDFs nem o `studyTip` como base, apenas a disciplina e o assunto.
- Uma vez gerado, é salvo no banco de dados na coluna `aiSummary` da respectiva meta para não precisar chamar a IA novamente.
- Na interface (tela de detalhe da meta), fica acessível através do botão "Resumo de IA", que abre um modal com um aviso de isenção (disclaimer) alertando que o conteúdo foi gerado por IA e pode conter imprecisões.
- (Geralmente) não é necessário nem gerado para as metas do tipo "Revisão Geral".

## Módulo de Questões (revisão com IA)

- Página separada (`/questoes`) com filtro por semana, meta e disciplina.
- Toda questão pertence a uma meta (`goalId`) e tem uma origem (`source`):
  - `ia_nova`: questão original gerada pela IA, sem tentar imitar nenhuma banca.
  - `ia_estilo_concurso`: questão gerada pela IA **no estilo** de uma banca (CESPE/CEBRASPE, FGV ou FCC) — formato de alternativas e padrão de cobrança daquela banca, mas **nunca uma reprodução ou afirmação de ser uma questão real** de uma prova específica. Não tem concurso, ano ou cargo associado, porque não é uma questão real.
- Toda questão tem gabarito comentado completo: explicação da alternativa correta **e** de cada alternativa errada, não apenas um comentário genérico.
- Questões são geradas sob demanda (botão "Gerar questões") e ficam salvas — não são descartadas depois de respondidas.
- Cada resposta do usuário gera um registro de tentativa (`question_attempts`); a mesma questão pode ser respondida mais de uma vez (não há bloqueio de "já respondida"), o que permite revisão espaçada.
- Estatísticas de desempenho (percentual de acerto geral e por disciplina) são calculadas a partir do histórico de tentativas, respeitando os filtros ativos na tela.

## Escopo e não-objetivos (o que o app não faz de propósito)

- **Sem autenticação/login.** É uma ferramenta de uso pessoal de uma única pessoa. Não adicionar sistema de contas a menos que explicitamente solicitado.
- **Sem cronograma/calendário automático.** As metas não têm data de vencimento nem lembretes — o controle de ritmo é manual, pelo próprio usuário.
- **Sem edição de conteúdo pela interface** (criar/editar semanas, metas e materiais direto na tela) — hoje isso é feito via prompts para o Gemino no AI Studio, não pela UI do app. Se isso mudar, atualizar esta seção.
- **Os links de materiais apontam para a plataforma Gran Cursos Online** e exigem login lá — o app não replica nem armazena o conteúdo das aulas/PDFs, só organiza os links e o progresso.

## Onde alterar cada regra

| Regra                              | Arquivo                          |
|-------------------------------------|-----------------------------------|
| Cálculo de progresso (meta/semana)  | `src/Home.tsx`, `src/GoalDetail.tsx` |
| Cálculo de estatísticas gerais      | `server.ts` (`/api/stats`)         |
| Lógica de auto-expand da semana     | `src/Home.tsx` (`useEffect` que seta `expandedWeeks`) |
| Marcação de conclusão/completedAt   | `server.ts` (`PUT /api/materials/:id`) |
