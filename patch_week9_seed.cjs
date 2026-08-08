const fs = require('fs');

let content = fs.readFileSync('db/seed.ts', 'utf8');

const newWeek9 = `
  if (!existingWeeks.some(w => w.number === 9)) {
    console.log('Seeding Week 9...');
    
    // Create Week 9
    const insertedWeek = await db.insert(weeks).values({
      number: 9,
      title: 'Semana 9'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Língua Portuguesa', subject: 'A Sintaxe do Período Simples - Parte II', type: 'teoria', studyTip: \`Dicas:
Para diferenciar complemento nominal de adjunto adnominal, não olhe apenas a preposição. Verifique o sentido: complemento nominal completa nome abstrato, adjetivo ou advérbio e normalmente tem valor de paciente; adjunto adnominal caracteriza ou determina o substantivo e pode indicar agente, posse ou espécie.
O adjunto adverbial expressa circunstância. Em vez de decorar listas, identifique a relação semântica no contexto: tempo, lugar, modo, causa, finalidade, condição, concessão, intensidade ou meio.
Na passagem da voz ativa para a passiva, o objeto direto torna-se sujeito paciente. Verbo transitivo indireto não admite essa transformação na passiva analítica comum.
Na voz passiva sintética, o pronome “se” é partícula apassivadora e o verbo concorda com o sujeito paciente. Com verbo intransitivo, transitivo indireto ou de ligação, o “se” tende a indeterminar o sujeito e o verbo fica no singular.
Reflexividade ocorre quando o sujeito pratica e recebe a ação; reciprocidade exige dois ou mais participantes agindo uns sobre os outros. Teste o sentido antes de classificar o pronome.
Em reescritas, preserve relações sintáticas, concordância e foco informacional. Uma transformação pode manter a correção gramatical e, ainda assim, alterar a ênfase do enunciado. 6

Resumo do conteúdo:
COMPLEMENTO NOMINAL: Complemento nominal é termo preposicionado que completa o sentido de substantivo abstrato, adjetivo ou advérbio. Em regra, apresenta valor semântico de paciente: “respeito às normas”, “favorável ao contribuinte”, “longe da repartição”.
ADJUNTO ADNOMINAL: Adjunto adnominal acompanha substantivo para determiná-lo, especificá-lo ou caracterizá-lo. Pode ser artigo, pronome, numeral, adjetivo ou locução adjetiva. Quando ligado a substantivo abstrato, frequentemente indica agente, posse ou origem: “a decisão do auditor” pode significar que o auditor decidiu.
COMPLEMENTO NOMINAL X ADJUNTO ADNOMINAL: Com substantivo concreto, o termo preposicionado tende a ser adjunto. Com substantivo abstrato, analise o papel semântico: quem pratica ou possui costuma ser adjunto; quem recebe ou sofre a ação tende a ser complemento nominal. A preposição isolada não resolve a questão.
ADJUNTO ADVERBIAL: Adjunto adverbial modifica verbo, adjetivo, advérbio ou toda a oração, acrescentando circunstância. Pode ser representado por advérbio, locução adverbial ou expressão equivalente. Seu deslocamento costuma exigir atenção à pontuação e pode alterar o foco do enunciado.
VOZES VERBAIS: Na voz ativa, o sujeito é agente. Na passiva, o sujeito é paciente; a passiva analítica usa auxiliar “ser” mais particípio e pode apresentar agente da passiva. Na passiva sintética, usa-se verbo transitivo direto ou direto e indireto acompanhado de partícula apassivadora. Na voz reflexiva, sujeito e objeto referem-se ao mesmo participante. Na recíproca, participantes praticam a ação mutuamente.
TRANSFORMAÇÃO DE VOZ: Ao transformar ativa em passiva, preserve tempo e modo verbais. O objeto direto passa a sujeito paciente; o sujeito agente pode tornar-se agente da passiva. A concordância passa a ser feita com o novo sujeito.
COMO CAI EM PROVA: A banca cobra classificação de termos, valor semântico, função do “se”, concordância na passiva sintética e equivalência entre voz ativa e passiva. Pegadinhas comuns: • considerar todo termo preposicionado complemento nominal; • confundir agente ou possuidor com paciente; • tratar qualquer “se” como partícula apassivadora; • manter o verbo no singular diante de sujeito paciente plural; • transformar verbo sem objeto direto em passiva analítica. Como resolver: Identifique o núcleo, verifique qual termo exige o complemento e teste os papéis de agente e paciente. Nas construções com “se”, examine a transitividade e procure um termo com o qual o verbo possa concordar.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/88mbkL75tjI%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/RWOCNwF1r0c%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403651&desatualizada=0&anulada=0&query=simples&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Contabilidade de Custos', subject: 'Conceito de Custos - Parte III', type: 'teoria', studyTip: \`Dicas:
Antes de calcular, desenhe o fluxo: matéria-prima, produtos em elaboração, produtos acabados e custo dos produtos vendidos. A banca costuma trocar os estoques ou inverter sinais. 8

Resumo do conteúdo:
FLUXO DOS CUSTOS DE PRODUÇÃO: O custo de produção do período reúne materiais diretos, mão de obra direta e custos indiretos de fabricação. A produção acabada considera a movimentação do estoque em elaboração; o custo dos produtos vendidos considera a movimentação do estoque de produtos acabados. Em forma simplificada: produção acabada = estoque inicial em elaboração + custos do período - estoque final em elaboração. CPV = estoque inicial de acabados + produção acabada - estoque final de acabados.
PRODUÇÃO POR ORDEM E CONTÍNUA: Na produção por ordem, os custos são acumulados para cada encomenda, lote ou serviço identificável. Na produção contínua, produtos homogêneos percorrem processos repetitivos e os custos são acumulados por departamento ou período.
DEPARTAMENTALIZAÇÃO: Departamentos de produção atuam diretamente na fabricação; departamentos de serviços apoiam a operação. Os custos indiretos são atribuídos aos departamentos por critérios coerentes e, depois, transferidos aos produtos. O objetivo é reduzir distorções de rateios gerais.
CUSTEIO BASEADO EM ATIVIDADES - ABC: O ABC identifica atividades relevantes, atribui recursos a essas atividades e utiliza direcionadores para levar seus custos aos produtos ou serviços. Ele procura explicar a causa do consumo, sendo especialmente útil quando custos indiretos são relevantes e os produtos consomem atividades de modo diferente.
ABSORÇÃO X VARIÁVEL: No custeio por absorção, todos os custos de fabricação, fixos e variáveis, integram os produtos. Parte do custo fixo pode permanecer no estoque. No custeio variável, apenas custos variáveis são apropriados aos produtos; custos fixos são despesas do período. A diferença afeta estoque e resultado quando produção e vendas não coincidem.
RKW: O RKW promove apropriação ampla, incluindo custos e despesas, para apoiar formação de preços e análise gerencial. Sua finalidade não se confunde com a mensuração contábil obrigatória dos estoques.
COMO CAI EM PROVA: A banca cobra fórmulas do fluxo produtivo, classificação dos departamentos, sequência dos rateios, direcionadores do ABC e efeitos dos métodos sobre estoque e resultado. Pegadinhas comuns: • somar estoque final em vez de subtrair; • confundir produção acabada com CPV; • transferir diretamente departamentos de serviços aos produtos sem observar o método proposto; • trocar direcionador de recursos por direcionador de atividades; • incluir custo fixo no estoque pelo custeio variável; • tratar RKW como equivalente ao custeio por absorção. Como resolver: Monte o fluxo físico e contábil antes da fórmula. Em questões conceituais, pergunte quais gastos chegam ao produto, quais vão diretamente ao resultado e qual relação causal o direcionador representa.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/s9bAy91fqvI%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/5gD5HaLNUNw%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=416690%2C416740%2C416688%2C3962%2C3976&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Legislação Tributária', subject: 'EC n. 132/2023 - Explicação da Reforma Tributária', type: 'teoria', studyTip: \`Dicas:
Estude a Reforma Tributária como uma arquitetura. Primeiro identifique o que foi criado ou alterado; depois organize competência, materialidade, princípios e transição.
IBS não é imposto apenas estadual: sua competência é compartilhada entre Estados, Distrito Federal e Municípios. A CBS pertence à União e o Imposto Seletivo também é federal.
Neutralidade, simplicidade, transparência, justiça tributária, cooperação e defesa do meio ambiente passaram a orientar o sistema. A banca pode trocar esses princípios por características de outros tributos.
A EC n. 132/2023 não reescreveu todo o Direito Tributário. Obrigação, crédito, lançamento, decadência e prescrição continuam apoiados na estrutura geral do CTN.
Organize separadamente os impactos sobre ITCMD, IPVA, IPTU e COSIP. São alterações pontuais, mas muito atraentes para questões literais.
Evite estudar apenas siglas. Relacione cada novo tributo ao ente competente, à base econômica e ao tributo que será substituído durante a transição.

Resumo do conteúdo:
ALCANCE DA REFORMA: A EC n. 132/2023 reformulou principalmente a tributação sobre o consumo e introduziu alterações pontuais em tributos patrimoniais e regras constitucionais. Ela não eliminou a estrutura geral do CTN nem substituiu todos os tributos existentes.
NOVOS PRINCÍPIOS: O Sistema Tributário Nacional deve observar simplicidade, transparência, justiça tributária, cooperação e defesa do meio ambiente. IBS e CBS são orientados, ainda, pela neutralidade, buscando reduzir distorções nas decisões econômicas.
IBS, CBS E IMPOSTO SELETIVO: O IBS é imposto de competência compartilhada entre Estados, Distrito Federal e Municípios. A CBS é contribuição da União. Ambos estruturam o modelo dual de tributação sobre bens e serviços, com não cumulatividade e tributação no destino. O Imposto Seletivo é de competência da União e alcança produção, extração, comercialização ou importação de bens e serviços prejudiciais à saúde ou ao meio ambiente, conforme disciplina constitucional e legal.
ALTERAÇÕES EM TRIBUTOS PATRIMONIAIS: O ITCMD recebeu regras relacionadas à progressividade e competência em situações específicas. O IPVA teve seu campo constitucional ampliado para alcançar determinados veículos aquáticos e aéreos, ressalvadas as exceções. No IPTU, a Constituição passou a admitir atualização da base de cálculo pelo Poder Executivo conforme critérios estabelecidos em lei municipal.
COSIP, IMUNIDADES E FUNDOS: A contribuição de iluminação pública passou a abranger expansão e melhoria do serviço e sistemas de monitoramento para segurança e preservação de logradouros. A reforma também alterou pontos de imunidade e criou instrumentos como o Fundo Nacional de Desenvolvimento Regional.
TRANSIÇÃO: A substituição dos tributos atuais ocorrerá gradualmente. Para prova, é essencial separar regras permanentes, etapas de transição e competências de cada ente, sem antecipar efeitos que dependem de regulamentação.
COMO CAI EM PROVA: A cobrança tende a explorar literalidade da EC, competências, princípios, alterações patrimoniais e comparação entre o sistema atual e o novo modelo. Pegadinhas comuns: • atribuir o IBS exclusivamente aos Estados; • chamar a CBS de imposto; • afirmar que a reforma revogou as normas gerais do CTN; • ignorar exceções na ampliação do IPVA; • confundir atualização da base do IPTU com criação livre de alíquota pelo Executivo; • misturar regra de transição com regra definitiva. Como resolver: Monte uma tabela com tributo, espécie, competência, materialidade e função. Quando a questão citar mudança, confirme se ela decorre diretamente da Constituição ou depende de lei complementar.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/EOPlrmRLdKc%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/pTEdvM3QQOc%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=433778&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'Banco de Dados Relacionais - Parte IV', type: 'teoria', studyTip: \`Dicas:
Em álgebra relacional, acompanhe entrada e saída. Seleção filtra linhas; projeção escolhe colunas; junção combina relações por condição.
União, interseção e diferença exigem relações compatíveis. Não confunda união de conjuntos com junção entre tabelas relacionadas.
Dependência funcional X -> Y significa que cada valor de X determina um único valor de Y. Ela não afirma causalidade, apenas restrição lógica dos dados.
A 1FN elimina grupos repetitivos e exige valores atômicos. A 2FN combate dependência parcial da chave composta. A 3FN combate dependência transitiva de atributo não chave.
Normalizar reduz redundância e anomalias de inserção, atualização e exclusão. Não significa eliminar toda duplicação nem garantir melhor desempenho em qualquer cenário.
Para descobrir a forma normal, identifique primeiro chaves candidatas e atributos primos. Sem isso, a análise vira adivinhação.

Resumo do conteúdo:
ÁLGEBRA RELACIONAL: A álgebra relacional fornece operações formais sobre relações. Seleção restringe tuplas por predicado. Projeção escolhe atributos e pode eliminar duplicidades. Renomeação altera nomes para facilitar expressões. União, interseção e diferença operam sobre relações união-compatíveis. Produto cartesiano combina todas as tuplas; junção aplica condição para produzir combinações relacionadas. A divisão representa consultas do tipo “para todos”.
DEPENDÊNCIA FUNCIONAL: Em X -> Y, valores iguais de X devem produzir valores iguais de Y. X é determinante. Dependências ajudam a identificar chaves e redundâncias. Dependência total exige todo o conjunto determinante; dependência parcial usa apenas parte de uma chave composta; dependência transitiva ocorre por intermédio de outro atributo não chave.
CHAVES E ATRIBUTOS PRIMOS: Chave candidata identifica unicamente cada tupla e é mínima. Atributo primo integra alguma chave candidata. A classificação das dependências e das formas normais depende dessa identificação.
PRIMEIRA FORMA NORMAL - 1FN: A 1FN exige atributos com valores atômicos, sem grupos repetitivos ou listas dentro da mesma célula. Uma relação precisa primeiro estar em 1FN para avançar às demais formas.
SEGUNDA FORMA NORMAL - 2FN: A relação está em 2FN quando está em 1FN e todo atributo não primo depende totalmente de cada chave candidata. O problema típico aparece com chave composta e atributo dependente de apenas parte dela.
TERCEIRA FORMA NORMAL - 3FN: A 3FN elimina dependências transitivas inadequadas entre chave e atributos não primos. O objetivo é fazer com que informações sobre entidades diferentes sejam separadas, reduzindo anomalias.
ANOMALIAS: Redundância pode causar inconsistência na atualização, impedir inserção sem dado irrelevante ou eliminar informação ao apagar uma linha. A decomposição deve buscar preservação das dependências e junção sem perda.
COMO CAI EM PROVA: A banca apresenta tabelas pequenas e pergunta pela operação relacional, dependência funcional, chave ou forma normal violada. Pegadinhas comuns: • trocar seleção por projeção; • confundir união com junção; • interpretar dependência funcional como causalidade; • procurar dependência parcial quando a chave é simples; • afirmar que 3FN elimina todas as redundâncias; • normalizar sem identificar chaves candidatas. Como resolver: Escreva as chaves e dependências. Marque atributos primos e não primos. Depois teste, na ordem, atomicidade, dependência parcial e dependência transitiva.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/d3Lyfv2RjR4%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/yT9f7Xitl6o%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=8045&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Direito Empresarial', subject: 'Introdução ao Direito Empresarial', type: 'teoria', studyTip: \`Dicas:
Empresa é atividade econômica organizada; empresário é quem a exerce profissionalmente; estabelecimento é o conjunto de bens organizado. A troca entre esses conceitos é uma das cobranças mais frequentes.
A teoria da empresa substituiu o antigo critério dos atos de comércio. O foco atual está na organização dos fatores de produção e no exercício profissional da atividade econômica.

Resumo do conteúdo:
EVOLUÇÃO DO DIREITO EMPRESARIAL: O Direito Comercial passou por fases: sistema corporativo subjetivo, teoria objetiva dos atos de comércio e moderna teoria da empresa. O Código Civil brasileiro adota como centro a atividade empresarial organizada.
EMPRESA E EMPRESÁRIO: Empresa é a atividade econômica organizada para produção ou circulação de bens ou serviços. Empresário é a pessoa que exerce profissionalmente essa atividade. Profissionalidade envolve habitualidade, organização e atuação em nome próprio.
ELEMENTOS DA ORGANIZAÇÃO: A atividade empresarial articula fatores como capital, trabalho, insumos e tecnologia. O simples exercício eventual de atividade econômica não basta para caracterizar empresário.
ATIVIDADES INTELECTUAIS: Quem exerce profissão intelectual, científica, literária ou artística não é considerado empresário, ainda que conte com auxiliares, salvo se o exercício da profissão constituir elemento de empresa.
EMPRESÁRIO INDIVIDUAL: Empresário individual é pessoa natural que exerce empresa em nome próprio. Deve possuir capacidade, não estar legalmente impedido e cumprir obrigações como registro, escrituração e levantamento de balanços. O empresário casado pode, sem outorga conjugal, alienar ou gravar de ônus real imóveis que integrem o patrimônio da empresa, conforme a regra legal.
REGISTRO E IRREGULARIDADE: A inscrição no Registro Público de Empresas Mercantis é obrigatória antes do início da atividade. O registro confere regularidade, mas a caracterização de empresário decorre do exercício da atividade. O empresário irregular sofre restrições e consequências jurídicas.
PREPOSTOS: Prepostos colaboram com a atividade empresarial e podem vincular o preponente nos limites de suas funções. Gerente, contabilista e outros auxiliares possuem regras próprias de atuação e responsabilidade.
COMO CAI EM PROVA: A banca cobra conceitos, exceção das atividades intelectuais, empresário individual, efeitos do registro e responsabilidade por atos de prepostos. Pegadinhas comuns: • tratar empresa como sujeito de direitos; • dizer que empresário individual é pessoa jurídica; • considerar todo profissional intelectual empresário; • afirmar que somente o registro cria a condição de empresário; • confundir estabelecimento com local físico; • ignorar atos praticados por prepostos dentro de suas funções. Como resolver: Identifique se a questão fala da atividade, da pessoa ou do conjunto de bens. Depois teste profissionalidade, organização, exceção intelectual, capacidade e regularidade registral.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Adm9%2B1MXZMk%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/yvCG0P0czjE%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=406936&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Estatística', subject: 'Distribuição Normal e Binomial', type: 'teoria', studyTip: \`Dicas:
Antes da fórmula binomial, confirme quatro condições: número fixo de ensaios, duas categorias de resultado, independência e probabilidade de sucesso constante.
Bernoulli descreve um único ensaio; Binomial conta sucessos em n ensaios. A diferença está no número de tentativas, não no tipo de sucesso.
Na Binomial, média é np e variância é np(1-p). Não troque desvio padrão por variância.
Na Normal, probabilidade é área sob a curva. A probabilidade de um ponto isolado é zero, pois a variável é contínua.
Padronize com Z = (X - média)/desvio padrão. O sinal de Z mostra de que lado da média está o valor.
Na aproximação da Binomial pela Normal, use correção de continuidade quando exigida: transforme limites inteiros em fronteiras de meia unidade.

Resumo do conteúdo:
DISTRIBUIÇÃO DE BERNOULLI: Bernoulli representa um experimento com dois resultados, usualmente sucesso e fracasso. Se P(X=1)=p e P(X=0)=1-p, então E(X)=p e Var(X)=p(1-p).
DISTRIBUIÇÃO BINOMIAL: X conta o número de sucessos em n ensaios de Bernoulli independentes, com probabilidade p constante. Sua função é P(X=k)=C(n,k)p^k(1-p)^(n-k), para k de zero a n. A esperança é np; a variância é np(1-p); o desvio padrão é a raiz dessa variância. Expressões como “pelo menos”, “no máximo” e “mais de” devem ser traduzidas cuidadosamente para somas ou complementos.
DISTRIBUIÇÃO NORMAL: A Normal é contínua, simétrica e determinada por média e variância. Média, mediana e moda coincidem. A área total sob a curva é um e probabilidades correspondem a áreas entre limites.
PADRONIZAÇÃO: A transformação Z=(X-média)/desvio padrão converte uma Normal em Normal padrão, com média zero e variância um. Isso permite usar tabela ou função acumulada. A simetria ajuda a converter áreas de um lado da média para o outro.
BINOMIAL X NORMAL: A Binomial é discreta; a Normal é contínua. Quando n é suficientemente grande e p não está excessivamente próximo de zero ou um, a Normal pode aproximar a Binomial, usando média np, variância np(1-p) e, em geral, correção de continuidade.
MÁXIMA VEROSSIMILHANÇA: O estimador de máxima verossimilhança escolhe o parâmetro que torna a amostra observada mais provável. No contexto Bernoulli/Binomial, a proporção amostral surge como estimador natural de p.
COMO CAI EM PROVA: A banca cobra identificação da distribuição, tradução do evento, cálculo de média e variância, padronização e uso de complementos ou simetria. Pegadinhas comuns: • aplicar Binomial sem independência ou p constante; • confundir exatamente k com até k; • usar np(1-p) como desvio padrão; • atribuir probabilidade positiva a ponto isolado da Normal; • inverter a padronização; • aproximar Binomial por Normal sem ajustar os limites. Como resolver: Escreva o evento em símbolos, identifique se a variável é discreta ou contínua e anote os parâmetros. Só então escolha fórmula, complemento, padronização ou aproximação.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/HOJCHzHWRjU%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=7295%2C426652%2C416543&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Direito Constitucional', subject: 'Funções Essenciais à Justiça', type: 'teoria', studyTip: \`Dicas:
Funções essenciais à Justiça não integram o Poder Judiciário. A Constituição atribui autonomia e funções próprias a cada instituição.
No Ministério Público, memorize unidade, indivisibilidade e independência funcional. Não confunda independência do membro com ausência de controles institucionais.
Organize garantias e vedações dos membros do MP em paralelo às da magistratura, observando diferenças constitucionais.
Advocacia-Geral da União representa a União judicial e extrajudicialmente e exerce consultoria e assessoramento jurídico do Executivo federal.
Defensoria Pública presta orientação jurídica e defesa integral e gratuita aos necessitados, também podendo atuar coletivamente.
CNMP controla atuação administrativa e financeira do Ministério Público e cumprimento dos deveres funcionais, mas não exerce jurisdição.

Resumo do conteúdo:
MINISTÉRIO PÚBLICO: O Ministério Público é instituição permanente, essencial à função jurisdicional do Estado, incumbida da defesa da ordem jurídica, do regime democrático e dos interesses sociais e individuais indisponíveis. Seus princípios institucionais são unidade, indivisibilidade e independência funcional. Possui autonomia funcional e administrativa e elabora sua proposta orçamentária dentro dos limites legais.
RAMOS E FUNÇÕES: O Ministério Público da União compreende MP Federal, do Trabalho, Militar e do Distrito Federal e Territórios. Há também Ministérios Públicos estaduais. Entre as funções estão promover ação penal pública, zelar pelo respeito aos direitos constitucionais e promover inquérito civil e ação civil pública.
GARANTIAS, VEDAÇÕES E CNMP: Os membros possuem vitaliciedade, inamovibilidade e irredutibilidade de subsídio, com vedações destinadas a assegurar independência. O CNMP exerce controle administrativo, financeiro e disciplinar, conforme composição e competências constitucionais.
ADVOCACIA PÚBLICA: A Advocacia-Geral da União representa a União judicial e extrajudicialmente e presta consultoria e assessoramento jurídico ao Poder Executivo. Procuradores dos Estados e do Distrito Federal exercem representação judicial e consultoria jurídica das respectivas unidades.
ADVOCACIA PRIVADA: O advogado é indispensável à administração da justiça e inviolável por seus atos e manifestações no exercício profissional, dentro dos limites legais.
DEFENSORIA PÚBLICA: A Defensoria Pública é instituição permanente e essencial à função jurisdicional. Presta orientação jurídica, promove direitos humanos e realiza defesa judicial e extrajudicial, individual e coletiva, integral e gratuita aos necessitados. Seus princípios incluem unidade, indivisibilidade e independência funcional.
COMO CAI EM PROVA: A banca cobra literalidade dos arts. 127 a 135, princípios, funções, autonomias, garantias, vedações e diferenças entre as institutions. Pegadinhas comuns: • incluir MP ou Defensoria no Poder Judiciário; • atribuir ao MP representação judicial de entidades públicas; • confundir CNMP com CNJ; • restringir a Defensoria à atuação criminal ou individual; • trocar funções da AGU e do Ministério Público; • tratar garantias institucionais como ausência de responsabilidade. Como resolver: Identifique primeiro a instituição. Depois classifique a informação como princípio, função, garantia, vedação, autonomia ou controle e compare com a redação constitucional.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/b4N321IOmGs%3D' },
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/JY3sI%2Bp6qYc%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=405281&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Economia', subject: 'Introdução à Microeconomia', type: 'teoria', studyTip: \`Dicas:
Economia começa com escassez: recursos são limitados e desejos, amplos. Toda escolha envolve renúncia e, portanto, custo de oportunidade.
Diferencie economia positiva, que descreve e explica fatos, de economia normativa, que envolve juízo de valor sobre o que deveria ocorrer.
Movimento ao longo da curva ocorre por mudança no preço do próprio bem. Deslocamento da curva decorre de outros determinantes, como renda, preferências, tecnologia ou preço de bens relacionados.
Demanda relaciona preço e quantidade demandada, mantendo os demais fatores constantes. Oferta relaciona preço e quantidade ofertada sob a mesma condição ceteris paribus.
Preço de equilíbrio iguala quantidade demandada e ofertada. Preço acima do equilíbrio gera excesso de oferta; abaixo, excesso de demanda.
Não memorize setas isoladas. Explique o mecanismo: qual variável mudou, qual curva se deslocou e o que acontece com preço e quantidade de equilíbrio.

Resumo do conteúdo:
ESCASSEZ E ESCOLHA: Economia estuda como indivíduos e sociedades alocam recursos escassos entre usos alternativos. As escolhas respondem aos problemas fundamentais: o que produzir, como produzir e para quem produzir.
CUSTO DE OPORTUNIDADE: Custo de oportunidade é o valor da melhor alternativa sacrificada. Ele não se limita a desembolso financeiro e aparece em decisões de consumo, produção e políticas públicas.
ORGANIZAÇÃO ECONÔMICA: Mercados usam preços e incentivos para coordenar decisões. Economias planificadas dependem de decisões centrais. Sistemas reais combinam mercado e intervenção estatal em diferentes graus.
DEMANDA: A lei da demanda indica relação inversa entre preço e quantidade demandada, mantidos os demais fatores. Renda, preferências, expectativas, número de consumidores e preços de bens substitutos ou complementares deslocam a curva.
OFERTA: A lei da oferta indica, em geral, relação direta entre preço e quantidade ofertada. Tecnologia, custos de insumos, tributos, subsídios, expectativas e número de produtores deslocam a curva.
EQUILÍBRIO DE MERCADO: O equilíbrio ocorre no encontro entre oferta e demanda. Acima do preço de equilíbrio surge excedente; abaixo, escassez. O ajuste de preços tende a reduzir esses desequilíbrios.
MOVIMENTO X DESLOCAMENTO: Mudança no preço do próprio bem provoca movimento ao longo da curva. Mudança em determinante externo desloca a curva inteira. A análise conjunta dos deslocamentos permite prever efeitos sobre preço e quantidade de equilíbrio.
COMO CAI EM PROVA: A banca cobra conceitos fundamentais, custo de oportunidade, fatores de deslocamento e efeitos sobre o equilíbrio. Pegadinhas comuns: • confundir custo de oportunidade com gasto contábil; • tratar afirmação normativa como positiva; • deslocar a demanda por mudança no preço do próprio bem; • confundir quantidade ofertada com oferta; • inverter excesso de demanda e excesso de oferta; • prever preço e quantidade sem identificar qual curva mudou. Como resolver: Nomeie a variável alterada, determine se ela afeta oferta ou demanda e indique a direção do deslocamento. Só depois conclua o efeito sobre preço e quantidade.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/m5n1NhPRkUQ%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/lLaMcY%2FFYCQ%3D' },
      { goalId: meta9[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=411764%2C411765%2C411766&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 1
    const meta10 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Revisão Geral', subject: 'Todas as disciplinas da semana', type: 'revisao' }).returning();
    await db.insert(materials).values([
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Língua Portuguesa' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Contabilidade de Custos' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Legislação Tributária' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Empresarial' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Estatística' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Constitucional' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Economia' },
    ]);
    console.log('Week 9 seed completed successfully!');
  }
`;

const endIndex = content.lastIndexOf("}"); // find the last closing brace (assuming it's before seed().catch)
const beforeCatch = content.indexOf("seed().catch");

if (beforeCatch !== -1) {
    let lastClosingBrace = content.lastIndexOf("}", beforeCatch);
    if(lastClosingBrace !== -1) {
        content = content.substring(0, lastClosingBrace) + newWeek9 + "\n" + content.substring(lastClosingBrace);
        fs.writeFileSync('db/seed.ts', content);
        console.log('Successfully patched db/seed.ts for Week 9');
    } else {
        console.log('Could not find closing brace before seed().catch');
    }
} else {
  console.log('Could not find seed().catch block.', beforeCatch);
}
