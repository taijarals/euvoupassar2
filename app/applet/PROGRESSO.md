# Progresso do Plano de Estudos

Status de quais semanas do "Guia do Aprovado" (SEFAZ-BA — Auditor Fiscal) já foram cadastradas no app, com metas, materiais (links reais de videoaula/PDF/questões) e o campo `studyTip` (dicas + resumo do conteúdo).

## Semanas cadastradas

| Semana | Metas | Links reais | studyTip preenchido |
|--------|-------|--------------|------------------------|
| 1      | ✅    | ✅           | ✅                     |
| 2      | ✅    | ✅           | ✅                     |
| 4      | ✅    | ✅           | ✅                     |
| 6      | ✅    | ✅           | ✅                     |
| 7      | ✅    | ✅           | ✅                     |
| 8      | ✅    | ✅           | ✅                     |
| 9      | ✅    | ✅           | ✅                     |
| 11     | ✅    | ✅           | ✅                     |
| 12     | ✅    | ✅           | ✅                     |
| 13     | ✅    | ✅           | ✅                     |
| 15     | ✅    | ✅           | ✅                     |

## Semanas pendentes

| Semana | Status                                  |
|--------|-------------------------------------------|
| 3      | PDF ainda não enviado/processado           |
| 5      | PDF ainda não enviado/processado           |
| 10     | PDF ainda não enviado/processado           |
| 14     | PDF ainda não enviado/processado           |
| 16     | PDF ainda não enviado/processado           |

> Se o Guia do Aprovado tiver mais de 16 semanas ao todo, atualize esta lista.

## Melhorias de interface já aplicadas

- **Navegação em accordion**: semanas aparecem recolhidas por padrão (só título + barra de progresso), exceto a primeira semana com pendências, que abre automaticamente. Implementado em `src/Home.tsx` (estado `expandedWeeks`).

## Como adicionar uma nova semana

1. Extrair o PDF da semana ("Guia do Aprovado — Semana N") em texto e localizar os links reais de cada meta (videoaula, PDF, questões) e os textos de "Gran Dica do conteúdo" / "Gran Resumo do conteúdo".
2. Montar um prompt no mesmo formato usado para as semanas já cadastradas: listar cada meta com disciplina, assunto, materiais com links, e o texto de `studyTip` (dicas + resumo).
3. Colar o prompt no chat do projeto já aberto no Google AI Studio (não criar um projeto novo), pedindo para inserir os dados sem apagar as semanas existentes.
4. Conferir no app se a semana nova aparece corretamente, com os links funcionando e a dica de estudo visível na tela de detalhe da meta.
5. Atualizar a tabela deste arquivo (`PROGRESSO.md`).
