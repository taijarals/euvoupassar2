const fs = require('fs');

let content = fs.readFileSync('db/seed.ts', 'utf8');

const newWeek8 = `
  if (!existingWeeks.some(w => w.number === 8)) {
    console.log('Seeding Week 8...');
    
    // Create Week 8
    const insertedWeek = await db.insert(weeks).values({
      number: 8,
      title: 'Semana 8'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Língua Portuguesa', subject: 'A Sintaxe do Período Simples – Parte I', type: 'teoria', studyTip: \`Dicas:
Comece sempre pelo verbo. Ele delimita a oração e orienta a identificação do sujeito, do predicado e dos complementos.
Frase, oração e período não são sinônimos. Frase possui sentido completo; oração se organiza em torno de verbo ou locução verbal; período é a frase formada por uma ou mais orações.
Não procure o sujeito perguntando apenas “quem?”. Verifique a concordância verbal e identifique o termo sobre o qual se declara algo.
Verbos impessoais formam oração sem sujeito e permanecem na terceira pessoa do singular. Cuidado especial com haver no sentido de existir e fazer indicando tempo.
Predicativo atribui característica ao sujeito ou ao objeto. Não o confunda com adjunto adnominal: o predicativo participa da estrutura do predicado.
Aposto explica ou especifica um termo; vocativo chama o interlocutor e fica fora da estrutura sintática da oração.

Resumo do conteúdo:
FRASE, ORAÇÃO E PERÍODO: Frase é todo enunciado capaz de estabelecer comunicação. Pode ser nominal, quando não possui verbo, ou verbal. Oração é a estrutura organizada em torno de verbo ou locução verbal. Período simples possui uma oração; período composto possui duas ou mais.
ESTRUTURA DA ORAÇÃO: A oração articula sujeito e predicado. A ordem direta é sujeito, verbo e complementos, mas deslocamentos são comuns. Por isso, posição inicial não basta para reconhecer função sintática.
SUJEITO: O sujeito determinado pode ser simples, com um núcleo, ou composto, com mais de um. O sujeito oculto é recuperado pela desinência verbal ou pelo contexto. O indeterminado existe, mas não pode ser identificado. Há oração sem sujeito com verbos impessoais, como haver no sentido de existir, fazer indicando tempo decorrido e fenômenos naturais em emprego literal.
PREDICADO: Predicado verbal tem núcleo verbal significativo. Predicado nominal possui verbo de ligação e predicativo do sujeito. Predicado verbo-nominal apresenta dois núcleos: um verbo significativo e um predicativo.
PREDICATIVOS: Predicativo do sujeito atribui estado ou característica ao sujeito. Predicativo do objeto qualifica o complemento verbal. Sua retirada costuma alterar a informação central do predicado.
APOSTO E VOCATIVO: Aposto explica, resume, enumera ou especifica outro termo. Vocativo é chamamento e não exerce função sintática dentro da oração. Ambos exigem atenção à pontuação.
COMO CAI EM PROVA: A banca cobra identificação de sujeito, classificação do predicado, funções sintáticas e correção de reescritas. Pegadinhas comuns: • contar cada verbo de uma locução como oração diferente; • flexionar haver impessoal no plural; • confundir sujeito indeterminado com oração sem sujeito; • chamar qualquer termo entre vírgulas de aposto; • confundir predicativo com adjunto adnominal. Como resolver: Sublinhe os verbos, separe as orações, teste a concordância e localize os núcleos. Só depois classifique sujeito, predicado e termos associados.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/88mbkL75tjI%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/%2BlkcTB9NMwY%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403651&desatualizada=0&anulada=0&query=simples&auth=force&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Direito Tributário', subject: 'Tributos de Competência Estadual', type: 'teoria', studyTip: \`Dicas:
Organize ITCMD, ICMS e IPVA por materialidade, local do fato gerador, contribuinte e regra constitucional específica.
ITCMD alcança transmissão não onerosa. Não confunda herança ou doação com transmissão onerosa de imóvel, sujeita ao ITBI.
No ICMS, a palavra “circulação” significa circulação jurídica, com transferência de titularidade, e não mero deslocamento físico.
ICMS também alcança transporte interestadual e intermunicipal e comunicação. Transporte estritamente municipal não pertence ao seu campo.
IPVA exige atenção ao conceito constitucional de veículo automotor, ao local da tributação e às alterações trazidas pela reforma tributária.
IBS possui competência compartilhada. Evite tratá-lo simplesmente como um novo ICMS estadual.

Resumo do conteúdo:
COMPETÊNCIA ESTADUAL: Estados e Distrito Federal instituem ITCMD, ICMS e IPVA. Também podem cobrar taxas, contribuição de melhoria e contribuição previdenciária de seus servidores, respeitados os pressupostos de cada espécie.
ITCMD: Incide sobre transmissão causa mortis e doação de bens ou direitos. Na herança, cada quinhão pode configurar fato gerador. A regra espacial varia conforme a natureza do bem e a localização do doador, falecido ou inventário, segundo Constituição e legislação complementar.
ICMS: Incide sobre operações relativas à circulação de mercadorias e sobre prestações de transporte interestadual e intermunicipal e de comunicação, ainda que iniciadas no exterior. A circulação relevante é jurídica. É imposto não cumulativo: compensa-se o devido com o cobrado nas etapas anteriores. Pode ser seletivo conforme a essencialidade. A LC 87/1996 disciplina incidência, contribuintes, créditos e outras regras gerais.
ENERGIA, COMBUSTÍVEIS E DIFAL: Energia elétrica é tratada como mercadoria para fins de ICMS. Combustíveis possuem regras constitucionais específicas. Nas operações destinadas a consumidor final em outro Estado, observe o diferencial de alíquotas e a responsabilidade pelo recolhimento.
IPVA: Incide sobre propriedade de veículo automotor. A prova explora aspecto temporal, Estado competente, alienação fiduciária, alíquotas diferenciadas e alcance sobre diferentes espécies de veículos.
IBS E TRANSIÇÃO: O IBS adota lógica de imposto sobre valor agregado, não cumulatividade ampla e tributação no destino. Sua competência é compartilhada entre Estados, Distrito Federal e Municípios, com transição em relação aos tributos atuais.
COMO CAI EM PROVA: A cobrança concentra-se em competência, incidência, local do fato gerador, não cumulatividade e distinção entre tributos. Pegadinhas comuns: • aplicar ITCMD a transmissão onerosa; • considerar mero deslocamento como circulação de mercadoria; • incluir transporte municipal no ICMS; • confundir seletividade com progressividade; • atribuir o IBS exclusivamente aos Estados. Como resolver: Identifique primeiro o fato econômico. Depois determine o ente competente, o local da operação e a regra constitucional especial aplicável.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/SUZk5QCMX5Q%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/qzNdYSnjMho%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407189%2C407210%2C417711%2C417713%2C417714%2C417715%2C407211%2C417717%2C417718%2C417719%2C417721%2C417723%2C417725%2C417727%2C417728%2C417730%2C417731%2C407209%2C417742%2C417743%2C417744&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Contabilidade de Custos', subject: 'Materiais, Estoques e Custos de Fabricação', type: 'teoria', studyTip: \`Dicas:
Separe materiais diretos dos indiretos pela possibilidade de apropriação objetiva ao produto, não apenas pelo valor do item.
Matéria-prima integra fisicamente o produto; material auxiliar participa do processo; embalagem pode compor custo ou despesa conforme sua finalidade.
Subproduto possui mercado estável e receita relevante; sucata tem valor eventual e tratamento distinto. A banca explora essa fronteira.
Perda normal integra o custo; perda anormal vai diretamente ao resultado. Observe a causa e a previsibilidade do desperdício.
Nos estoques, memorize a lógica, não apenas a fórmula: PEPS usa custos mais antigos; média ponderada recalcula custo médio; UEPS não é aceito contabilmente no Brasil.
Tributos recuperáveis não compõem o custo de aquisição. Tributos não recuperáveis integram o custo do material.

Resumo do conteúdo:
MATERIAIS NA PRODUÇÃO: Materiais diretos podem ser identificados e mensurados em relação ao produto. Materiais indiretos beneficiam a produção, mas exigem rateio ou possuem controle direto antieconômico. Matéria-prima é o componente principal transformado. Materiais secundários, auxiliares e de embalagem recebem tratamento conforme participação no processo e destinação.
MÃO DE OBRA E CUSTOS INDIRETOS: Mão de obra direta é apropriada ao produto pelo tempo efetivamente trabalhado. Supervisão, manutenção e atividades comuns são custos indiretos de fabricação.
SUBPRODUTOS, SUCATAS E PERDAS: Subprodutos surgem normalmente do processo e possuem mercado regular. Sucatas têm venda eventual e valor menos previsível. Perdas normais são absorvidas pelos produtos; perdas anormais afetam o resultado do período.
CUSTO DE AQUISIÇÃO: O custo inclui preço de compra, fretes, seguros e gastos necessários para colocar o material em condição de uso, deduzidos descontos e tributos recuperáveis. Tributos sem direito a crédito permanecem no custo.
AVALIAÇÃO DOS ESTOQUES: No PEPS, as primeiras unidades adquiridas são as primeiras baixadas. Na média ponderada, o custo unitário resulta da relação entre valor e quantidade disponíveis. O custo específico é usado quando itens são individualmente identificáveis. O método escolhido afeta estoque final, custo consumido e resultado, especialmente quando os preços variam.
INVENTÁRIO E CONTROLE: O controle permanente registra entradas e saídas continuamente. O periódico apura consumo ou custo a partir do estoque inicial, compras e estoque final. Diferenças físicas exigem análise de perdas normais ou anormais.
COMO CAI EM PROVA: A banca mistura classificação de materiais, cálculo de estoques, tributos recuperáveis e tratamento de perdas. Pegadinhas comuns: • incluir tributo recuperável no custo; • tratar toda embalagem como custo; • confundir subproduto com sucata; • reconhecer perda anormal no estoque; • usar UEPS como método contábil aceito; • calcular média simples sem considerar quantidades. 203 Como resolver: Monte uma ficha com quantidade, custo unitário e valor total. Antes do cálculo, retire tributos recuperáveis e classifique perdas e materiais pela função econômica.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/kfBiYMm5Fio%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/wpMEiyD07C0%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=3979%2C416754%2C416688%2C3944%2C416711&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Direito Constitucional', subject: 'Poder Judiciário', type: 'teoria', studyTip: \`Dicas:
Estude primeiro as disposições gerais dos arts. 92 a 100; depois organize os tribunais e suas competências.
O CNJ integra o Poder Judiciário, mas não exerce jurisdição. Seu controle é administrativo, financeiro e disciplinar.
Vitaliciedade, inamovibilidade e irredutibilidade de subsídio são garantias da magistratura, não privilégios pessoais.
A reserva de plenário exige maioria absoluta do tribunal ou órgão especial para declarar inconstitucionalidade.
Quinto constitucional alcança os tribunais indicados pela Constituição e reserva vagas à advocacia e ao Ministério Público.
Competências de STF e STJ devem ser comparadas: constitucionalidade e guarda da Constituição de um lado; uniformização da legislação federal do outro.

Resumo do conteúdo:
ÓRGÃOS DO JUDICIÁRIO: A Constituição enumera STF, CNJ, STJ, TST, TRFs e juízes federais, Justiça do Trabalho, Eleitoral, Militar e Justiça dos Estados e do Distrito Federal.
MAGISTRATURA: O ingresso ocorre por concurso público, com participação da OAB e exigências constitucionais. Promoção alterna antiguidade e merecimento. As garantias são vitaliciedade, inamovibilidade e irredutibilidade de subsídio; as vedações protegem imparcialidade e independência.
AUTONOMIA E RESERVA DE PLENÁRIO: Tribunais possuem autonomia administrativa e financeira e elaboram propostas orçamentárias. A cláusula de reserva de plenário condiciona declaração de inconstitucionalidade à maioria absoluta dos membros ou do órgão especial.
PRECATÓRIOS: Condenações judiciais contra a Fazenda seguem regime constitucional próprio, com ordem cronológica e preferências. Obrigações de pequeno valor seguem disciplina diferenciada.
STF E STJ: O STF guarda a Constituição e exerce competências originárias e recursais. O STJ uniformiza a interpretação da legislação federal e julga autoridades e causas previstas constitucionalmente.
CNJ E DEMAIS JUSTIÇAS: O CNJ controla atuação administrativa, financeira e disciplinar. Justiça Federal, do Trabalho, Eleitoral e Militar possuem competências materiais específicas; a Justiça Estadual exerce competência residual.
QUINTO CONSTITUCIONAL: Determinados tribunais reservam um quinto de suas vagas a membros do Ministério Público e advogados com requisitos constitucionais, mediante procedimento próprio.
COMO CAI EM PROVA: A banca explora literalidade constitucional, composição, garantias, CNJ e competências dos tribunais. Pegadinhas comuns: • dizer que o CNJ exerce controle externo ou função jurisdicional; • aplicar o quinto constitucional a qualquer tribunal; • confundir competência originária com recursal; 205 • atribuir ao STJ guarda direta da Constituição; • esquecer a reserva de plenário. Como resolver: Classifique a questão em disposição geral, magistratura, controle ou competência. Em competências, identifique matéria constitucional, federal ou especializada antes de escolher o órgão.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/pQ5Z7hZS%2BPQ%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/fOo%2B2OnX5hA%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=405266&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'Banco de Dados Relacionais – Parte III', type: 'teoria', studyTip: \`Dicas:
No modelo relacional, tabela é relação, linha é tupla, coluna é atributo e conjunto de valores possíveis é domínio.
Grau é número de atributos; cardinalidade da relação é número de tuplas. Não troque os conceitos.
Chave candidata identifica unicamente; chave primária é a candidata escolhida; chave estrangeira implementa relacionamento entre tabelas.
Integridade de entidade impede chave primária nula. Integridade referencial exige correspondência válida da chave estrangeira.
Atomicidade significa que cada atributo contém valor indivisível no contexto do modelo.
Regras de Codd descrevem propriedades de um SGBD relacional; não são uma lista de comandos SQL.

Resumo do conteúdo:
MODELO RELACIONAL: O modelo relacional representa dados por relações. Cada relação possui esquema, atributos e domínio; cada ocorrência é uma tupla. A ordem física das linhas e colunas não define o significado lógico.
PROPRIEDADES DAS RELAÇÕES: Tuplas devem ser distinguíveis, valores são atômicos e cada atributo possui domínio definido. Grau corresponde à quantidade de atributos; cardinalidade, à quantidade de tuplas.
CHAVES: Superchave identifica unicamente uma tupla, ainda que contenha atributos excedentes. Chave candidata é superchave mínima. Chave primária é a candidata escolhida; alternativa é candidata não escolhida; composta possui vários atributos. Chave estrangeira referencia chave de outra relação ou da própria relação.
RESTRIÇÕES DE INTEGRIDADE: Integridade de domínio limita valores válidos. Integridade de entidade exige chave primária única e não nula. Integridade referencial impede referências sem correspondência, ressalvadas as regras previstas para valores nulos e ações de atualização ou exclusão.
MODELO LÓGICO: A transformação do modelo entidade-relacionamento em modelo relacional converte entidades em relações e relacionamentos em chaves estrangeiras ou tabelas associativas, conforme cardinalidade.
REGRAS DE CODD: As regras de Codd descrevem acesso relacional, catálogo, tratamento sistemático de nulos, independência lógica e física, integridade e outras propriedades esperadas de sistemas relacionais.
COMO CAI EM PROVA: A cobrança combina terminologia, identificação de chaves, integridade e transformação de modelos. Pegadinhas comuns: • trocar grau por cardinalidade; • chamar toda superchave de candidata; 207 • permitir nulo em chave primária; • exigir que chave estrangeira seja sempre única; • confundir modelo conceitual com lógico. Como resolver: Desenhe duas tabelas simples e marque PK e FK. Verifique unicidade, nulidade, domínio e correspondência antes de avaliar a assertiva.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/pWHV1sEVMnM%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=8045&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Direito Administrativo', subject: 'Bens Públicos', type: 'teoria', studyTip: \`Dicas:
Pelo Código Civil, são públicos os bens pertencentes às pessoas jurídicas de direito público interno.
Separe uso comum do povo, uso especial e dominicais. A afetação define a destinação pública e influencia a possibilidade de alienação.
Bens públicos são impenhoráveis, imprescritíveis e não podem ser adquiridos por usucapião.
A inalienabilidade é relativa: bens dominicais podem ser alienados se cumpridos requisitos legais.
Autorização, permissão e concessão de uso diferem em estabilidade, forma e interesse predominante.
Não confunda bens públicos do Direito Administrativo com bens públicos e recursos comuns da Economia.

Resumo do conteúdo:
CONCEITO E TITULARIDADE: O Código Civil considera públicos os bens pertencentes às pessoas jurídicas de direito público interno. A doutrina pode reconhecer regime público a bens privados afetados à prestação de serviço público, conforme contexto.
CLASSIFICAÇÃO: Bens de uso comum do povo destinam-se à utilização geral, como ruas e praças. Bens de uso especial servem à atividade administrativa, como repartições. Dominicais integram o patrimônio disponível, sem destinação pública específica.
AFETAÇÃO E DESAFETAÇÃO: Afetação atribui destinação pública; desafetação retira essa finalidade. Bens de uso comum e especial precisam ser desafetados antes de eventual alienação.
REGIME JURÍDICO: São imprescritíveis, não sujeitos a usucapião; impenhoráveis, pois dívidas públicas seguem regime próprio; e não oneráveis como garantia real. A alienação depende da categoria e dos requisitos legais.
USO POR PARTICULARES: O uso pode ser comum ou privativo, normal ou anormal. Instrumentos como autorização, permissão e concessão disciplinam utilização especial, variando quanto à precariedade, formalização e interesse envolvido.
INTERVENÇÃO E DESAPROPRIAÇÃO: O PDF também conecta bens públicos à intervenção estatal, especialmente desapropriação, indenização, tredestinação e retrocessão. Identifique quando há mera limitação e quando ocorre perda da propriedade.
COMO CAI EM PROVA: A banca cobra classificação, características, afetação, alienação e uso por particulares. Pegadinhas comuns: • afirmar inalienabilidade absoluta; • admitir usucapião de bem público dominical; • confundir bem de uso especial com dominical; 209 • considerar penhorável bem público sem destinação; • tratar autorização e concessão como equivalentes. Como resolver: Identifique titular, destinação e afetação. Depois aplique o regime jurídico e verifique se a questão trata de uso, alienação ou intervenção.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/%2B2wj2ucJH4U%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/EWh4E8q9dGI%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=404419%2C404420&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Matemática Financeira', subject: 'Cálculo Financeiro', type: 'teoria', studyTip: \`Dicas:
Custo Efetivo Total compara o valor líquido recebido com todos os pagamentos da operação, incluindo juros, tarifas, seguros e tributos.
Taxa anunciada não é necessariamente o custo efetivo. Despesas cobradas na contratação reduzem o valor disponível e elevam a taxa real.
Em rendas, desenhe a linha do tempo antes da fórmula. Identifique valor presente, valor futuro, prestação, taxa e número de períodos.
Renda antecipada tem pagamentos no início; postecipada, no fim. A diferença desloca o fluxo em um período.
Perpetuidade possui pagamentos sem prazo final e exige cuidado com crescimento e momento do primeiro pagamento.
As aulas 55 e 56 reforçam rendas certas; o CET deve ser estudado diretamente pelo PDF completo.

Resumo do conteúdo:
CUSTO EFETIVO TOTAL: O CET mede o custo real de empréstimo ou financiamento considerando todos os fluxos. O valor líquido recebido pode ser menor que o principal contratado quando há tarifas ou juros antecipados. A taxa efetiva é aquela que iguala o valor recebido ao valor presente dos pagamentos. Em questões simples, organize entradas e saídas e aplique equivalência financeira.
RENDAS CERTAS: Rendas são sequências de pagamentos. Podem ser temporárias ou perpétuas, constantes ou variáveis, antecipadas ou postecipadas. A classificação define a fórmula e o deslocamento temporal.
ACUMULAÇÃO E RESGATE: Na acumulação, pagamentos são levados ao valor futuro. No resgate, fluxos futuros são trazidos ao valor presente. Taxa e período precisam estar na mesma unidade.
RENDAS ANTECIPADAS E POSTECIPADAS: Na renda postecipada, a primeira parcela ocorre ao fim do primeiro período. Na antecipada, ocorre imediatamente, produzindo um período adicional de capitalização.
PERPETUIDADES E RENDAS VARIÁVEIS: Perpetuidade uniforme relaciona pagamento periódico e taxa de desconto. Rendas variáveis exigem analisar cada fluxo ou reconhecer padrão de crescimento.
LINHA DO TEMPO: A representação temporal evita aplicar fórmula de montante quando se pede valor presente ou deslocar parcelas para datas incorretas.
COMO CAI EM PROVA: A banca fornece fluxo com tarifas, parcelas e datas e pede taxa efetiva, valor presente ou montante. Pegadinhas comuns: • calcular juros sobre o valor líquido em vez do contratado; • ignorar tarifa paga no início; • confundir renda antecipada com postecipada; 211 • misturar taxa mensal com períodos anuais; • aplicar fórmula sem posicionar a data focal. Como resolver: Desenhe a linha do tempo, registre entradas e saídas e escolha uma data focal. Só então aplique equivalência financeira ou fórmula de renda.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/PcQF1Bo2RQQ%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/TRqi36k%2BQpk%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=408974%2C408973%2C408972%2C425372%2C403816%2C425377&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Direito Tributário', subject: 'Tributos de Competência Municipal', type: 'teoria', studyTip: \`Dicas:
Concentre o estudo em ISS, IPTU e ITBI, comparando materialidade, local do fato gerador e principais imunidades.
ISS exige serviço previsto em lei complementar. Diferencie prestação de serviço de locação pura e das hipóteses reservadas ao ICMS.
IPTU admite progressividade fiscal pelo valor do imóvel e extrafiscal no tempo para cumprir função social urbana.
ITBI incide sobre transmissão onerosa inter vivos de imóveis e direitos reais, não sobre herança ou doação.
Na integralização de capital, a imunidade do ITBI exige atenção à atividade preponderante imobiliária e à jurisprudência.
COSIP não é imposto nem taxa; é contribuição própria para custeio da iluminação pública.

Resumo do conteúdo:
COMPETÊNCIA MUNICIPAL: Municípios e Distrito Federal instituem ISS, IPTU e ITBI. Também podem cobrar taxas, contribuição de melhoria, contribuição previdenciária de servidores e COSIP, observados os requisitos constitucionais.
ISS: Incide sobre serviços definidos em lei complementar, ressalvados os sujeitos ao ICMS. A LC 116/2003 disciplina lista, local da incidência, contribuintes e hipóteses de não incidência. O ponto crítico é distinguir serviço, obrigação de dar e fornecimento de mercadoria. Locação pura não configura serviço; operações mistas dependem da disciplina legal.
IPTU: Incide sobre propriedade, domínio útil ou posse de imóvel urbano. Pode ser progressivo em razão do valor e ter alíquotas diferentes conforme localização e uso. A progressividade no tempo atua como instrumento de política urbana.
ITBI: Incide sobre transmissão onerosa inter vivos de imóvel e direitos reais, exceto garantia, e cessão de direitos de aquisição. O Município competente é o da situação do bem. A imunidade na integralização de capital e reorganizações societárias possui condições e limites, especialmente quanto à atividade preponderante e ao valor efetivamente integralizado.
COSIP E IBS: COSIP financia iluminação pública e pode ser cobrada na fatura de energia. O IBS tem competência compartilhada e lógica de tributação no destino, com transição em relação ao ISS e ao ICMS.
COMO CAI EM PROVA: A banca explora fronteiras: ISS x ICMS, IPTU fiscal x extrafiscal e ITBI x ITCMD. Pegadinhas comuns: • cobrar ISS sobre locação pura; • dizer que IPTU não pode ser progressivo; • aplicar ITBI a herança ou doação; • escolher Município diverso da situação do imóvel; • classificar COSIP como taxa; • ampliar imunidade do ITBI sem verificar requisitos. 213 Como resolver: Pergunte se há serviço, propriedade urbana ou transmissão onerosa. Depois identifique o local, a lei complementar e eventual regra de imunidade.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/SUZk5QCMX5Q%3D' },
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/4bCMXltth%2Fw%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407190%2C407213%2C417746%2C417747%2C417748%2C417749%2C417750%2C407212%2C417751%2C417752%2C417753%2C417754%2C407214%2C417755%2C417756%2C417757%2C417758%2C417759&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Estatística', subject: 'Momentos de Variáveis Aleatórias', type: 'teoria', studyTip: \`Dicas:
O núcleo da meta é calcular e interpretar esperança, variância e outros momentos de variáveis discretas e contínuas.
Em distribuição contínua, probabilidade é área sob a densidade. A integral substitui a soma usada no caso discreto.
Esperança de uma função não é, em geral, a função da esperança. Calcule E pela distribuição de X.
Use Var(X) = E(X²) – ² quando simplificar as contas.
A função geradora de momentos permite obter momentos por derivação em zero, quando existir.
O PDF revisa funções, derivadas e integrais. Se essa base estiver frágil, avance pelos exemplos resolvidos sem transformar a revisão matemática em um novo curso paralelo.

Resumo do conteúdo:
FERRAMENTAS MATEMÁTICAS: Funções descrevem relações entre variáveis. Derivada representa taxa de variação e ajuda a localizar máximos e mínimos. Integral calcula acumulação e área, sendo central nas distribuições contínuas.
DISTRIBUIÇÕES CONTÍNUAS: A função densidade deve ser não negativa e ter integral total igual a 1. A probabilidade em intervalo é a integral da densidade. A função acumulada fornece P(X menor ou igual a x).
DISTRIBUIÇÕES DISCRETAS: Cada valor possui probabilidade associada e a soma total é 1. Esperança e momentos são obtidos por somatórios ponderados.
ESPERANÇA E MOMENTOS: O primeiro momento em torno da origem é E(X). Momentos de ordem superior usam E(X^k). Momentos centrais são calculados em torno da média; o segundo momento central é a variância.
VARIÂNCIA: Variância mede dispersão e pode ser calculada por E ou E(X²) – ². Transformações lineares obedecem E(aX+b)=aE(X)+b e Var(aX+b)=a²Var(X).
FUNÇÃO GERADORA DE MOMENTOS: A FGM é E(e^(tX)). Suas derivadas avaliadas em zero produzem momentos em torno da origem, desde que a função exista em vizinhança adequada.
MODA, MEDIANA E ACUMULADA: Moda maximiza probabilidade ou densidade; mediana divide a distribuição em duas partes. A acumulada conecta densidade e probabilidades intervalares.
COMO CAI EM PROVA: A banca cobra validade de densidades, cálculo de esperança e variância, transformações e interpretação de integrais. Pegadinhas comuns: • tratar densidade como probabilidade pontual; • esquecer normalização da função; • calcular E como g(E); • esquecer o quadrado do coeficiente na variância; • confundir momento em torno da origem com momento central. Como resolver: Classifique a variável como discreta ou contínuas. Verifique se a distribuição é válida, monte soma ou integral e calcule primeiro E(X) e E(X²).\` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/kaIBSgZ6hWA%3D' },
      { goalId: meta9[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=7237%2C416509&desatualizada=0&anulada=0&query=momento&auth=force&auth=force' },
    ]);

    // Meta 10
    const meta10 = await db.insert(goals).values({ weekId, number: 10, discipline: 'Revisão Geral', subject: 'Todas as disciplinas da semana', type: 'revisao' }).returning();
    await db.insert(materials).values([
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Língua Portuguesa' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Tributário' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Contabilidade de Custos' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Constitucional' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Administrativo' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Matemática Financeira' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Tributário' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Estatística' },
    ]);
    console.log('Week 8 seed completed successfully!');
  }
`;

const endIndex = content.lastIndexOf("}"); // find the last closing brace (assuming it's before seed().catch)
const beforeCatch = content.indexOf("seed().catch");

if (beforeCatch !== -1) {
    let lastClosingBrace = content.lastIndexOf("}", beforeCatch);
    if(lastClosingBrace !== -1) {
        content = content.substring(0, lastClosingBrace) + newWeek8 + "\n" + content.substring(lastClosingBrace);
        fs.writeFileSync('db/seed.ts', content);
        console.log('Successfully patched db/seed.ts for Week 8');
    } else {
        console.log('Could not find closing brace before seed().catch');
    }
} else {
  console.log('Could not find seed().catch block.', beforeCatch);
}
