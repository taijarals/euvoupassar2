const fs = require('fs');

let content = fs.readFileSync('db/seed.ts', 'utf8');

const newWeek11 = `
  if (!existingWeeks.some(w => w.number === 11)) {
    console.log('Seeding Week 11...');
    
    // Create Week 11
    const insertedWeek = await db.insert(weeks).values({
      number: 11,
      title: 'Semana 11'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Língua Portuguesa', subject: 'Concordância, Regência, Colocação, Crase e Pontuação', type: 'teoria', studyTip: \`Dicas:
Concordância acompanha núcleos, não palavras próximas. Antes de flexionar verbo ou adjetivo, identifique o termo que realmente comanda a relação.
Em sujeito composto, observe posição, pessoa gramatical e possibilidade de concordância atrativa. Com porcentagens, coletivos e expressões partitivas, leia toda a construção.
Regência deve ser estudada junto ao sentido. Mudança de preposição pode alterar significado ou tornar a construção inadequada.
Crase exige encontro da preposição “a” com artigo ou pronome iniciado por “a”. Faça o teste da regência e, quando possível, substitua por termo masculino para verificar “ao”.
Próclise, mesóclise e ênclise dependem de fatores sintáticos. Palavras negativas, pronomes relativos, subordinativas e certos advérbios atraem o pronome.
Na pontuação, não separe sujeito de verbo nem verbo de complemento sem estrutura intercalada. A vírgula sinaliza relações sintáticas, não simplesmente pausas da fala.

Resumo do conteúdo:
CONCORDÂNCIA VERBAL: O verbo concorda com o núcleo do sujeito. Sujeito simples anteposto normalmente leva concordância direta. Em sujeito composto, a regra geral é plural; quando posposto, pode haver concordância com o conjunto ou atração pelo núcleo mais próximo, conforme a construção. Verbos impessoais permanecem na terceira pessoa do singular, como “haver” no sentido de existir e “fazer” indicando tempo. O verbo “existir” é pessoal e concorda normalmente.
CONCORDÂNCIA NOMINAL: Artigos, numerais, pronomes e adjetivos concordam com o substantivo. Adjetivo relacionado a mais de um substantivo pode ir ao plural ou concordar por atração em hipóteses admitidas. Expressões como “é proibido”, “é necessário” e “é bom” variam quando o substantivo está determinado.
REGÊNCIA: Regência verbal e nominal trata da relação entre termo regente e complemento. Verbos como assistir, visar, aspirar, implicar, preferir, obedecer e informar mudam de construção ou sentido conforme a preposição. Pronomes relativos preservam a regência do termo interno: “a norma a que me referi”, “o cargo a que aspiro”.
COLOCAÇÃO PRONOMINAL: Próclise posiciona o pronome antes do verbo e ocorre com elementos atrativos. Ênclise coloca-o depois e é comum no início de oração ou com imperativo afirmativo. Mesóclise ocorre no futuro do presente ou do pretérito sem fator de próclise. Em locuções verbais, há mais de uma posição possível, respeitando atração e forma do verbo principal.
CRASE: O acento grave marca fusão de dois “a”. É necessário haver termo regente que exija preposição e termo regido que admita artigo feminino ou pronome compatível. Não ocorre antes de verbo, palavra masculina em regra, pronomes sem artigo e expressions com palavras repetidas.
PONTUAÇÃO: Vírgulas isolam termos deslocados, explicativos, intercalados, vocativos, apostos e certas orações. Orações adjetivas explicativas recebem vírgulas; restritivas, não. Dois-pontos anunciam explicação ou enumeração; ponto e vírgula organiza estruturas extensas; travessões e parênteses marcam intercalações.
COMO CAI EM PROVA: A banca cobra correção de frases, substituição de termos, mudança de sentido e efeito da pontuação. Pegadinhas comuns: • fazer o verbo concordar com termo próximo que não é sujeito; • flexionar “haver” impessoal; • trocar regência sem observar mudança de sentido; • aplicar crase apenas porque a palavra seguinte é feminina; • iniciar oração com pronome oblíquo átono na norma formal; • inserir vírgula entre sujeito e predicado. Como resolver: Localize núcleos, termos regentes e estrutura da oração. Em crase, faça dois testes; em pontuação, retire o trecho intercalado e verifique se a estrutura principal permanece íntegra.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula (parte 1)', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/U2Ct3%2Bvpz5Q%3D' },
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula (parte 2)', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/6lxnigQKJi8%3D' },
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula (parte 3)', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Iplzss1uRe4%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/mm0aCjIRm38%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403682%2C403666&desatualizada=0&anulada=0&query=+regencia&auth=force&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Auditoria Fiscal', subject: 'Auditoria Fiscal do Ativo', type: 'teoria', studyTip: \`Dicas:
Ativo fictício é registrado, mas não existe ou não possui valor real; ativo oculto existe, mas não foi contabilizado. A direção da distorção muda.
Saldo credor de caixa é indício relevante porque caixa, em condições normais, não apresenta saldo negativo. Reconstrua entradas e saídas para localizar omissões.
Suprimentos de caixa exigem comprovação da origem e da efetiva entrega dos recursos. Contratos e lançamentos isolados não bastam quando o fluxo financeiro não existe.
Em contas a receber, confronte títulos, recebimentos posteriores, confirmações externas e registros de receita. Baixa fictícia pode ocultar recebimento não contabilizado.
Em estoques, combine contagem física, corte de operações, documentos de entrada e saída e critérios de avaliação.
No não circulante, verifique existência, titularidade, mensuração, depreciação, recuperabilidade e baixa de investimentos, imobilizado e intangível.

Resumo do conteúdo:
OBJETIVOS DA AUDITORIA DO ATIVO: Os procedimentos procuram verificar existência, direitos, integridade, avaliação, classificação e divulgação. O auditor compara registros contábeis com documentos, fluxo financeiro, inspeção física e informações externas.
ATIVO FICTÍCIO E OCULTO: Ativo fictício aparece na contabilidade sem existência ou valor correspondente, superavaliando o patrimônio. Ativo oculto existe, mas não está registrado, podendo indicar aquisição sem origem comprovada, receita omitida ou tentativa de ocultação patrimonial.
CAIXA E BANCOS: A auditoria reconstrói fluxo de caixa, confere extratos, conciliações, comprovantes e depósitos. Saldo credor de caixa, suprimentos sem origem e depósitos não comprovados podem revelar omissão de receitas ou passivos fictícios. Empréstimos de sócios, aumentos de capital e adiantamentos devem ser sustentados por capacidade financeira, documentação e efetiva movimentação.
CONTAS A RECEBER: Confirmações externas, recebimentos subsequentes e exame de documentos testam existência e recuperabilidade. Baixas fictícias, duplicatas inexistentes ou recebimentos não registrados afetam receita e disponibilidade.
ESTOQUES: Inspeção física testa existência. Procedimentos de corte verificam competência das entradas e saídas. Avaliação deve considerar custo, perdas, obsolescência e eventual superavaliação usada para reduzir artificialmente o custo das vendas.
ATIVO NÃO CIRCULANTE: No realizável a longo prazo, o auditor verifica origem, vencimento e recuperabilidade. Em investimentos, examina participação, mensuração e resultados. No imobilizado e intangível, testa aquisição, titularidade, depreciação ou amortização, recuperabilidade e alienações.
COMO CAI EM PROVA: A prova apresenta indícios contábeis e pede a irregularidade, o efeito patrimonial ou o procedimento adequado. Pegadinhas comuns: • inverter ativo fictício e ativo oculto; • aceitar suprimento de caixa apenas por contrato particular; • tratar saldo credor de caixa como situação normal; • confundir teste de existência com teste de integridade; • ignorar corte de estoques; • examinar somente nota fiscal, sem fluxo financeiro ou existência física. Como resolver: Pergunte se o ativo existe, pertence à entidade, foi integralmente registrado e está corretamente avaliado. Depois escolha a evidência que testa diretamente a afirmação relevante.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/OsuMgqpYfvQ%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Vxs2n2JJ%2FdU%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=427260&desatualizada=0&anulada=0&query=ativo&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Direito Constitucional', subject: 'Ordem Social', type: 'teoria', studyTip: \`Dicas:
Seguridade Social reúne saúde, previdência e assistência. Não atribua às três os mesmos requisitos de acesso e financiamento.
Saúde é direito de todos; assistência atende a quem dela necessitar; previdência tem caráter contributivo e filiação obrigatória no regime geral.
Diferencie princípios do ensino, deveres do Estado e percentuais mínimos de aplicação de recursos.
Meio ambiente ecologicamente equilibrado é direito de todos e dever do poder público e da coletividade. Responsabilidades civil, administrativa e penal podem coexistir.
Comunicação social possui vedações e princípios próprios. Cuidado com censura, monopólio e participação de capital estrangeiro.
Família, crianças, adolescentes, jovens, idosos, indígenas e quilombolas recebem proteções constitucionais específicas; a banca explora literalidade.

Resumo do conteúdo:
SEGURIDADE SOCIAL: É conjunto integrado de ações relativas à saúde, previdência e assistência. Seus objetivos incluem universalidade da cobertura, uniformidade entre populações urbanas e rurais, seletividade, irredutibilidade dos benefícios, equidade no custeio e diversidade de financiamento.
SAÚDE: É direito de todos e dever do Estado, garantido por políticas de redução de riscos e acesso universal e igualitário. O SUS organiza-se com descentralização, atendimento integral e participação da comunidade.
PREVIDÊNCIA E ASSISTÊNCIA: O RGPS possui caráter contributivo e filiação obrigatória, observando equilíbrio financeiro e atuarial. A assistência é prestada a quem dela necessitar, independentemente de contribuição, com objetivos constitucionais próprios.
EDUCAÇÃO, CULTURA E DESPORTO: A educação visa pleno desenvolvimento, cidadania e qualificação para o trabalho. O ensino segue princípios como igualdade de acesso, liberdade, pluralismo, gratuidade pública e valorização profissional. O Estado protege manifestações e patrimônio cultural. No desporto, respeita-se autonomia das entidades, e o acesso ao Judiciário em questões disciplinares depende do esgotamento da justiça desportiva nos limites constitucionais.
CIÊNCIA E COMUNICAÇÃO: O Estado promove desenvolvimento científico, pesquisa e inovação. Na comunicação, são vedados censura e monopólio, e a propriedade e programação observam regras constitucionais.
MEIO AMBIENTE: Todos têm direito ao meio ambiente equilibrado. O poder público deve preservar processos ecológicos, exigir estudo de impacto quando cabível e proteger fauna e flora. Pessoas físicas e jurídicas podem sofrer sanções penais e administrativas, além da reparação civil.
PROTEÇÕES ESPECIAIS: A Constituição protege família, criança, adolescente, jovem e idoso com prioridade e deveres compartilhados. Reconhece aos povos indígenas organização social, costumes, línguas e direitos originários sobre terras tradicionalmente ocupadas.
COMO CAI EM PROVA: A cobrança é fortemente literal e comparativa, especialmente em seguridade, educação e meio ambiente. Pegadinhas comuns: • exigir contribuição para acesso à assistência; • tratar previdência como universal e não contributiva; • confundir objetivos da seguridade com princípios do SUS; • afirmar que a responsabilidade ambiental é apenas civil; • permitir censura prévia; • trocar competências e percentuais educacionais. Como resolver: Identifique o capítulo constitucional e o destinatário da regra. Em seguridade, separe saúde, previdência e assistência; nos demais temas, compare direito, dever e instrumento de proteção.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/5sGtb2qMsLw%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Z%2FeJcrc9r8k%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=405306&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Economia', subject: 'Noções da Teoria do Produtor - Parte I', type: 'teoria', studyTip: \`Dicas:
Função de produção descreve a quantidade máxima que pode ser produzida com determinada combinação de fatores e tecnologia.
Curto prazo não é número fixo de meses: é o período em que ao menos um fator permanece fixo. No longo prazo, todos os fatores podem variar.
Produto marginal mede o acréscimo na produção causado por uma unidade adicional do fator; produto médio divide produção pela quantidade utilizada.
Rendimentos marginais decrescentes pertencem ao curto prazo e analisam aumento de um fator com os demais fixos. Rendimentos de escala pertencem ao longo prazo e variam todos os fatores.
Se todos os insumos dobram, compare a produção resultante: mais que o dobro indica retornos crescentes; exatamente o dobro, constantes; menos que o dobro, decrescentes.
Em função homogênea, o grau ajuda a classificar retornos de escala: grau maior que um, crescente; igual a um, constante; menor que um, decrescente.

Resumo do conteúdo:
TEORIA DA FIRMA: A firma combina fatores de produção para transformar insumos em produtos. A análise tecnológica precede a análise de custos: primeiro se estuda quanto pode ser produzido; depois, quanto custa escolher determinada combinação.
FATORES DE PRODUÇÃO: Trabalho, capital, terra e capacidade empresarial aparecem como fatores. A distinção entre fixo e variável depende do horizonte analisado. Um insumo é fixo quando sua quantidade não pode ser ajustada naquele período.
FUNÇÃO DE PRODUÇÃO: A função Q = f(K, L) relaciona produto máximo à quantidade de capital e trabalho, dada a tecnologia. Mudança tecnológica desloca a relação produtiva; mero aumento de insumos representa movimento dentro da função existente.
CURTO E LONGO PRAZO: No curto prazo, ao menos um fator é fixo. No longo prazo, todos os fatores são variáveis. A classificação é econômica, não cronológica, e varia conforme a atividade produtiva.
PRODUTO TOTAL, MÉDIO E MARGINAL: Produto total é a produção obtida. Produto médio relaciona produção e quantidade do fator variável. Produto marginal mede a variação do produto total provocada por unidade adicional do fator. Quando o marginal supera o médio, o médio cresce; quando fica abaixo, o médio cai.
LEI DOS RENDIMENTOS MARGINAIS DECRESCENTES: Mantidos tecnologia e fator fixo, sucessivos acréscimos do fator variável tendem, a partir de certo ponto, a gerar incrementos menores de produção. Isso não significa que o produto total necessariamente caia de imediato; primeiro cai o produto marginal.
RENDIMENTOS DE ESCALA: No longo prazo, todos os fatores variam na mesma proporção. A produção pode crescer em proporção maior, igual ou menor, caracterizando retornos crescentes, constantes ou decrescentes. Para funções homogêneas, o grau permite essa classificação.
COMO CAI EM PROVA: A banca cobra distinções entre curto e longo prazo, cálculo e interpretação dos produtos e classificação dos rendimentos de escala. Pegadinhas comuns: • definir curto prazo por duração em meses; • confundir produto médio com marginal; • afirmar que marginal decrescente implica produto total imediatamente decrescente; • misturar rendimentos marginais e de escala; • variar apenas um insumo ao testar escala; • classificar grau um como retorno crescente. Como resolver: Veja quantos fatores variam. Se apenas um muda, pense em produto marginal e curto prazo. Se todos variam proporcionalmente, pense em escala. Em funções, substitua os insumos por t vezes seus valores e compare o expoente comum.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/m5n1NhPRkUQ%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Rfe%2FlcOPtHk%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403963%2C412800%2C412801%2C412802%2C412803%2C412812%2C426733%2C426734%2C426735%2C426732%2C426736%2C426737%2C426738%2C426739%2C426740%2C426741%2C426744%2C426745%2C426746%2C426742%2C426743&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'Noções de Modelagem Dimensional - Parte I', type: 'teoria', studyTip: \`Dicas:
BI transforma dados em informação para decisão; não é apenas uma ferramenta ou um painel.
OLTP sustenta operações detalhadas e frequentes. OLAP prioriza análise histórica, agregações e consultas multidimensionais.
Data warehouse integra dados orientados por assunto, históricos e não voláteis. Data mart possui escopo departamental ou temático.
ETL extrai, transforma e carrega. A qualidade da transformação e das regras de negócio é tão importante quanto a movimentação.
ROLAP usa estruturas relacionais; MOLAP utiliza cubos multidimensionais; HOLAP combina características.
Nas operações OLAP, memorize o movimento: drill-down detalha, roll-up agrega, slice fixa dimensão e dice seleciona subconjunto multidimensional.

Resumo do conteúdo:
BUSINESS INTELLIGENCE: BI reúne processos, arquitetura e ferramentas para coletar, integrar, analisar e apresentar dados. O objetivo é apoiar decisões com informações consistentes, históricos e compreensíveis.
SELF-SERVICE BI: Permite que usuários de negócio criem análises com menor dependência técnica. A autonomia exige governança, catálogo, segurança e definição comum de métricas para evitar versões conflitantes da verdade.
ARQUITETURA: Fontes operacionais alimentam processos de integração. ETL ou ELT trata qualidade, padronização e regras antes de disponibilizar dados em warehouse, marts, camadas semânticas e ferramentas analíticas.
OLTP X OLAP: OLTP trabalha transações atuais, detalhadas, rápidas e concorrentes, com foco operacional. OLAP trabalha grandes volumes históricos, leituras complexas, agregações e visão multidimensional.
DATA WAREHOUSE E DATA MART: Warehouse é orientado por assunto, integrado, variante no tempo e não volátil. Data mart atende área ou tema específico e pode depender do warehouse ou ser construído separadamente.
TIPOS DE OLAP: MOLAP usa estruturas multidimensionais com desempenho de agregação. ROLAP utiliza banco relacional e escalabilidade. HOLAP combina armazenamento relacional e multidimensional.
OPERAÇÕES OLAP: Slice seleciona valor de uma dimensão; dice recorta múltiplas dimensões; drill-down aumenta detalhe; roll-up consolida; pivot ou rotate muda a orientação da visualização; drill- -through acessa dados subjacentes.
COMO CAI EM PROVA: A banca cobra comparações entre arquiteturas, características de warehouse e significado das operações OLAP. Pegadinhas comuns: • reduzir BI a software de visualização; • trocar OLTP por OLAP; • dizer que warehouse é volátil e voltado a transações; • confundir data mart com banco operacional; • inverter drill-down e roll-up; • trocar slice e dice. Como resolver: Identifique finalidade, granularidade, horizonte temporal e padrão de acesso. Nas operações OLAP, visualize o cubo e determine se houve filtro, rotação, detalhamento ou agregação.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/7xuvYKdx9%2BY%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/4suaCgngVsQ%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=8112&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Legislação Tributária', subject: 'IBS e CBS - Ressarcimento, Modalidades de Extinção e Regimes de Apuração', type: 'teoria', studyTip: \`Dicas:
Extinção do débito de IBS e CBS possui mecanismos próprios. Não transporte automaticamente todas as regras gerais do CTN sem conferir a LC n. 214/2025.
Split payment separa o valor do tributo no momento da liquidação financeira. Entenda participantes, fluxo e hipóteses de simplificação.
Pagamento pelo contribuinte, recolhimento pelo adquirente e pagamento pelo responsável são vias diferentes; identifique quem realiza e por qual fundamento.
Pagamento indevido ou a maior não se confunde com saldo credor decorrente da não cumulatividade. O procedimento aplicável depende da origem.
Ressarcimento exige observância de prazo, análise e condições legais. Não presuma liberação imediata de qualquer crédito.
Na apuração assistida, a administração fornece informações e cálculo preliminar, mas o contribuinte precisa conferir e ajustar os dados.

Resumo do conteúdo:
EXTINÇÃO DOS DÉBITOS: A LC n. 214/2025 disciplina formas de extinção do IBS e da CBS, incluindo pagamento pelo contribuinte, recolhimento na liquidação financeira, recolhimento pelo adquirente, pagamento por responsável e compensações previstas.
PAGAMENTO PELO CONTRIBUINTE: O sujeito passivo recolhe o saldo apurado segundo prazo e forma regulamentares. O pagamento deve ser relacionado ao período e aos débitos correspondentes.
SPLIT PAYMENT: No recolhimento na liquidação financeira, o valor do tributo é segregado do valor destinado ao fornecedor. O mecanismo busca aumentar conformidade e reduzir inadimplência. A lei prevê operacionalização e modalidade simplificada em hipóteses próprias.
RECOLHIMENTO POR TERCEIROS: Adquirente ou responsável pode recolher o tributo quando a lei atribui essa obrigação. Essas situações não transformam automaticamente o terceiro em contribuinte da operação.
PAGAMENTO INDEVIDO E RESSARCIMENTO: Valores pagos indevidamente ou a maior seguem procedimento de devolução ou compensação. Ressarcimento de saldo credor depende da natureza do crédito, do cumprimento de requisitos e da análise dentro dos prazos legais.
REGIME REGULAR: No regime regular, débitos das operações são confrontados com créditos admitidos, produzindo saldo a recolher ou credor. A não cumulatividade deve ser observada conforme regras da LC.
APURAÇÃO ASSISTIDA: A administração tributária pode disponibilizar apuração baseada em documentos e informações eletrônicas. O contribuinte deve validar, complementar ou corrigir os dados e permanece responsável pela exatidão.
COMO CAI EM PROVA: A prova tende a cobrar sequência operacional, sujeito que recolhe, split payment, diferença entre devolução e ressarcimento e funcionamento da apuração. Pegadinhas comuns: • tratar split payment como pagamento integral ao fornecedor; • confundir adquirente responsável com contribuinte; • equiparar pagamento indevido a saldo credor; • afirmar que todo crédito gera ressarcimento imediato; • considerar a apuração assistida definitiva e imutável; • ignorar modalidades específicas da LC. Como resolver: Identifique origem do débito ou crédito, sujeito que efetua o recolhimento e momento da operação. Depois determine se há pagamento, segregação, compensação, devolução ou ressarcimento.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/GfPu1JqERIo%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/5TaInExhCew%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=438078&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Economia', subject: 'Noções da Teoria do Produtor - Parte II', type: 'teoria', studyTip: \`Dicas:
A função de produção representa a fronteira tecnicamente eficiente. Pontos abaixo dela são possíveis, porém ineficientes; pontos acima são inalcançáveis com tecnologia e fatores disponíveis.
Isoquanta reúne combinações de insumos que geram o mesmo produto. Por isso, em geral, é negativamente inclinada, convexa e não se cruza com outra isoquanta.

Resumo do conteúdo:
EFICIÊNCIA E MAXIMIZAÇÃO DA PRODUÇÃO: A função de produção indica a quantidade máxima obtida com determinada combinação de fatores e tecnologia. Uma combinação sobre a fronteira é tecnicamente eficiente; abaixo dela existe desperdício de recursos; acima dela a produção não é alcançável nas condições dadas.
MAIS DE UM FATOR VARIÁVEL: No longo prazo, capital e trabalho podem variar. O produtor passa a escolher entre diversas combinações capazes de gerar o mesmo nível de produto. Essa escolha tecnológica é representada por isoquantas; quando preços dos fatores entram na análise, a combinação de menor custo depende também da reta de isocusto.
ISOQUANTAS: Cada isoquanta reúne pares de fatores que produzem a mesma quantidade. Isoquantas mais afastadas da origem representam maior produto. Sob hipóteses usuais, são decrescentes, convexas em relação à origem e não se interceptam. A convexidade decorre da taxa marginal de substituição técnica decrescente: à medida que um fator substitui o outro, torna-se progressivamente mais difícil continuar a substituição sem reduzir o produto.
TAXA MARGINAL DE SUBSTITUIÇÃO TÉCNICA: A TMST mede a quantidade de um fator que pode ser sacrificada para obter unidade adicional de outro, mantendo o produto constante. Em valor absoluto, relaciona os produtos marginais dos fatores e corresponde à inclinação da isoquanta.
ELASTICIDADE DE SUBSTITUIÇÃO: Essa elasticidade mede a sensibilidade da proporção entre fatores a mudanças na TMST. Quanto maior, mais fácil substituir capital por trabalho ou trabalho por capital. Nos extremos, substitutos perfeitos admitem substituição constante, enquanto complementares perfeitos praticamente não admitem troca entre fatores.
FUNÇÕES DE PRODUÇÃO PARTICULARES: Na função linear, os fatores são substitutos perfeitos e as isoquantas são retas. Na função de proporções fixas ou Leontief, os fatores são complementares e as isoquantas têm formato de L. Na Cobb-Douglas, os expoentes influenciam produtos marginais, participação dos fatores e retornos de escala; a soma dos expoentes auxilia a classificar esses retornos.
COMO CAI EM PROVA: A banca alterna interpretação gráfica, propriedades das isoquantas e identificação de funções de produção. Pegadinhas comuns: • afirmar que ponto abaixo da função é impossível, em vez de ineficiente; • permitir cruzamento de isoquantas; • dizer que isoquanta mais alta representa o mesmo produto; • inverter TMST e razão entre produtos marginais; • trocar substitutos perfeitos por complementares perfeitos; • usar a soma dos expoentes da Cobb-Douglas para classificar rendimentos marginais, e não retornos de escala. Como resolver: Pergunte o que permanece constante. Se é o produto, pense em isoquanta e TMST; se todos os fatores variam proporcionalmente, pense em retornos de escala. Em gráficos, associe primeiro o formato ao grau de substituição e só depois examine números.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/m5n1NhPRkUQ%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/js09r88QMLw%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403963%2C412800%2C412801%2C412802%2C412803%2C412812%2C426733%2C426734%2C426735%2C426732%2C426736%2C426737%2C426738%2C426739%2C426740%2C426741%2C426744%2C426745%2C426746%2C426742%2C426743&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Estatística', subject: 'Testes de Hipóteses e Estatística Inferencial', type: 'teoria', studyTip: \`Dicas:
H0 representa a hipótese testada; H1 representa a alternativa. A decisão é rejeitar ou não rejeitar H0, nunca “provar” H0.
Erro tipo I é rejeitar H0 verdadeira e tem probabilidade alfa. Erro tipo II é não rejeitar H0 falsa e tem probabilidade beta.
Potência é 1 menos beta: capacidade de detectar uma diferença quando ela existe.
O p-valor é a probabilidade, sob H0, de observar resultado tão extremo quanto o obtido. Compare-o com o nível de significância.
Teste unilateral concentra região crítica em uma cauda; bilateral divide-a entre as duas. A hipótese alternativa determina o formato.
Escolha a distribuição conforme parâmetro, variância conhecida ou estimada, tamanho da amostra e pressupostos.

Resumo do conteúdo:
FORMULAÇÃO: Um teste parte de hipótese nula H0 e alternativa H1. H0 geralmente contém igualdade ou valor de referência. H1 pode ser bilateral, maior ou menor, conforme a pergunta.
NÍVEL DE SIGNIFICÂNCIA: Alfa é a probabilidade máxima tolerada de erro tipo I. Ele define a região crítica antes da observação dos dados. Níveis menores tornam mais difícil rejeitar H0.
ERROS E POTÊNCIA: Erro tipo I ocorre ao rejeitar H0 verdadeira. Erro tipo II ocorre ao não rejeitar H0 falsa. Potência é 1-beta e aumenta, em geral, com tamanho amostral, efeito maior ou nível de significância maior.
ESTATÍSTICA DE TESTE: A estatística padroniza a diferença entre estimativa e valor hipotético pelo erro padrão. Sob H0, sua distribuição permite definir região crítica ou calcular p-valor.
P-VALOR: É a probabilidade, assumindo H0, de obter resultado tão ou mais incompatível com ela. Se p-valor for menor ou igual a alfa, rejeita-se H0; caso contrário, não se rejeita.
TESTES Z E T: O teste z é usado quando as condições para Normal são atendidas e a variância populacional é conhecida ou a aproximação é adequada. O teste t utiliza variância amostral e graus de liberdade em contexto apropriado.
QUI-QUADRADO E F: Qui-quadrado aparece em inferência sobre variância e em testes de aderência ou independência, conforme o modelo. A distribuição F compara variâncias e fundamenta análises como ANOVA.
COMO CAI EM PROVA: A banca cobra formulação, decisão, interpretação do p-valor, tipos de erro, potência e escolha do teste. Pegadinhas comuns: • afirmar que não rejeitar H0 prova sua verdade; • inverter erros tipo I e II; • dizer que p-valor é a probabilidade de H0 ser verdadeira; • escolher teste unilateral após observar os dados; • comparar p-valor com nível de confiança em vez de alfa; • usar distribuição sem verificar pressupostos. Como resolver: Escreva H0 e H1, determine unilateralidade, fixe alfa e escolha a estatística. Só então calcule região crítica ou p-valor e formule a decisão no contexto.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/vnUtUHaPZhY%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=416536%2C426608&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Direito Empresarial', subject: 'Direito Societário', type: 'teoria', studyTip: \`Dicas:
Sociedade simples e empresária se distinguem pela atividade e organização, não apenas pelo tipo adotado ou local de registro.
Sociedades personificadas adquirem personalidade com registro; sociedade em comum e conta de participação são não personificadas.
Não confunda responsabilidade da sociedade com responsabilidade dos sócios. O patrimônio social responde primeiro conforme o regime aplicável.
Sociedades de pessoas valorizam características dos sócios; sociedades de capital priorizam contribuição patrimonial e circulação da participação.
Desconsideração não dissolve a pessoa jurídica. Ela afasta episodicamente a autonomia patrimonial para alcançar responsáveis.
Teoria maior exige abuso, desvio de finalidade ou confusão patrimonial. Teoria menor possui requisitos mais amplos em campos legais específicos.

Resumo do conteúdo:
SOCIEDADES: Sociedade nasce da contribuição de pessoas para atividade econômica e partilha de resultados. O contrato ou estatuto organiza participação, administração, responsabilidade e destino dos resultados.
SIMPLES X EMPRESÁRIA: Sociedade empresária exerce atividade própria de empresário sujeito a registro mercantil. Sociedade simples exerce atividade não empresarial e registra-se no Registro Civil das Pessoas Jurídicas, ressalvadas regras do tipo adotado.
CONTRATUAIS X INSTITUCIONAIS: Contratuais são constituídas por contrato social e possuem maior relevância da relação entre sócios. Institucionais são regidas por estatuto e estrutura orgânica, como a sociedade anônima.
PERSONIFICAÇÃO E RESPONSABILIDADE: O registro confere personalidade às sociedades personificadas. Sociedades não personificadas não possuem autonomia plena. Responsabilidade dos sócios pode ser limitada ou ilimitada e subsidiária ou solidária conforme o tipo e a situação.
TIPOS SOCIETÁRIOS: O Código Civil disciplina sociedade simples pura, nome coletivo, comandita simples e outros tipos. Sociedade em nome coletivo possui sócios pessoas físicas com responsabilidade ilimitada; na comandita simples coexistem comanditados e comanditários.
DESCONSIDERAÇÃO: A teoria maior exige abuso da personalidade, caracterizado por desvio de finalidade ou confusão patrimonial. A medida alcança bens de sócios ou administradores beneficiados pelo abuso sem extinguir a pessoa jurídica. A desconsideração inversa alcança patrimônio da sociedade quando a pessoa natural usa a estrutura para ocultar bens. Imputação direta de responsabilidade não se confunde com desconsideração.
COMO CAI EM PROVA: A banca cobra classificações, personalidade, responsabilidade e hipóteses de desconsideração. Pegadinhas comuns: • equiparar sociedade simples a sociedade sem fins econômicos; • afirmar que toda sociedade empresária é sociedade por ações; • confundir sociedade não personificada com inexistente; • presumir responsabilidade limitada em qualquer tipo; • dizer que desconsideração extingue a pessoa jurídica; • aplicar teoria menor como regra geral do Código Civil. Como resolver: Classifique atividade, ato constitutivo, personalidade e responsabilidade separadamente. Na desconsideração, procure abuso e beneficiário antes de definir alcance.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/aSxpa1DIHng%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/XgaFR5wyiI4%3D' },
      { goalId: meta9[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=416333%2C406943%2C405876&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 10
    const meta10 = await db.insert(goals).values({ weekId, number: 10, discipline: 'Revisão Geral', subject: 'Todas as disciplinas da semana', type: 'revisao' }).returning();
    await db.insert(materials).values([
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Língua Portuguesa' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Auditoria Fiscal' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Constitucional' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Economia' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Legislação Tributária' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Economia' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Estatística' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Empresarial' },
    ]);
    console.log('Week 11 seed completed successfully!');
  }
`;

const endIndex = content.lastIndexOf("}"); // find the last closing brace (assuming it's before seed().catch)
const beforeCatch = content.indexOf("seed().catch");

if (beforeCatch !== -1) {
    let lastClosingBrace = content.lastIndexOf("}", beforeCatch);
    if(lastClosingBrace !== -1) {
        content = content.substring(0, lastClosingBrace) + newWeek11 + "\n" + content.substring(lastClosingBrace);
        fs.writeFileSync('db/seed.ts', content);
        console.log('Successfully patched db/seed.ts for Week 11');
    } else {
        console.log('Could not find closing brace before seed().catch');
    }
} else {
  console.log('Could not find seed().catch block.', beforeCatch);
}
