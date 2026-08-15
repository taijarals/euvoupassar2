import { db } from './index.js';
import { weeks, goals, materials } from './schema.js';
import { migrate } from 'drizzle-orm/libsql/migrator';

async function seed() {
  console.log('Checking for existing data...');
  const existingWeeks = await db.select().from(weeks);
  
  if (!existingWeeks.some(w => w.number === 1)) {
    console.log('Seeding Week 1...');
    
    // Create Week 1
    const insertedWeek = await db.insert(weeks).values({
      number: 1,
      title: 'Semana 1'
    }).returning();
    const weekId = insertedWeek[0].id;
    
    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Língua Portuguesa', subject: 'Compreensão e Interpretação de Textos', type: 'teoria', studyTip: `Dicas:

Em compreensão e interpretação, não responda pelo tema do texto: responda pelo comando. A mesma passagem pode gerar questão de ideia central, inferência, pressuposto, função da linguagem, coesão, sentido de palavra ou intenção do autor.
Diferencie informação explícita de inferência. Informação explícita está localizada no texto. Inferência é conclusão autorizada por pistas textuais. Se a alternativa exige opinião pessoal, repertório externo ou salto lógico, ela provavelmente extrapolou.
Pressuposto e subentendido não são a mesma coisa. Pressuposto costuma ter marca linguística; subentendido depende mais da situação comunicativa. Em prova, a banca explora justamente essa fronteira entre o que o texto permite concluir e o que o leitor inventa.
Em funções da linguagem, procure a finalidade predominante. Não escolha pela presença de uma palavra isolada. Um texto pode emocionar e informar ao mesmo tempo, mas a questão normalmente pede a função que organiza o trecho.
Em variação linguística, cuidado com julgamento normativo automático. O PDF trabalha a ideia de adequação: linguagem formal, informal, técnica ou coloquial deve ser avaliada conforme gênero, interlocutor, finalidade e contexto.
-> Em questões de sentido de vocábulo, volte ao período inteiro. Palavra em interpretação não vive sozinha: conectivos, retomadas, ironia, contraste e exemplos podem mudar completamente o efeito de sentido.

Resumo do conteúdo:
TEXTO, SENTIDO E SITUAÇÃO COMUNICATIVA: Texto é uma unidade de sentido produzida em uma situação comunicativa. Para interpretar bem, observe quem fala, para quem fala, com qual finalidade, em qual gênero textual e com quais escolhas linguísticas. O sentido não depende apenas de palavras soltas. Ele nasce da relação entre tema, contexto, intencionalidade, informações explícitas, implícitos, coesão, coerência e conhecimento compartilhado.
COMPREENSÃO X INTERPRETAÇÃO: Compreensão envolve localizar ou reconhecer informações expressas no texto. Interpretação exige construir uma conclusão a partir de pistas textuais. A resposta correta precisa estar autorizada pelo texto. Alternativas verdadeiras no mundo real, mas não sustentadas pelo trecho, devem ser eliminadas.
CRITÉRIOS DE TEXTUALIDADE: Aceitabilidade diz respeito à recepção do texto pelo interlocutor. Intencionalidade revela o propósito comunicativo do produtor. Situacionalidade relaciona o texto ao contexto em que circula. Informatividade mede o grau de novidade ou previsibilidade das informações. Intertextualidade aparece quando um texto dialoga com outro. Esses critérios ajudam a entender por que um conjunto de frases pode ou não funcionar como texto.
PRESSUPOSTOS, SUBENTENDIDOS E INFERÊNCIAS: Pressuposto é uma informação implícita acionada por marcas linguísticas. Subentendido depende mais do contexto e da interpretação da situação. Inferência é conclusão construída a partir de pistas presentes no texto. Em prova, a inferência correta costuma ser moderada, textual e defensável. A inferência errada costuma ser ampla demais, opinativa ou incompatível com algum trecho.
FUNÇÕES DA LINGUAGEM: A função referencial prioriza informação. A emotiva evidencia o emissor. A conativa busca influenciar o receptor. A fática testa ou mantém o contato. A metalinguística fala da própria linguagem. A poética valoriza a forma da mensagem. O ponto decisivo é identificar a função predominante no trecho indicado, não apenas reconhecer uma palavra característica.
COESÃO, COERÊNCIA E SENTIDO CONTEXTUAL: Coesão envolve mecanismos linguísticos de ligação: pronomes, conjunções, repetições, substituições, elipses e conectores. Coerência envolve compatibilidade de sentido entre as partes do texto. Palavras e expressões devem ser interpretadas dentro do contexto. A banca costuma trocar sentido contextual por significado dicionarizado isolado.
VARIAÇÃO E ADEQUAÇÃO LINGUÍSTICA: A língua varia por região, grupo social, época, situação e grau de formalidade. Variação não é automaticamente erro. O julgamento correto depende da adequação ao gênero textual, ao interlocutor e à finalidade comunicativa.
COMO CAI EM PROVA: A banca costuma cobrar ideia central, inferência, sentido contextual de palavras, intenção do autor, função da linguagem, pressupostos, subentendidos e reescrita sem alteração de sentido. Pegadinhas comuns: • alternativa que extrapola o texto; • troca de possibilidade por certeza; • generalização indevida; • uso de conhecimento externo para forçar resposta; • confusão entre opinião do autor e opinião citada; • leitura de palavra isolada sem observar o contexto. Como resolver: Volte sempre ao trecho indicado. Marque o comando da questão e pergunte se a alternativa está realmente autorizada pelo texto. Em interpretação, a resposta correta não é a mais bonita: é a mais defensável dentro do texto.` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 2', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/jCi8taOyq0A%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/vkugTTdYiig%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403701,409511,421058,430370,419148,419149,419150,408995,403705,409010,409011,409012,419151,419152,408983,408984,408985,419154,419155,419156,419157,419158,419160,419161,419162,419163,408987,403683,403684,403685,403686,403687,403688,403689,403690,403691,403692,403693,403694,403695,403696,403697,403698,403699,408988,408989,408990,408991,408992,408993,419164,419165,419166,419167,419168,419169,419170,419171,419172,419173,419174,403707,408996,408997,408998,408999,409000,409001,403706,409576,409577,409587,419175,419176,403708,409578,409579,409580,409581,409582,409583,409584,409585,409586,403703,403702,409512,419177,419178,419179,419180,419181,419182,419183,419184,409517,409519,409518,409524,409525,409526,409527,409528,409529,409530,409531,409532,409533,409534,409535,409536,409537,409538,409510,409539,409540,409541,419186,409542,409544,419187,419188,419189,419190,419191,419192,419193,419194,419195,419196,419197,419198,419199,409520,419200,419201,419202,419203,419204,419205,419207,419208,419209,419210,419211,419212,419213,419214,419216,419219&desatualizada=0&anulada=0&query=definicao+funcao&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Direito Tributário', subject: 'Introdução ao Direito Tributário', type: 'teoria', studyTip: `Dicas:

Estude esta aula como mapa de entrada do Direito Tributário. O PDF passa por legislação tributária, CTN, conceito de tributo, espécies, obrigação, fato gerador, sujeitos, crédito, lançamento, competência e classificações. Não é só introdução: é vocabulário para todo o curso.
O art. 3º do CTN precisa ser fatiado. Tributo é prestação pecuniária, compulsória, em moeda ou valor equivalente, que não constitui sanção por ato ilícito, instituída em lei e cobrada por atividade administrativa vinculada.
Não confunda obrigação principal com tributo. A obrigação principal pode envolver tributo ou penalidade pecuniária. A multa não é tributo, mas pode integrar obrigação principal.
Fato gerador é ponto de virada. Antes dele, há hipótese prevista em lei; quando o fato ocorre no mundo real, nasce a obrigação tributária. Esse raciocínio evita confundir previsão abstrata com ocorrência concreta.
Competência tributária é indelegável; capacidade tributária ativa pode ser atribuída. Sempre que a questão falar em instituir, pense em competência. Se falar em arrecadar, fiscalizar ou cobrar, pense em capacidade ativa.
Em espécies tributárias, não decore só nomes. Impostos não dependem de atuação estatal específica; taxas dependem de poder de polícia ou serviço específico e divisível; contribuição de melhoria depende de obra pública e valorização imobiliária.

Resumo do conteúdo:
LEGISLAÇÃO TRIBUTÁRIA: A legislação tributária abrange leis, tratados, convenções internacionais, decretos e normas complementares que tratem de tributos ou relações jurídicas tributárias. A lei cria, extingue, majora ou reduz tributos e define elementos essenciais. O decreto regulamenta a lei, mas não pode inovar livremente quando há reserva legal.
CTN E LEI COMPLEMENTAR: O CTN foi editado como lei ordinária, mas foi recepcionado pela Constituição de 1988 com status de lei complementar. Por isso, funciona como norma geral em matéria tributária. Lei complementar tem papel relevante para normas gerais, conflitos de competência, limitações constitucionais e matérias que a Constituição reservou expressamente.
CONCEITO DE TRIBUTO: Tributo é prestação pecuniária compulsória, em moeda ou cujo valor nela se possa exprimir, não sancionatória, instituída em lei e cobrada mediante atividade administrativa vinculada. O elemento “não sancionatória” separa tributo de multa. O elemento “instituída em lei” aponta para legalidade. O elemento “atividade vinculada” mostra que a Administração deve aplicar a lei quando presentes os requisitos.
NATUREZA JURÍDICA E ESPÉCIES: A natureza jurídica específica do tributo é definida pelo fato gerador. Em regra, o nome dado pela lei e a destinação da arrecadação não definem a espécie. O CTN trabalha com impostos, taxas e contribuições de melhoria. A classificação pentapartite, adotada pelo STF, acrescenta empréstimos compulsórios e contribuições especiais.
OBRIGAÇÃO TRIBUTÁRIA: A obrigação principal surge com o fato gerador e tem por objeto o pagamento de tributo ou penalidade pecuniária. A obrigação acessória decorre da legislação tributária e impõe deveres instrumentais, como declarar, emitir documentos, escriturar e prestar informações. Descumprida a obrigação acessória, ela pode converter-se em obrigação principal quanto à penalidade pecuniária.
FATO GERADOR: Fato gerador é a situação definida em lei como necessária e suficiente ao nascimento da obrigação tributária. Ele pode ser analisado de forma abstrata, como hipótese legal, e de forma concreta, como ocorrência no mundo real. O fato gerador da obrigação principal relaciona-se ao dever de pagar. O da obrigação acessória relaciona-se ao dever de fazer, não fazer ou tolerar.
SUJEITOS, CRÉDITO E LANÇAMENTO: O sujeito ativo é a pessoa jurídica de direito público titular da competência ou da capacidade de exigir o crédito. O sujeito passivo pode ser contribuinte ou responsável. O crédito tributário decorre da obrigação principal e é constituído pelo lançamento. O lançamento verifica o fato gerador, calcula o montante devido, identifica o sujeito passivo e, se for o caso, propõe penalidade.
COMPETÊNCIA TRIBUTÁRIA: Competência é o poder constitucional de instituir tributos. É indelegável. Capacidade tributária ativa é a atribuição para arrecadar, fiscalizar e cobrar, podendo ser conferida a outra pessoa jurídica.
COMO CAI EM PROVA: Esse assunto costuma ser cobrado por troca de planos: Constituição no lugar de lei, competência no lugar de capacidade ativa, multa como se fosse tributo, decreto criando obrigação nova ou destinação da arrecadação definindo espécie tributária. Pegadinhas comuns: • dizer que tributo é sanção por ato ilícito; • afirmar que competência tributária pode ser delegada; • confundir lei complementar com lei ordinária instituidora; • tratar decreto como se pudesse inovar livremente; • achar que toda prestação em dinheiro ao Estado é tributo; • esquecer que atualização monetária, por si só, não é majoração; • confundir obrigação acessória com obrigação facultativa. Como resolver: Identifique o verbo da questão: instituir, arrecadar, fiscalizar, regulamentar, majorar, reduzir, definir ou cobrar. Depois, pergunte duas coisas: quem tem competência para isso? Qual instrumento jurídico pode fazer isso? Essa dupla pergunta evita respostas por impulso.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 14', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/pPzClkNrXAA%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/WhQpZlUAtuI%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407145,415863,415864,407155,417876,407154,407168,417609,417590,417591,417592,417593,417594&desatualizada=0&anulada=0&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Contabilidade Geral', subject: 'Introdução à Contabilidade', type: 'teoria', studyTip: `Dicas:

Esta meta é a fundação da Contabilidade. O PDF trabalha conceito, objeto, objetivo, finalidade, campo de aplicação, funções, patrimônio, equação fundamental, estados patrimoniais e técnicas contábeis.
Não confunda patrimônio com patrimônio líquido. Patrimônio é o conjunto de bens, direitos e obrigações. Patrimônio líquido é a diferença residual entre ativo e passivo exigível.
Ativo, passivo e PL precisam ser entendidos pela lógica econômica. Ativo representa recursos controlados que podem gerar benefícios; passivo representa obrigações presentes; PL representa capital próprio/situação líquida.
A equação Ativo = Passivo + Patrimônio Líquido é a espinha dorsal. Quando houver dúvida, desenhe a estrutura patrimonial e veja qual lado está sendo alterado.
Técnicas contábeis são muito cobradas por troca de verbo: escrituração registra, demonstrações evidenciam, auditoria verifica e análise interpreta.
Se você é iniciante, não pule os estados patrimoniais. Situação líquida positiva, nula, negativa e passivo a descoberto aparecem como questão conceitual e ajudam a entender o balanço.

Resumo do conteúdo:
CONCEITO DE CONTABILIDADE: Contabilidade é a ciência que estuda, registra, controla e evidencia o patrimônio das entidades. Sua função é produzir informações úteis, confiáveis e organizadas para tomada de decisão. Ela não se limita a empresas lucrativas. Aplica-se a qualquer entidade que possua patrimônio a controlar: empresas, órgãos públicos, associações, fundações e demais organizações.
OBJETO, OBJETIVO E FINALIDADE: O objeto da Contabilidade é o patrimônio. O objetivo é fornecer informações sobre a composição e as variações patrimoniais. A finalidade é controlar o patrimônio e apoiar decisões de usuários internos e externos. Usuários internos usam a informação para gestão. Usuários externos podem ser investidores, credores, governo, fornecedores, empregados e sociedade.
CAMPO DE APLICAÇÃO E FUNÇÕES: O campo de aplicação da Contabilidade envolve entidades econômico-administrativas. As funções mais lembradas são administrativa, ligada ao controle do patrimônio, e econômica, ligada à apuração do resultado.
PATRIMÔNIO: Patrimônio é formado por bens, direitos e obrigações. Bens são elementos úteis à entidade. Direitos são valores a receber ou benefícios exigíveis de terceiros. Obrigações são dívidas ou deveres perante terceiros.
ATIVO, PASSIVO E PATRIMÔNIO LÍQUIDO: Ativo reúne bens e direitos controlados pela entidade. Passivo exigível reúne obrigações. Patrimônio líquido representa a situação líquida, ou seja, a parcela residual pertencente aos sócios/proprietários. Não confunda passivo com patrimônio líquido: ambos ficam do mesmo lado na equação, mas o passivo representa capital de terceiros e o PL representa capital próprio.
EQUAÇÃO FUNDAMENTAL: A equação fundamental é: Ativo = Passivo + Patrimônio Líquido. Dela derivam os estados patrimoniais: ativo maior que passivo indica situação líquida positiva; ativo igual ao passivo indica situação líquida nula; ativo menor que passivo indica situação líquida negativa ou passivo a descoberto.
TÉCNICAS CONTÁBEIS: Escrituração registra os fatos contábeis. Demonstrações contábeis organizam e evidenciam informações. Auditoria examina e valida informações. Análise das demonstrações interpreta dados para apoiar decisões.
ÁREAS DE ATUAÇÃO: A Contabilidade pode atuar em áreas como contabilidade geral, pública, de custos, gerencial, auditoria, perícia, análise de demonstrações e controladoria.
COMO CAI EM PROVA: A cobrança costuma vir por conceito seco, classificação e troca de finalidade. A banca pergunta o objeto da Contabilidade, diferencia patrimônio de patrimônio líquido, confunde técnica contábil com finalidade ou tenta transformar lucro em objeto da ciência. Pegadinhas comuns: • dizer que o objeto da Contabilidade é o lucro; • confundir patrimônio com patrimônio líquido; • tratar auditoria como técnica de registro; • esquecer que ativo inclui bens e direitos; • confundir obrigação com patrimônio líquido; • achar que Contabilidade só se aplica a empresas lucrativas; • decorar a equação sem entender o efeito de cada elemento. Como resolver: Quando a questão falar em estrutura patrimonial, desenhe mentalmente: ativo de um lado; passivo e PL do outro. Depois pergunte se o enunciado fala de bem, direito, obrigação, capital próprio, receita, despesa ou técnica contábil. Essa triagem resolve a maioria das questões iniciais.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 10', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/I5Mo3DI0hqU%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/sQjwCmhAjGQ%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=291366,416839,4300,104&desatualizada=0&anulada=0&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Direito Constitucional', subject: 'Princípios Fundamentais', type: 'teoria', studyTip: `Dicas:

O PDF começa com distinções históricas e conceituais: forma de governo, sistema de governo, forma de Estado e regime político. Essas quatro etiquetas precisam ficar separadas.
República não é Federação. República é forma de governo; Federação é forma de Estado. Presidencialismo é sistema de governo; democracia é regime político.
Fundamentos, objetivos e princípios internacionais não podem virar uma lista única. Fundamentos estão no art. 1º; objetivos, no art. 3º; princípios das relações internacionais, no art. 4º.
Autonomia não é soberania. Entes federativos possuem autonomia; a República Federativa do Brasil possui soberania.
Separação dos Poderes não significa isolamento. Executivo, Legislativo e Judiciário são independentes e harmônicos, com funções típicas e atípicas.
Em prova, a literalidade é forte, mas a banca também cobra trocas conceituais: cidadania como objetivo, pluralismo político como princípio internacional, soberania como autonomia etc.

Resumo do conteúdo:
PANORAMA CONSTITUCIONAL: A Constituição de 1988 organiza o Estado brasileiro a partir de escolhas fundamentais: forma republicana de governo, forma federativa de Estado, sistema presidencialista e regime democrático. Essas categorias não são sinônimas. A banca costuma trocar uma pela outra para testar se o aluno entendeu a classificação.
FORMA DE GOVERNO: REPÚBLICA: A República é marcada por eletividade, temporariedade, responsabilidade dos governantes e prestação de contas. Opõe-se à monarquia, tradicionalmente associada à hereditariedade e vitaliciedade.
SISTEMA DE GOVERNO: PRESIDENCIALISMO: No presidencialismo, o Presidente acumula as funções de chefe de Estado e chefe de governo. Há independência mais acentuada entre Executivo e Legislativo.
FORMA DE ESTADO: FEDERAÇÃO: A Federação envolve descentralização política, repartição constitucional de competências e autonomia dos entes federados. No Brasil, a federação é indissolúvel, sem direito de secessão. União, Estados, Distrito Federal e Municípios têm autonomia, mas não soberania. A soberania pertence à República Federativa do Brasil.
REGIME POLÍTICO: DEMOCRACIA: O poder emana do povo, que o exerce por representantes eleitos ou diretamente, nos termos da Constituição. A democracia brasileira combina instrumentos representativos e mecanismos de participação direta.
FUNDAMENTOS DA REPÚBLICA: Os fundamentos do art. 1º são: soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa e pluralismo político. Eles funcionam como bases estruturantes do Estado brasileiro.
PODERES DO ESTADO: São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário. Cada Poder possui funções típicas e pode exercer funções atípicas.
OBJETIVOS FUNDAMENTAIS: Os objetivos do art. 3º indicam metas constitucionais do Estado: construir sociedade livre, justa e solidária; garantir desenvolvimento nacional; erradicar pobreza e marginalização; reduzir desigualdades; promover o bem de todos sem preconceitos.
RELAÇÕES INTERNACIONAIS: Os princípios do art. 4º orientam a atuação externa do Brasil, como independência nacional, prevalência dos direitos humanos, autodeterminação dos povos, não intervenção, igualdade entre Estados, defesa da paz, solução pacífica de conflitos, repúdio ao terrorismo e ao racismo, cooperação entre os povos e concessão de asilo político.
COMO CAI EM PROVA: A cobrança é muito marcada por troca de listas: fundamento vira objetivo, objetivo vira princípio internacional, forma de Estado vira forma de governo. Pegadinhas comuns: • dizer que federação é forma de governo; • confundir soberania com autonomia; • colocar pluralismo político como objetivo; • trocar independência nacional por objetivo interno; • afirmar que há hierarquia entre os Poderes; • confundir República com Federação; • tratar presidencialismo como forma de governo. Como resolver: Monte cinco caixas: forma de Estado, forma de governo, sistema de governo, art. 1º, art. 3º e art. 4º. Quando a questão trouxer uma expressão constitucional, primeiro descubra a caixa correta. Só depois julgue o item.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 2', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/l2hw2yBR6tc%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/fMOtrQZYp5E%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=405212&qd=0&qa=0&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'COBIT 2019', type: 'teoria', studyTip: `Dicas:

COBIT 2019 não é ferramenta, software ou metodologia de projeto. É framework de governança e gestão de I&T voltado a alinhar tecnologia, informação, risco, recursos e objetivos organizacionais.
A separação mais importante é governança x gestão. Governança avalia, direciona e monitora; gestão planeja, constrói, executa e monitora.
I&T é mais amplo que departamento de TI. O PDF enfatiza informação e tecnologia como recursos corporativos usados para gerar valor.
COBIT trabalha por lógica de alinhamento: necessidades das partes interessadas, objetivos corporativos, objetivos de alinhamento e objetivos de governança/gestão.

Resumo do conteúdo:
GOVERNANÇA CORPORATIVA DE I&T: A governança corporativa de informação e tecnologia busca garantir que I&T contribua para os objetivos da organização, gere valor, otimize riscos e utilize recursos de forma adequada. Ela se conecta à governança corporativa geral, pois tecnologia e informação afetam estratégia, controles, processos, riscos e resultados.
O QUE É COBIT 2019: COBIT 2019 é um framework para governança e gestão de informação e tecnologia corporativa. Ele fornece princípios, objetivos, componentes e orientações para estruturar um sistema de governança adequado à organização. Seu foco não é apenas TI operacional. O foco é alinhar I&T às necessidades do negócio e das partes interessadas.
O QUE COBIT NÃO É: COBIT não é descrição completa do ambiente de TI, não é metodologia de desenvolvimento, não é padrão exclusivo de segurança, não é ferramenta e não substitui a tomada de decisão gerencial. Também não elimina outros modelos. Pode ser usado junto com ITIL, ISO, práticas ágeis e outros referenciais.
GOVERNANÇA X GESTÃO: Governança envolve avaliar necessidades, condições e opções; direcionar por prioridades e decisões; monitorar desempenho, conformidade e progresso. Gestão envolve planejar, construir, executar e monitorar atividades alinhadas à direção definida pela governança.
OBJETIVOS E CASCATA DE METAS: O COBIT organiza o alinhamento entre objetivos corporativos e objetivos de I&T. A cascata de metas transforma necessidades das partes interessadas em objetivos corporativos, objetivos de alinhamento e objetivos de governança e gestão. Essa lógica mostra que tecnologia não é fim em si mesma: ela precisa sustentar valor organizacional.
COMPONENTES DO SISTEMA DE GOVERNANÇA: Componentes incluem processos, estruturas organizacionais, princípios, políticas, procedimentos, fluxos de informação, cultura, comportamento, pessoas, competências, serviços, infraestrutura e aplicações. Sem esses componentes, a governança fica apenas no discurso.
FATORES DE DESENHO: Fatores de desenho ajudam a adaptar o sistema ao contexto. Podem envolver estratégia corporativa, perfil de risco, ameaças, requisitos de conformidade, papel da TI, modelo de sourcing, métodos de implementação, porte da organização e adoção tecnológica.
DOMÍNIOS DO COBIT: O domínio EDM está ligado à governança: avaliar, direcionar e monitorar. Os domínios APO, BAI, DSS e MEA estão ligados à gestão: alinhar/planejar/organizar, construir/adquirir/implementar, entregar/servir/suportar e monitorar/avaliar/analisar.
COMO CAI EM PROVA: A cobrança costuma ser conceitual e por distinção. A banca pergunta o que é COBIT, o que ele não é, diferença entre governança e gestão, princípios, componentes, fatores de desenho, domínios e objetivos. Pegadinhas comuns: • tratar COBIT como metodologia rígida; • limitar I&T ao setor de TI; • confundir governança com gestão; • dizer que COBIT serve apenas para segurança; • misturar princípios do sistema com princípios do framework; • chamar fator de desenho de componente; • achar que COBIT substitui ITIL ou métodos ágeis. Como resolver: Quando aparecer COBIT, procure a lógica de alinhamento: partes interessadas, objetivos corporativos, objetivos de I&T, valor, risco e recursos. Se a alternativa reduzir COBIT a ferramenta operacional, software ou checklist rígido, desconfie.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 16', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Xs8nJUwuSvc%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/p7ZNKhwmM8Y%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=14&desatualizada=0&anulada=0&query=COBIT+2019&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Direito Administrativo', subject: 'Princípios Administrativos', type: 'teoria', studyTip: `Dicas:

O PDF deixa claro: princípios administrativos são obrigatórios, têm aplicação imediata, não possuem hierarquia absoluta e não são ilimitados.
LIMPE é o ponto de partida, não o assunto inteiro. Legalidade, impessoalidade, moralidade, publicidade e eficiência são expressos, mas há vários princípios implícitos importantes.
Legalidade administrativa é diferente da legalidade privada. O particular pode fazer o que a lei não proíbe; a Administração só atua conforme autorização do ordenamento.
Impessoalidade aparece como finalidade pública, isonomia e vedação à promoção pessoal. Em questão prática, pergunte se a conduta favorece alguém ou desvia a finalidade.
Razoabilidade e proporcionalidade costumam cair em sanções, restrições e escolhas administrativas. Procure excesso, inadequação ou medida desnecessária.
Autotutela não é tutela. Autotutela é a Administração controlar seus próprios atos, anulando ilegalidades e revogando atos inconvenientes ou inoportunos.

Resumo do conteúdo:
NOÇÕES INICIAIS SOBRE PRINCÍPIOS: Princípios administrativos orientam, limitam e controlam a atuação da Administração Pública. São de observância obrigatória, possuem aplicação imediata e não dependem de lei específica para produzir efeitos. Não há hierarquia absoluta entre princípios. Em casos concretos, pode haver ponderação. Também não são absolutos: publicidade, eficiência e supremacia do interesse público têm limites.
PRINCÍPIOS EXPRESSOS: LIMPE: O art. 37 da Constituição prevê legalidade, impessoalidade, moralidade, publicidade e eficiência.
LEGALIDADE: A Administração só pode agir conforme a lei e o ordenamento jurídico. A legalidade administrativa é mais restritiva que a dos particulares.
IMPESSOALIDADE: Impede favorecimentos, perseguições e promoção pessoal. Exige finalidade pública e tratamento isonômico. A publicidade oficial não pode servir para autopromoção de agente público.
MORALIDADE: Exige honestidade, boa-fé, lealdade, ética institucional e compatibilidade com padrões jurídicos de boa administração. Um ato pode ser legal na forma e ainda assim ser inválido por violar moralidade.
PUBLICIDADE: Impõe transparência e divulgação dos atos administrativos, salvo hipóteses legítimas de sigilo. Publicidade permite controle social e institucional.
EFICIÊNCIA: Exige busca por resultados, qualidade, produtividade e boa utilização de recursos. Não autoriza violar a legalidade; eficiência deve caminhar dentro do ordenamento.
RAZOABILIDADE E PROPORCIONALIDADE: Razoabilidade combate decisões absurdas, incoerentes ou desmedidas. Proporcionalidade exige adequação, necessidade e equilíbrio entre meio e fim.
MOTIVAÇÃO: Motivação exige exposição dos fundamentos de fato e de direito. Ela permite controle, transparência e defesa do administrado.
SUPREMACIA DO INTERESSE PÚBLICO E INDISPONIBILIDADE: A supremacia justifica prerrogativas públicas quando voltadas ao interesse coletivo. A indisponibilidade impede que o administrador trate o interesse público como patrimônio próprio.
CONTRADITÓRIO, AMPLA DEFESA E SEGURANÇA JURÍDICA: Contraditório e ampla defesa protegem participação e reação do administrado. Segurança jurídica protege estabilidade, previsibilidade e confiança legítima.
AUTOTUTELA E CONTINUIDADE: Pela autotutela, a Administração pode anular atos ilegais e revogar atos válidos por conveniência e oportunidade. Pela continuidade, serviços públicos devem ser prestados sem interrupções indevidas.
COMO CAI EM PROVA: A banca cobra muito por identificação do princípio em situações concretas. Ela descreve uma conduta administrativa e pergunta qual princípio foi violado ou aplicado. Pegadinhas comuns: • colocar razoabilidade como princípio expresso do art. 37; • afirmar que há hierarquia entre princípios; • tratar publicidade como absoluta; • confundir impessoalidade com publicidade; • esquecer princípios implícitos; • dizer que eficiência permite ignorar formalidades legais; • confundir autotutela com tutela administrativa; • achar que supremacia do interesse público autoriza abuso. Como resolver: Leia o caso concreto e pergunte qual valor jurídico está em jogo: lei, finalidade, ética, transparência, resultado, equilíbrio, motivação, continuidade ou segurança jurídica. Se a questão trouxer conduta concreta, não responda pela palavra mais bonita; responda pelo problema jurídico central.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 3', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/HhmIvHPk+OI%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/EwwNj8J1xpM%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=407787&qd=0&qa=0&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Raciocínio Lógico', subject: 'Operadores Lógicos Fundamentais', type: 'teoria', studyTip: `Dicas:

Esta aula é longa e conceitual. O foco inicial é dominar proposição, valor lógico, conectivos fundamentais e negação. Sem isso, equivalência e argumentação ficam frágeis.
Proposição é sentença declarativa com valor lógico. Perguntas, ordens, exclamações e sentenças abertas não são proposições completas.
Negar não é trocar por antônimo. A negação deve inverter o valor lógico da proposição original. Em prova, a negação de compostas e categóricas é uma das maiores fontes de erro.
No conectivo E, tudo precisa ser verdadeiro. No OU inclusivo, basta uma parte verdadeira. Essa diferença simples precisa estar automática.
A negação de E e OU segue De Morgan: negar as partes e trocar o conectivo. A banca costuma oferecer uma alternativa que apenas nega uma parte ou mantém o conectivo.
Monte tabela-verdade com método: identifique proposições simples, calcule o número de linhas, preencha as colunas-base e só depois resolva a composta.

Resumo do conteúdo:
PRINCÍPIOS DA LÓGICA: A lógica trabalha com raciocínios válidos a partir de premissas. Nesta aula, a base é a lógica bivalente: as proposições assumem valor verdadeiro ou falso. O princípio do terceiro excluído indica que uma proposição é verdadeira ou falsa, sem terceiro valor. O princípio da não contradição impede que uma proposição seja verdadeira e falsa ao mesmo tempo. O princípio da identidade afirma que uma coisa é idêntica a si mesma.
PROPOSIÇÕES LÓGICAS: Proposição é uma sentença declarativa que pode ser julgada como verdadeira ou falsa. Frases interrogativas, imperativas, exclamativas, vagas ou abertas normalmente não são proposições. Sentenças abertas dependem de variável ou contexto para ter valor lógico. Quando a variável é definida, podem se tornar proposições.
PROPOSIÇÕES SIMPLES E COMPOSTAS: Proposição simples não possui conectivo lógico principal. Proposição composta resulta da combinação de proposições simples por conectivos. Para resolver questões, identifique primeiro as proposições simples e atribua letras a elas. Isso reduz o ruído da linguagem comum.
NEGAÇÃO: A negação inverte o valor lógico. Se a proposição é verdadeira, sua negação é falsa; se é falsa, sua negação é verdadeira. Negação correta respeita a estrutura lógica. Em frases com quantificadores, condicionais ou conectivos, a negação pode exigir transformação, não apenas inserir “não”.
CONJUNÇÃO: A conjunção, representada pelo E, só é verdadeira quando todas as partes são verdadeiras. Se uma parte for falsa, a conjunção é falsa.
DISJUNÇÃO INCLUSIVA: A disjunção inclusiva, representada pelo OU, é verdadeira quando pelo menos uma das partes é verdadeira. Só é falsa quando todas as partes são falsas.
NEGAÇÃO DE E E OU: Pelas leis de De Morgan, a negação de uma conjunção transforma-se em disjunção das negações. A negação de uma disjunção transforma-se em conjunção das negações. Em linguagem prática: negue cada parte e troque E por OU, ou OU por E.
TABELA-VERDADE: Com n proposições simples, a tabela terá 2 elevado a n linhas. A organização correta evita erro mecânico. Primeiro preencha as colunas das proposições simples; depois, as negações; por fim, as proposições compostas.
PROPRIEDADES E CONCLUSÕES LÓGICAS: Os operadores E e OU possuem propriedades como comutatividade, associatividade e identidade. A aula também prepara o terreno para equivalências e deduções lógicas, especialmente quando a questão pede conclusão necessariamente verdadeira.
COMO CAI EM PROVA: A cobrança vem por identificação de proposições, negação correta, conectivos e tabela- -verdade. A banca explora principalmente a diferença entre linguagem comum e linguagem lógica. Pegadinhas comuns: • tratar pergunta como proposição; • negar frase universal de forma intuitiva e errada; • confundir “ou” inclusivo com exclusivo; • errar a negação de “e” e “ou”; • montar tabela-verdade sem identificar proposições simples; • achar que negação é sempre trocar por antônimo; • ignorar palavras como “todo”, “algum”, “nenhum”, “se”, “e” e “ou”. Como resolver: Traduza a frase para símbolos simples. Depois aplique a regra do conectivo. Se o item envolver negação, escreva a frase negada com calma antes de olhar as alternativas. Em Raciocínio Lógico, organização vale mais do que pressa.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 12', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/fUp/ImIRTe4%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/LeFrHnEMxbg%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=411081,411082,411083&desatualizada=0&anulada=0&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Direito Tributário', subject: 'Limitações Constitucionais ao Poder de Tributar', type: 'teoria', studyTip: `Dicas:

Esta é uma das metas mais importantes da semana. O PDF não trata só de anterioridade e imunidade: ele passa por poder de tributar, princípios tributários, reforma tributária, imunidades e exceções.
Limitação constitucional é freio ao poder de tributar. Sempre pense na proteção do contribuinte contra excesso estatal.
Anterioridade anual e noventena devem ser estudadas em conjunto, mas com exceções separadas. A pergunta clássica é: respeita uma, respeita ambas ou não respeita nenhuma?
Legalidade tributária aqui aparece com tipicidade e exclusividade. A banca cobra o que precisa de lei e o que pode ser tratado por ato infralegal.
Imunidade não é isenção. Imunidade limita competência na Constituição; isenção é dispensa legal de tributo que poderia ser cobrado.
A Reforma Tributária trouxe princípios como simplicidade, transparência, justiça tributária, cooperação, defesa do meio ambiente e neutralidade. Não ignore: o PDF já inclui esses pontos.

Resumo do conteúdo:
PODER DE TRIBUTAR E LIMITAÇÕES: O Estado possui poder de tributar para financiar atividades públicas, mas esse poder é limitado pela Constituição. As limitações protegem contribuintes e estruturam o exercício das competências tributárias. As limitações não se esgotam no art. 150. Também aparecem nos arts. 151, 152 e em outros dispositivos constitucionais.
NÃO CONFISCO: O tributo não pode ser utilizado com efeito confiscatório. Não há percentual fixo universal; a análise depende do caso, da carga imposta e do efeito concreto sobre o patrimônio ou atividade do contribuinte.
LEGALIDADE, TIPICIDADE E EXCLUSIVIDADE: É vedado exigir ou aumentar tributo sem lei que o estabeleça. A legalidade tributária exige definição legal dos elementos essenciais: fato gerador, sujeito passivo, base de cálculo, alíquota e penalidades. Tipicidade reforça a necessidade de correspondência entre a hipótese legal e o fato tributado.
IRRETROATIVIDADE: É vedada a cobrança de tributo em relação a fatos geradores ocorridos antes do início da vigência da lei que o instituiu ou aumentou.
ANTERIORIDADE ANUAL E NONAGESIMAL: A anterioridade anual impede cobrança no mesmo exercício financeiro da publicação da lei que instituiu ou aumentou tributo. A noventena impede cobrança antes de 90 dias. As exceções não são idênticas. Por isso, revise em quadro separado quais tributos escapam de cada regra.
ISONOMIA E CAPACIDADE CONTRIBUTIVA: A isonomia impede tratamento desigual entre contribuintes em situação equivalente. A capacidade contributiva orienta a tributação conforme aptidão econômica do contribuinte, especialmente em impostos.
OUTROS PRINCÍPIOS E LIMITES: Liberdade de tráfego impede tributos que limitem circulação de pessoas ou bens, ressalvado pedágio. Uniformidade geográfica, seletividade, progressividade, não cumulatividade e vedação a isenções heterônomas também aparecem como limites relevantes.
PRINCÍPIOS DA REFORMA TRIBUTÁRIA: A Reforma Tributária introduz diretrizes como simplicidade, transparência, justiça tributária, cooperação, defesa do meio ambiente, neutralidade e atenuação da regressividade. Esses princípios devem ser lidos como comandos de racionalização do sistema, redução de distorções e melhor compreensão da carga tributária.
IMUNIDADES: Imunidade é limitação constitucional à competência tributária. Inclui imunidade recíproca, religiosa, de partidos políticos, sindicatos de trabalhadores, instituições de educação e assistência social, livros, jornais, periódicos e outras hipóteses constitucionais. Imunidade atua no plano constitucional da competência. Isenção atua no plano legal da dispensa de pagamento.
COMO CAI EM PROVA: Esse tema cai por literalidade constitucional, exceções e comparação entre institutos. A banca troca anterioridade por noventena, imunidade por isenção e limitação por competência. Pegadinhas comuns: • dizer que o art. 150 esgota todas as limitações; • confundir imunidade com isenção; • trocar anterioridade anual por noventena; • esquecer exceções; • tratar não confisco como regra matemática fixa; • achar que toda imunidade depende de lei para existir; • confundir limitação constitucional com mera política fiscal. Como resolver: Separe por grupos: princípios, anterioridades, imunidades e limitações específicas. Depois, revise as exceções como lista própria. Em cada item, pergunte: a questão fala de competência, cobrança, prazo, igualdade, retroatividade, confisco ou hipótese imune?` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 18', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/awsHjIGoZec%3D' },
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Y9UpPwoKLXY%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407146,415865,415867,417595,417596,417597,417598,417599,415868,417600,415869,417601,415870,417602,415871,415877,415878,415879,415881,415882,415883,415884,415886,415887,415866,415888,417603,417604,415889,417605,417606,415890,417609,417610,417611,417612,417613,417614,417615,417616,417617,417618,417620,417621,417622,417623,417624,417625,417626,417627&desatualizada=0&anulada=0&query=conceitos&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Contabilidade Geral', subject: 'Contas', type: 'teoria', studyTip: `Dicas:

Conta é o instrumento de registro e controle dos elementos patrimoniais e de resultado. Sem conta, não há escrituração organizada.
Teoria patrimonialista é a mais relevante para a contabilidade atual: contas patrimoniais e contas de resultado. Mas a banca ainda cobra personalista e materialista.
Débito e crédito indicam lados do razonete, não significam bom/ruim nem entrada/ saída de dinheiro.
Natureza do saldo depende do grupo da conta. Ativo e despesa normalmente aumentam por débito; passivo, PL e receita normalmente aumentam por crédito.

Resumo do conteúdo:
CONCEITO DE CONTA: Conta é o instrumento pelo qual a Contabilidade registra, acumula e controla fatos que afetam o patrimônio ou o resultado da entidade. Cada conta reúne movimentações de natureza semelhante, permitindo identificar aumentos, diminuições e saldo.
ELEMENTOS DA CONTA: Entre os elementos essenciais estão título, data, histórico, débito, crédito e saldo. O título indica o elemento controlado; o histórico explica a operação; débito e crédito registram os valores.
TEORIAS DAS CONTAS: A teoria personalista divide contas em agentes consignatários, agentes correspondentes e contas do proprietário. A teoria materialista divide contas em integrais e diferenciais. A teoria patrimonialista divide contas em patrimoniais e de resultado. É a teoria mais usada na Contabilidade atual e a mais importante para provas.
CONTAS PATRIMONIAIS: Representam ativo, passivo e patrimônio líquido. Aparecem no balanço patrimonial e demonstram a posição patrimonial da entidade. Ativo envolve bens e direitos. Passivo envolve obrigações. Patrimônio líquido representa capital próprio e situação líquida.
CONTAS DE RESULTADO: Representam receitas e despesas. São usadas na apuração do resultado do exercício e, ao final, impactam o patrimônio líquido.
DÉBITO, CRÉDITO E SALDO: Débito é o lado esquerdo do razonete. Crédito é o lado direito. Saldo é a diferença entre débitos e créditos. Ativo e despesas tendem a aumentar por débito. Passivo, patrimônio líquido e receitas tendem a aumentar por crédito.
FUNÇÃO E ESTRUTURA DAS CONTAS: A função da conta é explicar o que ela registra. A estrutura indica como seus aumentos e reduções são lançados, qual sua natureza e onde ela aparece nas demonstrações.
PLANO DE CONTAS: Plano de contas é a relação organizada das contas utilizadas pela entidade, normalmente com códigos, grupos e subgrupos. Ele permite padronização, controle e elaboração das demonstrações contábeis.
CLASSIFICAÇÕES E CONTAS ESPECÍFICAS: O PDF também chama atenção para títulos de crédito, adiantamentos a fornecedores, adiantamentos de clientes e detalhamento de contas. Esses itens exigem classificação correta entre ativo, passivo, receita, despesa ou conta redutora.
COMO CAI EM PROVA: A banca cobra classificação de contas, teorias das contas, natureza de saldo, plano de contas, razonete e diferença entre contas patrimoniais e de resultado. Pegadinhas comuns: • confundir teoria materialista com patrimonialista; • classificar receita como conta patrimonial; • tratar débito como sinônimo de dívida; • esquecer que PL integra contas patrimoniais; • errar os grupos da teoria personalista; • achar que toda conta de ativo tem sempre saldo devedor sem exceções; • confundir plano de contas com demonstração contábil. Como resolver: Antes de responder, pergunte: a conta representa patrimônio ou resultado? Depois identifique se ela pertence a ativo, passivo, PL, receita ou despesa. Só então pense em débito, crédito e saldo. Essa ordem evita chute mecânico.` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula: aulas 2 a 9', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Coo4wULrDLA%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/v/OfBnZ5Xfg%3D' },
      { goalId: meta9[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=4341,4340,4339,4347,4342,104&desatualizada=0&anulada=0&auth=force' },
    ]);

    // Meta 10
    const meta10 = await db.insert(goals).values({ weekId, number: 10, discipline: 'Tecnologia da Informação', subject: 'ITIL 4 (Parte I)', type: 'teoria', studyTip: `Dicas:

ITIL 4 deve ser lido como boas práticas de gerenciamento de serviços, não como ferramenta, norma obrigatória ou metodologia rígida.
O centro da aula é valor. Serviço facilita resultados desejados pelo consumidor, reduzindo custos e riscos que ele não quer gerenciar sozinho.
Diferencie valor, saída e resultado. Saída é entrega; resultado é o efeito alcançado; valor depende da percepção das partes interessadas.
Produto, serviço e oferta de serviço não são sinônimos. Produto é configuração de recursos; serviço facilita resultado; oferta combina bens, acesso a recursos e ações de serviço.
Utilidade e garantia são cobradas por inversão. Utilidade é adequação ao propósito; garantia é adequação ao uso, envolvendo disponibilidade, capacidade, segurança e continuidade.
O SVS conecta demanda e valor por meio de princípios orientadores, governança, cadeia de valor, práticas e melhoria contínua.

Resumo do conteúdo:
ITIL: VISÃO GERAL: ITIL é um conjunto de boas práticas para gerenciamento de serviços. A versão ITIL 4 amplia a visão tradicional de TI e enfatiza serviço, valor, colaboração, adaptação e melhoria contínua. Não é software, ferramenta específica ou norma obrigatória. É um referencial flexível.
GERENCIAMENTO DE SERVIÇOS: Gerenciamento de serviços é o conjunto de capacidades organizacionais especializadas para gerar valor aos clientes por meio de serviços. Essas capacidades envolvem pessoas, processos, informações, tecnologias, parceiros, fornecedores e práticas. VALOR E COCriação Valor é benefício percebido, utilidade ou importância atribuída a algo. Na ITIL 4, valor é cocriado por provedor, consumidor e outras partes interessadas. O provedor não entrega valor sozinho. O consumidor participa ao usar o serviço, fornecer informações, definir necessidades e integrar o serviço aos seus resultados.
PARTES INTERESSADAS: Partes interessadas incluem provedores, consumidores, clientes, usuários, patrocinadores, funcionários, parceiros, fornecedores e sociedade. Cada parte pode perceber valor de forma diferente.
PRODUTOS, SERVIÇOS E OFERTAS: Produtos são configurações de recursos organizacionais criadas para oferecer valor. Serviços facilitam resultados desejados sem que o consumidor precise gerenciar custos e riscos específicos. Ofertas de serviço podem incluir bens, acesso a recursos e ações de serviço.
UTILIDADE E GARANTIA: Utilidade é adequação ao propósito: o serviço faz o que o consumidor precisa? Garantia é adequação ao uso: o serviço funciona nas condições esperadas? Garantia envolve disponibilidade, capacidade, segurança e continuidade. Serviço com utilidade sem garantia promete, mas não sustenta. Serviço com garantia sem utilidade funciona, mas não resolve o problema.
CUSTOS E RISCOS: Serviços ajudam consumidores a alcançar resultados reduzindo custos e riscos específicos. O provedor assume parte da complexidade para que o consumidor foque no resultado.
SISTEMA DE VALOR DE SERVIÇO: O SVS descreve como componentes e atividades da organização trabalham juntos para transformar demanda em valor. Inclui princípios orientadores, governança, cadeia de valor de serviço, práticas e melhoria contínua.
CADEIA DE VALOR E PRÁTICAS: A cadeia de valor inclui atividades como planejar, melhorar, engajar, desenhar e transicionar, obter/construir e entregar/suportar. As práticas da ITIL 4 agrupam recursos organizacionais voltados ao trabalho ou objetivo específico. Podem ser práticas gerais de gerenciamento, práticas de gerenciamento de serviços ou práticas de gerenciamento técnico.
COMO CAI EM PROVA: A cobrança vem por conceito e distinção. A banca pergunta o que é ITIL, quais são os conceitos básicos, o que é valor, utilidade, garantia, SVS, cadeia de valor, princípios orientadores e categorias de práticas. Pegadinhas comuns: • dizer que ITIL exige ferramenta específica; • confundir produto com serviço; • tratar valor como algo criado só pelo provedor; • inverter utilidade e garantia; • confundir prática com processo obrigatório e rígido; • esquecer que serviço reduz custos e riscos do consumidor; • confundir saída entregue com resultado alcançado; • tratar melhoria contínua como etapa isolada. Como resolver: Sempre procure a lógica de serviço: consumidor, provedor, resultado, custo, risco e valor. Se a alternativa transformar ITIL em regra fixa, software específico ou visão puramente técnica, desconfie. ITIL 4 é sobre serviço gerando valor.` }).returning();
    await db.insert(materials).values([
      { goalId: meta10[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 7', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/chQx7r/gKkU%3D' },
      { goalId: meta10[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Ups6VQGxDn0%3D' },
      { goalId: meta10[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=432718&desatualizada=0&anulada=0&auth=force' },
    ]);

    // Meta 11
    const meta11 = await db.insert(goals).values({ weekId, number: 11, discipline: 'Revisão Geral', subject: 'Todas as disciplinas da semana', type: 'revisao' }).returning();
    await db.insert(materials).values([
      { goalId: meta11[0].id, type: 'tarefa', description: 'Revisar Língua Portuguesa' },
      { goalId: meta11[0].id, type: 'tarefa', description: 'Revisar Direito Tributário' },
      { goalId: meta11[0].id, type: 'tarefa', description: 'Revisar Contabilidade Geral' },
      { goalId: meta11[0].id, type: 'tarefa', description: 'Revisar Direito Constitucional' },
      { goalId: meta11[0].id, type: 'tarefa', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta11[0].id, type: 'tarefa', description: 'Revisar Direito Administrativo' },
      { goalId: meta11[0].id, type: 'tarefa', description: 'Revisar Raciocínio Lógico' },
    ]);
    
    console.log('Week 1 seed completed successfully!');
  }

  
  // Week 2
  if (!existingWeeks.some(w => w.number === 2)) {
    console.log('Seeding Week 2...');
    const insertedWeek = await db.insert(weeks).values({ number: 2, title: 'Semana 2' }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Língua Portuguesa', subject: 'Tipologias e Gêneros Textuais', type: 'teoria', studyTip: `Dicas:
Tipo textual é modo de organização; gênero textual é forma social de circulação. Narração, descrição, dissertação, exposição, argumentação e injunção são tipos. Artigo de opinião, notícia, edital, ata, relatório e e-mail são gêneros.
Não classifique o texto pelo assunto. Um texto sobre tributos pode ser predominantemente argumentativo, expositivo ou injuntivo. A banca quer a estrutura e a finalidade, não o tema.
Em textos argumentativos, procure tese, argumentos, contra-argumentos e conclusão. Em textos expositivos, procure explicação e organização conceitual. Em textos injuntivos, procure comando, orientação, norma ou procedimento.

Resumo do conteúdo:
TIPOLOGIA TEXTUAL: Tipologia textual diz respeito à forma de organização do texto. O foco está no modo como as ideias são estruturadas: narrar, descrever, expor, argumentar ou instruir. O tipo textual não depende do assunto. O mesmo tema pode aparecer em textos de tipos diferentes, conforme a finalidade comunicativa.
NARRAÇÃO: A narração apresenta acontecimentos em sequência temporal, com personagens, espaço, tempo e ação. Pode haver narrador, conflito, desenvolvimento e desfecho. Em prova, observe verbos de ação, progressão temporal e transformação de estado.
DESCRIÇÃO: A descrição apresenta características de seres, objetos, ambientes, situações ou estados. O foco é mostrar como algo é, e não necessariamente narrar o que aconteceu. Predominam atributos, qualificações, percepção sensorial e verbos de estado.
EXPOSIÇÃO: A exposição busca explicar, informar ou apresentar um conhecimento. É comum em textos didáticos, científicos, jornalísticos informativos e materiais institucionais. O objetivo principal não é convencer, mas tornar uma informação compreensível.
ARGUMENTAÇÃO: A argumentação defende uma tese. O texto usa argumentos, exemplos, dados, comparações, causas, consequências e possíveis refutações para convencer o leitor. A banca costuma perguntar qual é a tese, qual argumento sustenta a ideia central ou qual alternativa extrapola a posição do autor.
INJUNÇÃO: A injunção orienta uma ação. Aparece em normas, manuais, receitas, instruções, comandos, editais e regulamentos. Marcas comuns: verbos no imperativo, infinitivo com valor de comando, sequências procedimentais e linguagem objetiva.
GÊNEROS TEXTUAIS: Gênero textual é a forma socialmente reconhecida de uso da linguagem. Cada gênero tem finalidade, estrutura, interlocutor, suporte e grau de formalidade. Notícia informa fato de interesse público. Artigo de opinião defende ponto de vista. Relatório organiza dados e conclusões. Edital estabelece regras. Ata registra acontecimentos de reunião. E-mail pode informar, solicitar ou formalizar comunicação.
HETEROGENEIDADE TIPOLÓGICA: Textos reais raramente são puros. Um gênero pode combinar narração, descrição, exposição e argumentação. A resposta deve considerar a predominância indicada pelo comando. Essa distinção é decisiva: gênero é a “forma social”; tipo é o “modo de organização”.
COMO CAI EM PROVA: A banca cobra principalmente diferença entre tipo e gênero, finalidade predominante, reconhecimento de marcas linguísticas e função comunicativa do texto. Pegadinhas comuns: • confundir tema com tipo textual; • chamar todo texto de opinião de “dissertativo” sem verificar se há tese; • classificar gênero apenas pela aparência do texto; • ignorar que um mesmo gênero pode ter sequências de tipos diferentes. Como resolver: Leia o comando e pergunte: a banca quer forma de circulação ou modo de organização? Se for circulação social, pense em gênero. Se for estrutura interna do texto, pense em tipologia.` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/wILK0p3Ni94%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/imtZcoCDYN0%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403702&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Direito Tributário', subject: 'Interpretação, Integração e Aplicação da Legislação Tributária', type: 'teoria', studyTip: `Dicas:
Esta aula é estratégica porque mostra como a norma tributária nasce, entra em vigor, produz efeitos e é interpretada. Não trate como tema abstrato: ele aparece em questões de legalidade, aplicação no tempo, integração e interpretação literal.
Vigência não é aplicação. A norma pode estar vigente e ainda não produzir certos efeitos por anterioridade, noventena ou regra específica.
Aplicação da legislação tributária tem regra própria no CTN. Em geral, aplica-se aos fatos geradores futuros e pendentes, mas há hipóteses de retroatividade benigna em matéria de penalidade.
Integração serve para preencher lacuna, não para criar tributo. Analogia não pode resultar em exigência de tributo não previsto em lei.
Interpretação literal é cobrada em suspensão ou exclusão do crédito tributário, outorga de isenção e dispensa de obrigação acessória.
Equidade não pode dispensar tributo devido. Quando a alternativa usar equidade para afastar cobrança legalmente prevista, acenda o alerta.

Resumo do conteúdo:
LEGISLAÇÃO TRIBUTÁRIA: A legislação tributária compreende leis, tratados e convenções internacionais, decretos e normas complementares que versem, total ou parcialmente, sobre tributos e relações jurídicas tributárias. Leis instituem e disciplinam elementos essenciais. Decretos regulamentam. Normas complementares detalham procedimentos e orientações administrativas.
VIGÊNCIA DA LEGISLAÇÃO: Vigência é aptidão formal da norma para integrar o ordenamento. A lei pode prever data específica de início ou seguir regra geral de vacatio legis. Em tributário, vigência precisa ser separada de eficácia prática. Uma norma pode estar vigente, mas a cobrança do tributo depender de anterioridade anual, noventena ou outra limitação.
APLICAÇÃO DA LEGISLAÇÃO TRIBUTÁRIA: A legislação tributária aplica-se imediatamente aos fatos geradores futuros e aos pendentes, assim entendidos aqueles cuja ocorrência ainda não esteja completa. Há retroatividade em hipóteses específicas, especialmente quando a lei deixa de definir determinada conduta como infração, reduz penalidade ou beneficia o sujeito passivo em matéria sancionatória, desde que observados os limites do CTN.
INTERPRETAÇÃO: Interpretar é determinar o sentido e o alcance da norma. Podem ser usados critérios gramatical, sistemático, histórico, teleológico e lógico. O CTN exige interpretação literal em hipóteses sensíveis: suspensão ou exclusão do crédito tributário, outorga de isenção e dispensa de cumprimento de obrigações acessórias.
INTEGRAÇÃO: Integração ocorre quando há lacuna. O CTN prevê uso sucessivo de analogia, princípios gerais de direito tributário, princípios gerais de direito público e equidade. A analogia não pode resultar na exigência de tributo não previsto em lei. A equidade não pode dispensar pagamento de tributo devido.
TRATADOS, DECRETOS E NORMAS COMPLEMENTARES: Tratados e convenções internacionais podem modificar a legislação tributária interna, nos termos do CTN. Decretos não podem ultrapassar os limites da lei regulamentada. Normas complementares, como atos normativos, decisões administrativas com eficácia normativa, práticas reiteradas e convênios, ajudam a operacionalizar a aplicação da legislação.
COMO CAI EM PROVA: Em concursos fiscais, o tema costuma aparecer em itens literais do CTN e em situações práticas: norma nova, fato gerador pendente, retroatividade benigna, isenção, dispensa de obrigação acessória e uso de analogia. Pegadinhas comuns: • tratar vigência como sinônimo de cobrança imediata; • usar analogia para criar tributo; • aplicar equidade para dispensar tributo devido; • esquecer as hipóteses de interpretação literal; • confundir retroatividade tributária com retroatividade sancionatória benéfica. Como resolver: Identifique se a questão fala de vigência, aplicação, interpretação ou integração. Depois procure o limite: legalidade, anterioridade, literalidade, vedação de analogia criadora de tributo ou vedação de equidade para dispensar tributo.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/UNazm6MRBOc%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/ySeqLvk5bZ4%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=417848&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Contabilidade Geral', subject: 'Escrituração', type: 'teoria', studyTip: `Dicas:
Escrituração é técnica contábil de registro dos fatos. Não estude como formalidade: ela conecta contas, lançamentos, método das partidas dobradas, livros e demonstrações.
O método das partidas dobradas é o coração da aula: para todo débito há crédito correspondente de igual valor. A igualdade não significa que as contas tenham a mesma natureza, mas que o registro permanece equilibrado.
Antes de lançar, identifique o fato: o que entrou, o que saiu, quem aumentou, quem diminuiu e qual conta foi afetada.
Débito e crédito não significam “bom” e “ruim”. Ativo e despesas aumentam por débito; passivo, patrimônio líquido e receitas aumentam por crédito.

Resumo do conteúdo:
ESCRITURAÇÃO CONTÁBIL: Escrituração é a técnica usada para registrar os fatos contábeis que alteram ou podem alterar o patrimônio. Ela transforma eventos econômicos em registros organizados por contas. A escrituração deve observar clareza, ordem cronológica, documentação hábil e método adequado.
MÉTODO DAS PARTIDAS DOBRADAS: O método das partidas dobradas determina que não há débito sem crédito correspondente. Cada lançamento deve preservar a igualdade entre aplicações e origens. A soma dos débitos deve ser igual à soma dos créditos. Esse equilíbrio permite elaborar balancetes e demonstrações.
DÉBITO E CRÉDITO: Débito e crédito são lados do lançamento. Ativo, despesas e custos aumentam por débito e diminuem por crédito. Passivo, patrimônio líquido e receitas aumentam por crédito e diminuem por débito. O erro mais comum é associar débito a perda e crédito a ganho. Em contabilidade, o significado depende da natureza da conta.
LIVROS CONTÁBEIS: O Livro Diário registra fatos em ordem cronológica, com data, contas, histórico e valores. O Livro Razão organiza os lançamentos por conta, permitindo acompanhar saldo e movimentação. Livros auxiliares podem detalhar determinadas operações. Documentação contábil sustenta os registros e permite verificação posterior.
LANÇAMENTO CONTÁBIL: O lançamento identifica contas debitadas, contas creditadas, valor, data e histórico. Antes de lançar, é preciso reconhecer o fato e sua consequência patrimonial. A primeira fórmula envolve uma conta debitada e uma creditada. A segunda envolve uma conta debitada e várias creditadas. A terceira envolve várias debitadas e uma creditada. A quarta envolve várias debitadas e várias creditadas.
RETIFICAÇÃO E ERROS: Erros de escrituração podem ser corrigidos por estorno, transferência ou complementação, conforme a natureza do erro. A correção deve preservar rastreabilidade e coerência dos registros.
BALANCETE: O balancete é instrumento de verificação. Ele reúne saldos das contas e permite conferir se débitos e créditos estão equilibrados. Não garante ausência de todos os erros, mas ajuda a identificar inconsistências formais.
COMO CAI EM PROVA: A banca cobra lançamentos, natureza das contas, partidas dobradas, finalidade dos livros e correção de erros. Muitas questões exigem raciocínio operacional, não só definição. Pegadinhas comuns: • trocar Diário por Razão; • tratar débito e crédito como linguagem bancária; • errar aumento e diminuição conforme natureza da conta; • achar que balancete correto elimina qualquer erro; • esquecer que todo lançamento deve ter igualdade entre débitos e créditos. Como resolver: Monte uma mini-equação: qual conta aumenta, qual diminui e qual a natureza de cada uma. Só depois escolha débito e crédito.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Coo4wULrDLA%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/zvz8%2F66BXMo%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=416842%2C4327%2C4322%2C416805%2C104&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Direito Constitucional', subject: 'Direitos e Garantias Fundamentais – Parte I', type: 'teoria', studyTip: `Dicas:
Direitos fundamentais não são apenas lista do art. 5º. Estude teoria geral, destinatários, eficácia, aplicabilidade, limites e colisões.
Direitos e garantias não são sinônimos perfeitos. Direitos são bens ou posições protegidas; garantias são instrumentos de proteção desses direitos.
A titularidade pode alcançar brasileiros, estrangeiros residentes e, conforme interpretação constitucional, estrangeiros não residentes e pessoas jurídicas quando compatível.
Nenhum direito fundamental é absoluto. A banca gosta de alternativas com “sempre”, “nunca” e “em qualquer hipótese”.
A aplicabilidade imediata não impede regulamentação. Significa que os direitos fundamentais têm força normativa desde já, ainda que alguns dependam de conformação legislativa para plena fruição.
Em remédios constitucionais, foque na finalidade: habeas corpus protege liberdade de locomoção; habeas data protege acesso/retificação de dados; mandado de segurança protege direito líquido e certo; mandado de injunção combate omissão normativa.

Resumo do conteúdo:
TEORIA GERAL DOS DIREITOS FUNDAMENTAIS: Direitos fundamentais são posições jurídicas essenciais protegidas pela Constituição. Expressam limitações ao poder estatal, prestações exigíveis e parâmetros de organização da vida social. Possuem historicidade, relatividade, universalidade, irrenunciabilidade, imprescritibilidade em sentido amplo, complementaridade e aplicabilidade imediata.
DIREITOS X GARANTIAS: Direitos indicam bens ou faculdades protegidas, como liberdade, igualdade, propriedade e intimidade. Garantias são instrumentos que protegem ou viabilizam esses direitos. Os remédios constitucionais são garantias: habeas corpus, mandado de segurança, habeas data, mandado de injunção e ação popular.
DESTINATÁRIOS E TITULARIDADE: O art. 5º menciona brasileiros e estrangeiros residentes, mas a interpretação constitucional amplia proteção a estrangeiros não residentes em diversas situações. Pessoas jurídicas também podem titularizar direitos compatíveis com sua natureza, como propriedade, honra objetiva, devido processo e sigilo.
APLICABILIDADE IMEDIATA: As normas definidoras dos direitos e garantias fundamentais têm aplicação imediata. Isso reforça sua força normativa, mas não elimina a existência de normas que dependem de regulamentação para produzir todos os efeitos práticos.
RELATIVIDADE E COLISÃO: Direitos fundamentais não são absolutos. Quando há colisão, aplica-se ponderação, proporcionalidade e análise do caso concreto. A restrição deve respeitar núcleo essencial, finalidade legítima e adequação constitucional.
DIREITOS INDIVIDUAIS E COLETIVOS: O art. 5º protege vida, liberdade, igualdade, segurança e propriedade. Dentro dele aparecem regras sobre legalidade, liberdade de manifestação, inviolabilidade da intimidade, casa, comunicações, devido processo legal, contraditório, ampla defesa, propriedade e acesso à justiça.
REMÉDIOS CONSTITUCIONAIS: Habeas corpus protege liberdade de locomoção. Mandado de segurança protege direito líquido e certo não amparado por habeas corpus ou habeas data. Habeas data permite acesso e retificação de informações pessoais. Mandado de injunção enfrenta falta de norma regulamentadora. Ação popular permite impugnar ato lesivo ao patrimônio público, moralidade administrativa, meio ambiente e patrimônio histórico-cultural.
COMO CAI EM PROVA: A cobrança mistura literalidade constitucional, teoria geral e hipóteses de cabimento dos remédios constitucionais. Pegadinhas comuns: • afirmar que direitos fundamentais são absolutos; • restringir proteção apenas a estrangeiro residente; • confundir direito com garantia; • trocar cabimento dos remédios constitucionais; • achar que aplicação imediata dispensa toda regulamentação. Como resolver: Quando a questão trouxer um caso, identifique primeiro o bem protegido. Depois escolha o instrumento constitucional adequado e descarte alternativas absolutas demais.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/ey%2BIc25pgUg%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/%2Fpf4%2F6jyyoE%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=405217&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'ITIL 4 – Parte II', type: 'teoria', studyTip: `Dicas:
Esta meta fecha ITIL 4. A parte II costuma aprofundar práticas, cadeia de valor, melhoria contínua e gestão de serviços. Não tente decorar como lista solta: conecte cada prática à criação de valor.
A cadeia de valor de serviço não é sequência rígida. As atividades podem se combinar conforme o fluxo de valor: planejar, melhorar, engajar, desenhar/transicionar, obter/ construir e entregar/suportar.

Resumo do conteúdo:
CADEIA DE VALOR DE SERVIÇO: A cadeia de valor de serviço é o modelo operacional central do Sistema de Valor de Serviço da ITIL 4. Ela mostra atividades que a organização utiliza para transformar demanda e oportunidade em valor. As atividades são: planejar, melhorar, engajar, desenho e transição, obter/construir, entregar e suportar. Elas não precisam ocorrer em ordem fixa.
FLUXOS DE VALOR: Fluxo de valor é combinação de atividades da cadeia de valor para um cenário específico. Cada organização monta fluxos conforme necessidade, produto, serviço, risco e demanda. Essa ideia evita decorar a cadeia como linha reta.
PRÁTICAS DE GERENCIAMENTO: Práticas são conjuntos de recursos organizacionais desenhados para executar trabalho ou atingir objetivo. Substituem a visão antiga de processos isolados. Podem ser gerais, de gerenciamento de serviço ou técnicas.
INCIDENTE, PROBLEMA E MUDANÇA: Incidente é interrupção não planejada ou redução da qualidade de um serviço. O foco é restaurar o serviço rapidamente. Problema é causa ou possível causa de um ou mais incidentes. O foco é encontrar causa raiz, reduzir recorrência e documentar erros conhecidos. Mudança é adição, modificação ou remoção de algo que pode impactar serviços. O objetivo é viabilizar mudança com controle de risco.
REQUISIÇÃO DE SERVIÇO: Requisição de serviço é solicitação normal do usuário, geralmente padronizada e de baixo risco, como pedido de informação, acesso, reset de senha ou recurso previamente aprovado. Não deve ser confundida com incidente, pois não há necessariamente falha.
MELHORIA CONTÍNUA: Melhoria contínua busca alinhar serviços e práticas às necessidades de negócio. Envolve avaliação da situação atual, definição de objetivos, planos, execução, medição e ajustes. Na ITIL 4, melhoria contínua permeia todo o SVS.
NÍVEIS DE SERVIÇO E RELACIONAMENTO: Gestão de nível de serviço cuida de metas, acordos e percepção de entrega. Gestão de relacionamento mantém vínculo com partes interessadas. Central de serviços funciona como ponto de contato com usuários. O foco não é apenas operar tecnologia, mas entregar valor percebido.
COMO CAI EM PROVA: A banca cobra conceitos secos, mas também gosta de trocar nomes de práticas e objetivos. Questões de ITIL frequentemente são vencidas por diferença fina entre incidente, problema, mudança e requisição. Pegadinhas comuns: • tratar cadeia de valor como sequência obrigatória; • confundir incidente com problema; • achar que toda solicitação do usuário é incidente; • limitar melhoria contínua a uma etapa final; • confundir prática com processo rígido. Como resolver: Pergunte qual é o objetivo operacional: restaurar serviço, achar causa, controlar alteração, atender pedido padrão ou melhorar continuamente. A resposta costuma sair desse verbo.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/chQx7r%2FgKkU%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/oh6a95TJMaw%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=432718&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Direito Administrativo', subject: 'Poderes Administrativos', type: 'teoria', studyTip: `Dicas:
Poder administrativo é instrumento de atuação pública, não privilégio pessoal do agente. Sempre conecte poder à finalidade pública.
Poder vinculado e discricionário tratam da margem de escolha. No vinculado, a lei define todos os elementos. No discricionário, há espaço para conveniência e oportunidade dentro da lei.
Poder hierárquico organiza a Administração internamente. Ele permite distribuir competências, ordenar, fiscalizar, rever atos e delegar/avocar quando cabível.
Poder disciplinar pune infrações funcionais e vínculos especiais. Não confunda com poder de polícia, que limita direitos de particulares em benefício do interesse público.
Poder regulamentar complementa a lei para sua fiel execução. Decreto não pode inovar contra a lei.
Abuso de poder se divide em excesso de poder e desvio de finalidade. Excesso é vício de competência; desvio é vício de finalidade.

Resumo do conteúdo:
PODERES ADMINISTRATIVOS: Poderes administrativos são prerrogativas conferidas à Administração para alcançar o interesse público. Devem ser exercidos nos limites da lei e da finalidade pública. Poder-dever significa que a Administração não atua por capricho: quando a lei exige atuação, a omissão pode ser ilegal.
PODER VINCULADO E DISCRICIONÁRIO: No poder vinculado, a lei não deixa margem de escolha relevante. Presentes os requisitos, a Administração deve agir de determinada forma. No poder discricionário, existe margem para avaliar conveniência e oportunidade, dentro dos limites legais. A discricionariedade não autoriza arbitrariedade.
PODER HIERÁRQUICO: O poder hierárquico estrutura órgãos e agentes dentro da Administração. Permite dar ordens, fiscalizar, controlar, revisar atos, delegar e avocar competências quando a lei permite. Ele se manifesta dentro de relações internas de subordinação.
PODER DISCIPLINAR: O poder disciplinar permite apurar infrações e aplicar sanções a servidores e particulares sujeitos a vínculo especial com a Administração. Exige devido processo, contraditório e ampla defesa quando houver punição.
PODER REGULAMENTAR: O poder regulamentar permite expedir atos normativos para dar fiel execução à lei. O regulamento não pode contrariar nem ampliar indevidamente o conteúdo legal. Decretos autônomos existem em hipóteses constitucionais específicas, não como regra geral de criação livre de obrigações.
PODER DE POLÍCIA: Poder de polícia limita ou condiciona direitos, bens e atividades em razão do interesse público. Pode envolver fiscalização, consentimento, ordem e sanção. Seus atributos geralmente incluem discricionariedade, coercibilidade e autoexecutoriedade, mas nem todos aparecem em todos os atos.
ABUSO DE PODER: Abuso de poder ocorre quando a autoridade extrapola limites ou persegue finalidade indevida. Excesso de poder é atuação fora da competência. Desvio de finalidade é uso da competência para fim diverso do previsto em lei.
COMO CAI EM PROVA: A banca cobra classificação dos poderes, exemplos práticos e abuso de poder. É comum apresentar um caso e pedir qual poder foi exercido ou qual vício ocorreu. Pegadinhas comuns: • confundir disciplinar com polícia; • dizer que discricionariedade permite atuação sem controle; • atribuir inovação livre ao poder regulamentar; • trocar excesso de poder por desvio de finalidade; • achar que poder hierárquico existe entre pessoas jurídicas diferentes sem subordinação. Como resolver: Identifique a relação: interna ou externa? servidor ou particular? norma para executar lei? limitação de direito? margem de escolha? Depois escolha o poder correspondente.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/1JZ5wXuaJsk%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/H8t%2FZ%2BUyPso%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=407952&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Raciocínio Lógico', subject: 'Raciocínio Sequencial', type: 'teoria', studyTip: `Dicas:
Raciocínio sequencial cobra padrão. Antes de calcular, descubra qual regra está sendo repetida: soma, subtração, multiplicação, alternância, posição, letra, forma ou combinação.
Não assuma que toda sequência é aritmética. Muitas questões misturam duas sequências intercaladas: termos ímpares seguem uma regra e termos pares seguem outra.
Em sequências numéricas, teste diferenças, razões, potências, quadrados, cubos, números primos, Fibonacci e alternância de sinais.
Em sequências de letras, transforme em posição no alfabeto quando fizer sentido. A banca costuma trabalhar deslocamentos, alternância e espelhamento.
Em figuras, observe quantidade, posição, rotação, cor, preenchimento e simetria. A regra geralmente aparece em mais de uma dimensão.
Se houver muitas possibilidades, use as alternativas para validar. A resposta correta precisa manter o padrão em toda a sequência, não apenas nos dois últimos termos.

Resumo do conteúdo:
RACIOCÍNIO SEQUENCIAL: Raciocínio sequencial envolve identificar padrões e prever continuidade. Pode aparecer em números, letras, palavras, figuras, calendários, posições e arranjos. O objetivo não é aplicar uma fórmula única, mas reconhecer a regularidade.
SEQUÊNCIAS NUMÉRICAS: Sequências numéricas podem involve soma ou subtração constante, multiplicação, divisão, alternância, potências, quadrados, cubos, primos, fatoriais ou combinações. Quando as diferenças não são constantes, observe a sequência das diferenças. Às vezes o padrão está na segunda diferença.
SEQUÊNCIAS INTERCALADAS: Muitas questões alternam regras. Termos em posições ímpares seguem uma lógica, enquanto termos em posições pares seguem outra. Se a sequência parece irregular, separe os termos por posição antes de desistir.
SEQUÊNCIAS DE LETRAS: Use a posição das letras no alfabeto para identificar deslocamentos. Também podem aparecer vogais, consoantes, ordem alfabética inversa, saltos, repetições e pares de letras. Em palavras, observe iniciais, finais, quantidade de letras, ordem e relação semântica.
SEQUÊNCIAS FIGURAIS: Em figuras, a regra pode estar em rotação, deslocamento, aumento de lados, preenchimento, alternância de cores, simetria ou quantidade de elementos. Analise um atributo por vez para não misturar padrões.
CALENDÁRIOS E POSIÇÕES: Algumas questões usam dias da semana, meses, horários, filas ou posições. Nesses casos, ciclos são essenciais. Trabalhe com resto da divisão quando o padrão se repete.
ESTRATÉGIA DE RESOLUÇÃO: Procure primeiro a regra mais simples que explica todos os termos. Depois teste a resposta nas alternativas. Se uma regra explica só parte da sequência, ela provavelmente não é a regra da questão.
COMO CAI EM PROVA: A cobrança é muito prática: encontrar próximo termo, termo faltante, posição específica ou figura que completa o padrão. Pegadinhas comuns: • usar regra que serve apenas para os últimos termos; • ignorar sequências intercaladas; • esquecer ciclos em dias da semana e posições; • misturar atributos em sequência figurativa; • gastar tempo demais em fórmula quando o padrão é visual. Como resolver: Liste hipóteses simples, teste em todos os termos e só então marque. Em prova, raciocínio sequencial premia método, não chute inspirado.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/fUp%2FImIRTe4%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/ITIRQnU9DMI%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=404276&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Contabilidade Geral', subject: 'Fatos Contábeis e Respectivas Variações Patrimoniais', type: 'teoria', studyTip: `Dicas:
A chave da aula é separar ato administrativo de fato contábil. Ato não altera patrimônio de imediato; fato altera patrimônio e exige registro.
Fato permutativo muda a composição do patrimônio sem alterar o patrimônio líquido. Fato modificativo altera o patrimônio líquido. Fato misto combina permuta com modificação.
Antes de classificar, pergunte: o patrimônio líquido mudou? Se não mudou, tende a ser permutativo. Se mudou, pode ser modificativo ou misto.

Resumo do conteúdo:
ATOS ADMINISTRATIVOS X FATOS CONTÁBEIS: Ato administrativo é evento que não altera de imediato o patrimônio, embora possa produzir efeitos futuros. Exemplo: assinatura de contrato sem execução imediata. Fato contábil é evento que altera patrimônio e deve ser registrado pela contabilidade.
FATOS PERMUTATIVOS: Fatos permutativos alteram apenas a composição dos elementos patrimoniais, sem modificar o patrimônio líquido. Exemplos: compra de mercadorias à vista, recebimento de cliente, pagamento de fornecedor, aquisição de bem a prazo. Há troca entre contas patrimoniais.
FATOS MODIFICATIVOS: Fatos modificativos alteram o patrimônio líquido. Podem ser aumentativos, quando geram receita ou aumento patrimonial, ou diminutivos, quando geram despesa ou redução patrimonial. Exemplos: reconhecimento de receita de serviço, despesa de salário, despesa de aluguel.
FATOS MISTOS: Fatos mistos combinam permuta patrimonial com alteração do patrimônio líquido. Também podem ser aumentativos ou diminutivos. Exemplo: pagamento de dívida com juros. Há baixa de obrigação e saída de caixa, mas também despesa financeira, reduzindo o PL.
VARIAÇÕES PATRIMONIAIS: Variação qualitativa altera a composição do patrimônio sem mudar o PL. Variação quantitativa altera o valor do PL. Essa distinção ajuda a classificar fatos permutativos, modificativos e mistos.
RECEITAS E DESPESAS: Receita aumenta o patrimônio líquido. Despesa reduz o patrimônio líquido. O reconhecimento deve respeitar o regime de competência quando aplicável. Entrada de caixa pode ser empréstimo, recebimento de cliente ou aporte de capital; por isso não é automaticamente receita.
APURAÇÃO DO EFEITO: Para classificar corretamente, identifique contas envolvidas, natureza de cada conta e impacto no patrimônio líquido. A forma de pagamento é secundária em relação ao efeito patrimonial.
COMO CAI EM PROVA: A banca cobra classificação de eventos e impacto no patrimônio. Questões frequentemente usam operações simples para testar se o aluno confunde caixa com resultado. Pegadinhas comuns: • chamar todo contrato de fato contábil; • tratar entrada de dinheiro como receita; • ignorar juros, desconto ou perda em fatos mistos; • confundir variação qualitativa com quantitativa; • classificar pela forma de pagamento e não pelo impacto no PL. Como resolver: Pergunte primeiro se o PL mudou. Depois identifique se houve apenas troca patrimonial ou se também apareceu receita/despesa. Essa pergunta resolve a maioria das questões.` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/GPP34HGVg1M%3D' },
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/HaioHMk3L2U%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=4303%2C104&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Direito Tributário', subject: 'Processo Administrativo Tributário', type: 'teoria', studyTip: `Dicas:
Processo administrativo tributário organiza a discussão entre Fisco e contribuinte antes da via judicial. Estude como sequência: lançamento, impugnação, julgamento, recursos e decisão final.
Não confunda procedimento fiscal com processo contencioso. A fiscalização levanta fatos e constitui crédito; o contencioso nasce com resistência formal do sujeito passivo.
Impugnação tempestiva costuma suspender a exigibilidade do crédito tributário, nos termos do CTN. Esse ponto é muito cobrado.
O processo administrativo deve respeitar contraditório, ampla defesa, motivação e devido processo legal.
A instância administrativa não afasta o controle judicial. O contribuinte pode buscar o Judiciário, mas a escolha pode afetar a discussão administrativa conforme o caso.
Em prazos e recursos, o mais importante é entender a lógica: defesa contra exigência, revisão da decisão e constituição definitiva do crédito após encerramento.

Resumo do conteúdo:
PROCESSO ADMINISTRATIVO TRIBUTÁRIO: Processo administrativo tributário é o instrumento de discussão da exigência fiscal no âmbito administrativo. Permite ao sujeito passivo contestar lançamento, auto de infração ou cobrança. Tem função de controle da legalidade, garantia de defesa e formação definitiva do crédito tributário.
PROCEDIMENTO FISCAL X PROCESSO: Procedimento fiscal envolve atos de fiscalização, apuração, intimações e eventual lançamento. O processo contencioso surge quando há impugnação ou defesa do sujeito passivo contra a exigência. Essa diferença é importante porque nem toda fiscalização já é processo administrativo litigioso.
LANÇAMENTO E AUTO DE INFRAÇÃO: O lançamento constitui o crédito tributário. Em muitos casos, a exigência aparece formalizada em auto de infração ou notificação de lançamento. O documento deve indicar fatos, fundamentos legais, valores, penalidades e possibilitar defesa.
IMPUGNAÇÃO: A impugnação é a defesa administrativa apresentada pelo sujeito passivo. Quando tempestiva, instaura o litígio administrativo e suspende a exigibilidade do crédito tributário. Suspensão da exigibilidade não extingue o crédito; apenas impede cobrança enquanto perdurar a causa suspensiva.
JULGAMENTO ADMINISTRATIVO: O julgamento deve observar legalidade, motivação, contraditório e ampla defesa. Pode haver primeira instância administrativa e instâncias recursais, conforme a legislação aplicável. A Administração deve analisar argumentos, provas e enquadramento legal.
RECURSOS ADMINISTRATIVOS: Recursos permitem reexame da decisão. Podem existir recursos voluntários do contribuinte e mecanismos de revisão pela própria Administração, conforme o regime jurídico. O encerramento da discussão administrativa contribui para a definitividade do crédito.
RELAÇÃO COM O JUDICIÁRIO: A via administrativa não impede controle judicial. O Judiciário pode revisar lesão ou ameaça a direito. Contudo, a opção pela via judicial pode gerar efeitos sobre a discussão administrativa, conforme regras aplicáveis.
PRINCÍPIOS APLICÁVEIS: Legalidade, devido processo legal, contraditório, ampla defesa, motivação, oficialidade, verdade material e segurança jurídica orientam o processo administrativo tributário.
COMO CAI EM PROVA: A banca cobra conceitos, fases e efeitos. O ponto mais sensível é a suspensão da exigibilidade pela impugnação/recurso administrativo, além da diferença entre fiscalização e processo contencioso. Pegadinhas comuns: • dizer que impugnação extingue o crédito; • confundir suspensão da exigibilidade com anulação do lançamento; • tratar fiscalização como litígio automático; • negar contraditório e ampla defesa no processo administrativo; • confundir encerramento administrativo com impossibilidade absoluta de controle judicial. Como resolver: Monte a linha do tempo: fiscalização, lançamento, impugnação, julgamento, recurso e decisão final. Depois identifique o efeito jurídico em cada etapa.` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/wjAIhXkJc10%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/hT3HVLkfeV8%3D' },
      { goalId: meta9[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407216&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 10
    const meta10 = await db.insert(goals).values({ weekId, number: 10, discipline: 'Revisão Geral', subject: 'Todas as disciplinas da semana', type: 'revisao' }).returning();
    await db.insert(materials).values([
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Língua Portuguesa' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Tributário' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Contabilidade Geral' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Constitucional' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Administrativo' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Raciocínio Lógico' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Contabilidade Geral' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Tributário' },
    ]);
    console.log('Week 2 seed completed successfully!');
  }

  
  if (!existingWeeks.some(w => w.number === 3)) {
    console.log('Seeding Week 3...');

    // Create Week 3
    const insertedWeek = await db.insert(weeks).values({
      number: 3,
      title: 'Semana 3'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Língua Portuguesa', subject: 'Coesão e Coerência, Semântica, Figuras e Vícios de Linguagem, Reescrita', type: 'teoria', studyTip: `Dicas:
Coesão é ligação formal entre partes do texto; coerência é compatibilidade de sentido. A banca adora alternativa que troca uma pela outra. Um texto pode ter conectivos e ainda assim ser incoerente.
Em coesão referencial, acompanhe quem retoma quem. Pronomes, sinônimos, hiperônimos, elipses e expressões equivalentes precisam manter a referência sem ambiguidade.
Em coesão sequencial, conectivo não é enfeite. "Portanto", "contudo", "além disso", "embora" e "porque" mudam a relação lógica entre ideias. Trocar conectivo costuma mudar causa, oposição, conclusão ou concessão.
Semântica deve ser lida pelo contexto. Sinônimo, antônimo, polissemia, ambiguidade e sentido figurado não são resolvidos por dicionário isolado.
Em reescrita, preserve sentido, correção gramatical e relação lógica. A alternativa pode parecer elegante, mas se mudar foco, agente, tempo, pressuposto ou intensidade, está errada.
Figuras e vícios de linguagem aparecem como efeito de sentido. Não decore nomes soltos: pergunte o que aquela escolha produz no texto. Resumo do conteúdo:
COESÃO TEXTUAL: Coesão é o conjunto de mecanismos linguísticos que ligam palavras, frases, períodos e parágrafos. Ela permite que o leitor acompanhe a progressão do texto. A coesão pode ocorrer por referência, substituição, elipse, repetição, conexão, emprego de pronomes, advérbios, conjunções e expressões equivalentes.
COESÃO REFERENCIAL: Na coesão referencial, um termo aponta para outro. A retomada pode ser anafórica, quando volta a elemento anterior, ou catafórica, quando antecipa elemento posterior. Pronomes pessoais, demonstrativos, relativos, possessivos, sinônimos, hiperônimos e expressões resumidoras são recursos comuns.
COESÃO SEQUENCIAL: Coesão sequencial organiza a progressão das ideias. Conectores indicam adição, oposição, causa, consequência, conclusão, explicação, condição, concessão e comparação. Trocar conector pode alterar o sentido do período inteiro.
COERÊNCIA TEXTUAL: Coerência é a lógica global do texto. Depende de compatibilidade entre ideias, ausência de contradição, progressão temática, adequação ao contexto e relação com o conhecimento compartilhado. Um texto coerente não é apenas gramaticalmente correto; ele precisa fazer sentido como unidade.
SEMÂNTICA: Semântica estuda o sentido das palavras e expressões. Envolve sinonímia, antonímia, hiperonímia, hiponímia, polissemia, ambiguidade, homonímia, paronímia, denotação e conotação. Em prova, o sentido contextual prevalece sobre o significado isolado.
FIGURAS E VÍCIOS DE LINGUAGEM: Figuras de linguagem criam efeitos expressivos, como comparação, metáfora, metonímia, ironia, hipérbole, eufemismo e personificação. Vícios de linguagem prejudicam clareza ou correção, como ambiguidade indesejada, cacofonia, pleonasmo vicioso e barbarismo.
REESCRITA: Reescrever exige manter o sentido original com correção. É preciso observar pontuação, conectores, pronomes, paralelismo, voz verbal, ordem dos termos e equivalência semântica.
COMO CAI EM PROVA: A cobrança costuma vir em reescrita sem alteração de sentido, substituição de conectivos, retomada pronominal, ambiguidade e sentido contextual de palavras. Pegadinhas comuns: trocar conector e mudar a relação lógica; aceitar sinônimo que não funciona no contexto; perder referente de pronome; transformar sentido figurado em literal; escolher reescrita gramaticalmente correta, mas semanticamente diferente. Como resolver: compare a alternativa com o trecho original por partes — referente, tempo verbal, conectivo, intensidade e pressuposto. Se qualquer eixo mudou, a reescrita não preservou o sentido.` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/FUZ8d71Px8A%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/IuLnBB1xyGs%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403712&desatualizada=0&anulada=0&query=coesao+coerencia+semantica+vicios&auth=force&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Direito Tributário', subject: 'Responsabilidade Tributária', type: 'teoria', studyTip: `Dicas:
Responsabilidade tributária não é sinônimo de sujeição passiva comum. O responsável não pratica necessariamente o fato gerador, mas a lei o coloca no polo passivo.
O art. 128 do CTN é ponto de partida: a lei pode atribuir responsabilidade a terceiro vinculado ao fato gerador, excluindo ou mantendo a responsabilidade do contribuinte.
Separe substituição de transferência. Na substituição, a responsabilidade nasce desde o início com terceiro. Na transferência, ela passa ao terceiro depois, por sucessão, solidariedade ou ato posterior.
Responsabilidade por sucessão tem blocos próprios: imóveis, sucessão pessoal, sucessão empresarial, fusão, incorporação, transformação e aquisição de estabelecimento.
Terceiros do art. 134 respondem em situações específicas e, em regra, por impossibilidade de exigência do contribuinte. O art. 135 exige excesso de poderes, infração de lei, contrato social ou estatuto.
Denúncia espontânea exclui responsabilidade por infração, mas exige pagamento do tributo e juros quando cabível. Não confunda com mero parcelamento ou confissão tardia. Resumo do conteúdo:
CONCEITO: Responsabilidade tributária ocorre quando a lei atribui a terceiro a obrigação de pagar tributo ou penalidade, ainda que ele não seja o contribuinte direto do fato gerador. O contribuinte tem relação pessoal e direta com o fato gerador. O responsável tem vínculo previsto em lei.
ART. 128 DO CTN: A lei pode atribuir responsabilidade pelo crédito tributário a terceira pessoa vinculada ao fato gerador. Pode excluir a responsabilidade do contribuinte ou atribuí-la em caráter supletivo. Essa regra exige previsão legal e vínculo com a situação tributada.
SUBSTITUIÇÃO E TRANSFERÊNCIA: Na responsabilidade por substituição, o responsável já ocupa o polo passivo desde a ocorrência do fato gerador. Na transferência, a obrigação nasce com o contribuinte e depois passa a terceiro. Sucessão, responsabilidade de terceiros e responsabilidade por infrações são formas clássicas de transferência.
RESPONSABILIDADE POR SUCESSÃO: Na aquisição de imóvel, o adquirente pode responder por tributos relativos ao bem. Na sucessão pessoal, espólio, sucessores e meeiro podem responder nos limites da herança, monte ou quinhão. Na sucessão empresarial, fusão, transformação, incorporação e aquisição de estabelecimento podem transferir responsabilidade conforme o CTN.
RESPONSABILIDADE DE TERCEIROS: O art. 134 trata de hipóteses como pais, tutores, administradores de bens, inventariante, síndico, tabeliães e sócios em liquidação, nos atos em que intervierem ou pelas omissões de que forem responsáveis. O art. 135 trata de responsabilidade pessoal por atos praticados com excesso de poderes ou infração de lei, contrato social ou estatuto.
RESPONSABILIDADE POR INFRAÇÕES: Em regra, a responsabilidade por infrações independe da intenção do agente, salvo disposição de lei em contrário. Há responsabilidade pessoal em hipóteses específicas, especialmente dolo, fraude, simulação ou infrações qualificadas.
DENÚNCIA ESPONTÂNEA: A denúncia espontânea exclui a responsabilidade por infração se acompanhada, quando for o caso, do pagamento do tributo devido e juros de mora. Não basta confessar se a fiscalização já começou ou se os requisitos legais não foram cumpridos.
COMO CAI EM PROVA: A banca cobra CTN quase literal, mas com casos práticos: compra de imóvel, sucessão empresarial, sócio administrador, infração, denúncia espontânea e solidariedade. Pegadinhas comuns: chamar responsável de contribuinte; confundir substituição com transferência; aplicar art. 135 sem excesso de poderes ou infração; esquecer limites da sucessão; tratar denúncia espontânea como simples parcelamento. Como resolver: identifique quem praticou o fato gerador, quem a lei colocou como responsável e qual artigo do CTN explica a transferência ou substituição.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/SmpEvvR2Puo%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/XT%2FqpLYBuN4%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407156%2C416082%2C416083%2C417881%2C417882%2C417885%2C417891&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Contabilidade Geral', subject: 'Elaboração de Demonstrações Contábeis', type: 'teoria', studyTip: `Dicas:
Demonstrações contábeis não são só nomes de relatórios. Cada demonstração tem finalidade: posição patrimonial, desempenho, mutações do PL, caixa, valor adicionado e explicações complementares.
Lei n. 6.404/1976 e CPC 26 precisam conversar. A banca costuma cobrar lista de demonstrações, estrutura mínima e critérios de apresentação.
Balanço Patrimonial é fotografia patrimonial em uma data. DRE mostra desempenho por competência. DFC mostra fluxos de caixa. DMPL/DLPA explicam movimentos no patrimônio líquido.
Notas explicativas não são acessório decorativo. Elas integram o conjunto das demonstrações e esclarecem critérios, políticas contábeis, riscos e detalhes relevantes.
Cuidado com circulante e não circulante. A classificação depende de ciclo operacional, expectativa de realização/liquidação e prazo.
Em contabilidade, "obrigatória" pode variar conforme tipo societário, porte e norma aplicável. Leia o comando antes de marcar lista fechada. Resumo do conteúdo:
OBJETIVO DAS DEMONSTRAÇÕES: Demonstrações contábeis apresentam, de forma estruturada, a posição patrimonial e financeira, o desempenho e os fluxos de caixa da entidade. Servem aos usuários na tomada de decisão e na avaliação de recursos, obrigações, resultado e capacidade de geração de caixa.
CONJUNTO DAS DEMONSTRAÇÕES: O conjunto pode incluir Balanço Patrimonial, Demonstração do Resultado, Demonstração do Resultado Abrangente, Demonstração das Mutações do Patrimônio Líquido, Demonstração dos Fluxos de Caixa, Demonstração do Valor Adicionado e Notas Explicativas. A exigência concreta depende da Lei das S.A., CPC aplicável e características da entidade.
BALANÇO PATRIMONIAL: O Balanço Patrimonial evidencia ativos, passivos e patrimônio líquido em determinada data. Ativos e passivos são classificados em circulante e não circulante. A estrutura mostra recursos controlados, obrigações presentes e participação residual dos proprietários.
DRE E RESULTADO ABRANGENTE: A DRE evidencia receitas, despesas, ganhos e perdas do período, permitindo apurar o resultado. O regime de competência é central. Resultado abrangente inclui itens que afetam o patrimônio líquido, mas não transitam imediatamente pelo resultado do período.
DMPL, DLPA, DFC E DVA: DMPL evidencia alterações nas contas do patrimônio líquido. DLPA foca lucros ou prejuízos acumulados. DFC apresenta entradas e saídas de caixa por atividades operacionais, de investimento e de financiamento. DVA demonstra a riqueza gerada e sua distribuição entre empregados, governo, financiadores, acionistas e retenções.
NOTAS EXPLICATIVAS: Notas explicativas complementam as demonstrações, descrevendo políticas contábeis, critérios de mensuração, julgamentos relevantes, riscos e detalhamentos necessários à compreensão.
APRESENTAÇÃO E CLASSIFICAÇÃO: As demonstrações devem observar continuidade, competência, materialidade, comparabilidade, consistência e apresentação adequada. A classificação entre circulante e não circulante depende do ciclo operacional e do prazo esperado de realização ou liquidação.
COMO CAI EM PROVA: A banca cobra listas de demonstrações, finalidade de cada relatório, classificação no balanço, notas explicativas e literalidade do CPC 26. Pegadinhas comuns: confundir DRE com DFC; esquecer notas explicativas; trocar DMPL por DLPA; classificar tudo por prazo de 12 meses sem observar ciclo operacional; marcar demonstração como obrigatória sem considerar o tipo de entidade. Como resolver: associe cada demonstração ao que ela responde — posição, desempenho, caixa, PL, valor adicionado ou explicação complementar.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/e1uy0Y5DGus%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/nOA%2FDhptV18%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=4448%2C416865%2C104&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Direito Constitucional', subject: 'Direitos e Garantias Fundamentais – Parte II', type: 'teoria', studyTip: `Dicas:
Esta parte muda o eixo: saímos dos direitos individuais e entramos em direitos sociais, nacionalidade, direitos políticos e partidos políticos.
Direitos sociais têm forte literalidade constitucional. Art. 6º e art. 7º precisam ser lidos com atenção, especialmente direitos dos trabalhadores.
Nacionalidade exige separar nato e naturalizado. A banca cobra cargos privativos, perda da nacionalidade e hipóteses de naturalização.
Direitos políticos giram em torno de alistabilidade, elegibilidade, inelegibilidades, perda e suspensão. Não confunda idade mínima com condição de alistamento.
Partidos políticos têm autonomia, caráter nacional, vedação a organização paramilitar e regras sobre recursos e funcionamento parlamentar.
Em prova, cuidado com "cassação de direitos políticos": a Constituição veda cassação, mas admite perda ou suspensão nas hipóteses previstas. Resumo do conteúdo:
DIREITOS SOCIAIS: Direitos sociais são prestações e garantias ligadas à igualdade material e à proteção de condições mínimas de vida. Incluem educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência social, proteção à maternidade e infância e assistência aos desamparados. O art. 7º detalha direitos dos trabalhadores urbanos e rurais.
DIREITOS DOS TRABALHADORES: Entre os principais direitos estão salário mínimo, piso salarial, irredutibilidade salarial, décimo terceiro, adicional noturno, jornada máxima, repouso semanal, férias, licença gestante, licença-paternidade, aviso-prévio e proteção contra despedida arbitrária. O estudo deve separar direitos de todos os trabalhadores, direitos dos domésticos e normas sindicais.
DIREITO SINDICAL: A Constituição assegura liberdade sindical, mas adota unicidade sindical por base territorial. A criação de sindicato independe de autorização estatal, vedada interferência do Poder Público. A contribuição sindical não pode ser tratada como obrigatória automática após a reforma trabalhista.
NACIONALIDADE: Brasileiros natos decorrem de hipóteses constitucionais ligadas ao nascimento, território, serviço da República Federativa do Brasil e opção. Naturalizados dependem de requisitos constitucionais e legais. Certos cargos são privativos de brasileiros natos, como Presidente e Vice-Presidente da República, Presidente da Câmara, Presidente do Senado, Ministro do STF, carreira diplomática, oficial das Forças Armadas e Ministro de Estado da Defesa.
PERDA DA NACIONALIDADE: A perda pode ocorrer em hipóteses constitucionais, observadas exceções. A matéria exige leitura literal, pois a banca costuma trocar aquisição voluntária, imposição de naturalização e reconhecimento de nacionalidade originária.
DIREITOS POLÍTICOS: Direitos políticos envolvem participação na vida política, especialmente votar, ser votado, plebiscito, referendo e iniciativa popular. Condições de elegibilidade incluem nacionalidade brasileira, pleno exercício dos direitos políticos, alistamento eleitoral, domicílio eleitoral, filiação partidária e idade mínima.
INELEGIBILIDADES E PERDA/SUSPENSÃO: Inelegibilidades podem ser absolutas ou relativas. Inalistáveis e analfabetos são inelegíveis. Há restrições por parentesco, cargo e situações previstas em lei complementar. A Constituição veda cassação de direitos políticos, mas admite perda ou suspensão em hipóteses específicas.
PARTIDOS POLÍTICOS: Partidos possuem autonomia, devem ter caráter nacional, prestar contas à Justiça Eleitoral e não podem utilizar organização paramilitar. Funcionamento parlamentar e acesso a recursos seguem regras constitucionais e legais.
COMO CAI EM PROVA: A cobrança costuma ser literal e comparativa: direitos sociais, cargos privativos de nato, idades mínimas, perda/suspensão de direitos políticos e regras partidárias. Pegadinhas comuns: confundir nato com naturalizado; errar cargo privativo de brasileiro nato; falar em cassação de direitos políticos; trocar alistabilidade por elegibilidade; misturar direitos sociais do art. 6º com direitos trabalhistas do art. 7º. Como resolver: faça quadros mentais — art. 6º, art. 7º, nato/naturalizado, elegibilidade/inelegibilidade e perda/suspensão. Constitucional aqui é muito de categoria correta.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/ey%2BIc25pgUg%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/NcMHbRjZaXY%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=405229%2C407576%2C407577%2C405228%2C407578%2C407579%2C407580%2C407581%2C407582%2C407583%2C421770&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'PMBOK 7', type: 'teoria', studyTip: `Dicas:
PMBOK 7 mudou o foco de processos para princípios, domínios de desempenho e entrega de valor. Não estude como se fosse apenas a sexta edição com outro nome.
O centro da abordagem é valor. Projeto não existe só para entregar produto; existe para gerar resultado, benefício e valor para a organização e partes interessadas.
Princípios orientam comportamento. Domínios de desempenho organizam áreas críticas que precisam funcionar bem durante o projeto.
Tailoring é essencial: a abordagem deve ser adaptada ao contexto, complexidade, risco, equipe, cultura e objetivo do projeto.
Não confunda ciclo de vida, abordagem de desenvolvimento e cadência. Preditivo, adaptativo e híbrido aparecem com frequência.
Em prova, cuidado com palavras rígidas. PMBOK 7 trabalha adaptação e contexto; alternativas com receita única costumam ser suspeitas. Resumo do conteúdo:
VISÃO GERAL DO PMBOK 7: O PMBOK 7 apresenta uma abordagem orientada a princípios, domínios de desempenho e entrega de valor. O projeto é visto dentro de um sistema de entrega de valor. A gestão de projetos deve produzir resultados que gerem benefícios e valor.
SISTEMA DE ENTREGA DE VALOR: O sistema de entrega de valor integra portfólios, programas, projetos, produtos e operações. Esses componentes trabalham alinhados à estratégia organizacional. Resultado é consequência produzida. Benefício é ganho percebido. Valor é utilidade, importância ou vantagem para partes interessadas.
PRINCÍPIOS: Os princípios orientam a conduta em projetos: ser administrador diligente, criar ambiente colaborativo, envolver partes interessadas, focar em valor, reconhecer interações sistêmicas, demonstrar liderança, adaptar, incorporar qualidade, navegar na complexidade, otimizar respostas a riscos, abraçar adaptabilidade e permitir mudança. Eles não são etapas, mas diretrizes de comportamento.
DOMÍNIOS DE DESEMPENHO: Domínios de desempenho são áreas interativas e interdependentes que precisam funcionar para o projeto entregar valor. Incluem partes interessadas, equipe, abordagem de desenvolvimento e ciclo de vida, planejamento, trabalho do projeto, entrega, medição e incerteza.
PARTES INTERESSADAS E EQUIPE: Partes interessadas influenciam ou são influenciadas pelo projeto. O engajamento precisa ser contínuo. Equipes eficazes exigem colaboração, liderança, comunicação, responsabilidade e cultura adequada.
ABORDAGEM, CICLO DE VIDA E PLANEJAMENTO: A abordagem pode ser preditiva, adaptativa ou híbrida. O ciclo de vida organiza fases do projeto. O planejamento deve ser suficiente para orientar o trabalho, sem ignorar incerteza e adaptação.
MEDIÇÃO E INCERTEZA: Medição acompanha desempenho, progresso e valor. Incerteza envolve riscos, ambiguidades, complexidade e eventos que podem afetar objetivos.
TAILORING: Tailoring é adaptação da abordagem ao contexto. O gerenciamento de projetos deve considerar ambiente, cultura, maturidade, restrições, produto, equipe e grau de incerteza.
COMO CAI EM PROVA: A banca cobra diferença entre PMBOK 7 e visão processual antiga, princípios, domínios de desempenho, valor, tailoring e abordagens de desenvolvimento. Pegadinhas comuns: tratar princípios como fases; decorar domínio como sequência fixa; confundir resultado, benefício e valor; ignorar tailoring; afirmar que todo projeto deve ser preditivo. Como resolver: quando a questão trouxer PMBOK 7, procure a lógica de valor, adaptação e desempenho. Desconfie de alternativas engessadas.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/ieqXzJ2k2n8%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Zoa9I62O8SQ%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=8275%2C14&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Direito Administrativo', subject: 'Organização Administrativa', type: 'teoria', studyTip: `Dicas:
Organização Administrativa é uma das bases mais importantes de Administrativo. Se você confundir centralização, descentralização, concentração e desconcentração, vai errar várias questões em cadeia.
Centralização e descentralização tratam de quem exerce a atividade. Concentração e desconcentração tratam da distribuição interna de competências.
Administração direta é formada pelos entes federativos. Administração indireta envolve autarquias, fundações públicas, empresas públicas e sociedades de economia mista.
Autarquia tem personalidade de direito público; empresa pública e sociedade de economia mista têm personalidade de direito privado. Essa diferença muda regime, bens, pessoal, responsabilidade e prerrogativas.
Não confunda empresa pública com sociedade de economia mista: capital integralmente público na empresa pública; capital misto, com maioria votante pública, na sociedade de economia mista.
Terceiro setor não integra a Administração Pública, mas coopera com ela. OS, OSCIP e serviços sociais autônomos aparecem em pegadinhas. Resumo do conteúdo:
CENTRALIZAÇÃO E DESCENTRALIZAÇÃO: Centralização ocorre quando o próprio ente político desempenha a atividade administrativa por seus órgãos. Descentralização ocorre quando a atividade é transferida ou atribuída a outra pessoa. A descentralização pode ocorrer por outorga, quando há criação de entidade da Administração indireta, ou por delegação, quando particular executa serviço mediante contrato ou ato administrativo.
CONCENTRAÇÃO E DESCONCENTRAÇÃO: Concentração é ausência de distribuição interna relevante. Desconcentração é distribuição interna de competências dentro da mesma pessoa jurídica, criando órgãos. Órgãos não têm personalidade jurídica própria.
ADMINISTRAÇÃO DIRETA E INDIRETA: Administração direta é composta por União, Estados, Distrito Federal e Municípios. Administração indireta é composta por autarquias, fundações públicas, empresas públicas e sociedades de economia mista. Cada entidade da Administração indireta possui personalidade jurídica própria.
AUTARQUIAS: Autarquias são pessoas jurídicas de direito público criadas por lei específica para desempenhar atividade típica de Estado. Possuem prerrogativas públicas, bens públicos, regime de precatórios e pessoal estatutário em regra. Agências reguladoras e conselhos profissionais costumam ser tratados como autarquias especiais, com peculiaridades.
FUNDAÇÕES PÚBLICAS: Fundações públicas podem ter natureza de direito público ou de direito privado, conforme regime de criação e disciplina legal. Exercem atividades de interesse social.
EMPRESAS PÚBLICAS E SOCIEDADES DE ECONOMIA MISTA: Empresa pública tem capital integralmente público e pode adotar qualquer forma societária admitida em direito. Sociedade de economia mista tem forma de sociedade anônima e capital misto, com controle público. Ambas têm personalidade de direito privado e podem explorar atividade econômica ou prestar serviço público.
TERCEIRO SETOR: Entidades do terceiro setor são privadas, sem fins lucrativos, e colaboram com o Estado em atividades de interesse público. OS, OSCIP e serviços sociais autônomos possuem regimes próprios. Elas não integram a Administração Pública, embora possam receber incentivos, parcerias ou controle finalístico.
COMO CAI EM PROVA: A banca cobra distinções conceituais e natureza jurídica das entidades. Questões costumam trocar descentralização por desconcentração e autarquia por empresa estatal. Pegadinhas comuns: dizer que órgão tem personalidade jurídica; confundir outorga com delegação; tratar empresa pública e sociedade de economia mista como iguais; inserir terceiro setor dentro da Administração indireta; esquecer que autarquia é criada por lei específica. Como resolver: pergunte — mudou a pessoa jurídica? Se sim, há descentralização. Ficou dentro da mesma pessoa, com órgãos? Há desconcentração.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/IAVJim7EKoY%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/JWTh2v9lu0M%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=404342%2C404343%2C404344&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Raciocínio Lógico', subject: 'Orientação Temporal e Espacial', type: 'teoria', studyTip: `Dicas:
Esta meta é prática. Em orientação temporal, domine conversão de unidades, relógio, calendário, ciclos e resto da divisão.
Problemas de relógio geralmente pedem diferença entre horas, ângulo, atraso, adiantamento ou encontro de ponteiros. Organize a informação antes de calcular.
Em calendário, a semana é ciclo de 7 dias. Para datas futuras ou passadas, o resto da divisão por 7 costuma resolver o dia da semana.
Orientação espacial exige visualizar posição, deslocamento, plano cartesiano e distância. Desenhar o problema quase sempre economiza tempo.
Em plano cartesiano, eixo x é horizontal e eixo y é vertical. Trocar coordenadas muda completamente o ponto.
A banca tenta transformar questão simples em confusão verbal. Traduza o enunciado para desenho, tabela ou linha do tempo. Resumo do conteúdo:
ORIENTAÇÃO TEMPORAL: Orientação temporal envolve problemas com horas, dias, semanas, meses, calendários, ciclos, atrasos, adiantamentos e velocidade do tempo. Conversões básicas são indispensáveis: 1 dia tem 24 horas, 1 hora tem 60 minutos e 1 minuto tem 60 segundos.
RELÓGIO: Questões de relógio podem envolver horário após determinado intervalo, diferença entre horários, relógio atrasado ou adiantado e posição dos ponteiros. O cuidado principal é transformar tudo para a mesma unidade antes de operar.
CALENDÁRIO: Calendário trabalha com ciclos. Como a semana tem 7 dias, muitos problemas são resolvidos com resto da divisão por 7. Se o resto for 0, o dia da semana se mantém. Se o resto for 1, avança um dia, e assim sucessivamente.
VELOCIDADE E TEMPO: Algumas questões misturam raciocínio temporal com velocidade. A relação básica é distância, velocidade e tempo. Use unidades compatíveis.
ORIENTAÇÃO ESPACIAL: Orientação espacial envolve posição, deslocamento, direção, sentido e representação gráfica. Problemas podem aparecer com mapas, malhas, quadriculados e trajetos. Desenhar o percurso evita erros de leitura.
PLANO CARTESIANO: No plano cartesiano, cada ponto é representado por par ordenado. A primeira coordenada indica deslocamento horizontal; a segunda, vertical. Trocar a ordem das coordenadas altera o ponto.
DISTÂNCIAS: Distância entre pontos pode ser visual, por contagem em malha ou por fórmula quando houver coordenadas. Em questões simples, contar deslocamentos horizontais e verticais costuma bastar.
ESTRATÉGIA: Transforme texto em representação: linha do tempo, calendário, tabela, desenho ou plano. Depois aplique o cálculo.
COMO CAI EM PROVA: A cobrança aparece em questões de calendário, relógio, deslocamento, coordenadas e trajetos. É uma área em que erro de leitura pesa tanto quanto erro de cálculo. Pegadinhas comuns: esquecer o ciclo de 7 dias; somar horas sem converter minutos; trocar direita/esquerda ou norte/sul; inverter coordenadas do plano cartesiano; fazer cálculo mental sem desenhar. Como resolver: padronize unidades, desenhe a situação e use resto da divisão quando houver ciclo. Em RLM, organização visual é metade da questão.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/fUp%2FImIRTe4%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/REfzFSOGVFU%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=411113%2C425357&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Contabilidade Geral', subject: 'Critérios de Avaliação de Ativos', type: 'teoria', studyTip: `Dicas:
Avaliação de ativos mistura Lei n. 6.404/1976, CPCs e lógica contábil. Não basta decorar: entenda o que está sendo mensurado e por qual critério.
Custo histórico, valor justo, valor realizável líquido, valor presente e perda por recuperabilidade aparecem em contextos diferentes.
Estoques costumam ser avaliados pelo menor valor entre custo e valor realizável líquido. Esse é um ponto clássico.
Aplicações financeiras, direitos, estoques e imobilizado não seguem sempre o mesmo critério. A natureza do ativo manda na avaliação.
Ajuste a valor presente não é atualização monetária genérica. Ele traz fluxos futuros a valor presente quando o efeito financeiro é relevante.
Cuidado com impairment: se o valor contábil superar o valor recuperável, há perda por desvalorização. Resumo do conteúdo:
AVALIAÇÃO DE ATIVOS: Critérios de avaliação de ativos definem como bens e direitos serão mensurados nas demonstrações contábeis. A avaliação busca representar adequadamente o potencial de geração de benefícios econômicos.
CUSTO HISTÓRICO: Custo histórico é o valor pago ou equivalente para aquisição ou produção do ativo. É base frequente de registro inicial. Pode incluir gastos necessários para colocar o ativo em condição de uso ou venda, conforme a natureza do item.
VALOR JUSTO: Valor justo é preço que seria recebido pela venda de ativo ou pago pela transferência de passivo em transação não forçada entre participantes do mercado na data de mensuração. É comum em instrumentos financeiros e situações específicas previstas em norma.
ESTOQUES: Estoques devem ser avaliados pelo menor valor entre custo e valor realizável líquido. O custo pode envolver aquisição, transformação e outros gastos necessários para trazer o estoque à condição e localização atuais. Valor realizável líquido é o preço estimado de venda no curso normal dos negócios menos custos estimados para conclusão e venda.
APLICAÇÕES E DIREITOS: Aplicações financeiras, direitos e créditos podem exigir reconhecimento de rendimentos, ajuste a valor presente, perdas estimadas e mensuração conforme classificação contábil. A natureza do ativo e o prazo influenciam o critério.
AJUSTE A VALOR PRESENTE: O ajuste a valor presente reconhece o efeito financeiro do tempo sobre fluxos futuros. Deve ser considerado quando relevante, especialmente em operações de longo prazo ou com financiamento embutido.
REDUÇÃO AO VALOR RECUPERÁVEL: O teste de recuperabilidade verifica se o valor contábil do ativo supera seu valor recuperável. Se superar, reconhece-se perda por desvalorização. Valor recuperável é o maior entre valor justo líquido de despesas de venda e valor em uso.
ESSÊNCIA CONTÁBIL: Avaliar ativo exige observar substância econômica, expectativa de realização, risco de perda, prazo e norma aplicável.
COMO CAI EM PROVA: A banca cobra critérios por tipo de ativo, menor valor para estoques, ajuste a valor presente, valor justo e impairment. Pegadinhas comuns: aplicar um único critério para todos os ativos; confundir valor justo com valor de custo; esquecer o menor valor entre custo e valor realizável líquido nos estoques; tratar ajuste a valor presente como correção monetária; ignorar perda por recuperabilidade. Como resolver: primeiro identifique o ativo, depois escolha o critério aplicável. Em contabilidade, a conta vem antes da fórmula.` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Coo4wULrDLA%3D' },
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/mYF1qvnbm1k%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=400780%2C416790%2C104&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Matemática Financeira', subject: 'Juros Simples', type: 'teoria', studyTip: `Dicas:
Juros simples é o início da matemática financeira, mas não subestime. A fórmula é simples; o erro está em taxa, prazo e unidade.
A relação central é J = C x i x n. Montante é M = C + J ou M = C x (1 + i x n).
Taxa e prazo precisam estar na mesma unidade. Taxa ao mês com prazo em anos exige conversão antes do cálculo.
Em juros simples, os juros incidem sempre sobre o capital inicial. Não há juros sobre juros.
Taxas proporcionais funcionam em juros simples. Taxa de 2% ao mês corresponde a 24% ao ano, quando o regime é simples.
Em questões, destaque capital, taxa, tempo, juros e montante. Se o enunciado der montante, não trate automaticamente como juros. Resumo do conteúdo:
CONCEITO: Juros simples é regime em que os juros incidem sempre sobre o capital inicial. O valor dos juros cresce linearmente com o tempo. Não há capitalização de juros sobre juros.
ELEMENTOS: Capital é o valor inicial aplicado ou emprestado. Juros é a remuneração pelo uso do capital. Taxa é o percentual aplicado. Tempo é o período da operação. Montante é capital mais juros.
FÓRMULAS: A fórmula dos juros simples é J = C x i x n. O montante pode ser calculado por M = C + J ou M = C x (1 + i x n).
UNIDADE DE TAXA E TEMPO: Taxa e tempo devem estar na mesma unidade. Se a taxa é mensal, o tempo deve estar em meses. Se a taxa é anual, o tempo deve estar em anos. Esse é o erro mais comum em prova.
TAXAS PROPORCIONAIS: No regime simples, taxas proporcionais são equivalentes para efeitos práticos. Uma taxa mensal pode ser multiplicada por 12 para obter taxa anual simples, e uma taxa anual pode ser dividida por 12 para obter taxa mensal simples.
CRESCIMENTO LINEAR: Como os juros incidem sobre o capital inicial, o crescimento do montante é linear. A cada período, o acréscimo de juros é constante.
PROBLEMAS INVERSOS: A fórmula pode ser reorganizada para encontrar capital, taxa ou tempo. O ponto é identificar o que o enunciado forneceu e qual variável está sendo pedida.
COMO CAI EM PROVA: A banca cobra cálculo direto, conversão de taxa, prazo, montante, juros e comparação com juros compostos. Pegadinhas comuns: usar montante no lugar do capital; esquecer de converter prazo; tratar juros simples como composto; confundir taxa percentual com decimal; não perceber que o enunciado pede juros, não montante. Como resolver: monte uma tabela C, J, i, n e M antes da conta. Converta taxa e prazo para a mesma unidade e só depois aplique a fórmula.` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/PcQF1Bo2RQQ%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/bV%2BRQ%2BiEuM4%3D' },
      { goalId: meta9[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403800%2C403801&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 10
    const meta10 = await db.insert(goals).values({ weekId, number: 10, discipline: 'Revisão Geral', subject: 'Todas as disciplinas da semana', type: 'revisao' }).returning();
    await db.insert(materials).values([
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Língua Portuguesa' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Tributário' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Contabilidade Geral' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Constitucional' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Administrativo' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Raciocínio Lógico' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Matemática Financeira' },
    ]);
    
    console.log('Week 3 seed completed successfully!');
  }

  if (!existingWeeks.some(w => w.number === 4)) {
    console.log('Seeding Week 4...');
    
    // Create Week 4
    const insertedWeek = await db.insert(weeks).values({
      number: 4,
      title: 'Semana 4'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Língua Portuguesa', subject: 'Noções de Fonética, Acentuação Gráfica e Ortografia Oficial', type: 'teoria', studyTip: `Dicas:
Em acentuação, não tente decorar palavras soltas. Primeiro identifique a tonicidade: oxítona, paroxítona ou proparoxítona. A regra só faz sentido depois dessa classificação.
Cuidado com as paroxítonas. Elas são o ponto em que muita gente erra porque a regra é inversa: acentuam-se as paroxítonas terminadas em certos grupos, não todas.
Em hiato, observe se i e u aparecem sozinhos ou acompanhados de s na sílaba. A banca costuma explorar palavras em que o candidato aplica a regra automaticamente sem separar as sílabas.
Ortografia deve ser estudada com atenção a padrões: emprego de s, z, x, ch, g, j, hífen, prefixos e palavras parônimas. Leve dúvidas recorrentes para o caderno de erros.
Em prova, a banca geralmente não pergunta a regra pura; ela apresenta alternativas com palavras parecidas e exige que o aluno reconheça qual grafia ou acentuação está correta.

Resumo do conteúdo:
FONÉTICA E FONOLOGIA: Fonética e fonologia trabalham com sons da língua. Para prova, o ponto mais importante é diferenciar letra e fonema. Letra é representação gráfica; fonema é unidade sonora. Por isso, uma palavra pode ter número diferente de letras e fonemas. 108 Dígrafos ocorrem quando duas letras representam um único som, como ch, lh, nh, rr, ss, qu e gu em determinados contextos. Encontros consonantais reúnem consoantes com sons próprios.
ENCONTROS VOCÁLICOS: Ditongo é encontro de vogal e semivogal na mesma sílaba. Hiato ocorre quando vogais ficam em sílabas diferentes. Tritongo reúne semivogal, vogal e semivogal na mesma sílaba. Essa distinção é decisiva para acentuação, especialmente nos hiatos com i e u tônicos.
ACENTUAÇÃO GRÁFICA: A acentuação depende da posição da sílaba tônica. Oxítonas têm a última sílaba tônica; paroxítonas, a penúltima; proparoxítonas, a antepenúltima. Proparoxítonas são acentuadas. Oxítonas recebem acento em terminações específicas, como a, e, o, em e ens, seguidas ou não de s. Paroxítonas exigem mais cuidado, pois são acentuadas em terminações como l, n, r, x, ps, ã, ãs, ão, ãos, um, uns, i, is, us, ei e eis. Nos hiatos, i e u tônicos podem receber acento quando formam sílaba sozinhos ou acompanhados de s, observadas as exceções.
ORTOGRAFIA OFICIAL: Ortografia envolve grafia correta segundo a norma-padrão. A cobrança costuma aparecer em identificação de erro gráfico, substituição de palavras, emprego de hífen e diferenciação entre vocábulos parecidos. O estudo deve priorizar padrões e recorrência: parônimos, homônimos, prefixos, sufixos e letras de grafia duvidosa. Hífen pede atenção especial às regras de prefixação e ao início do segundo elemento.
COMO CAI EM PROVA: A banca costuma cobrar esse conteúdo de forma objetiva, pedindo a alternativa em que todas as palavras estejam corretamente grafadas ou acentuadas. Pegadinhas comuns: • confundir regra de oxítonas com paroxítonas; • esquecer a separação silábica no hiato; • tratar dígrafo como encontro consonantal; • errar grafias parecidas por confiar apenas no som da palavra; • aplicar regra antiga do hífen sem conferir o padrão atual. 109 Como resolver: Antes de marcar, classifique a palavra. Veja a sílaba tônica, identifique a terminação, observe se há hiato ou ditongo e, em ortografia, desconfie de palavras que parecem familiares demais.` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/19dl4R09kgU%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403605%2C403613&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Direito Tributário', subject: 'Crédito Tributário', type: 'teoria', studyTip: `Dicas:
Crédito tributário é a obrigação tributária tornada exigível por lançamento. A obrigação nasce com o fato gerador; o crédito é constituído pelo lançamento.
Lançamento não cria o tributo do nada. Ele verifica fato gerador, matéria tributável, sujeito passivo, montante devido e penalidade quando cabível.
Separe as modalidades: de ofício, por declaração e por homologação. A banca cobra principalmente quem pratica o ato e qual é o papel do contribuinte.
Suspensão, extinção e exclusão não são sinônimos. Suspensão impede a exigibilidade; extinção encerra o crédito; exclusão impede constituição quanto a isenção/anistia.
Decadência e prescrição aparecem muito. Decadência atinge o direito de constituir o crédito; prescrição atinge a pretensão de cobrá-lo judicialmente.
Em prova, responda pela categoria jurídica. Se o enunciado fala em parcelamento, depósito, liminar ou moratória, pense em suspensão; se fala em pagamento, compensação, remissão, prescrição ou decadência, pense em extinção. 110 

Resumo do conteúdo:
CRÉDITO TRIBUTÁRIO: O crédito tributário decorre da obrigação principal e tem a mesma natureza desta. A obrigação nasce com o fato gerador; o crédito é formalizado pelo lançamento. Depois de constituído, o crédito tributário torna possível a exigência formal do tributo pelo sujeito ativo.
LANÇAMENTO: Lançamento é procedimento administrativo que verifica a ocorrência do fato gerador, determina a matéria tributável, calcula o montante devido, identifica o sujeito passivo e, quando cabível, aplica penalidade. As modalidades são lançamento de ofício, por declaração e por homologação. No lançamento de ofício, a autoridade fiscal atua diretamente. No lançamento por declaração, o contribuinte fornece informações. No lançamento por homologação, o contribuinte antecipa o pagamento e a autoridade homologa posteriormente.
ALTERAÇÃO DO LANÇAMENTO: O lançamento regularmente notificado ao sujeito passivo só pode ser alterado nos casos previstos em lei, como impugnação, recurso de ofício ou iniciativa de ofício nos casos admitidos pelo CTN.
SUSPENSÃO DA EXIGIBILIDADE: Suspensão não extingue o crédito. Ela impede temporariamente a cobrança. O CTN prevê hipóteses como moratória, depósito integral, reclamações e recursos administrativos, liminar em mandado de segurança, tutela judicial e parcelamento.
EXTINÇÃO DO CRÉDITO: Extinção encerra o crédito tributário. Inclui pagamento, compensação, transação, remissão, prescrição, decadência, conversão de depósito em renda, pagamento antecipado com homologação, consignação em pagamento, decisão administrativa irreformável, decisão judicial passada em julgado e dação em pagamento em bens imóveis, na forma da lei.
EXCLUSÃO DO CRÉDITO: Exclusão envolve isenção e anistia. A isenção afasta tributo; a anistia afasta penalidade. Em regra, a obrigação acessória permanece, salvo disposição legal em sentido contrário.
COMO CAI EM PROVA: A banca cobra literalidade do CTN e casos práticos envolvendo lançamento, suspensão, extinção, exclusão, decadência e prescrição. Pegadinhas comuns: • dizer que o crédito nasce com o fato gerador; • confundir suspensão com extinção; • tratar isenção e anistia como perdão idêntico; • errar a modalidade de lançamento; • trocar decadência por prescrição. Como resolver: Monte a linha do tempo: fato gerador, obrigação, lançamento, crédito, exigibilidade, cobrança e extinção. Depois encaixe o instituto do enunciado nessa sequência.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/L%2F%2BFiTR62i4%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/WvESFsPoMpg%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407168&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Contabilidade Geral', subject: 'Ativo Imobilizado', type: 'teoria', studyTip: `Dicas:
Ativo imobilizado exige dois critérios centrais: uso na produção, fornecimento, aluguel ou administração e expectativa de utilização por mais de um período.
Nem todo gasto vira ativo. Só entra no custo se for diretamente atribuível para colocar o bem no local e na condição de funcionamento pretendidos.
Depreciação não é perda física apenas; é alocação sistemática do valor depreciável ao longo da vida útil.
Valor depreciável = custo menos valor residual. Muitas questões erradas nascem porque o aluno deprecia o custo cheio. 112 

Resumo do conteúdo:
RECONHECIMENTO: Ativo imobilizado é item tangível mantido para uso na produção ou fornecimento de bens ou serviços, para aluguel a terceiros ou para fins administrativos, e que se espera utilizar por mais de um período. O custo é reconhecido como ativo quando for provável que benefícios econômicos futuros fluirão para a entidade e o custo puder ser mensurado com confiabilidade.
CUSTO INICIAL: O custo inclui preço de aquisição, tributos não recuperáveis, custos diretamente atribuíveis para colocar o ativo no local e condição de funcionamento e estimativa inicial de desmontagem, remoção e restauração, quando aplicável. Gastos administrativos, perdas operacionais iniciais e treinamento que não sejam diretamente necessários não compõem o custo do ativo.
MENSURAÇÃO POSTERIOR: Após o reconhecimento, a entidade aplica modelo de custo ou modelo de reavaliação, conforme permitido pelas normas aplicáveis. No modelo de custo, o ativo é apresentado pelo custo menos depreciação acumulada e perdas por redução ao valor recuperável.
DEPRECIAÇÃO: Depreciação é a alocação sistemática do valor depreciável ao longo da vida útil. Valor depreciável é custo menos valor residual. Cada componente relevante de um item do imobilizado deve ser depreciado separadamente quando tiver custo significativo em relação ao total.
VIDA ÚTIL, VALOR RESIDUAL E MÉTODOS: Vida útil pode ser medida pelo período de uso esperado ou pela quantidade de unidades de produção. Métodos comuns são linha reta, saldos decrescentes e unidades produzidas. Valor residual, vida útil e método de depreciação devem ser revisados pelo menos ao final de cada exercício.
BAIXA: O ativo é baixado na alienação ou quando não se esperam benefícios econômicos futuros. Ganho ou perda corresponde à diferença entre o valor líquido da alienação e o valor contábil.
COMO CAI EM PROVA: A banca cobra CPC 27 com cálculos: custo inicial, valor depreciável, depreciação acumulada, revisão de vida útil, baixa e ganho ou perda. Pegadinhas comuns: • incluir gasto que deveria ir direto ao resultado; • esquecer valor residual; • depreciar terreno; • tratar mudança de estimativa como erro; • confundir depreciação, amortização e exaustão. Como resolver: Antes de calcular, identifique custo reconhecível, valor residual, vida útil, método e tempo de uso. Depois faça a conta e confira se a questão pede despesa, acumulada ou valor contábil.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Coo4wULrDLA%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/jhIJLoiAZzE%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=416882%2C4444%2C104&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Direito Constitucional', subject: 'Organização Político-administrativa', type: 'teoria', studyTip: `Dicas:
Organização do Estado é tema de repartição de competências. A pergunta central quase sempre é: quem pode fazer o quê?
A Federação brasileira é formada por União, Estados, Distrito Federal e Municípios, todos autônomos. Territórios não são entes federativos. 114 

Resumo do conteúdo:
FEDERAÇÃO BRASILEIRA: A organização político-administrativa compreende União, Estados, Distrito Federal e Municípios, todos autônomos nos termos da Constituição. A autonomia federativa envolve auto-organização, autogoverno, autoadministração e capacidade normativa dentro dos limites constitucionais.
UNIÃO: A União representa a pessoa jurídica de direito público interno que exerce competências federais. Não se confunde com a República Federativa do Brasil, que é o Estado brasileiro no plano internacional. Suas competências incluem matérias de interesse nacional e funções de coordenação federativa.
ESTADOS: Estados organizam-se por suas Constituições e leis, observados os princípios da Constituição Federal. Possuem competências remanescentes, além das competências expressamente atribuídas.
MUNICÍPIOS: Municípios regem-se por Lei Orgânica e têm competência para legislar sobre assuntos de interesse local e suplementar legislação federal e estadual no que couber.
DISTRITO FEDERAL: O Distrito Federal acumula competências legislativas reservadas aos Estados e Municípios. Não pode ser dividido em municípios.
REPARTIÇÃO DE COMPETÊNCIAS: Competências administrativas envolvem execução de atividades. Competências legislativas envolvem produção normativa. A Constituição distribui competências exclusivas, privativas, comuns e concorrentes. Na competência concorrente, a União edita normas gerais e os Estados suplementam.
INTERVENÇÃO: Intervenção federal ou estadual é medida excepcional, usada para preservar a Federação, garantir princípios constitucionais sensíveis ou resolver situações graves previstas na Constituição.
COMO CAI EM PROVA: A banca cobra diferença entre entes federativos, competências da União, Estados, DF e Municípios, além de intervenção. Pegadinhas comuns: • tratar território como ente federativo; • confundir União com República Federativa do Brasil; • esquecer que o DF acumula competências estaduais e municipais; • trocar competência comum por concorrente; • errar a lógica de normas gerais e suplementação. Como resolver: Leia o verbo do enunciado. Se for executar, pense em competência administrativa. Se for legislar, pense em competência legislativa e na distribuição constitucional.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/cUhjzExB4BU%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/MztFxis%2BrFY%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=405233&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'Engenharia de Software', type: 'teoria', studyTip: `Dicas:
Engenharia de Software é extensa. Não tente decorar listas soltas: organize o tema por ciclo de vida, requisitos, projeto, testes, qualidade, métricas e métodos ágeis.
Requisitos são uma fonte clássica de cobrança. Separe requisito funcional, não funcional, regra de negócio e restrição.
Modelos de ciclo de vida têm lógica própria: cascata é sequencial; incremental entrega partes; iterativo refina; espiral enfatiza riscos; ágil trabalha com ciclos curtos e adaptação.
Testes não são todos iguais. Unidade, integração, sistema, aceitação, regressão, desempenho, segurança, usabilidade e carga verificam coisas diferentes.
Métricas e estimativas aparecem como instrumentos de controle, não como decoração teórica. Entenda o que medem e em que momento são usadas.
Em orientação a objetos, a banca cobra encapsulamento, herança, polimorfismo, classes, objetos, interfaces, coesão e acoplamento.

Resumo do conteúdo:
CONCEITO: Engenharia de Software aplica métodos, processos, técnicas e ferramentas para desenvolver, operar e manter software com qualidade, previsibilidade e aderência às necessidades do usuário. O foco não é apenas programar, mas transformar necessidades em produto confiável, testável e sustentável.
CICLO DE VIDA: O ciclo de vida envolve etapas como levantamento de requisitos, análise, projeto, implementação, testes, implantação, operação e manutenção. Modelos tradicionais tendem a organizar fases de modo mais sequencial. Modelos iterativos, incrementais e ágeis trabalham com entregas parciais, feedback e adaptação.
REQUISITOS: Requisitos funcionais descrevem comportamentos e serviços do sistema. Requisitos não funcionais tratam qualidades e restrições, como desempenho, segurança, disponibilidade, usabilidade e escalabilidade. Boa especificação reduz retrabalho e melhora validação.
ANÁLISE, PROJETO E ORIENTAÇÃO A OBJETOS: Análise busca entender o problema; projeto define a solução. Em orientação a objetos, conceitos como classe, objeto, atributo, método, herança, polimorfismo, encapsulamento, coesão e acoplamento são recorrentes.
TESTES: Testes verificam se o software atende requisitos e se defeitos foram introduzidos. Teste de unidade avalia componentes isolados; integração verifica interação; sistema avalia o conjunto; aceitação valida sob perspectiva do usuário ou cliente. Regressão verifica se mudanças quebraram funcionalidades existentes.
QUALIDADE, MÉTRICAS E MÉTODOS ÁGEIS: Qualidade envolve processo e produto. Métricas apoiam estimativas, controle de esforço, defeitos, produtividade e complexidade. Métodos ágeis valorizam colaboração, entregas frequentes, adaptação, feedback e priorização de valor.
COMO CAI EM PROVA: A banca cobra comparações entre modelos de desenvolvimento, tipos de requisitos, testes, qualidade, métricas e conceitos de orientação a objetos. Pegadinhas comuns: • confundir requisito funcional com não funcional; • achar que ágil significa ausência de planejamento; • trocar teste de integração por teste de sistema; • confundir iteração com incremento; • decorar siglas sem entender a finalidade. Como resolver: Identifique em que fase do ciclo de vida a situação está e qual problema a técnica tenta resolver: entender, projetar, construir, testar, medir ou melhorar.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/hApYx51Dof4%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/%2FF5aJGPeoBQ%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=7988%2C14&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Direito Administrativo', subject: 'Atos Administrativos', type: 'teoria', studyTip: `Dicas:
Ato administrativo é manifestação unilateral da Administração, ou de quem lhe faça as vezes, produzindo efeitos jurídicos sob regime de direito público.
Elementos do ato são clássicos: competência, finalidade, forma, motivo e objeto. A banca adora trocar elemento vinculado por discricionário.
Competência, finalidade e forma tendem a ser vinculadas. Motivo e objeto podem ter margem de discricionariedade em certos atos.
Atributos não são requisitos. Presunção de legitimidade, autoexecutoriedade, imperatividade e tipicidade explicam efeitos do ato.
Motivo não é motivação. Motivo é situação de fato e de direito; motivação é exposição formal das razões.
Revogação atinge ato válido por conveniência e oportunidade; anulação atinge ato ilegal. Essa diferença cai o tempo todo.

Resumo do conteúdo:
CONCEITO: Ato administrativo é declaração unilateral do Estado ou de quem exerça função administrativa, sob regime de direito público, destinada a produzir efeitos jurídicos. Ele pode criar, modificar, extinguir, reconhecer ou declarar direitos e obrigações.
ELEMENTOS: Competência é o poder legal conferido ao agente. Finalidade é o interesse público previsto em lei. Forma é o modo de exteriorização. Motivo é o pressuposto de fato e de direito. Objeto é o conteúdo do ato. Vício em elemento essencial pode gerar invalidação.
ATRIBUTOS: Presunção de legitimidade indica que o ato se presume válido até prova em contrário. Imperatividade permite impor obrigações independentemente de concordância. Autoexecutoriedade permite execução direta em hipóteses legais ou urgentes. Tipicidade exige correspondência com figuras previstas em lei.
CLASSIFICAÇÃO: Atos podem ser vinculados ou discricionários, gerais ou individuais, internos ou externos, simples, compostos ou complexos, constitutivos, declaratórios ou enunciativos.
EXTINÇÃO: O ato pode ser extinto por cumprimento de efeitos, desaparecimento do sujeito ou objeto, renúncia, retirada ou invalidação. Revogação retira ato válido por conveniência e oportunidade, com efeitos prospectivos. Anulação retira ato ilegal, em regra com efeitos retroativos. Convalidação corrige vício sanável quando possível.
MÉRITO ADMINISTRATIVO: Mérito envolve conveniência e oportunidade em atos discricionários. O Judiciário controla legalidade, mas não substitui o administrador na escolha legítima de mérito.
COMO CAI EM PROVA: A banca cobra conceito, elementos, atributos, classificação, anulação, revogação, convalidação e diferença entre motivo e motivação. Pegadinhas comuns: • confundir atributo com elemento; • dizer que todo ato tem autoexecutoriedade; • trocar revogação por anulação; • afirmar que Judiciário revoga ato administrativo; • esquecer que finalidade é sempre interesse público. Como resolver: Pergunte primeiro se o problema é legalidade ou conveniência. Se for ilegalidade, pense em anulação/convalidação; se for mérito de ato válido, pense em revogação.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/8yzc8%2Bv%2FHI8%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/lw1FI4AdM0c%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=404372&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Raciocínio Lógico', subject: 'Diagramas Lógicos', type: 'teoria', studyTip: `Dicas:
Diagramas lógicos são ferramenta para visualizar conjuntos. Não tente resolver tudo só na frase: desenhe.
Palavras como todo, algum e nenhum comandam o desenho. Todo A é B não significa todo B é A.
Em problemas com três conjuntos, comece pela interseção tripla quando houver informação sobre ela. Depois preencha exatamente dois, apenas um e fora dos conjuntos.
Cuidado com “exatamente”, “pelo menos” e “somente”. Essas palavras mudam o lugar correto no diagrama.
Em argumento lógico, use diagramas para testar validade. A conclusão precisa ser necessária em todos os desenhos compatíveis com as premissas.
Em questões quantitativas, confira se a soma das regiões fecha com o total informado.

Resumo do conteúdo:
DIAGRAMAS E CONJUNTOS: Diagramas lógicos representam relações entre conjuntos. São úteis para questões com quantificadores, inclusão, interseção, união e exclusão. Cada região do diagrama tem significado próprio: elementos só de A, só de B, interseção, exterior e, quando há três conjuntos, interseções duplas e tripla.
QUANTIFICADORES: Todo A é B indica inclusão de A em B. Algum A é B indica existência de interseção. Nenhum A é B indica conjuntos sem elemento comum. Algum, em lógica, significa pelo menos um. Não significa muitos nem maioria.
PROBLEMAS COM DOIS OU TRÊS CONJUNTOS: Em problemas numéricos, a estratégia é preencher as regiões mais restritivas primeiro. Para três conjuntos, normalmente começa-se pela interseção tripla, depois exatamente duas, depois apenas uma. Expressões como apenas, somente, pelo menos e exatamente determinam a região correta.
ARGUMENTAÇÃO COM DIAGRAMAS: Diagramas podem testar se uma conclusão decorre das premissas. Um argumento é válido quando não existe desenho compatível com as premissas em que a conclusão seja falsa.
CONTROLE DO TOTAL: Ao final, some todas as regiões e compare com o total. Diferenças geralmente indicam região esquecida, dupla contagem ou interpretação errada de exatamente/pelo menos.
COMO CAI EM PROVA: A banca cobra relação entre conjuntos, quantificadores e problemas de contagem com duas ou três categorias. Pegadinhas comuns: • inverter todo A é B; • interpretar algum como maioria; • esquecer a região fora dos conjuntos; • somar interseções duas vezes; • confundir exatamente dois com pelo menos dois. Como resolver: Traduza o texto para regiões do diagrama e preencha do mais específico para o mais geral. No fim, faça a conferência pelo total.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/fUp%2FImIRTe4%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/78DnbQ2iYsQ%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=406162%2C425297%2C425298%2C425299%2C425300&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Matemática Financeira', subject: 'Juros Compostos', type: 'teoria', studyTip: `Dicas:
Juros compostos são juros sobre juros. O montante cresce de forma exponencial, não linear.
A fórmula central é M = C(1+i)^n. Antes de calcular, confira se taxa e prazo estão na mesma unidade.
Não misture juros simples com compostos. Em juros simples, o crescimento é proporcional ao tempo; em compostos, cada período incorpora juros ao capital.
Taxas equivalentes aparecem muito: em capitalização composta, não basta dividir ou multiplicar taxa sem critério.
Desconto composto, valor atual e valor futuro são a mesma lógica em direções diferentes.
Em prova, cuidado com porcentagem, prazo fracionado, taxa mensal/anual e capitalização.

Resumo do conteúdo:
REGIME COMPOSTO: No regime de juros compostos, os juros de cada período são incorporados ao capital e passam a render juros nos períodos seguintes. Por isso, a evolução do montante é exponencial.
FÓRMULA FUNDAMENTAL: A relação básica é M = C(1+i)^n, em que M é montante, C é capital, i é taxa por período e n é número de períodos. O juro é J = M – C.
UNIDADE DE TAXA E PRAZO: Taxa e prazo precisam estar na mesma unidade. Se a taxa é mensal, o prazo deve estar em meses; se é anual, o prazo deve estar em anos. Em compostos, converter taxa exige equivalência exponencial.
VALOR ATUAL E VALOR FUTURO: Para levar um valor ao futuro, multiplica-se pelo fator (1+i)^n. Para trazer ao presente, divide-se por esse fator. Essa lógica aparece em aplicações, financiamentos, descontos e equivalência de capitais.
TAXAS EQUIVALENTES: Taxas equivalentes produzem o mesmo montante em determinado prazo sob regime composto. A relação envolve potência, não regra de três simples.
COMPARAÇÃO COM JUROS SIMPLES: Em juros simples, o juro incide sempre sobre o capital inicial. Em juros compostos, incide sobre o saldo acumulado.
COMO CAI EM PROVA: A banca cobra cálculo de montante, capital, taxa, prazo, juros, valor atual, taxas equivalentes e comparação entre regimes. Pegadinhas comuns: • usar fórmula de juros simples; • não alinhar taxa e prazo; • dividir taxa anual por 12 em regime composto sem verificar equivalência; • esquecer de transformar porcentagem em decimal; • confundir montante com juros. Como resolver: Escreva os dados, converta taxa para decimal, alinhe prazo e aplique M = C(1+i)^n. Depois veja se a pergunta pede M, C, J, i ou n.` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/PcQF1Bo2RQQ%3D' },
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/XcU3FQ%2BTT98%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403802&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Estatística', subject: 'Medidas de Posição', type: 'teoria', studyTip: `Dicas:
Medidas de posição resumem onde os dados se concentram. Média, mediana e moda respondem perguntas diferentes.
Média é sensível a valores extremos. Se houver outliers, ela pode ser puxada para cima ou para baixo.
Mediana depende da ordem dos dados. Antes de calcular, coloque os valores em ordem crescente.
Moda é o valor mais frequente. Um conjunto pode ser amodal, unimodal, bimodal ou multimodal.
Em dados agrupados, a leitura muda: use classes, frequências, frequência acumulada e ponto médio quando necessário.
Em prova, muitas questões erram o aluno por descuido operacional: esquecer frequência, não ordenar dados ou confundir posição com valor.

Resumo do conteúdo:
MEDIDAS DE POSIÇÃO: Medidas de posição sintetizam a distribuição dos dados. As principais são média, mediana e moda. Elas ajudam a representar um conjunto de dados por valores centrais ou típicos.
MÉDIA ARITMÉTICA: A média aritmética simples é a soma dos valores dividida pela quantidade de observações. Quando há frequências, usa-se a média ponderada. A média é sensível a valores extremos e pode não representar bem distribuições muito assimétricas.
MEDIANA: Mediana é o valor que divide o conjunto ordenado em duas partes com a mesma quantidade de observações. Se o número de observações for ímpar, a mediana é o termo central. Se for par, é a média dos dois termos centrais.
MODA: Moda é o valor de maior frequência. Um conjunto pode não ter moda ou pode ter mais de uma moda. Em dados agrupados, a classe modal é a de maior frequência.
DADOS AGRUPADOS: Em tabelas de frequência, é preciso observar frequência absoluta, frequência acumulada, classes e ponto médio. A mediana depende da posição acumulada; a média pode exigir ponderação pelos pontos médios.
RELAÇÃO ENTRE MÉDIA, MEDIANA E MODA: Em distribuições simétricas, média, mediana e moda tendem a coincidir. Em distribuições assimétricas, podem se afastar.
COMO CAI EM PROVA: A banca cobra cálculo direto e interpretação: média simples, média ponderada, mediana em rol, moda e dados agrupados. Pegadinhas comuns: • calcular mediana sem ordenar; • esquecer pesos ou frequências; • confundir classe modal com moda exata; • achar que toda sequência tem uma única moda; • confundir posição da mediana com valor da mediana. Como resolver: Identifique se os dados são simples ou agrupados. Ordene quando necessário, use frequências corretamente e confira se a medida pedida é média, mediana ou moda.` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/6WUSotKDrcQ%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/2nwbW6E1uDs%3D' },
      { goalId: meta9[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=7192&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 10
    const meta10 = await db.insert(goals).values({ weekId, number: 10, discipline: 'Revisão Geral', subject: 'Todas as disciplinas da semana', type: 'revisao' }).returning();
    await db.insert(materials).values([
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Língua Portuguesa' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Tributário' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Contabilidade Geral' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Constitucional' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Administrativo' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Raciocínio Lógico' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Matemática Financeira' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Estatística' },
    ]);
    console.log('Week 4 seed completed successfully!');
  }

  

  if (!existingWeeks.some(w => w.number === 5)) {
    console.log('Seeding Week 5...');
    
    const insertedWeek = await db.insert(weeks).values({
      number: 5,
      title: 'Semana 5'
    }).returning();
    const weekId = insertedWeek[0].id;

    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Revisão Geral', subject: 'Revisão das Semanas 1 a 4 + Caderno de Erros', type: 'revisao', studyTip: `Organização do dia: Tempo total: 5 a 6 horas líquidas. Objetivo: revisar o Bloco 1 sem tentar reler todos os PDFs. A prioridade é trabalhar erros, questões marcadas, pontos frágeis e assuntos que ficaram com baixa segurança. Divisão sugerida:
Bloco 1: Direito Tributário + Contabilidade Geral
Bloco 2: Língua Portuguesa + Direito Constitucional
Bloco 3: Tecnologia da Informação + Direito Administrativo
Bloco 4: Raciocínio Lógico + Matemática Financeira + Estatística
Fechamento: caderno de erros + prioridades do Bloco 2 Metodologia de revisão (dentro de cada bloco):
10 min: releia marcações, resumos ou esquemas dos PDFs mais importantes.
15 a 25 min: refaça questões erradas e marcadas das semanas anteriores.
10 min: resolva questões novas do mesmo assunto, especialmente nos temas em que errou.
5 min: registre no caderno de erros a causa do erro (conceito fraco, troca de instituto, fórmula, procedimento, interpretação do enunciado, distração ou falta de treino). Regra da revisão: não revise primeiro o que já está confortável. Revise primeiro o que ainda está derrubando seu desempenho. Destaques por disciplina:
DIREITO TRIBUTÁRIO: Foque em limitações ao poder de tributar, responsabilidade tributária e crédito tributário. Separe obrigação tributária, lançamento e crédito. Revise anterioridade, noventena, legalidade, imunidades, decadência e prescrição.
CONTABILIDADE GERAL: Reforce débito/crédito, contas, fatos contábeis, escrituração, demonstrações, avaliação de ativos e imobilizado. Em Contabilidade, erro repetido quase sempre indica que a base ainda precisa de ajuste.
TECNOLOGIA DA INFORMAÇÃO: Separe os frameworks por finalidade: COBIT = governança; ITIL = serviços; PMBOK = projetos; Engenharia de Software = desenvolvimento, requisitos, testes, qualidade e métodos ágeis.
DIREITO CONSTITUCIONAL: Revise princípios fundamentais, direitos e garantias fundamentais e organização político-administrativa. Dê atenção às exceções, competências e remédios constitucionais.
DIREITO ADMINISTRATIVO: Compare princípios, poderes, organização administrativa e atos administrativos. Foque em atributos, elementos, anulação, revogação e convalidação.
LÍNGUA PORTUGUESA: Refaça questões de interpretação, tipologia, coesão, coerência, semântica, figuras de linguagem, reescrita, acentuação e ortografia. Português melhora muito quando o aluno revisa pelo erro real.
RACIOCÍNIO LÓGICO: Não transforme a revisão em releitura passiva. Refaça questões de operadores, negação, equivalências, sequências, orientação espacial/temporal e diagramas.
MATEMÁTICA FINANCEIRA: Refaça contas de juros simples e compostos sem olhar a resolução. Confira taxa, prazo, capital, montante e unidade de tempo.
ESTATÍSTICA: Revise média, mediana, moda, separatrizes e leitura de tabelas. O objetivo é evitar confusão de procedimento. Fechamento do bloco (preencher no caderno de erros): 3 assuntos que evoluíram; 3 assuntos que ainda estão frágeis; 3 prioridades para as Semanas 5 a 8. Lembre-se: esta revisão não existe para provar que você lembra de tudo. Ela existe para mostrar onde o estudo virou domínio e onde ainda há ruído. O aluno que revisa com honestidade para de estudar no escuro. A partir daqui, cada erro corrigido vira direção para o próximo bloco. Constância constrói!` }).returning();

    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'tarefa', link: '', description: 'Revisar Direito Tributário' },
      { goalId: meta1[0].id, type: 'tarefa', link: '', description: 'Revisar Contabilidade Geral' },
      { goalId: meta1[0].id, type: 'tarefa', link: '', description: 'Revisar Língua Portuguesa' },
      { goalId: meta1[0].id, type: 'tarefa', link: '', description: 'Revisar Direito Constitucional' },
      { goalId: meta1[0].id, type: 'tarefa', link: '', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta1[0].id, type: 'tarefa', link: '', description: 'Revisar Direito Administrativo' },
      { goalId: meta1[0].id, type: 'tarefa', link: '', description: 'Revisar Raciocínio Lógico' },
      { goalId: meta1[0].id, type: 'tarefa', link: '', description: 'Revisar Matemática Financeira' },
      { goalId: meta1[0].id, type: 'tarefa', link: '', description: 'Revisar Estatística' },
      { goalId: meta1[0].id, type: 'tarefa', link: '', description: 'Preencher caderno de erros (evoluções, fragilidades e prioridades)' },
    ]);

    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Língua Portuguesa', subject: 'Estrutura e Processos de Formação de Palavras', type: 'teoria', studyTip: `Dicas:
Comece sempre pelo radical. Ele é a parte que concentra o sentido básico da palavra. Depois observe o que foi acrescentado antes ou depois dele.
Não confunda estrutura com processo de formação: radical, prefixo, sufixo e desinência são peças; derivação e composição são formas de construir novas palavras.
Parassíntese é uma das maiores pegadinhas: prefixo e sufixo precisam entrar ao mesmo tempo. Se a palavra existe sem um deles, não é parassintética.
Derivação regressiva costuma formar substantivos a partir de verbos, com redução da forma. Derivação imprópria muda a classe gramatical sem mudar a forma da palavra.
Em composição, a pergunta é: os radicais permaneceram reconhecíveis? Se sim, tende à justaposição. Se houve perda ou alteração fonética, pense em aglutinação.

Resumo do conteúdo:
MORFEMAS E ESTRUTURA DAS PALAVRAS: A palavra pode ser dividida em morfemas, unidades mínimas dotadas de valor significativo ou gramatical. O radical carrega o núcleo de sentido. Prefixos e sufixos modificam esse sentido ou alteram a classe da palavra. Vogal temática prepara o radical para receber desinências. Desinências indicam flexões nominais ou verbais.
RADICAL, TEMA, AFIXOS E DESINÊNCIAS: Radical é a base significativa. Tema é a soma de radical e vogal temática. Afixos são elementos que se unem ao radical: prefixos antes, sufixos depois. Desinências nominais indicam gênero e número; desinências verbais indicam modo, tempo, número e pessoa.
DERIVAÇÃO: A derivação cria palavras a partir de uma palavra primitiva. Pode ser prefixal, sufixal, prefixal e sufixal, parassintética, regressiva ou imprópria. A diferença entre prefixal/sufixal e parassintética é essencial: na parassíntese, prefixo e sufixo são simultâneos.
COMPOSIÇÃO: Na composição, há união de radicais. A justaposição preserva a autonomia fonética dos elementos. A aglutinação altera a forma sonora ou gráfica de ao menos um dos elementos.
COMO CAI EM PROVA: A banca costuma pedir o processo de formação, a identificação de morfemas ou a distinção entre processos parecidos. Pegadinhas comuns: chamar toda palavra com prefixo e sufixo de parassintética; confundir vogal temática com desinência; classificar composição olhando apenas para o hífen; esquecer que derivação imprópria depende do uso no contexto. Como resolver: isole o radical, retire prefixos e sufixos mentalmente e veja se a palavra continua existindo. Depois identifique se houve acréscimo, redução, mudança de classe ou união de radicais.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'pdf', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/8GfHz9X3dKQ%3D', description: 'Acessar PDF' },
      { goalId: meta2[0].id, type: 'questoes', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=419345&desatualizada=0&anulada=0&query=&auth=force&auth=force', description: 'Resolver Questões' }
    ]);

    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Direito Tributário', subject: 'Garantias e Privilégios do Crédito Tributário', type: 'teoria', studyTip: `Dicas:
Garantias aumentam a segurança de recebimento do crédito; privilégios tratam da preferência do Fisco em relação a outros credores.
O patrimônio do sujeito passivo responde pelo crédito tributário, mas sempre observe as limitações legais e as regras de impenhorabilidade.
A alienação de bens por devedor inscrito em dívida ativa pode gerar presunção de fraude, salvo se forem reservados bens suficientes ao pagamento integral.
A preferência tributária é forte, mas não é absoluta. Créditos trabalhistas e decorrentes de acidente de trabalho têm tratamento prioritário.
Em falência, inventário, arrolamento e liquidação, a banca cobra a regra especial: quem recebe antes, quando se exige prova de quitação e qual é o papel da Fazenda.

Resumo do conteúdo:
GARANTIAS DO CRÉDITO TRIBUTÁRIO: Garantias são instrumentos que protegem a satisfação do crédito tributário. O CTN prevê garantias próprias, mas a enumeração legal não exclui outras que sejam expressamente previstas em lei.
RESPONSABILIDADE PATRIMONIAL: Em regra, todos os bens e rendas do sujeito passivo respondem pelo crédito tributário. Essa regra reforça a possibilidade de cobrança, mas convive com limites legais, como hipóteses de impenhorabilidade.
FRAUDE À COBRANÇA: A alienação ou oneração de bens por sujeito passivo em débito inscrito em dívida ativa presume-se fraudulenta quando não restam bens ou rendas suficientes ao pagamento integral do crédito. O ponto decisivo é a inscrição em dívida ativa e a reserva patrimonial suficiente.
PRIVILÉGIOS DO CRÉDITO TRIBUTÁRIO: Privilégio é preferência. O crédito tributário goza de preferência sobre muitos créditos, mas não supera todos. A lei preserva prioridade de créditos trabalhistas e de acidente de trabalho, entre outras regras especiais.
COMO CAI EM PROVA: A cobrança costuma vir em assertivas curtas sobre fraude, preferência e prova de quitação. Pegadinhas comuns: dizer que o rol de garantias é fechado; afirmar que o crédito tributário vence qualquer crédito; ignorar a inscrição em dívida ativa; esquecer a exceção da reserva de bens suficientes; confundir garantia com privilégio. Como resolver: separe a pergunta em duas etapas — primeiro veja se o tema é proteção da cobrança ou ordem de preferência; depois aplique a regra do CTN com atenção às exceções.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/eqdpa2NwFB4%3D', description: 'Assistir Videoaula' },
      { goalId: meta3[0].id, type: 'pdf', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/wy0j1Ux4cn4%3D', description: 'Acessar PDF' },
      { goalId: meta3[0].id, type: 'questoes', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407181&desatualizada=0&anulada=0&auth=force&auth=force', description: 'Resolver Questões' }
    ]);

    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Contabilidade Geral', subject: 'Ganhos ou Perdas de Capital, CPC 01 e Ativo Intangível', type: 'teoria', studyTip: `Dicas:
Em alienação ou baixa, a conta-chave é simples: valor líquido recebido menos valor contábil. O resultado será ganho ou perda.
Valor contábil não é custo histórico puro. É custo ajustado por depreciação, amortização e perdas por redução ao valor recuperável.
No CPC 01, o ativo não pode ficar registrado acima do que a entidade consegue recuperar por uso ou venda.
Valor recuperável é o maior entre valor justo líquido de despesas de venda e valor em uso. A banca adora inverter para "menor".
No intangível, não basta não ter substância física. É preciso identificabilidade, controle e benefícios econômicos futuros.

Resumo do conteúdo:
ALIENAÇÃO E BAIXA DE ATIVOS: Quando um ativo é vendido, descartado ou deixa de gerar benefícios econômicos futuros, deve ser baixado. O ganho ou perda é apurado pela diferença entre o valor líquido obtido e o valor contábil do ativo na data da baixa.
CPC 01 – IMPAIRMENT: O CPC 01 busca evitar ativos superavaliados. A entidade deve comparar o valor contábil com o valor recuperável. Se o valor contábil excede o valor recuperável, reconhece-se perda por desvalorização.
VALOR RECUPERÁVEL: Valor recuperável é o maior entre valor justo líquido de despesas de venda e valor em uso. Valor em uso envolve fluxos de caixa futuros esperados trazidos a valor presente. Valor justo líquido considera venda em condições normais, deduzidas despesas de venda.
ATIVO INTANGÍVEL – CPC 04: Ativo intangível é ativo não monetário identificável sem substância física. Para reconhecimento, exige identificabilidade, controle e benefício econômico futuro. Pesquisa costuma ir ao resultado; desenvolvimento pode ser ativado se cumprir critérios específicos.
COMO CAI EM PROVA: A banca cobra cálculo de baixa, reconhecimento de impairment, reversão e requisitos do intangível. Pegadinhas comuns: calcular ganho/perda com base no custo original; escolher o menor valor como recuperável; reconhecer goodwill gerado internamente como ativo; amortizar intangível de vida útil indefinida; confundir despesa de pesquisa com desenvolvimento ativável. Como resolver: atualize o valor contábil, compare com venda ou recuperável, classifique o efeito no resultado e verifique se o ativo cumpre os critérios de reconhecimento.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Coo4wULrDLA%3D', description: 'Assistir Videoaula' },
      { goalId: meta4[0].id, type: 'pdf', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/DDks7h3bwms%3D', description: 'Acessar PDF' },
      { goalId: meta4[0].id, type: 'questoes', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=416779%2C416879%2C416844%2C104&desatualizada=0&anulada=0&query=&auth=force&auth=force', description: 'Resolver Questões' }
    ]);

    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Direito Constitucional', subject: 'Administração Pública', type: 'teoria', studyTip: `Dicas:
O art. 37 é leitura obrigatória: princípios, concurso público, cargos em comissão, teto, acumulação e responsabilidade civil aparecem com frequência.
LIMPE não é apenas mnemônico. Cada princípio tem consequência prática: legalidade limita, impessoalidade veda favorecimento, moralidade controla legitimidade, publicidade permite controle e eficiência exige resultado.
Concurso é regra para cargo e emprego público. Cargo em comissão é exceção e deve se vincular a direção, chefia e assessoramento.
Acumulação de cargos só é possível nas hipóteses constitucionais e sempre com compatibilidade de horários.
Responsabilidade objetiva do Estado não elimina ação regressiva: contra o agente, exige dolo ou culpa.

Resumo do conteúdo:
REGIME CONSTITUCIONAL DA ADMINISTRAÇÃO PÚBLICA: A Constituição disciplina a Administração Pública direta e indireta de todos os Poderes e entes federativos. A base está no art. 37, que organiza princípios, acesso a cargos, remuneração, acumulação, publicidade e responsabilidade.
PRINCÍPIOS EXPRESSOS: Legalidade, impessoalidade, moralidade, publicidade e eficiência são princípios expressos. Eles orientam a validade dos atos, o controle da Administração e a interpretação das regras administrativas.
ACESSO, CONCURSO E CARGOS: Cargos, empregos e funções são acessíveis aos brasileiros que preencham os requisitos legais e aos estrangeiros na forma da lei. A investidura em cargo ou emprego público depende de concurso, salvo cargo em comissão.
RESPONSABILIDADE CIVIL: Pessoas jurídicas de direito público e pessoas jurídicas de direito privado prestadoras de serviço público respondem objetivamente por danos causados por seus agentes. O direito de regresso contra o agente depende de dolo ou culpa.
COMO CAI EM PROVA: A banca cobra literalidade constitucional e troca pequenos requisitos. Pegadinhas comuns: confundir função de confiança com cargo em comissão; esquecer compatibilidade de horários na acumulação; aplicar cargo em comissão a atribuições técnicas comuns; dizer que regressiva independe de dolo ou culpa. Como resolver: identifique o sujeito da regra, depois o requisito e só então a consequência. Em Administração Pública constitucional, a troca de uma palavra costuma mudar a resposta.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/K%2BZ5eUKza4Y%3D', description: 'Assistir Videoaula' },
      { goalId: meta5[0].id, type: 'pdf', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/tNmgxwV3M6w%3D', description: 'Acessar PDF' },
      { goalId: meta5[0].id, type: 'questoes', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=405240&qd=0&qa=0&q=&auth=force&auth=force', description: 'Resolver Questões' }
    ]);

    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Tecnologia da Informação', subject: 'CMMI-DEV 2.0', type: 'teoria', studyTip: `Dicas:
CMMI é modelo de melhoria de processos, não metodologia ágil, não linguagem e não ferramenta de desenvolvimento.
CMMI-DEV foca desenvolvimento de produtos e serviços. A ideia é aumentar previsibilidade, qualidade e controle dos processos.
Diferencie maturidade organizacional de capacidade de processo. A banca mistura os termos para testar conceito.
Níveis mais altos indicam processos mais definidos, medidos e otimizados, não simplesmente mais documentação.
Compare com cuidado: ITIL trata serviços, COBIT trata governança, PMBOK trata projetos, CMMI trata maturidade/capacidade de processos.

Resumo do conteúdo:
IDEIA CENTRAL DO CMMI: CMMI é um modelo de referência para melhoria de processos. Ele orienta organizações a avaliar práticas, corrigir lacunas, institucionalizar processos e aumentar a qualidade dos resultados.
CMMI-DEV: A vertente de desenvolvimento está voltada à criação, manutenção e entrega de produtos e serviços. O foco é tornar o desenvolvimento menos dependente de improviso e mais apoiado por processos definidos, acompanhados e melhorados.
MATURIDADE E CAPACIDADE: Maturidade olha a organização em estágios de evolução. Capacidade observa o desempenho de processos específicos. Em prova, a pergunta pode trocar o nível da organização pelo nível de uma área de processo.
COMPARAÇÃO COM OUTROS FRAMEWORKS: CMMI não substitui ITIL, COBIT ou PMBOK. Ele conversa com eles, mas tem foco próprio: melhoria da capacidade/maturidade dos processos.
COMO CAI EM PROVA: A banca cobra finalidade, níveis, capacidade, maturidade e comparação com frameworks. Pegadinhas comuns: tratar CMMI como metodologia de gerenciamento de projetos; confundir melhoria de processo com governança de TI; achar que CMMI é só para software; inverter maturidade e capacidade. Como resolver: leia a palavra-chave do enunciado — se fala em melhoria/maturidade/capacidade de processos, pense em CMMI. Depois veja se a cobrança é conceitual, comparativa ou sobre níveis.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/ogmxMTMNi2o%3D', description: 'Assistir Videoaula' },
      { goalId: meta6[0].id, type: 'pdf', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/lfRQLAUew30%3D', description: 'Acessar PDF' },
      { goalId: meta6[0].id, type: 'questoes', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=8273%2C428904&desatualizada=0&anulada=0&query=DEV+2.0&auth=force&auth=force', description: 'Resolver Questões' }
    ]);

    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Direito Administrativo', subject: 'Responsabilidade Civil do Estado', type: 'teoria', studyTip: `Dicas:
Na ação da vítima contra o Estado, a regra para ato comissivo é responsabilidade objetiva: dano, conduta e nexo causal.
Culpa do agente não é requisito para a vítima receber indenização. Ela importa na ação regressiva do Estado contra o agente.
Omissão estatal exige cuidado: muitas questões cobram falha do serviço, dever específico de agir e responsabilidade subjetiva.
Risco administrativo admite excludentes ou atenuantes. Risco integral é excepcional.
Prestadora privada de serviço público também pode responder objetivamente quando o dano decorre da prestação do serviço.

Resumo do conteúdo:
FUNDAMENTO CONSTITUCIONAL: A Constituição prevê responsabilidade das pessoas jurídicas de direito público e das pessoas jurídicas de direito privado prestadoras de serviço público pelos danos que seus agentes causarem a terceiros.
RESPONSABILIDADE OBJETIVA: Na responsabilidade objetiva, a vítima deve provar conduta estatal, dano e nexo causal. Não precisa provar culpa do agente. Essa é a lógica da teoria do risco administrativo.
OMISSÃO DO ESTADO: Na omissão, a prova costuma exigir mais cuidado. A banca pode trabalhar omissão genérica, omissão específica, dever legal de agir e falha do serviço.
AÇÃO REGRESSIVA: A relação vítima-Estado é diferente da relação Estado-agente. O Estado pode indenizar objetivamente a vítima, mas só cobra regressivamente do agente se provar dolo ou culpa.
COMO CAI EM PROVA: A banca costuma narrar um caso e perguntar quem responde, qual teoria se aplica e se cabe regressiva. Pegadinhas comuns: exigir culpa do agente contra a vítima; dizer que responsabilidade objetiva não admite excludentes; aplicar risco integral como regra; esquecer dolo ou culpa na regressiva. Como resolver: separe a relação jurídica — primeiro vítima contra Estado; depois Estado contra agente. Identifique ação/omissão, dano, nexo e eventual excludente.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/qyHS9Ba7dlM%3D', description: 'Assistir Videoaula' },
      { goalId: meta7[0].id, type: 'pdf', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/nAj65PVESJ4%3D', description: 'Acessar PDF' },
      { goalId: meta7[0].id, type: 'questoes', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=404402%2C404403%2C404399&qd=0&qa=0&q=&auth=force&auth=force', description: 'Resolver Questões' }
    ]);

    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Raciocínio Lógico', subject: 'Lógica de Argumentação', type: 'teoria', studyTip: `Dicas:
Validade não é verdade. Um argumento pode ter frases materialmente estranhas e ainda ser válido pela forma lógica.
Procure premissas e conclusão antes de calcular. Conectores como logo, portanto, assim e conclui-se indicam a conclusão.
Para testar validade, tente derrubar o argumento: premissas verdadeiras e conclusão falsa. Se não conseguir, o argumento é válido.
Condicional é campo minado: afirmar o consequente e negar o antecedente são erros clássicos.
Quantificadores mudam tudo: todo, nenhum, algum, somente, pelo menos e exatamente precisam ser tratados com precisão.

Resumo do conteúdo:
ARGUMENTO: Argumento é conjunto de proposições em que uma ou mais funcionam como premissas e outra como conclusão. A lógica de argumentação avalia se a conclusão decorre das premissas.
VALIDADE: Um argumento é válido quando é impossível que todas as premissas sejam verdadeiras e a conclusão falsa ao mesmo tempo. A validade depende da forma lógica, não da aparência realista do conteúdo.
MÉTODOS DE TESTE: É possível testar argumentos por tabela-verdade, equivalências, diagramas, análise de casos ou tentativa controlada. A escolha depende do tipo de proposição e do número de variáveis.
FALÁCIAS FORMAIS: Falácias comuns envolvem inversões indevidas de condicionais, negação incorreta de proposições compostas e conclusão que parece razoável, mas não decorre logicamente das premissas.
COMO CAI EM PROVA: A banca cobra conclusão válida, argumento equivalente, falhas de raciocínio e análise de premissas. Pegadinhas comuns: confundir validade com verdade; inverter "se P, então Q"; negar condicional de forma errada; aceitar conclusão apenas por senso comum. Como resolver: traduza o texto para estrutura lógica, marque premissas e conclusão, depois procure um contraexemplo. Se premissas verdadeiras com conclusão falsa forem impossíveis, o argumento é válido.` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/fUp%2FImIRTe4%3D', description: 'Assistir Videoaula' },
      { goalId: meta8[0].id, type: 'pdf', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/95igJrnrX%2Fk%3D', description: 'Acessar PDF' },
      { goalId: meta8[0].id, type: 'questoes', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=404266&desatualizada=0&anulada=0&auth=force&auth=force', description: 'Resolver Questões' }
    ]);

    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Matemática Financeira', subject: 'Descontos', type: 'teoria', studyTip: `Dicas:
Antes de fórmula, nomeie as variáveis: valor nominal, valor atual, desconto, taxa e prazo.
Desconto comercial simples é "por fora": calcula o desconto sobre o valor nominal.
Desconto racional simples é "por dentro": parte do valor atual e trabalha a lógica inversa dos juros simples.
Desconto composto exige coerência com capitalização composta. Não misture regime simples com fórmula composta.
Taxa e prazo precisam estar na mesma unidade. Esse detalhe derruba mais questões do que a fórmula em si.

Resumo do conteúdo:
CONCEITOS INICIAIS: Desconto é abatimento por antecipação de um título. Valor nominal é o valor no vencimento. Valor atual é o valor presente ou antecipado. Desconto é a diferença entre valor nominal e valor atual.
DESCONTO COMERCIAL SIMPLES: Também chamado desconto bancário ou por fora, calcula o desconto sobre o valor nominal. A lógica é direta: quanto maior o valor nominal, a taxa e o prazo, maior o desconto.
DESCONTO RACIONAL SIMPLES: Também chamado desconto por dentro, usa o valor atual como base econômica. Ele corresponde à lógica de juros simples vista de trás para frente.
DESCONTO COMPOSTO E EQUIVALÊNCIA: No regime composto, o valor atual é obtido trazendo o valor nominal a valor presente pela taxa composta. Muitas questões pedem comparação de valores em datas diferentes; para comparar corretamente, todos os valores devem ser levados para uma mesma data focal.
COMO CAI EM PROVA: A banca cobra cálculo direto, troca de regime e equivalência de capitais. Pegadinhas comuns: usar valor nominal no desconto racional; usar valor atual no desconto comercial; esquecer conversão de prazo; comparar capitais sem data focal. Como resolver: monte N, A, D, i e n. Identifique "por fora" ou "por dentro", simples ou composto. Ajuste unidades e só então calcule.` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/PcQF1Bo2RQQ%3D', description: 'Assistir Videoaula' },
      { goalId: meta9[0].id, type: 'pdf', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/afVY%2Bi1ri1M%3D', description: 'Acessar PDF' },
      { goalId: meta9[0].id, type: 'questoes', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403809%2C403811%2C403812%2C403816%2C425371%2C425372&desatualizada=0&anulada=0&auth=force&auth=force', description: 'Resolver Questões' }
    ]);

    const meta10 = await db.insert(goals).values({ weekId, number: 10, discipline: 'Revisão Geral', subject: 'Revisão da Semana 5', type: 'revisao', studyTip: `Organização do dia: Tempo total: 4 a 5 horas líquidas. A Semana 5 começou com revisão de bloco e avançou em conteúdos novos. Por isso, a revisão final deve ser objetiva: feche os erros da semana sem tentar refazer a revisão das Semanas 1 a 4. Ordem sugerida: Língua Portuguesa, Direito Tributário, Contabilidade Geral, Direito Constitucional, Tecnologia da Informação, Direito Administrativo, Raciocínio Lógico, Matemática Financeira. Metodologia de revisão (dentro de cada disciplina):
10 min: releia marcações e esquemas do PDF completo.
10 min: revise os pontos que geraram dúvida, chute ou erro.
15 a 25 min: resolva questões selecionadas, priorizando erradas e marcadas.
5 a 10 min: atualize o caderno de erros com a causa do erro (conceito, fórmula, troca de instituto, leitura apressada ou falta de treino). Destaques da semana:
LÍNGUA PORTUGUESA: Revise radical, tema, afixos, derivação, composição, parassíntese, regressiva e imprópria.
DIREITO TRIBUTÁRIO: Foque em garantias, privilégios, fraude à cobrança, dívida ativa, preferência e exceções.
CONTABILIDADE GERAL: Retome baixa de ativos, ganho/perda de capital, CPC 01, valor recuperável, impairment e CPC 04.
DIREITO CONSTITUCIONAL: Revise princípios do art. 37, concurso, cargos em comissão, acumulação, teto e responsabilidade objetiva.
TECNOLOGIA DA INFORMAÇÃO: Organize CMMI como modelo de maturidade/capacidade para melhoria de processos.
DIREITO ADMINISTRATIVO: Consolide responsabilidade objetiva, omissão estatal, excludentes, culpa concorrente e ação regressiva.
RACIOCÍNIO LÓGICO: Refaça argumentos válidos e inválidos, premissas, conclusão, condicionais e quantificadores.
MATEMÁTICA FINANCEIRA: Treine valor nominal, valor atual, desconto comercial, desconto racional, desconto composto e data focal. Lembre-se: a revisão de bloco mostrou o mapa. A revisão da semana ajusta a rota. Uma não substitui a outra; juntas, elas impedem que o estudo vire acúmulo sem retenção. Feche a semana com honestidade: o que ficou claro, o que ainda está frágil e o que precisa voltar nas próximas revisões. Constância constrói!` }).returning();
    await db.insert(materials).values([
      { goalId: meta10[0].id, type: 'tarefa', link: '', description: 'Revisar Língua Portuguesa' },
      { goalId: meta10[0].id, type: 'tarefa', link: '', description: 'Revisar Direito Tributário' },
      { goalId: meta10[0].id, type: 'tarefa', link: '', description: 'Revisar Contabilidade Geral' },
      { goalId: meta10[0].id, type: 'tarefa', link: '', description: 'Revisar Direito Constitucional' },
      { goalId: meta10[0].id, type: 'tarefa', link: '', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta10[0].id, type: 'tarefa', link: '', description: 'Revisar Direito Administrativo' },
      { goalId: meta10[0].id, type: 'tarefa', link: '', description: 'Revisar Raciocínio Lógico' },
      { goalId: meta10[0].id, type: 'tarefa', link: '', description: 'Revisar Matemática Financeira' },
    ]);
  }

  if (!existingWeeks.some(w => w.number === 6)) {
    console.log('Seeding Week 6...');
    
    // Create Week 6
    const insertedWeek = await db.insert(weeks).values({
      number: 6,
      title: 'Semana 6'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Língua Portuguesa', subject: 'Emprego e Sentido das Classes Gramaticais – Parte I', type: 'teoria', studyTip: `Dicas:
Classes gramaticais não devem ser decoradas isoladamente. O que importa é a função que a palavra assume no contexto.
Substantivo nomeia; adjetivo caracteriza; artigo determina; numeral quantifica/ordena; pronome substitui ou acompanha. A banca troca essas funções em frases aparentemente simples. 150 

Resumo do conteúdo:
VISÃO GERAL: Classes gramaticais organizam as palavras conforme função, sentido e comportamento na frase. A classificação depende do uso concreto. A mesma forma pode mudar de classe conforme o contexto.
SUBSTANTIVO: Substantivo nomeia seres, objetos, lugares, sentimentos, ações e conceitos. Pode ser comum, próprio, concreto, abstrato, simples, composto, primitivo, derivado e coletivo. Em prova, costuma aparecer substantivação de palavras de outras classes.
ADJETIVO: Adjetivo caracteriza ou qualifica o substantivo. Pode indicar qualidade, estado, origem ou relação. Locução adjetiva tem valor de adjetivo. A posição do adjetivo pode alterar sentido: “pobre homem” não equivale sempre a “homem pobre”.
ARTIGO, NUMERAL E PRONOME: Artigo determina ou indetermina o substantivo. Numeral indica quantidade, ordem, multiplicação ou fração. Pronome substitui ou acompanha nomes, podendo indicar pessoa, posse, demonstração, indefinição, interrogação ou relação.
VALOR CONTEXTUAL: A análise correta exige olhar para a função sintática e semântica. Palavras como “muito”, “pouco”, “bastante”, “meio” e “só” mudam de classe e sentido conforme o termo que acompanham.
COMO CAI EM PROVA: A banca cobra identificação da classe, mudança de sentido e efeito contextual. Pegadinhas comuns: • classificar palavra pela forma isolada; • ignorar substantivação; • confundir pronome com artigo; • não perceber mudança de sentido pela posição do adjetivo. Como resolver: Leia a frase inteira, identifique o termo a que a palavra se liga e só então classifique. Se a palavra muda de classe, explique sua função naquele contexto.` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/ikA1NZhrVPk%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/neIu%2Bqq1mbU%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=419336&desatualizada=0&anulada=0&query=emprego+sentido&auth=force&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Direito Tributário', subject: 'Lei de Execuções Fiscais e Dívida Ativa', type: 'teoria', studyTip: `Dicas:
Dívida ativa é crédito inscrito pela Fazenda Pública; execução fiscal é o procedimento judicial de cobrança.
A Certidão de Dívida Ativa tem presunção de certeza e liquidez, mas essa presunção é relativa.
A Lei de Execuções Fiscais cobra muito sequência: inscrição, CDA, petição inicial, citação, garantia, embargos, penhora e expropriação.
Embargos à execução fiscal dependem de garantia do juízo. Esse ponto é muito explorado em prova.
Não confunda dívida ativa tributária com não tributária. A LEF alcança ambas, desde que inscritas. 152 

Resumo do conteúdo:
DÍVIDA ATIVA: Dívida ativa corresponde ao crédito da Fazenda Pública regularmente inscrito após apuração de certeza e liquidez. Pode ser tributária ou não tributária.
CERTIDÃO DE DÍVIDA ATIVA: A CDA é o título executivo que fundamenta a execução fiscal. Possui presunção relativa de certeza e liquidez e deve conter os requisitos legais, como nome do devedor, origem, natureza e fundamento legal do crédito.
EXECUÇÃO FISCAL: A execução fiscal é o processo judicial utilizado para cobrar dívida ativa. A petição inicial pode ser instruída com a CDA. Após a citação, o executado deve pagar ou garantir o juízo.
GARANTIA, EMBARGOS E PENHORA: A defesa típica do executado ocorre por embargos, em regra após garantia da execução. A garantia pode ocorrer por depósito, fiança, seguro garantia, penhora ou outras formas admitidas.
ORDEM DE ATOS: A cobrança segue lógica própria: constituição/inscrição do crédito, emissão da CDA, ajuizamento, citação, garantia, defesa, penhora e atos de expropriação.
COMO CAI EM PROVA: A banca cobra literalidade da LEF, requisitos da CDA, garantia do juízo e etapas da execução. Pegadinhas comuns: • tratar presunção da CDA como absoluta; • esquecer que dívida ativa pode ser não tributária; • admitir embargos sem garantia quando a questão cobra regra geral; • confundir inscrição em dívida ativa com lançamento. Como resolver: Monte a linha do tempo da cobrança e identifique em qual etapa o enunciado está. Depois confira se a questão trata de crédito, título, processo ou defesa.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Vq2ZxOzDWWA%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/PzkRYQ2Nenk%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=416141%2C395745&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Contabilidade Geral', subject: 'Operações de Duplicatas Descontadas e CPC 25', type: 'teoria', studyTip: `Dicas:
Duplicata descontada não elimina, por si só, o risco da empresa. Se houver responsabilidade pela inadimplência, atenção ao passivo.
No CPC 25, provisão é passivo de prazo ou valor incerto; não é simples reserva para qualquer risco.
Provisão exige obrigação presente, saída provável de recursos e estimativa confiável.
Passivo contingente normalmente não é reconhecido: em regra, é divulgado, salvo chance remota.
Ativo contingente não se reconhece antes de praticamente certo. A banca adora assimetria entre provisão e ativo contingente. 

Resumo do conteúdo:
DUPLICATAS DESCONTADAS: Duplicatas descontadas envolvem antecipação de recebíveis junto a instituição financeira. A análise contábil depende da transferência ou manutenção dos riscos e benefícios.
EFEITO PATRIMONIAL: Quando a empresa permanece responsável pelo pagamento em caso de inadimplência do cliente, pode haver reconhecimento de obrigação. O ponto central é verificar se o risco foi transferido.
CPC 25 – PROVISÕES: Provisão é passivo de prazo ou valor incerto. Deve ser reconhecida quando há obrigação presente, saída provável de recursos e estimativa confiável do valor.
PASSIVO CONTINGENTE: Passivo contingente é obrigação possível ou obrigação presente que não atende aos critérios de reconhecimento. Em regra, não é reconhecido, mas divulgado, salvo possibilidade remota.
ATIVO CONTINGENTE: Ativo contingente decorre de evento incerto. Não é reconhecido enquanto a entrada de benefício econômico não for praticamente certa.
COMO CAI EM PROVA: A banca cobra classificação entre provisão, passivo contingente e ativo contingente, além dos registros de duplicatas descontadas. Pegadinhas comuns: • reconhecer provisão sem obrigação presente; • confundir provável, possível e remoto; • reconhecer ativo contingente cedo demais; • ignorar manutenção de risco em duplicatas descontadas. Como resolver: Pergunte: existe obrigação presente? A saída é provável? O valor pode ser estimado? Se sim, provisão. Se faltar critério, pense em contingência.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/4ewNuJuHA20%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/0bHGktO4SXM%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=416775%2C430260%2C104&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Direito Constitucional', subject: 'Poder Legislativo', type: 'teoria', studyTip: `Dicas:
Poder Legislativo envolve função legislativa e fiscalizatória. Não reduza o tema a processo legislativo.
Congresso Nacional é bicameral: Câmara representa o povo; Senado representa os Estados e o Distrito Federal.
Competências exclusivas do Congresso, privativas da Câmara e privativas do Senado são cobradas por troca de sujeito.
Imunidades parlamentares protegem o mandato, não a pessoa como privilégio privado.
Processo legislativo exige atenção a iniciativa, quórum, espécies normativas, veto, sanção e promulgação. 

Resumo do conteúdo:
ESTRUTURA DO PODER LEGISLATIVO: No âmbito federal, o Poder Legislativo é exercido pelo Congresso Nacional, composto pela Câmara dos Deputados e pelo Senado Federal. A Câmara representa o povo; o Senado representa os Estados e o Distrito Federal.
FUNÇÕES: O Legislativo exerce função legislativa, fiscalizatória e, em situações específicas, julgadora. A fiscalização contábil, financeira, orçamentária, operacional e patrimonial ocorre com auxílio do Tribunal de Contas.
COMPETÊNCIAS: A Constituição distribui competências entre Congresso Nacional, Câmara dos Deputados e Senado Federal. A banca costuma trocar o órgão competente para confundir o candidato.
PARLAMENTARES: Deputados e senadores possuem prerrogativas, imunidades e incompatibilidades. As imunidades material e formal buscam proteger o exercício do mandato.
PROCESSO LEGISLATIVO: Abrange emendas constitucionais, leis complementares, leis ordinárias, medidas provisórias, decretos legislativos e resoluções. Cada espécie possui requisitos próprios.
COMO CAI EM PROVA: A banca cobra competências, imunidades, quóruns e processo legislativo. 156 Pegadinhas comuns: • trocar competência do Senado pela da Câmara; • confundir imunidade material e formal; • errar quórum de emenda constitucional; • tratar medida provisória como lei ordinária comum. Como resolver: Identifique o sujeito constitucional: Congresso, Câmara, Senado ou parlamentar. Depois aplique a competência ou regra específica.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/YkNA%2BJBYf1M%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/SOY1%2By58Zxg%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=405248&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'Banco de Dados Relacionais – Parte I', type: 'teoria', studyTip: `Dicas:
Banco de dados não é só tabela. Comece por dado, informação, banco de dados, SGBD, esquema, instância e usuário.
Modelo conceitual, lógico e físico têm níveis diferentes. Não misture MER com modelo relacional.
Entidade, atributo, relacionamento e cardinalidade são base para entender todo o restante.
Chave primária identifica registro; chave estrangeira implementa relacionamento entre tabelas.
Normalização aparece depois, mas já depende de boa noção de dependência e estrutura relacional. 157 

Resumo do conteúdo:
CONCEITOS INICIAIS: Banco de dados é coleção organizada de dados relacionados. SGBD é o sistema que permite definir, manipular, controlar e compartilhar esses dados.
ARQUITETURA E USUÁRIOS: Há diferentes usuários: administradores, projetistas, desenvolvedores e usuários finais. A arquitetura busca independência de dados e organização em níveis.
MODELAGEM: Modelagem conceitual representa o domínio por entidades, atributos e relacionamentos. Modelagem lógica converte essa visão para estruturas relacionais. Modelagem física trata de armazenamento e desempenho.
MODELO RELACIONAL: O modelo relacional organiza dados em relações/tabelas. Tuplas representam linhas; atributos representam colunas. Chaves garantem identificação e integridade.
INTEGRIDADE: Integridade de entidade, referencial e de domínio são fundamentais para consistência dos dados.
COMO CAI EM PROVA: A banca cobra conceitos, diferenças entre modelos, chaves, cardinalidade e integridade. Pegadinhas comuns: • confundir banco de dados com SGBD; • chamar entidade de tabela em qualquer nível de modelagem; • inverter chave primária e estrangeira; • ignorar cardinalidade. Como resolver: Identifique o nível da pergunta: conceitual, lógico ou físico. Depois aplique os conceitos próprios daquele nível.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/d3Lyfv2RjR4%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/K8X0mOTArBA%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=8045&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Direito Administrativo', subject: 'Agentes Públicos', type: 'teoria', studyTip: `Dicas:
Agente público é gênero amplo. Servidor público é apenas uma das espécies.
Cargo, emprego e função não são sinônimos. Cargo se liga ao regime estatutário; emprego, ao regime celetista; função pode existir sem cargo efetivo em hipóteses específicas.
Efetividade, estabilidade e vitaliciedade são conceitos diferentes.
Provimento é entrada no cargo; vacância é saída ou desocupação.
Responsabilidade do agente pode ser civil, penal e administrativa, com independência relativa entre instâncias. 

Resumo do conteúdo:
CONCEITO AMPLO: Agente público é toda pessoa que exerce função estatal, ainda que temporariamente ou sem remuneração. O conceito abrange agentes políticos, servidores, empregados públicos, temporários e particulares em colaboração.
CARGO, EMPREGO E FUNÇÃO: Cargo público é conjunto de atribuições criado por lei. Emprego público é vínculo trabalhista com a Administração. Função pública corresponde ao exercício de atribuições, podendo existir função de confiança e contratação temporária.
PROVIMENTO E VACÂNCIA: Provimento é o preenchimento do cargo. Pode ocorrer por nomeação, promoção, readaptação, reversão, aproveitamento, reintegração e recondução. Vacância ocorre em hipóteses como exoneração, demissão, promoção, aposentadoria e falecimento.
ESTABILIDADE, EFETIVIDADE E VITALICIEDADE: Efetividade decorre da forma de provimento. Estabilidade é garantia adquirida após requisitos constitucionais. Vitaliciedade é garantia mais intensa, típica de certas carreiras.
RESPONSABILIDADE: O agente pode responder nas esferas administrativa, civil e penal. As instâncias são relativamente independentes, com exceções relevantes quando a decisão penal reconhece inexistência do fato ou negativa de autoria.
COMO CAI EM PROVA: A banca cobra distinções conceituais e efeitos jurídicos. Pegadinhas comuns: • tratar agente público como sinônimo de servidor; • confundir estabilidade com efetividade; • errar formas de provimento e vacância; • ignorar a independência relativa das instâncias. Como resolver: Classifique primeiro o vínculo do agente. Depois identifique se o enunciado fala de ingresso, permanência, saída ou responsabilidade.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/ULWRy3TkB08%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/%2BzpEvsAV3O0%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=404354%2C404355&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Matemática Financeira', subject: 'Rendas Uniformes e Variáveis', type: 'teoria', studyTip: `Dicas:
Renda é sequência de pagamentos ou recebimentos ao longo do tempo. Antes da fórmula, identifique se os pagamentos são iguais ou variáveis.
Em renda uniforme, periodicidade e valor das prestações são constantes.
Diferencie renda postecipada, antecipada e diferida. A data do primeiro pagamento muda a conta.
Taxa e período devem conversar. Prestação mensal com taxa anual exige ajuste.
Em prova, desenhe a linha do tempo. Ela evita erro de deslocamento financeiro. 

Resumo do conteúdo:
CONCEITO DE RENDAS: Rendas são séries de pagamentos ou recebimentos distribuídos no tempo. Podem ser uniformes, quando as parcelas são iguais, ou variáveis, quando os valores mudam.
VALOR ATUAL E VALOR FUTURO: O valor atual traz a série para a data inicial. O valor futuro acumula as parcelas até uma data posterior. A escolha depende do que o enunciado pede.
TIPOS DE RENDA: Renda postecipada tem pagamentos ao fim de cada período. Renda antecipada tem pagamentos no início. Renda diferida tem carência antes do início dos pagamentos.
LINHA DO TEMPO: A linha do tempo é essencial para posicionar prestações, taxa e prazo. Pequenos deslocamentos geram alternativas erradas.
RENDAS VARIÁVEIS: Quando as parcelas variam, pode ser necessário trazer cada fluxo individualmente ou identificar uma regra de crescimento.
COMO CAI EM PROVA: A banca cobra cálculo de valor atual, montante, prestação e identificação do tipo de renda. Pegadinhas comuns: • usar fórmula de renda postecipada em renda antecipada; • ignorar carência; • misturar taxa e período; • não desenhar fluxo de caixa. 161 Como resolver: Monte a linha do tempo, marque a data de cada pagamento, confira a taxa e só então escolha a fórmula.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/PcQF1Bo2RQQ%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/738wE7CLVWE%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403816%2C425372&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Estatística', subject: 'Probabilidades', type: 'teoria', studyTip: `Dicas:
Esta meta não tem videoaula correspondente no cronograma extraído. Por isso, o PDF completo deve ser seguido com mais calma e as questões precisam começar cedo.
Probabilidade começa pelo espaço amostral. Sem definir o conjunto de resultados possíveis, qualquer fórmula vira chute.
Evento é subconjunto do espaço amostral. União, interseção e complementar precisam ser traduzidos antes de calcular.
Probabilidade condicional muda o universo de análise. “Dado que ocorreu B” significa que B vira o novo espaço de referência.
Independência não é exclusão mútua. Eventos independentes podem ocorrer juntos; eventos mutuamente exclusivos não ocorrem simultaneamente. 

Resumo do conteúdo:
PONTO DE PARTIDA: Probabilidade mede a chance de ocorrência de eventos em experimentos aleatórios. O primeiro passo é definir o espaço amostral.
EVENTOS: Evento é qualquer subconjunto do espaço amostral. Pode ser simples, composto, certo, impossível, complementar, união ou interseção.
AXIOMAS E PROPRIEDADES: A probabilidade varia entre 0 e 1. A probabilidade do espaço amostral é 1. A probabilidade do evento complementar é 1 menos a probabilidade do evento.
UNIÃO, INTERSEÇÃO E CONDICIONAL: A união representa “A ou B”; a interseção, “A e B”. Probabilidade condicional altera o universo de análise e exige atenção ao evento dado.
INDEPENDÊNCIA: Eventos independentes não alteram a probabilidade um do outro. Isso não é o mesmo que eventos mutuamente exclusivos.
COMO CAI EM PROVA: A banca cobra contagem, eventos, condicional, independência e interpretação de enunciados. Pegadinhas comuns: • confundir união com interseção; • esquecer o complementar; • tratar eventos exclusivos como independentes; • usar espaço amostral errado na condicional. Como resolver: Desenhe o espaço amostral quando possível. Marque o evento pedido, veja se existe condição e só então escolha a fórmula.` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/EtloLY%2B%2BHBU%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=426639%2C7140&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Contabilidade Geral', subject: 'Critérios de Avaliação de Passivos, Empréstimos e Financiamentos', type: 'teoria', studyTip: `Dicas:
Passivo é obrigação presente resultante de evento passado, cuja liquidação deve gerar saída de recursos.
Empréstimos e financiamentos devem ser reconhecidos com atenção a encargos, juros e atualização.
Custo amortizado exige entender que o valor contábil muda ao longo do tempo.
Classificação entre circulante e não circulante depende do prazo de exigibilidade.
A banca costuma misturar principal, juros, encargos a apropriar e pagamento. 

Resumo do conteúdo:
PASSIVOS: Passivo representa obrigação presente da entidade, derivada de evento passado, cuja liquidação deve resultar em saída de recursos capazes de gerar benefícios econômicos.
CLASSIFICAÇÃO: Passivos podem ser circulantes ou não circulantes conforme o prazo de exigibilidade. Obrigações exigíveis no ciclo operacional ou em até doze meses tendem ao circulante.
EMPRÉSTIMOS E FINANCIAMENTOS: Devem ser reconhecidos pelo valor da obrigação, considerando encargos financeiros, juros e atualização conforme o regime de competência.
ENCARGOS FINANCEIROS: Juros e encargos devem ser apropriados ao resultado ao longo do tempo, normalmente pelo regime de competência, e não apenas no pagamento.
MENSURAÇÃO: A avaliação de passivos exige identificar valor inicial, encargos a transcorrer, pagamentos, saldo devedor e classificação correta no balanço.
COMO CAI EM PROVA: A banca cobra lançamentos, classificação e apropriação de juros. Pegadinhas comuns: • reconhecer juros apenas no pagamento; • classificar obrigação de longo prazo como circulante; • confundir principal com encargos; • ignorar regime de competência. Como resolver: Separe principal, juros e prazo. Depois veja o que já venceu, o que foi apropriado e qual saldo permanece exigível.` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/4ewNuJuHA20%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/p7VdMfmkONI%3D' },
      { goalId: meta9[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=400780%2C4373%2C4374%2C104&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 10
    const meta10 = await db.insert(goals).values({ weekId, number: 10, discipline: 'Revisão Geral', subject: 'Todas as disciplinas da semana', type: 'revisao' }).returning();
    await db.insert(materials).values([
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Língua Portuguesa' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Tributário' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Contabilidade Geral' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Constitucional' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Administrativo' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Matemática Financeira' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Estatística' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Contabilidade Geral' },
    ]);
    console.log('Week 6 seed completed successfully!');
  }

  if (!existingWeeks.some(w => w.number === 7)) {
    console.log('Seeding Week 7...');
    
    // Create Week 7
    const insertedWeek = await db.insert(weeks).values({
      number: 7,
      title: 'Semana 7'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Língua Portuguesa', subject: 'Emprego e Sentido das Classes Gramaticais – Parte II', type: 'teoria', studyTip: `Dicas:
Nesta segunda parte de classes gramaticais, não estude palavra por palavra como lista de nomes. A banca cobra função no contexto: a mesma forma pode mudar de classe conforme o papel que exerce na frase.
Verbo é o centro da oração. Antes de analisar pronome, advérbio, preposição ou conjunção, identifique o verbo, sua transitividade, seu tempo, seu modo e a relação que ele cria com os demais termos.
Pronome costuma derrubar candidato por dois caminhos: retomada textual e colocação/emprego. Pergunte sempre qual termo o pronome substitui, se há ambiguidade e se ele está adequado à relação de pessoa, número e gênero.
Preposição e conjunção são pequenas, mas mudam o sentido. Elas podem indicar causa, consequência, concessão, condição, finalidade, oposição, tempo, comparação ou conformidade. Não traduza automaticamente.
Advérbio não modifica apenas verbo. Pode modificar adjetivo, outro advérbio ou a frase inteira, criando efeito de intensidade, dúvida, afirmação, negação, tempo, modo ou avaliação do enunciador.
Em reescrita, mudar uma classe pode alterar sentido e correção. Substantivar verbo, trocar conjunção, deslocar advérbio ou substituir pronome pode quebrar concordância, regência, coesão ou lógica textual. 170

Resumo do conteúdo:
CLASSE GRAMATICAL DEPENDE DE FUNÇÃO: A classificação morfológica não deve ser feita apenas pela aparência da palavra. O valor de uma palavra depende da função que exerce no contexto. Uma forma pode atuar como substantivo, adjetivo, advérbio ou pronome conforme a construção. Por isso, a leitura da frase inteira é indispensável. Em prova, a banca costuma explorar palavras de fronteira, deslocamentos e mudanças de sentido.
VERBOS: O verbo indica ação, estado, fenômeno, processo ou mudança. Deve ser analisado por flexão de tempo, modo, pessoa, número e voz. Também precisa ser visto pela transitividade: intransitivo, transitivo direto, transitivo indireto, transitivo direto e indireto ou de ligação. O verbo orienta a sintaxe. Ele ajuda a identificar sujeito, complementos, predicativo e circunstâncias. Em reescrita, alterar forma verbal pode mudar tempo, aspecto, certeza, hipótese ou ordem.
PRONOMES: Pronomes substituem ou acompanham nomes e são centrais para coesão. Podem ser pessoais, possessivos, demonstrativos, indefinidos, interrogativos e relativos. Pronomes pessoais exigem atenção à função sintática: caso reto costuma atuar como sujeito; oblíquos atuam como complementos ou adjuntos. Pronomes relativos retomam termo anterior e introduzem oração subordinada adjetiva. Demonstrativos podem indicar posição no espaço, no tempo e no texto. Em coesão, este, esse e aquele ajudam a organizar retomadas e antecipações.
ADVÉRBIOS: Advérbios expressam circunstâncias como tempo, modo, lugar, intensidade, dúvida, afirmação e negação. Podem modificar verbo, adjetivo, advérbio ou toda a oração. O deslocamento do advérbio pode alterar ênfase e, em alguns casos, sentido. Advérbios modalizadores indicam avaliação do enunciador, como provavelmente, felizmente, infelizmente e certamente.
PREPOSIÇÕES: Preposições ligam termos e estabelecem relações de dependência. Podem indicar origem, destino, instrumento, companhia, causa, finalidade, posse, assunto, meio e outras relações. Também são decisivas em regência. Trocar a preposição pode tornar a construção incorreta ou mudar o sentido do verbo ou nome.
CONJUNÇÕES: Conjunções ligam termos ou orações. Coordenativas podem indicar adição, oposição, alternativa, conclusão ou explicação. Subordinativas podem indicar causa, condição, concessão, comparação, conformidade, finalidade, consequência, tempo e proporção. Na interpretação, a conjunção é pista lógica. Trocar embora por porque, se por quando, portanto por porém altera a relação entre ideias.
INTERJEIÇÕES E PALAVRAS DENOTATIVAS: Interjeições expressam emoção, chamamento, surpresa ou reação. Palavras denotativas podem indicar inclusão, exclusão, retificação, realce, limitação ou designação. A banca cobra o efeito de sentido dessas palavras, não só o nome da classe.
COMO CAI EM PROVA: A banca cobra classes gramaticais por identificação, efeito de sentido e reescrita. O ponto principal é perceber função contextual. Pegadinhas comuns: • classificar palavra pela forma isolada; • ignorar que pronome retoma termo anterior; • trocar conjunções com valores lógicos diferentes; • esquecer que advérbio pode modificar uma oração inteira; • analisar preposição sem observar regência; • aceitar reescrita que preserva correção, mas muda sentido. Como resolver: Localize o verbo, identifique a relação entre os termos e só depois classifique a palavra. Em reescrita, confira três coisas: correção gramatical, manutenção do sentido e preservação da coesão.` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/ikA1NZhrVPk%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/gav5pO%2FguWo%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=419336&desatualizada=0&anulada=0&query=emprego+sentido&auth=force&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Direito Tributário', subject: 'Tributos de Competência Federal', type: 'teoria', studyTip: `Dicas:
Tributos federais devem ser estudados por materialidade. Não tente decorar todos ao mesmo tempo: pergunte qual fato econômico autoriza a cobrança.
II e IE se conectam ao comércio exterior. O Imposto de Importação recai sobre entrada de produto estrangeiro; o Imposto de Exportação, sobre saída de produto nacional ou nacionalizado.
IPI não é apenas “imposto sobre indústria”. Ele incide sobre produtos industrializados e tem forte relação com seletividade, não cumulatividade e função extrafiscal.
IOF é imposto de operações: crédito, câmbio, seguro e títulos ou valores mobiliários. A banca costuma listar operações para ver se o aluno reconhece o campo de incidência.
ITR é federal, embora possa ter fiscalização e cobrança delegadas aos Municípios. Não confunda competência para instituir com capacidade de arrecadar/fiscalizar.
IR exige atenção a renda e proventos de qualquer natureza. Nem toda entrada financeira é renda tributável; é preciso haver acréscimo patrimonial nos termos constitucionais e legais. 

Resumo do conteúdo:
COMPETÊNCIA TRIBUTÁRIA DA UNIÃO: A União possui competência para instituir impostos federais previstos na Constituição. Entre eles estão II, IE, IR, IPI, IOF, ITR e impostos extraordinários ou residuais nas hipóteses constitucionais. A competência é indelegável. O que pode ser atribuído é capacidade de arrecadar, fiscalizar ou executar certas atividades administrativas.
IMPOSTO DE IMPORTAÇÃO: O Imposto de Importação incide sobre a entrada de produto estrangeiro no território nacional. Tem função predominantemente extrafiscal, sendo instrumento de política econômica e proteção do mercado. Pode ter alíquotas alteradas com maior flexibilidade, respeitados os limites constitucionais e legais.
IMPOSTO DE EXPORTAÇÃO: O Imposto de Exportação incide sobre a saída de produto nacional ou nacionalizado para o exterior. Também possui forte função extrafiscal. Sua cobrança pode ser usada para regular fluxo de bens, abastecimento interno e política comercial.
IMPOSTO DE RENDA: O Imposto de Renda incide sobre renda e proventos de qualquer natureza. A ideia central é acréscimo patrimonial. Pode alcançar pessoas físicas e jurídicas. É informado por critérios como generalidade, universalidade e progressividade, na forma constitucional.
IPI: O IPI incide sobre produtos industrializados. Tem características importantes: seletividade em função da essencialidade do produto e não cumulatividade, compensando-se o que for devido em cada operação com o montante cobrado nas anteriores. A industrialização envolve transformação, beneficiamento, montagem, acondicionamento ou reacondicionamento e renovação, conforme legislação aplicável.
IOF: O IOF incide sobre operações de crédito, câmbio, seguro e relativas a títulos ou valores mobiliários. Também possui função extrafiscal e pode ser usado como instrumento regulatório. O erro comum é confundir IOF com imposto sobre qualquer operação financeira genérica. É preciso verificar se a operação está no campo constitucional.
ITR: O ITR incide sobre propriedade territorial rural. É federal, mas pode ser fiscalizado e cobrado pelos Municípios que assim optarem, na forma constitucional, sem que isso transfira a competência tributária. 174 Tem relação com função social da propriedade rural e pode ter alíquotas progressivas para desestimular propriedade improdutiva.
IMPOSTOS EXTRAORDINÁRIOS E RESIDUAIS: A União pode instituir impostos extraordinários em caso de guerra externa ou sua iminência. Também pode exercer competência residual, mediante lei complementar, desde que respeitados requisitos constitucionais, como não cumulatividade e ausência de fato gerador ou base de cálculo próprios dos impostos já discriminados.
COMO CAI EM PROVA: A banca cobra tributos federais por competência, fato gerador, função fiscal/extrafiscal, princípios aplicáveis e confusão entre impostos. Pegadinhas comuns: • confundir ITR com imposto municipal; • tratar IPI como cumulativo; • esquecer a seletividade do IPI; • achar que IOF alcança qualquer movimentação financeira; • confundir importação/exportação com circulação interna; • trocar competência tributária por capacidade de fiscalizar ou arrecadar. Como resolver: Identifique primeiro o fato econômico: renda, industrialização, importação, exportação, propriedade rural ou operação financeira específica. Depois associe ao imposto federal correspondente e confira se há regra constitucional especial.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/SUZk5QCMX5Q%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/iQeZWmAypdY%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407188%2C407198%2C417658%2C417659%2C417660%2C417661%2C407199%2C417663%2C417665%2C417666%2C417667%2C407202%2C417670%2C417672%2C417673%2C417674%2C407201%2C417676%2C417677%2C417678%2C417680%2C407200%2C417681%2C417682%2C407203%2C417688%2C417689%2C417690%2C407207%2C407208%2C407206&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Contabilidade Geral', subject: 'Patrimônio Líquido', type: 'teoria', studyTip: `Dicas:
Patrimônio Líquido é participação residual: ativo menos passivo. Não é caixa, não é lucro disponível e não é dinheiro parado dos sócios.
Capital subscrito, capital a integralizar e capital integralizado precisam ficar separados. A banca explora essa diferença em lançamentos de constituição ou aumento de capital.
Gastos na emissão de ações não são despesa do período. Em regra, reduzem o valor obtido na emissão, afetando contas do PL conforme o caso.
Reservas de capital nascem de transações de capital; reservas de lucros nascem da destinação do lucro líquido. Essa origem é a melhor forma de não confundir.
Reserva para contingências não é provisão. Reserva é destinação de lucro para perda provável futura; provisão é passivo quando há obrigação presente e critérios de reconhecimento.
Ações em tesouraria são conta redutora do PL. Compra de ações próprias não é investimento comum no ativo; venda de ações em tesouraria não gera receita operacional. 

Resumo do conteúdo:
CONCEITO E ESTRUTURA DO PL: Patrimônio Líquido representa o interesse residual dos proprietários nos ativos da entidade depois da dedução dos passivos. Na equação patrimonial: Ativo = Passivo + Patrimônio Líquido. O PL evidencia capital próprio, resultados acumulados, reservas, ajustes e contas redutoras.
CAPITAL SOCIAL: Capital social corresponde ao valor subscrito pelos sócios ou acionistas. Capital subscrito é o compromisso assumido. Capital a integralizar é a parcela ainda não entregue. Capital integralizado é o valor efetivamente colocado à disposição da entidade. Em questões, o lançamento depende do estágio: subscrição cria direito contra sócios; integralização transforma esse direito em ativo recebido.
GASTOS NA EMISSÃO DE AÇÕES: Custos de transação diretamente atribuíveis à emissão de instrumentos patrimoniais não são tratados como despesa operacional. Eles reduzem o valor captado no patrimônio líquido, observadas as contas aplicáveis. Exemplos incluem gastos com prospectos, taxas, comissões, registros, publicidade da oferta e serviços profissionais ligados à emissão.
RESERVAS DE CAPITAL: Reservas de capital decorrem de transações com sócios ou instrumentos patrimoniais que não representam receita do período. O ponto decisivo é a origem: não vêm da destinação do lucro operacional. Não confunda reserva de capital com reserva de lucro, pois a banca costuma misturar nomes parecidos para testar origem e finalidade.
RESERVAS DE LUCROS: Reservas de lucros decorrem da apropriação do lucro líquido. Incluem reserva legal, estatutária, para contingências, de incentivos fiscais, de retenção de lucros, de lucros a realizar e outras previstas. A reserva legal é formada a partir de percentual do lucro líquido, respeitados limites. Reserva para contingências busca compensar, em exercício futuro, diminuição do lucro decorrente de perda provável estimável.
DIVIDENDOS E DESTINAÇÃO DO LUCRO: Após apuração do lucro, a companhia realiza destinações: compensação de prejuízos, constituição de reservas e distribuição de dividendos, conforme legislação e estatuto. Dividendos obrigatórios exigem atenção porque conectam lucro, reservas e passivo quando declarados.
AJUSTES DE AVALIAÇÃO PATRIMONIAL: Ajustes de avaliação patrimonial registram certas contrapartidas de aumentos ou reduções de valor atribuídos a elementos do ativo e passivo, enquanto não computadas no resultado conforme regime de competência e norma aplicável.
AÇÕES EM TESOURARIA: Ações em tesouraria são ações da própria companhia adquiridas pela entidade. Aparecem como dedução do patrimônio líquido. A compra reduz o PL. Ganhos e perdas na alienação dessas ações não devem ser tratados como receitas ou despesas operacionais comuns; são ajustados em contas do próprio PL conforme a origem dos recursos e regras contábeis.
COMO CAI EM PROVA: A banca cobra PL por classificação de contas, lançamentos, destinação do lucro, reservas, ações em tesouraria e efeitos no total do patrimônio líquido. Pegadinhas comuns: 177 • tratar gasto de emissão de ações como despesa; • confundir reserva de capital com reserva de lucros; • tratar reserva para contingências como provisão; • classificar ações em tesouraria no ativo; • achar que toda movimentação interna altera o total do PL; • confundir capital subscrito com integralizado. Como resolver: Pergunte qual é a origem do fato: sócio, lucro, avaliação patrimonial, recompra de ações ou obrigação. Depois veja se altera o total do PL ou apenas muda sua composição interna.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/4ewNuJuHA20%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/NCoPQu1L1EA%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=4417%2C4399%2C104&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Direito Constitucional', subject: 'Poder Executivo', type: 'teoria', studyTip: `Dicas:
Poder Executivo não é apenas lista de atribuições do Presidente. Estude estrutura, investidura, substituição, sucessão, competências, responsabilização e órgãos de consulta.
Diferencie impedimento de vacância. Impedimento é afastamento temporário; vacância é ausência definitiva do titular do cargo.
A linha sucessória é clássica: Vice-Presidente, Presidente da Câmara, Presidente do Senado e Presidente do STF. A banca troca a ordem.
Crimes comuns e crimes de responsabilidade seguem ritos diferentes. A autorização da Câmara é ponto central para processar o Presidente.
Algumas atribuições presidenciais são privativas, outras podem ser delegadas a Ministros, AGU ou PGR, conforme previsão constitucional.
Conselho da República e Conselho de Defesa Nacional são órgãos superiores de consulta, mas não decidem no lugar do Presidente. 178

Resumo do conteúdo:
PRESIDENTE E VICE-PRESIDENTE: O Presidente da República exerce a chefia do Poder Executivo federal. O Vice-Presidente substitui o Presidente nos impedimentos e sucede em caso de vaga. A eleição ocorre pelo sistema majoritário, com regras constitucionais próprias. A posse e o mandato seguem o desenho constitucional vigente.
IMPEDIMENTO, VACÂNCIA E LINHA SUCESSÓRIA: Impedimento é afastamento temporário. Vacância é ausência definitiva do cargo. Se Presidente e Vice estiverem impedidos ou os cargos vagos, são chamados sucessivamente o Presidente da Câmara dos Deputados, o Presidente do Senado Federal e o Presidente do Supremo Tribunal Federal. A ordem é muito cobrada porque a banca costuma inverter Senado e Câmara.
ATRIBUIÇÕES DO PRESIDENTE: O Presidente nomeia e exonera Ministros, exerce direção superior da Administração Federal, inicia processo legislativo em casos previstos, sanciona, promulga e veta leis, expede decretos e regulamentos, mantém relações com Estados estrangeiros, celebra tratados, decreta estados constitucionais nas hipóteses previstas e exerce comando supremo das Forças Armadas. Algumas atribuições podem ser delegadas aos Ministros de Estado, ao Procurador-Geral da República ou ao Advogado-Geral da União, nos limites constitucionais.
RESPONSABILIDADE DO PRESIDENTE: O Presidente pode responder por crimes comuns e crimes de responsabilidade. Para que seja processado, é necessária autorização da Câmara dos Deputados por quórum constitucional. Nos crimes comuns, o julgamento ocorre no STF. Nos crimes de responsabilidade, o julgamento é político-jurídico e ocorre no Senado Federal.
CRIMES DE RESPONSABILIDADE: São atos que atentam contra a Constituição, especialmente contra existência da União, livre exercício dos Poderes, direitos políticos, individuais e sociais, segurança interna, probidade administrativa, lei orçamentária e cumprimento das leis e decisões judiciais.
MINISTROS DE ESTADO: Ministros auxiliam o Presidente na direção da Administração. Devem cumprir requisitos constitucionais e podem praticar atos próprios ou delegados.
ÓRGÃOS DE CONSULTA: Conselho da República e Conselho de Defesa Nacional são órgãos superiores de consulta do Presidente. Atuam em situações relevantes, como intervenção, estado de defesa, estado de sítio e temas de soberania e defesa do Estado democrático.
COMO CAI EM PROVA: A banca cobra literalidade constitucional, ordem sucessória, competências delegáveis, responsabilidade do Presidente e diferença entre crimes comuns e de responsabilidade. Pegadinhas comuns: • inverter Câmara e Senado na linha sucessória; • confundir substituição com sucessão; • atribuir julgamento de crime comum ao Senado; • dizer que conselho decide em vez de consultar; • considerar todas as competências indelegáveis; • esquecer a autorização da Câmara para processamento. Como resolver: Separe a questão por bloco: investidura, atribuição, sucessão ou responsabilidade. Em responsabilidade, identifique primeiro se é crime comum ou de responsabilidade.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/3VNASGWdk9M%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Ycu8lFkjpHY%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?in=1&a=405260%2C405199&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'Banco de Dados Relacionais – Parte II', type: 'teoria', studyTip: `Dicas:
Esta etapa de Banco de Dados aprofunda modelo relacional e normalização. Não estude como decoreba de siglas: entenda por que redundância gera anomalias.
Chave primária identifica tupla; chave estrangeira cria relacionamento entre tabelas. Integridade de entidade e integridade referencial são pilares.
Dependência funcional é a base da normalização. Se um atributo determina outro, há relação que precisa ser analisada antes de decompor tabelas.
1FN, 2FN e 3FN devem ser vistas como sequência de limpeza: valores atômicos, eliminação de dependência parcial e eliminação de dependência transitiva.
Normalizar melhora consistência, mas pode aumentar quantidade de tabelas e joins. A banca pode cobrar vantagens e custos da normalização.
SQL começa a aparecer como linguagem de definição e manipulação. Separe DDL, DML, DCL e TCL desde já para não misturar comandos. 

Resumo do conteúdo:
MODELO RELACIONAL: O modelo relacional organiza dados em relações, usualmente representadas por tabelas. Cada linha é uma tupla; cada coluna é um atributo; o domínio define valores possíveis para um atributo. A força do modelo está na organização formal dos dados e na possibilidade de aplicar restrições de integridade.
CHAVES: Chave candidata é atributo ou conjunto de atributos capaz de identificar unicamente uma tupla. Chave primária é a candidata escolhida para identificação principal. Chave estrangeira referencia chave primária ou candidata de outra tabela. Chave composta possui mais de um atributo. Chave alternativa é candidata não escolhida como primária.
INTEGRIDADE: Integridade de entidade exige que chave primária identifique registros e não seja nula. Integridade referencial garante coerência entre chave estrangeira e tabela referenciada. Restrições de domínio limitam valores permitidos. Restrições de unicidade evitam duplicidade indevida.
DEPENDÊNCIA FUNCIONAL: Dependência funcional ocorre quando um atributo ou conjunto de atributos determina outro. Se A determina B, o valor de A define o valor de B. Esse conceito sustenta a normalização, pois ajuda a identificar redundâncias e anomalias.
NORMALIZAÇÃO: Normalização organiza relações para reduzir redundância e evitar anomalias de inserção, atualização e exclusão. Na 1FN, os atributos devem conter valores atômicos, sem grupos repetitivos. Na 2FN, elimina-se dependência parcial de atributo não chave em relação a parte de chave composta. Na 3FN, elimina-se dependência transitiva entre atributos não chave. Formas normais superiores, como BCNF, 4FN e 5FN, refinam a decomposição em cenários mais complexos.
ANOMALIAS: Anomalia de inserção ocorre quando não se consegue registrar uma informação sem outra desnecessária. Anomalia de atualização ocorre quando dado repetido precisa ser alterado em vários locais. Anomalia de exclusão ocorre quando apagar um registro remove informação que deveria permanecer.
SQL E LINGUAGENS: DDL define estruturas, como CREATE, ALTER e DROP. DML manipula dados, como SELECT, INSERT, UPDATE e DELETE. DCL controla permissões, como GRANT e REVOKE. TCL gerencia transações, como COMMIT e ROLLBACK.
COMO CAI EM PROVA: A banca cobra identificação de chaves, integridade referencial, normalização e efeitos de dependências funcionais. Também pode pedir comandos SQL por categoria. Pegadinhas comuns: • confundir chave primária com estrangeira; • aceitar valor nulo em chave primária; • chamar qualquer redundância de erro sem analisar dependência; • inverter 2FN e 3FN; • confundir DDL com DML; • achar que normalização sempre melhora desempenho. Como resolver: Desenhe a tabela, marque a chave, identifique dependências e procure redundâncias. Depois classifique a forma normal ou a anomalia pedida.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/hMHUc7wKf%2Fo%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=8045&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Direito Administrativo', subject: 'Controle Administrativo', type: 'teoria', studyTip: `Dicas:
Controle da Administração é tema de freios. A pergunta central é: quem controla, o que controla, quando controla e com qual fundamento.
Controle interno é exercido dentro da própria estrutura; controle externo é exercido por outro Poder ou órgão constitucionalmente competente.
Controle administrativo decorre da autotutela. A Administração pode anular atos ilegais e revogar atos válidos inconvenientes ou inoportunos.
Anulação e revogação são diferentes. Anulação lida com ilegalidade e pode atingir atos vinculados e discricionários; revogação lida com mérito e só alcança atos válidos discricionários.
Controle judicial examina legalidade, não substitui o mérito administrativo legítimo. Mas pode controlar desvio, excesso, proporcionalidade e razoabilidade.
Recursos administrativos, representação, reclamação e pedido de reconsideração devem ser vistos como instrumentos de provocação do controle. 

Resumo do conteúdo:
IDEIA DE CONTROLE: Controle da Administração Pública é o conjunto de mecanismos de fiscalização, revisão e correção da atuação administrativa. Busca assegurar legalidade, legitimidade, eficiência, finalidade pública e proteção de direitos. O controle pode incidir sobre atos, contratos, políticas, despesas, agentes e resultados.
CONTROLE INTERNO E EXTERNO: Controle interno é realizado pela própria Administração dentro de sua estrutura. Controle externo é exercido por órgãos ou Poderes externos, como Legislativo com auxílio dos Tribunais de Contas e Judiciário no controle de legalidade. O controle social também ganha relevância pela participação do cidadão, transparência e acesso à informação.
AUTOTUTELA: Pela autotutela, a Administração pode anular seus próprios atos quando ilegais e revogá-los quando inconvenientes ou inoportunos, respeptados direitos adquiridos e limites legais. A anulação tem fundamento na ilegalidade. A revogação tem fundamento no mérito administrativo.
ANULAÇÃO: Anulação retira ato ilegal do mundo jurídico. Pode ser feita pela Administração ou pelo Judiciário. Em regra, produz efeitos retroativos, pois o vício existe desde a origem. Deve respeitar contraditório, ampla defesa e segurança jurídica quando afetar interesses de particulares.
REVOGAÇÃO: Revogação desfaz ato válido por conveniência e oportunidade. Só a Administração pode revogar seus próprios atos, porque envolve mérito administrativo. Não se revogam atos vinculados, consumados, exauridos, que geraram direito adquirido ou meros atos enunciativos.
CONTROLE JUDICIAL: O Judiciário controla legalidade, constitucionalidade, razoabilidade, proporcionalidade e respeito a direitos. Não deve substituir o administrador em escolhas legítimas de mérito. Quando o mérito é usado para esconder ilegalidade, desvio ou abuso, o controle judicial é possível.
INSTRUMENTOS ADMINISTRATIVOS: Recursos, reclamações, representações e pedidos de reconsideração provocam reexame administrativo. O processo administrativo deve observar motivação, devido processo, contraditório e ampla defesa quando houver restrição de direitos.
COMO CAI EM PROVA: A banca cobra muito a diferença entre anulação e revogação, além de controle interno, externo, judicial e autotutela. Pegadinhas comuns: • dizer que o Judiciário revoga ato administrativo; • confundir ilegalidade com inconveniência; • afirmar que revogação retroage como regra; • revogar ato vinculado; • ignorar contraditório quando a anulação afeta particular; • confundir controle externo com controle hierárquico. Como resolver: Primeiro identifique o problema: ilegalidade ou mérito. Depois veja quem está controlando: própria Administração, Judiciário, Legislativo/Tribunal de Contas ou sociedade.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/wzg7Mfx4WaI%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/q0KxpFGom7E%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?r=TODAS&a=408388&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Matemática Financeira', subject: 'Sistemas de Amortização', type: 'teoria', studyTip: `Dicas:
Sistemas de amortização exigem tabela. Não tente resolver tudo de cabeça: organize saldo devedor, amortização, juros e prestação.
No SAC, a amortização é constante. Como o saldo devedor cai, os juros caem e a prestação também cai.
Na Tabela Price, a prestação é constante. No início, há mais juros e menos amortização; com o tempo, os juros caem e a amortização aumenta. 185 

Resumo do conteúdo:
CONCEITOS BÁSICOS: Em financiamentos, a prestação geralmente possui duas partes: juros e amortização. Juros remuneram o capital emprestado. Amortização reduz o saldo devedor principal. Saldo devedor é o valor ainda não amortizado. A cada período, calcula-se juros sobre o saldo devedor e depois se reduz o principal pela amortização.
SAC: No Sistema de Amortização Constante, a amortização é igual em todos os períodos. Ela é calculada dividindo o principal pelo número de parcelas. Como o saldo devedor diminui linearmente, os juros também diminuem. A prestação, formada por amortização constante mais juros decrescentes, é decrescente.
TABELA PRICE: No Sistema Francês, a prestação é constante. A fórmula da prestação considera valor presente, taxa e número de parcelas. No início, o saldo devedor é maior, então a parcela de juros é maior e a amortização é menor. Ao longo do tempo, os juros caem e a amortização cresce, mantendo a prestação constante.
SAM E OUTROS SISTEMAS: O Sistema de Amortização Misto geralmente combina características do SAC e da Price, calculando valores intermediários conforme regra indicada. A prova costuma fornecer fórmula ou pedir comparação conceitual.
COMPARAÇÃO ENTRE SAC E PRICE: No SAC, amortização constante e prestação decrescente. Na Price, prestação constante e amortização crescente. Em ambos, os juros tendem a diminuir quando há amortização do saldo devedor.
MONTAGEM DA TABELA: A ordem prática é: saldo inicial, juros do período, amortização, prestação e saldo final. O saldo final de um período vira saldo inicial do período seguinte. Se a questão pedir valor de determinada parcela, saldo após certo pagamento ou total de juros, a tabela evita confusão.
TAXAS E PRAZOS: Taxa e período devem estar na mesma unidade. Se o financiamento é mensal, a taxa deve ser mensal. Se a taxa for anual, deve haver conversão quando necessário.
COMO CAI EM PROVA: A banca cobra cálculo de prestação, amortização, juros, saldo devedor, comparação SAC x Price e interpretação de tabela. Pegadinhas comuns: • calcular juros sobre o principal inicial em todos os períodos; • confundir amortização com prestação; • dizer que no SAC a prestação é constante; • dizer que na Price a amortização é constante; • esquecer conversão de taxa; • usar fórmula sem verificar se o sistema é SAC ou Price. Como resolver: Identifique o sistema. Se for SAC, calcule amortização constante primeiro. Se for Price, calcule prestação constante. Depois preencha juros e saldo devedor período a período.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/PcQF1Bo2RQQ%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/jYYoI2jh9hg%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=408979%2C403813%2C403814%2C403815&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Estatística', subject: 'Distribuição de Probabilidade', type: 'teoria', studyTip: `Dicas:
Esta meta não tem videoaula correspondente no cronograma extraído. Por isso, o PDF completo deve ser estudado com calma, usando exemplos e questões comentadas como parte da teoria.
Variável aleatória transforma resultados de um experimento em números. Antes de aplicar fórmula, identifique se a variável é discreta ou contínua.
Distribuição de probabilidade descreve como as probabilidades se distribuem entre os valores possíveis da variável aleatória.
Em variável discreta, a soma das probabilidades deve ser 1. Se a questão der uma tabela com incógnita, esse é geralmente o caminho.
Esperança matemática é média ponderada pelos valores de probabilidade. Variância mede dispersão em torno da esperança.
Não confunda função de probabilidade com função acumulada. Uma dá probabilidade pontual ou densidade; a outra acumula até certo valor. 

Resumo do conteúdo:
VARIÁVEL ALEATÓRIA: Variável aleatória associa valores numéricos aos resultados de um experimento aleatório. Ela permite transformar eventos em quantidades analisáveis. Pode ser discreta, quando assume valores contáveis, ou contínua, quando assume valores em intervalo.
DISTRIBUIÇÃO DE PROBABILIDADE: A distribuição de probabilidade mostra como a probabilidade se reparte entre os valores possíveis de uma variável aleatória. Em variáveis discretas, cada valor possui uma probabilidade associada. A soma de todas as probabilidades deve ser igual a 1.
FUNÇÃO DE PROBABILIDADE E FUNÇÃO ACUMULADA: A função de probabilidade indica a probabilidade de cada valor discreto. A função distribuição acumulada indica a probabilidade de a variável assumir valor menor ou igual a determinado ponto. Essa diferença é muito cobrada quando a questão pergunta “até”, “no máximo”, “menor ou igual”, “maior que” ou “entre”.
ESPERANÇA MATEMÁTICA: Esperança é o valor médio esperado da variável aleatória. Em variável discreta, calcula-se pela soma dos produtos entre cada valor e sua probabilidade. Ela não precisa ser um valor efetivamente possível da variável; representa centro de longo prazo.
VARIÂNCIA E DESVIO PADRÃO: Variância mede a dispersão dos valores em torno da esperança. Desvio padrão é a raiz quadrada da variância e retorna a medida à unidade original. Quanto maior a variância, maior a dispersão dos resultados.
PROPRIEDADES IMPORTANTES: Probabilidades não podem ser negativas. A soma das probabilidades discretas deve ser 1. A função acumulada é não decrescente. Complementares podem simplificar cálculos.
LEITURA DE TABELAS: Muitas questões trazem tabela de valores e probabilidades. O caminho é verificar soma total, calcular probabilidades faltantes, esperança e, se pedido, variância ou acumulada.
COMO CAI EM PROVA: A banca cobra distribuição por tabelas, cálculo de probabilidade faltante, esperança, variância, acumulada e interpretação de eventos. Pegadinhas comuns: 189 • esquecer que a soma das probabilidades deve ser 1; • confundir probabilidade pontual com acumulada; • calcular média simples em vez de média ponderada; • ignorar complemento; • tratar variável contínua como discreta; • errar desigualdade em “menor que” e “menor ou igual”. Como resolver: Primeiro classifique a variável. Depois monte tabela com valor, probabilidade e produtos necessários. Só aplique fórmula depois de entender o evento pedido.` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/yrGBlDvYy1Q%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=416510&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Contabilidade de Custos', subject: 'Conceitos Gerais, Classificação e Apuração de Custos', type: 'teoria', studyTip: `Dicas:
Antes de fazer qualquer cálculo, classifique corretamente o fato. Um mesmo gasto pode começar como investimento, transformar-se em custo quando aplicado na produção e somente chegar ao resultado quando o produto for vendido.
Não confunda custo com despesa pelo local físico do gasto. O critério decisivo é a finalidade: custo está ligado à produção de bens ou serviços; despesa está ligada à administração, às vendas e à obtenção de receitas.
Perda normal integra o custo de produção porque decorre do processo produtivo esperado. Perda anormal é involuntária e extraordinária, devendo ser reconhecida diretamente no resultado. 190 

Resumo do conteúdo:
FINALIDADE DA CONTABILIDADE DE CUSTOS: A Contabilidade de Custos nasceu ligada à mensuração dos estoques e do resultado industrial, mas também fornece informações para controle e tomada de decisão. Seu ponto de partida é identificar como os recursos consumidos pela entidade se relacionam com a produção. Na indústria, o custo percorre os estoques antes de atingir o resultado: matéria-prima e demais insumos entram no processo, tornam-se produtos em elaboração, depois produtos acabados e, somente com a venda, custo dos produtos vendidos.
GASTO, DESEMBOLSO E INVESTIMENTO: Gasto é a aquisição de um bem ou serviço que gera sacrifício financeiro para a entidade. Desembolso é o pagamento desse gasto e pode ocorrer antes, no mesmo momento ou depois do consumo econômico. Investimento é o gasto ativado porque produzirá benefícios em períodos futuros. Estoques, máquinas e determinados gastos antecipados permanecem no ativo enquanto conservarem capacidade de gerar benefícios.
CUSTO, DESPESA E PERDA: Custo é o gasto relativo a bem ou serviço utilizado na produção. Despesa é o consumo de bens ou serviços realizado para obter receitas e manter as atividades administrativas e comerciais. Perda é o consumo involuntário ou anormal de recursos. Perdas normais do processo podem compor o custo; perdas anormais são reconhecidas diretamente no resultado. Essa distinção é recorrente em questões com desperdia, quebra, incêndio, evaporação ou ociosidade.
CUSTOS DIRETOS E INDIRETOS: Custos diretos podem ser mensurados e apropriados objetivamente aos produtos, como matéria-prima identificável e mão de obra diretamente aplicada. Custos indiretos não são atribuídos de forma direta e exigem critérios de rateio, como aluguel da fábrica, supervisão e depreciação de equipamentos compartilhados. Direto e indireto dizem respeito à forma de apropriação ao objeto de custeio. Não indicam comportamento diante do volume produzido.
CUSTOS FIXOS E VARIÁVEIS: Custos fixos permanecem constantes em valor total dentro de determinada faixa de atividade, embora o custo fixo por unidade diminua quando a produção aumenta. Custos variáveis mudam no total conforme o volume produzido, mas tendem a permanecer constantes por unidade. Um custo pode ser indireto e variável, direto e variável ou indireto e fixo. As classificações analisam critérios diferentes e não devem ser tratadas como pares equivalentes.
OUTRAS CLASSIFICAÇÕES: Custo primário corresponde, em regra, à soma de matéria-prima e mão de obra direta. Custo de transformação reúne mão de obra direta e custos indiretos de fabricação, representando o esforço para transformar materiais em produtos. Custos semifixos e semivariáveis possuem parcelas ou comportamentos mistos. Custos controláveis dependem da influência do gestor responsável; custos não controláveis escapam de sua autoridade naquele nível decisório.
APURAÇÃO DO CUSTO DE PRODUÇÃO: O custo de produção do período é formado pelos materiais diretos consumidos, pela mão de obra direta e pelos custos indiretos de fabricação. Para apurar o custo da produção acabada, ajustam-se os estoques inicial e final de produtos em elaboração. Para chegar ao custo dos produtos vendidos, ajustam-se os estoques inicial e final de produtos acabados. A lógica deve ser compreendida como fluxo entre contas patrimoniais e de resultado, e não apenas como fórmula decorada.
SISTEMAS E MÉTODOS DE CUSTEIO: Sistema de acumulação indica como os custos são reunidos, por exemplo, por ordem ou por processo. Método de custeio define quais custos são apropriados aos produtos. No custeio por absorção, todos os custos de produção, fixos e variáveis, integram o custo dos estoques. No custeio variável, apenas os custos variáveis são apropriados aos produtos para fins gerenciais.
COMO CAI EM PROVA: A banca costuma apresentar fatos isolados e pedir sua classificação, ou fornecer estoques e componentes do custo para calcular produção acabada e custo dos produtos vendidos. Pegadinhas comuns: • tratar todo pagamento como despesa; • confundir desembolso com o momento do reconhecimento do custo; • classificar gasto administrativo como custo apenas porque ocorreu dentro da fábrica; • considerar todo desperdício como custo normal; • afirmar que custo fixo por unidade permanece constante; • confundir custo primário com custo de transformação; • misturar custos diretos/indiretos com fixos/variáveis; • esquecer os estoques inicial e final na apuração. Como resolver: Monte uma sequência mental: o recurso foi adquirido, consumido na produção, estocado ou levado ao resultado? Depois identifique o critério pedido pela questão. Nos cálculos, desenhe o fluxo matéria-prima -> produção em elaboração -> produtos acabados -> CPV e só então substitua os valores.` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/s9bAy91fqvI%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/xtlI90OePro%3D' },
      { goalId: meta9[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=416678%2C416679%2C416680%2C416681%2C416682%2C416683&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 10
    const meta10 = await db.insert(goals).values({ weekId, number: 10, discipline: 'Revisão Geral', subject: 'Todas as disciplinas da semana', type: 'revisao' }).returning();
    await db.insert(materials).values([
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Língua Portuguesa' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Tributário' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Contabilidade Geral' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Constitucional' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Administrativo' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Matemática Financeira' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Estatística' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Contabilidade de Custos' },
    ]);
    console.log('Week 7 seed completed successfully!');
  }


  if (!existingWeeks.some(w => w.number === 8)) {
    console.log('Seeding Week 8...');
    
    // Create Week 8
    const insertedWeek = await db.insert(weeks).values({
      number: 8,
      title: 'Semana 8'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Língua Portuguesa', subject: 'A Sintaxe do Período Simples – Parte I', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra identificação de sujeito, classificação do predicado, funções sintáticas e correção de reescritas. Pegadinhas comuns: • contar cada verbo de uma locução como oração diferente; • flexionar haver impessoal no plural; • confundir sujeito indeterminado com oração sem sujeito; • chamar qualquer termo entre vírgulas de aposto; • confundir predicativo com adjunto adnominal. Como resolver: Sublinhe os verbos, separe as orações, teste a concordância e localize os núcleos. Só depois classifique sujeito, predicado e termos associados.` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/88mbkL75tjI%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/%2BlkcTB9NMwY%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403651&desatualizada=0&anulada=0&query=simples&auth=force&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Direito Tributário', subject: 'Tributos de Competência Estadual', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A cobrança concentra-se em competência, incidência, local do fato gerador, não cumulatividade e distinção entre tributos. Pegadinhas comuns: • aplicar ITCMD a transmissão onerosa; • considerar mero deslocamento como circulação de mercadoria; • incluir transporte municipal no ICMS; • confundir seletividade com progressividade; • atribuir o IBS exclusivamente aos Estados. Como resolver: Identifique primeiro o fato econômico. Depois determine o ente competente, o local da operação e a regra constitucional especial aplicável.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/SUZk5QCMX5Q%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/qzNdYSnjMho%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407189%2C407210%2C417711%2C417713%2C417714%2C417715%2C407211%2C417717%2C417718%2C417719%2C417721%2C417723%2C417725%2C417727%2C417728%2C417730%2C417731%2C407209%2C417742%2C417743%2C417744&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Contabilidade de Custos', subject: 'Materiais, Estoques e Custos de Fabricação', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca mistura classificação de materiais, cálculo de estoques, tributos recuperáveis e tratamento de perdas. Pegadinhas comuns: • incluir tributo recuperável no custo; • tratar toda embalagem como custo; • confundir subproduto com sucata; • reconhecer perda anormal no estoque; • usar UEPS como método contábil aceito; • calcular média simples sem considerar quantidades. 203 Como resolver: Monte uma ficha com quantidade, custo unitário e valor total. Antes do cálculo, retire tributos recuperáveis e classifique perdas e materiais pela função econômica.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/kfBiYMm5Fio%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/wpMEiyD07C0%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=3979%2C416754%2C416688%2C3944%2C416711&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Direito Constitucional', subject: 'Poder Judiciário', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca explora literalidade constitucional, composição, garantias, CNJ e competências dos tribunais. Pegadinhas comuns: • dizer que o CNJ exerce controle externo ou função jurisdicional; • aplicar o quinto constitucional a qualquer tribunal; • confundir competência originária com recursal; 205 • atribuir ao STJ guarda direta da Constituição; • esquecer a reserva de plenário. Como resolver: Classifique a questão em disposição geral, magistratura, controle ou competência. Em competências, identifique matéria constitucional, federal ou especializada antes de escolher o órgão.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/pQ5Z7hZS%2BPQ%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/fOo%2B2OnX5hA%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=405266&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'Banco de Dados Relacionais – Parte III', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A cobrança combina terminologia, identificação de chaves, integridade e transformação de modelos. Pegadinhas comuns: • trocar grau por cardinalidade; • chamar toda superchave de candidata; 207 • permitir nulo em chave primária; • exigir que chave estrangeira seja sempre única; • confundir modelo conceitual com lógico. Como resolver: Desenhe duas tabelas simples e marque PK e FK. Verifique unicidade, nulidade, domínio e correspondência antes de avaliar a assertiva.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/pWHV1sEVMnM%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=8045&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Direito Administrativo', subject: 'Bens Públicos', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra classificação, características, afetação, alienação e uso por particulares. Pegadinhas comuns: • afirmar inalienabilidade absoluta; • admitir usucapião de bem público dominical; • confundir bem de uso especial com dominical; 209 • considerar penhorável bem público sem destinação; • tratar autorização e concessão como equivalentes. Como resolver: Identifique titular, destinação e afetação. Depois aplique o regime jurídico e verifique se a questão trata de uso, alienação ou intervenção.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/%2B2wj2ucJH4U%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/EWh4E8q9dGI%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=404419%2C404420&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Matemática Financeira', subject: 'Cálculo Financeiro', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca fornece fluxo com tarifas, parcelas e datas e pede taxa efetiva, valor presente ou montante. Pegadinhas comuns: • calcular juros sobre o valor líquido em vez do contratado; • ignorar tarifa paga no início; • confundir renda antecipada com postecipada; 211 • misturar taxa mensal com períodos anuais; • aplicar fórmula sem posicionar a data focal. Como resolver: Desenhe a linha do tempo, registre entradas e saídas e escolha uma data focal. Só então aplique equivalência financeira ou fórmula de renda.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/PcQF1Bo2RQQ%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/TRqi36k%2BQpk%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=408974%2C408973%2C408972%2C425372%2C403816%2C425377&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Direito Tributário', subject: 'Tributos de Competência Municipal', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca explora fronteiras: ISS x ICMS, IPTU fiscal x extrafiscal e ITBI x ITCMD. Pegadinhas comuns: • cobrar ISS sobre locação pura; • dizer que IPTU não pode ser progressivo; • aplicar ITBI a herança ou doação; • escolher Município diverso da situação do imóvel; • classificar COSIP como taxa; • ampliar imunidade do ITBI sem verificar requisitos. 213 Como resolver: Pergunte se há serviço, propriedade urbana ou transmissão onerosa. Depois identifique o local, a lei complementar e eventual regra de imunidade.` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/SUZk5QCMX5Q%3D' },
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/4bCMXltth%2Fw%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407190%2C407213%2C417746%2C417747%2C417748%2C417749%2C417750%2C407212%2C417751%2C417752%2C417753%2C417754%2C407214%2C417755%2C417756%2C417757%2C417758%2C417759&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Estatística', subject: 'Momentos de Variáveis Aleatórias', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra validade de densidades, cálculo de esperança e variância, transformações e interpretação de integrais. Pegadinhas comuns: • tratar densidade como probabilidade pontual; • esquecer normalização da função; • calcular E como g(E); • esquecer o quadrado do coeficiente na variância; • confundir momento em torno da origem com momento central. Como resolver: Classifique a variável como discreta ou contínuas. Verifique se a distribuição é válida, monte soma ou integral e calcule primeiro E(X) e E(X²).` }).returning();
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


  if (!existingWeeks.some(w => w.number === 9)) {
    console.log('Seeding Week 9...');
    
    // Create Week 9
    const insertedWeek = await db.insert(weeks).values({
      number: 9,
      title: 'Semana 9'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Língua Portuguesa', subject: 'A Sintaxe do Período Simples - Parte II', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra classificação de termos, valor semântico, função do “se”, concordância na passiva sintética e equivalência entre voz ativa e passiva. Pegadinhas comuns: • considerar todo termo preposicionado complemento nominal; • confundir agente ou possuidor com paciente; • tratar qualquer “se” como partícula apassivadora; • manter o verbo no singular diante de sujeito paciente plural; • transformar verbo sem objeto direto em passiva analítica. Como resolver: Identifique o núcleo, verifique qual termo exige o complemento e teste os papéis de agente e paciente. Nas construções com “se”, examine a transitividade e procure um termo com o qual o verbo possa concordar.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/88mbkL75tjI%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/RWOCNwF1r0c%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403651&desatualizada=0&anulada=0&query=simples&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Contabilidade de Custos', subject: 'Conceito de Custos - Parte III', type: 'teoria', studyTip: `Dicas:
Antes de calcular, desenhe o fluxo: matéria-prima, produtos em elaboração, produtos acabados e custo dos produtos vendidos. A banca costuma trocar os estoques ou inverter sinais. 8

Resumo do conteúdo:
FLUXO DOS CUSTOS DE PRODUÇÃO: O custo de produção do período reúne materiais diretos, mão de obra direta e custos indiretos de fabricação. A produção acabada considera a movimentação do estoque em elaboração; o custo dos produtos vendidos considera a movimentação do estoque de produtos acabados. Em forma simplificada: produção acabada = estoque inicial em elaboração + custos do período - estoque final em elaboração. CPV = estoque inicial de acabados + produção acabada - estoque final de acabados.
PRODUÇÃO POR ORDEM E CONTÍNUA: Na produção por ordem, os custos são acumulados para cada encomenda, lote ou serviço identificável. Na produção contínua, produtos homogêneos percorrem processos repetitivos e os custos são acumulados por departamento ou período.
DEPARTAMENTALIZAÇÃO: Departamentos de produção atuam diretamente na fabricação; departamentos de serviços apoiam a operação. Os custos indiretos são atribuídos aos departamentos por critérios coerentes e, depois, transferidos aos produtos. O objetivo é reduzir distorções de rateios gerais.
CUSTEIO BASEADO EM ATIVIDADES - ABC: O ABC identifica atividades relevantes, atribui recursos a essas atividades e utiliza direcionadores para levar seus custos aos produtos ou serviços. Ele procura explicar a causa do consumo, sendo especialmente útil quando custos indiretos são relevantes e os produtos consomem atividades de modo diferente.
ABSORÇÃO X VARIÁVEL: No custeio por absorção, todos os custos de fabricação, fixos e variáveis, integram os produtos. Parte do custo fixo pode permanecer no estoque. No custeio variável, apenas custos variáveis são apropriados aos produtos; custos fixos são despesas do período. A diferença afeta estoque e resultado quando produção e vendas não coincidem.
RKW: O RKW promove apropriação ampla, incluindo custos e despesas, para apoiar formação de preços e análise gerencial. Sua finalidade não se confunde com a mensuração contábil obrigatória dos estoques.
COMO CAI EM PROVA: A banca cobra fórmulas do fluxo produtivo, classificação dos departamentos, sequência dos rateios, direcionadores do ABC e efeitos dos métodos sobre estoque e resultado. Pegadinhas comuns: • somar estoque final em vez de subtrair; • confundir produção acabada com CPV; • transferir diretamente departamentos de serviços aos produtos sem observar o método proposto; • trocar direcionador de recursos por direcionador de atividades; • incluir custo fixo no estoque pelo custeio variável; • tratar RKW como equivalente ao custeio por absorção. Como resolver: Monte o fluxo físico e contábil antes da fórmula. Em questões conceituais, pergunte quais gastos chegam ao produto, quais vão diretamente ao resultado e qual relação causal o direcionador representa.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/s9bAy91fqvI%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/5gD5HaLNUNw%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=416690%2C416740%2C416688%2C3962%2C3976&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Legislação Tributária', subject: 'EC n. 132/2023 - Explicação da Reforma Tributária', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A cobrança tende a explorar literalidade da EC, competências, princípios, alterações patrimoniais e comparação entre o sistema atual e o novo modelo. Pegadinhas comuns: • atribuir o IBS exclusivamente aos Estados; • chamar a CBS de imposto; • afirmar que a reforma revogou as normas gerais do CTN; • ignorar exceções na ampliação do IPVA; • confundir atualização da base do IPTU com criação livre de alíquota pelo Executivo; • misturar regra de transição com regra definitiva. Como resolver: Monte uma tabela com tributo, espécie, competência, materialidade e função. Quando a questão citar mudança, confirme se ela decorre diretamente da Constituição ou depende de lei complementar.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/EOPlrmRLdKc%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/pTEdvM3QQOc%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=433778&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'Banco de Dados Relacionais - Parte IV', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca apresenta tabelas pequenas e pergunta pela operação relacional, dependência funcional, chave ou forma normal violada. Pegadinhas comuns: • trocar seleção por projeção; • confundir união com junção; • interpretar dependência funcional como causalidade; • procurar dependência parcial quando a chave é simples; • afirmar que 3FN elimina todas as redundâncias; • normalizar sem identificar chaves candidatas. Como resolver: Escreva as chaves e dependências. Marque atributos primos e não primos. Depois teste, na ordem, atomicidade, dependência parcial e dependência transitiva.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/d3Lyfv2RjR4%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/yT9f7Xitl6o%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=8045&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Direito Empresarial', subject: 'Introdução ao Direito Empresarial', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra conceitos, exceção das atividades intelectuais, empresário individual, efeitos do registro e responsabilidade por atos de prepostos. Pegadinhas comuns: • tratar empresa como sujeito de direitos; • dizer que empresário individual é pessoa jurídica; • considerar todo profissional intelectual empresário; • afirmar que somente o registro cria a condição de empresário; • confundir estabelecimento com local físico; • ignorar atos praticados por prepostos dentro de suas funções. Como resolver: Identifique se a questão fala da atividade, da pessoa ou do conjunto de bens. Depois teste profissionalidade, organização, exceção intelectual, capacidade e regularidade registral.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Adm9%2B1MXZMk%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/yvCG0P0czjE%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=406936&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Estatística', subject: 'Distribuição Normal e Binomial', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra identificação da distribuição, tradução do evento, cálculo de média e variância, padronização e uso de complementos ou simetria. Pegadinhas comuns: • aplicar Binomial sem independência ou p constante; • confundir exatamente k com até k; • usar np(1-p) como desvio padrão; • atribuir probabilidade positiva a ponto isolado da Normal; • inverter a padronização; • aproximar Binomial por Normal sem ajustar os limites. Como resolver: Escreva o evento em símbolos, identifique se a variável é discreta ou contínua e anote os parâmetros. Só então escolha fórmula, complemento, padronização ou aproximação.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/HOJCHzHWRjU%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=7295%2C426652%2C416543&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Direito Constitucional', subject: 'Funções Essenciais à Justiça', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra literalidade dos arts. 127 a 135, princípios, funções, autonomias, garantias, vedações e diferenças entre as institutions. Pegadinhas comuns: • incluir MP ou Defensoria no Poder Judiciário; • atribuir ao MP representação judicial de entidades públicas; • confundir CNMP com CNJ; • restringir a Defensoria à atuação criminal ou individual; • trocar funções da AGU e do Ministério Público; • tratar garantias institucionais como ausência de responsabilidade. Como resolver: Identifique primeiro a instituição. Depois classifique a informação como princípio, função, garantia, vedação, autonomia ou controle e compare com a redação constitucional.` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/b4N321IOmGs%3D' },
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/JY3sI%2Bp6qYc%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=405281&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Economia', subject: 'Introdução à Microeconomia', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra conceitos fundamentais, custo de oportunidade, fatores de deslocamento e efeitos sobre o equilíbrio. Pegadinhas comuns: • confundir custo de oportunidade com gasto contábil; • tratar afirmação normativa como positiva; • deslocar a demanda por mudança no preço do próprio bem; • confundir quantidade ofertada com oferta; • inverter excesso de demanda e excesso de oferta; • prever preço e quantidade sem identificar qual curva mudou. Como resolver: Nomeie a variável alterada, determine se ela afeta oferta ou demanda e indique a direção do deslocamento. Só depois conclua o efeito sobre preço e quantidade.` }).returning();
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


  if (!existingWeeks.some(w => w.number === 11)) {
    console.log('Seeding Week 11...');
    
    // Create Week 11
    const insertedWeek = await db.insert(weeks).values({
      number: 11,
      title: 'Semana 11'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Língua Portuguesa', subject: 'Concordância, Regência, Colocação, Crase e Pontuação', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra correção de frases, substituição de termos, mudança de sentido e efeito da pontuação. Pegadinhas comuns: • fazer o verbo concordar com termo próximo que não é sujeito; • flexionar “haver” impessoal; • trocar regência sem observar mudança de sentido; • aplicar crase apenas porque a palavra seguinte é feminina; • iniciar oração com pronome oblíquo átono na norma formal; • inserir vírgula entre sujeito e predicado. Como resolver: Localize núcleos, termos regentes e estrutura da oração. Em crase, faça dois testes; em pontuação, retire o trecho intercalado e verifique se a estrutura principal permanece íntegra.` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula (parte 1)', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/U2Ct3%2Bvpz5Q%3D' },
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula (parte 2)', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/6lxnigQKJi8%3D' },
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula (parte 3)', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Iplzss1uRe4%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/mm0aCjIRm38%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403682%2C403666&desatualizada=0&anulada=0&query=+regencia&auth=force&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Auditoria Fiscal', subject: 'Auditoria Fiscal do Ativo', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A prova apresenta indícios contábeis e pede a irregularidade, o efeito patrimonial ou o procedimento adequado. Pegadinhas comuns: • inverter ativo fictício e ativo oculto; • aceitar suprimento de caixa apenas por contrato particular; • tratar saldo credor de caixa como situação normal; • confundir teste de existência com teste de integridade; • ignorar corte de estoques; • examinar somente nota fiscal, sem fluxo financeiro ou existência física. Como resolver: Pergunte se o ativo existe, pertence à entidade, foi integralmente registrado e está corretamente avaliado. Depois escolha a evidência que testa diretamente a afirmação relevante.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/OsuMgqpYfvQ%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Vxs2n2JJ%2FdU%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=427260&desatualizada=0&anulada=0&query=ativo&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Direito Constitucional', subject: 'Ordem Social', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A cobrança é fortemente literal e comparativa, especialmente em seguridade, educação e meio ambiente. Pegadinhas comuns: • exigir contribuição para acesso à assistência; • tratar previdência como universal e não contributiva; • confundir objetivos da seguridade com princípios do SUS; • afirmar que a responsabilidade ambiental é apenas civil; • permitir censura prévia; • trocar competências e percentuais educacionais. Como resolver: Identifique o capítulo constitucional e o destinatário da regra. Em seguridade, separe saúde, previdência e assistência; nos demais temas, compare direito, dever e instrumento de proteção.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/5sGtb2qMsLw%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Z%2FeJcrc9r8k%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=405306&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Economia', subject: 'Noções da Teoria do Produtor - Parte I', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra distinções entre curto e longo prazo, cálculo e interpretação dos produtos e classificação dos rendimentos de escala. Pegadinhas comuns: • definir curto prazo por duração em meses; • confundir produto médio com marginal; • afirmar que marginal decrescente implica produto total imediatamente decrescente; • misturar rendimentos marginais e de escala; • variar apenas um insumo ao testar escala; • classificar grau um como retorno crescente. Como resolver: Veja quantos fatores variam. Se apenas um muda, pense em produto marginal e curto prazo. Se todos variam proporcionalmente, pense em escala. Em funções, substitua os insumos por t vezes seus valores e compare o expoente comum.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/m5n1NhPRkUQ%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Rfe%2FlcOPtHk%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403963%2C412800%2C412801%2C412802%2C412803%2C412812%2C426733%2C426734%2C426735%2C426732%2C426736%2C426737%2C426738%2C426739%2C426740%2C426741%2C426744%2C426745%2C426746%2C426742%2C426743&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'Noções de Modelagem Dimensional - Parte I', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra comparações entre arquiteturas, características de warehouse e significado das operações OLAP. Pegadinhas comuns: • reduzir BI a software de visualização; • trocar OLTP por OLAP; • dizer que warehouse é volátil e voltado a transações; • confundir data mart com banco operacional; • inverter drill-down e roll-up; • trocar slice e dice. Como resolver: Identifique finalidade, granularidade, horizonte temporal e padrão de acesso. Nas operações OLAP, visualize o cubo e determine se houve filtro, rotação, detalhamento ou agregação.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/7xuvYKdx9%2BY%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/4suaCgngVsQ%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=8112&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Legislação Tributária', subject: 'IBS e CBS - Ressarcimento, Modalidades de Extinção e Regimes de Apuração', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A prova tende a cobrar sequência operacional, sujeito que recolhe, split payment, diferença entre devolução e ressarcimento e funcionamento da apuração. Pegadinhas comuns: • tratar split payment como pagamento integral ao fornecedor; • confundir adquirente responsável com contribuinte; • equiparar pagamento indevido a saldo credor; • afirmar que todo crédito gera ressarcimento imediato; • considerar a apuração assistida definitiva e imutável; • ignorar modalidades específicas da LC. Como resolver: Identifique origem do débito ou crédito, sujeito que efetua o recolhimento e momento da operação. Depois determine se há pagamento, segregação, compensação, devolução ou ressarcimento.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/GfPu1JqERIo%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/5TaInExhCew%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=438078&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Economia', subject: 'Noções da Teoria do Produtor - Parte II', type: 'teoria', studyTip: `Dicas:
A função de produção representa a fronteira tecnicamente eficiente. Pontos abaixo dela são possíveis, porém ineficientes; pontos acima são inalcançáveis com tecnologia e fatores disponíveis.
Isoquanta reúne combinações de insumos que geram o mesmo produto. Por isso, em geral, é negativamente inclinada, convexa e não se cruza com outra isoquanta.

Resumo do conteúdo:
EFICIÊNCIA E MAXIMIZAÇÃO DA PRODUÇÃO: A função de produção indica a quantidade máxima obtida com determinada combinação de fatores e tecnologia. Uma combinação sobre a fronteira é tecnicamente eficiente; abaixo dela existe desperdício de recursos; acima dela a produção não é alcançável nas condições dadas.
MAIS DE UM FATOR VARIÁVEL: No longo prazo, capital e trabalho podem variar. O produtor passa a escolher entre diversas combinações capazes de gerar o mesmo nível de produto. Essa escolha tecnológica é representada por isoquantas; quando preços dos fatores entram na análise, a combinação de menor custo depende também da reta de isocusto.
ISOQUANTAS: Cada isoquanta reúne pares de fatores que produzem a mesma quantidade. Isoquantas mais afastadas da origem representam maior produto. Sob hipóteses usuais, são decrescentes, convexas em relação à origem e não se interceptam. A convexidade decorre da taxa marginal de substituição técnica decrescente: à medida que um fator substitui o outro, torna-se progressivamente mais difícil continuar a substituição sem reduzir o produto.
TAXA MARGINAL DE SUBSTITUIÇÃO TÉCNICA: A TMST mede a quantidade de um fator que pode ser sacrificada para obter unidade adicional de outro, mantendo o produto constante. Em valor absoluto, relaciona os produtos marginais dos fatores e corresponde à inclinação da isoquanta.
ELASTICIDADE DE SUBSTITUIÇÃO: Essa elasticidade mede a sensibilidade da proporção entre fatores a mudanças na TMST. Quanto maior, mais fácil substituir capital por trabalho ou trabalho por capital. Nos extremos, substitutos perfeitos admitem substituição constante, enquanto complementares perfeitos praticamente não admitem troca entre fatores.
FUNÇÕES DE PRODUÇÃO PARTICULARES: Na função linear, os fatores são substitutos perfeitos e as isoquantas são retas. Na função de proporções fixas ou Leontief, os fatores são complementares e as isoquantas têm formato de L. Na Cobb-Douglas, os expoentes influenciam produtos marginais, participação dos fatores e retornos de escala; a soma dos expoentes auxilia a classificar esses retornos.
COMO CAI EM PROVA: A banca alterna interpretação gráfica, propriedades das isoquantas e identificação de funções de produção. Pegadinhas comuns: • afirmar que ponto abaixo da função é impossível, em vez de ineficiente; • permitir cruzamento de isoquantas; • dizer que isoquanta mais alta representa o mesmo produto; • inverter TMST e razão entre produtos marginais; • trocar substitutos perfeitos por complementares perfeitos; • usar a soma dos expoentes da Cobb-Douglas para classificar rendimentos marginais, e não retornos de escala. Como resolver: Pergunte o que permanece constante. Se é o produto, pense em isoquanta e TMST; se todos os fatores variam proporcionalmente, pense em retornos de escala. Em gráficos, associe primeiro o formato ao grau de substituição e só depois examine números.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/m5n1NhPRkUQ%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/js09r88QMLw%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403963%2C412800%2C412801%2C412802%2C412803%2C412812%2C426733%2C426734%2C426735%2C426732%2C426736%2C426737%2C426738%2C426739%2C426740%2C426741%2C426744%2C426745%2C426746%2C426742%2C426743&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Estatística', subject: 'Testes de Hipóteses e Estatística Inferencial', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra formulação, decisão, interpretação do p-valor, tipos de erro, potência e escolha do teste. Pegadinhas comuns: • afirmar que não rejeitar H0 prova sua verdade; • inverter erros tipo I e II; • dizer que p-valor é a probabilidade de H0 ser verdadeira; • escolher teste unilateral após observar os dados; • comparar p-valor com nível de confiança em vez de alfa; • usar distribuição sem verificar pressupostos. Como resolver: Escreva H0 e H1, determine unilateralidade, fixe alfa e escolha a estatística. Só então calcule região crítica ou p-valor e formule a decisão no contexto.` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/vnUtUHaPZhY%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=416536%2C426608&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Direito Empresarial', subject: 'Direito Societário', type: 'teoria', studyTip: `Dicas:
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
COMO CAI EM PROVA: A banca cobra classificações, personalidade, responsabilidade e hipóteses de desconsideração. Pegadinhas comuns: • equiparar sociedade simples a sociedade sem fins econômicos; • afirmar que toda sociedade empresária é sociedade por ações; • confundir sociedade não personificada com inexistente; • presumir responsabilidade limitada em qualquer tipo; • dizer que desconsideração extingue a pessoa jurídica; • aplicar teoria menor como regra geral do Código Civil. Como resolver: Classifique atividade, ato constitutivo, personalidade e responsabilidade separadamente. Na desconsideração, procure abuso e beneficiário antes de definir alcance.` }).returning();
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


  
  if (!existingWeeks.some(w => w.number === 12)) {
    console.log('Seeding Week 12...');
    
    // Create Week 12
    const insertedWeek = await db.insert(weeks).values({
      number: 12,
      title: 'Semana 12'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Auditoria Fiscal', subject: 'Auditoria Fiscal do Passivo, Patrimônio Líquido e Resultado', type: 'teoria', studyTip: `Dicas:
Passivo fictício é uma obrigação inexistente, já paga ou sem exigibilidade comprovada que permanece registrada. Ele provoca superavaliação do Passivo e pode sustentar presunção de omissão de receitas.
Passivo oculto é uma obrigação real que não foi contabilizada. Ele provoca subavaliação do Passivo e pode estar associado a compras não registradas, despesas omitidas ou empréstimos não reconhecidos.

Resumo do conteúdo:
OBJETIVOS DA AUDITORIA DO PASSIVO: A auditoria busca verificar se as obrigações pertencem à entidade, foram integralmente registradas, estão corretamente mensuradas e classificadas e foram apresentadas adequadamente. No Passivo, a integridade é especialmente importante, pois a ausência de registro pode ocultar dívidas e reduzir artificialmente o endividamento.
PASSIVO FICTÍCIO E PASSIVO OCULTO: Passivo fictício é o saldo representativo de obrigação inexistente, já liquidada ou não comprovada. Como permanece contabilizado sem corresponder a uma dívida real, superavalia o Passivo. Passivo oculto é uma obrigação existente que não foi registrada. Sua omissão subavalia o Passivo e pode também omitir a compra, a despesa, o custo ou a origem dos recursos relacionados à operação.
FORNECEDORES: A auditoria verifica se as aquisições a prazo foram devidamente registradas, se as obrigações surgiram no momento adequado e se os saldos correspondem a dívidas reais. Entre os procedimentos relevantes, destacam-se a análise da relação de fornecedores, o exame de notas fiscais e duplicatas, a comparação com razão contábil, a verificação de pagamentos posteriores, o recálculo e a circularização. O corte das operações merece atenção: mercadoria recebida antes do encerramento pode gerar obrigação ainda não contabilizada, mesmo que a nota ou o pagamento apareça posteriormente.
EMPRÉSTIMOS, DUPLICATAS E CONTINGÊNCIAS: Em empréstimos e financiamentos, devem ser examinados contratos, confirmações bancárias, encargos, garantias, classificação e relacionamento com partes relacionadas. Operações formalmente apresentadas como fornecedores podem, em essência, representar financiamento. Duplicatas descontadas exigem comprovação da existência do título e da efetiva operação financeira. Nas contingências, analise a natureza da obrigação, a probabilidade de saída de recursos, a mensuração e a necessidade de reconhecimento ou divulgação.
PATRIMÔNIO LÍQUIDO: A auditoria verifica autorização, ocorrência, integralidade, classificação e conformidade dos eventos que alteram o PL. Aumento de capital exige comprovação da subscrição e da efetiva integralização. Reservas devem respeitar sua origem e finalidade. Ações em tesouraria e lucros ou prejuízos acumulados precisam estar corretamente registrados e respaldados pelas deliberações societárias.
RECEITAS, DESPESAS E CUSTOS: A auditoria das receitas procura identificar omissões, reconhecimento em período incorreto, valores fictícios e classificações inadequadas. O auditor pode confrontar documentos fiscais, movimentação bancária, contas a receber, estoques, livros fiscais e registros contábeis. Despesas ou custos superavaliados reduzem artificialmente o resultado. Devem ser examinados documentação, competência, vínculo com a atividade, efetiva ocorrência e critérios de apropriação. Em custos, a manipulação pode ocorrer por compras fictícias, consumo não comprovado, avaliação incorreta de estoques ou apropriação indevida de gastos.
COMO CAI EM PROVA: A banca costuma apresentar uma situação contábil e pedir a irregularidade identificada, seu efeito patrimonial ou o procedimento de auditoria mais adequado. Pegadinhas comuns: • inverter passivo fictício e passivo oculto; • afirmar que passivo fictício subavalia as obrigações; • procurar passivos ocultos apenas nos saldos já registrados; • confundir circularização de fornecedores com contagem física de caixa; • aceitar aumento de capital sem comprovação da entrega dos recursos; • analisar receita, despesa ou custo sem identificar o efeito sobre o resultado. Como resolver: Primeiro, determine se a obrigação existe e se foi contabilizada. Depois, identifique a direção da distorção: saldo maior ou menor que o correto. Por fim, escolha o procedimento que produz evidência diretamente relacionada ao risco. Em contas de Resultado, reconstrua o efeito completo sobre lucro, patrimônio e eventual base tributável.` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula (parte 1)', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/WjdEZbGy4r4%3D' },
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula (parte 2)', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/0yhgQSEC3zI%3D' },
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula (parte 3)', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/WXSs3AHAsVI%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/YlvBAbG1bo8%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=427260&desatualizada=0&anulada=0&query=passivo+PL+resultado&auth=force&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Contabilidade de Custos', subject: 'Custos para a Tomada de Decisão', type: 'teoria', studyTip: `Dicas:
Margem de contribuição não é lucro. Ela representa o valor que sobra da receita após custos e despesas variáveis para cobrir gastos fixos e formar resultado.
Calcule primeiro a margem de contribuição unitária: preço de venda menos custos e despesas variáveis unitários. Depois identifique qual ponto de equilíbrio foi solicitado.
Ponto de equilíbrio contábil considera os gastos fixos; o econômico acrescenta o retorno desejado ou custo de oportunidade; o financeiro exclui desembolsos não financeiros e considera os ajustes propostos.

Resumo do conteúdo:
MARGEM DE CONTRIBUIÇÃO: A margem de contribuição unitária corresponde ao preço de venda unitário menos custos e despesas variáveis unitários. A margem total é obtida pela multiplicação da margem unitária pela quantidade vendida ou pela diferença entre receita total e gastos variáveis totais. MC unitária = PV unitário - CV unitário - DV unitária. O índice de margem de contribuição relaciona margem e receita de vendas.
PONTO DE EQUILÍBRIO CONTÁBIL OU OPERACIONAL: É o nível de vendas em que a margem de contribuição total cobre exatamente os gastos fixos e o resultado é igual a zero. Em unidades, divide-se o gasto fixo pela margem de contribuição unitária. Em valor, utiliza-se o índice de margem de contribuição.
PONTO DE EQUILÍBRIO ECONÔMICO: Acrescenta ao numerador o lucro desejado ou o custo de oportunidade. Indica o volume necessário para cobrir gastos fixos e remunerar o capital conforme a meta estabelecida.
PONTO DE EQUILÍBRIO FINANCEIRO: Considera os desembolsos efetivos. Gastos sem saída financeira no período, como depreciação quando indicada, são retirados dos gastos fixos; outros compromissos financeiros previstos no enunciado podem ser incorporados.
ANÁLISE CUSTO, VOLUME E LUCRO: A análise CVL estuda como preço, volume, custos variáveis e gastos fixos afetam o resultado. Em sua forma básica, pressupõe comportamento linear dentro de uma faixa relevante, estabilidade do preço e dos custos unitários e compatibilidade entre produção e vendas.
MARGEM DE SEGURANÇA: É a diferença entre vendas atuais ou previstas e vendas no ponto de equilíbrio. Quanto maior a margem, maior a distância até a zona de prejuízo.
GRAU DE ALAVANCAGEM OPERACIONAL: O GAO mede a sensibilidade do lucro operacional às variações das vendas. Pode ser calculado pela margem de contribuição total dividida pelo lucro operacional, ou pela razão entre variação percentual do lucro e variação percentual das vendas.
COMO CAI EM PROVA: A banca cobra cálculos encadeados e comparação entre modalidades de ponto de equilíbrio. Pegadinhas comuns: • tratar margem de contribuição como lucro líquido; • usar custo fixo unitário no numerador; • esquecer despesas variáveis; • incluir depreciação no ponto de equilíbrio financeiro quando o enunciado manda excluí-la; • confundir lucro desejado com margem de contribuição; • inverter a interpretação da margem de segurança. Como resolver: Monte uma pequena demonstração: Receita - Variáveis = Margem de Contribuição - Fixos = Resultado. Só então selecione a fórmula. Ao final, confira se a unidade pedida é quantidade, valor monetário ou percentual.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/audBPLsV5zo%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=416696&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Economia', subject: 'Teoria dos Custos no Curto e no Longo Prazo', type: 'teoria', studyTip: `Dicas:
No curto prazo, ao menos um fator é fixo; por isso existem custos fixos. No longo prazo, todos os fatores podem variar e a firma escolhe escala e combinação de insumos.
Custo econômico inclui custos explícitos e implícitos. O lucro econômico desconta o custo de oportunidade; o lucro contábil normalmente considera apenas desembolsos registrados.
Custo marginal mede a variação do custo total por unidade adicional. Como o custo fixo não varia com a produção, o marginal também pode ser obtido pela variação do custo variável.
O custo marginal corta as curvas de custo médio total e variável em seus mínimos. Se CMg está abaixo do médio, puxa o médio para baixo; se está acima, puxa para cima.
A linha de isocusto reúne combinações de fatores com o mesmo custo. A escolha de menor custo ocorre, em solução interior, quando a isoquanta tangencia a isocusto.
Economias de escala reduzem o custo médio de longo prazo, enquanto as deseconomias de escala o elevam. As economias de escopo surgem quando a produção conjunta de bens apresenta custo inferior ao da produção separada.

Resumo do conteúdo:
CUSTO ECONÔMICO E CUSTO CONTÁBIL: Custos explícitos envolvem pagamento monetário; custos implícitos representam recursos próprios empregados e seu custo de oportunidade. O custo econômico soma ambos. Por isso, lucro econômico pode ser menor que lucro contábil e ser zero mesmo quando existe remuneração normal dos fatores próprios.
CURTO PRAZO: No curto prazo, custo total é a soma do custo fixo total e do custo variável total. O custo fixo permanece mesmo com produção zero; o variável acompanha o nível produzido. Dividindo cada componente pela quantidade, obtêm-se custo fixo médio, custo variável médio e custo total médio. O custo marginal é a variação do custo total decorrente de acréscimo na produção. A lei dos rendimentos marginais influencia seu formato: quando o produto marginal do fator cresce, o custo marginal tende a cair; quando o produto marginal diminui, o custo marginal tende a subir.
RELAÇÃO ENTRE AS CURVAS: O custo fixo médio é sempre decrescente. As curvas de custo variável médio e custo total médio costumam assumir formato de U. O custo marginal atravessa cada média em seu ponto mínimo. A distância vertical entre custo total médio e custo variável médio corresponde ao custo fixo médio e diminui com o aumento da produção.
LONGO PRAZO E ESCOLHA DE INSUMOS: No longo prazo, todos os fatores são variáveis. A empresa escolhe a dimensão da planta e a combinação de capital e trabalho. A linha de isocusto pode ser expressa pelo orçamento de custos e pelos preços dos fatores; sua inclinação reflete a razão entre esses preços. Para minimizar custo dado um produto, a firma busca a isoquanta mais alta compatível com o gasto ou a isocusto mais baixa que alcança a produção. Em solução interior, a taxa marginal de substituição técnica se iguala à razão entre os preços dos fatores.
ESCALA, ESCOPO E TRANSFORMAÇÃO: Economias de escala ocorrem quando o custo médio de longo prazo cai com a expansão; retornos constantes mantêm o custo médio; deseconomias o elevam. Economia de escopo aparece quando a produção conjunta de dois bens é mais barata que a produção separada. Curvas de transformação mostram combinações possíveis de produtos diante de recursos e tecnologia.
COMO CAI EM PROVA: A banca cobra fórmulas, leitura de curvas e distinção entre curto prazo, longo prazo, escala e escopo. Pegadinhas comuns: • afirmar que custo fixo médio é constante; • incluir custo fixo na variação do custo marginal; • dizer que CMg corta as médias em qualquer ponto; • confundir lucro econômico zero com ausência de remuneração; • trocar isoquanta por isocusto; • confundir economia de escala com economia de escopo. Como resolver: Comece classificando o horizonte. Depois escreva CT = CFT + CVT e divida pela quantidade quando a questão pedir médias. Em gráficos, compare CMg com a média. Em escolha de fatores, separe tecnologia, mostrada pela isoquanta, de preços e orçamento, mostrados pela isocusto.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/m5n1NhPRkUQ%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/0DtyD16jq64%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403964%2C412818%2C412819%2C412823%2C412824%2C412825%2C412826%2C426747%2C412827%2C412828%2C412829%2C412831&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Legislação Tributária', subject: 'IBS e CBS - Importação, Exportação e Regimes Aduaneiros', type: 'teoria', studyTip: `Dicas:
No IBS e na CBS, a apropriação do crédito está vinculada à extinção do débito da operação anterior e à existência de documento fiscal eletrônico idôneo.
Os créditos são segregados: crédito de IBS não compensa CBS, e crédito de CBS não compensa IBS.
Separe importação de bens materiais da importação de serviços, bens imateriais e direitos. Momento, local, base e sujeito passivo não são tratados de forma idêntica.
A tributação da importação busca neutralidade entre aquisição interna e externa. Não presuma ausência de incidência apenas porque o fornecedor está no exterior.
Exportações são desoneradas, preservando-se a lógica de manutenção e utilização dos créditos admitidos pela legislação.
Em questões literais, organize a operação em cinco campos: objeto importado ou exportado, momento, local, base de cálculo e responsável. Essa sequência reduz a troca de regras.

Resumo do conteúdo:
NÃO CUMULATIVIDADE: O contribuinte do regime regular pode apropriar créditos relativos às aquisições, observadas as condições da LC n. 214/2025. A apropriação depende da extinção do débito da operação anterior e de documento fiscal eletrônico idôneo. IBS e CBS permanecem segregados. Há restrições para uso ou consumo pessoal e outras hipóteses previstas em lei. Operações imunes, isentas, com alíquota zero, diferimento ou suspensão exigem análise da disciplina específica, sem presunção automática de crédito.
OPERACIONALIZAÇÃO: O sistema utiliza cadastro com identificação única, documentos fiscais eletrônicos e mecanismos de compartilhamento de informações. A emissão correta do documento não é detalhe formal: ela sustenta apuração, controle e apropriação de créditos.
IMPORTAÇÃO DE SERVIÇOS E BENS IMATERIAIS: A incidência considera a utilização, exploração ou consumo no País, conforme os critérios legais. É necessário identificar adquirente, destinatário e local da operação, inclusive quando o pagamento ou o fornecedor se encontra no exterior.
IMPORTAÇÃO DE BENS MATERIAIS: A lei disciplina momento do fato, local, base de cálculo, alíquota, sujeição passiva, pagamento e creditamento. A base pode reunir o valor da operação e parcelas determinadas pela legislação. Importador, adquirente ou outros responsáveis podem assumir posições distintas conforme a forma da operação.
EXPORTAÇÕES: As exportações de bens materiais, serviços, bens imateriais e direitos recebem tratamento desonerado quando atendidos os requisitos legais. O destino e o efetivo consumo no exterior são centrais na análise de serviços e intangíveis.
CRÉDITOS NAS OPERAÇÕES EXTERNAS: A desoneração das exportações não deve transformar o tributo acumulado nas etapas anteriores em custo do exportador. Por isso, a legislação preserva créditos admitidos e disciplina sua utilização ou ressarcimento. Nas importações, o crédito depende do atendimento das condições do regime regular.
PERFIL INSTITUCIONAL: IBS e CBS compartilham estrutura normativa harmonizada, embora pertençam a entes distintos. O Comitê Gestor exerce funções próprias em relação ao IBS, enquanto a CBS permanece vinculada à União.
COMO CAI EM PROVA: A prova tende a cobrar condições do crédito e detalhes literais das operações de importação e exportação. Pegadinhas comuns: • permitir compensação cruzada entre IBS e CBS; • admitir crédito sem extinção do débito anterior; • tratar uso pessoal como aquisição creditável comum; • aplicar regras de bens materiais a serviços e intangíveis; • confundir localização do fornecedor com local da operação; • afirmar que exportação obriga cancelamento geral dos créditos. Como resolver: Identifique primeiro se a operação é interna, importação ou exportação. Depois classifique o objeto e percorra momento, local, base, sujeito passivo e crédito. Só responda após localizar a exceção indicada no enunciado.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/GfPu1JqERIo%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/ZaL34bFioY8%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=438078&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'Noções de Modelagem Dimensional - Parte II', type: 'teoria', studyTip: `Dicas:
Business Intelligence não é uma ferramenta isolada. É um conjunto de processos, métodos e tecnologias que transforma dados em informação útil à decisão.
Sistemas OLTP priorizam transações operacionais, atualização e consistência. Sistemas OLAP priorizam consultas analíticas, agregações, histórico e exploração multidimensional.

Resumo do conteúdo:
BUSINESS INTELLIGENCE: BI reúne tecnologias, processos e metodologias para coletar, integrar, organizar, analisar e apresentar dados. Seu objetivo é apoiar decisões com informações consistentes, históricos e relevantes, provenientes de fontes internas e externas.
ARQUITETURA DE BI: Dados dos sistemas de origem passam por processos de extração, transformação e carga. Depois são armazenados em repositórios analíticos, como Data Warehouse ou Data Mart, e acessados por ferramentas de consulta, relatórios, dashboards, mineração e OLAP.
OLTP X OLAP: OLTP sustenta a operação cotidiana: grande quantidade de transações curtas, dados atuais, atualizações frequentes e modelo normalmente normalizado. OLAP sustenta análise: consultas complexas, agregações, histórico, leitura intensiva e visão multidimensional.
CUBO E COMPONENTES: O modelo analítico organiza medidas numéricas segundo dimensões. Dimensões possuem atributos e hierarquias; a dimensão tempo costuma permitir navegação entre ano, trimestre, mês e dia. Células do cubo representam combinações dimensionais.
VARIAÇÕES OLAP: MOLAP utiliza estruturas multidimensionais e tende a favorecer consultas agregadas. ROLAP opera sobre bancos relacionais e oferece maior escalabilidade. HOLAP combina armazenamento relacional e multidimensional. Outras classificações decorrem da forma de acesso e distribuição.
OPERAÇÕES OLAP: Roll-up sobe na hierarquia e agrega dados; drill-down desce e detalha. Slice seleciona um valor de dimensão; dice recorta múltiplos valores ou dimensões; pivot rotaciona a visão. Drill-through acessa registros subjacentes e drill-across relaciona estruturas compatíveis.
SEGURANÇA E QUALIDADE: O ambiente deve controlar acesso a dados, metadados, dimensões e níveis de detalhe. Qualidade, integração, rastreabilidade e atualização dos dados condicionam a confiabilidade da decisão.
COMO CAI EM PROVA: A banca cobra comparações entre OLTP e OLAP, conceitos de BI e identificação das operações sobre cubos. Pegadinhas comuns: • tratar BI como sinônimo exclusivo de Data Warehouse; • dizer que OLAP é voltado a transações operacionais; • inverter roll-up e drill-down; • confundir slice com pivot; • afirmar que ROLAP abandona bancos relacionais; • trocar dimensão por medida. Como resolver: Observe o verbo do enunciado. Agregar aponta para roll-up; detalhar, drill-down; recortar, slice ou dice; reorganizar eixos, pivot. Em arquitetura, pergunte se a prioridade é registrar operação ou analisar histórico.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/7xuvYKdx9%2BY%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/vIBtYApwANk%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=416884,8095,8111&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Economia', subject: 'Estruturas de Mercado: Concorrência Perfeita e Monopólio', type: 'teoria', studyTip: `Dicas:
Lucro econômico zero não significa empresa sem remuneração. Significa que receitas cobrem custos explícitos e implícitos, inclusive o custo de oportunidade do capital.
Em concorrência perfeita, a firma é tomadora de preço: P = receita média = receita marginal. Ela escolhe quantidade onde RMg = CMg, desde que a condição de continuidade seja atendida.
No curto prazo, a firma pode operar com prejuízo se o preço cobrir o custo variável médio. Abaixo do mínimo do CVMe, deve interromper a produção.
No longo prazo, entrada e saída empurram o lucro econômico para zero e conduzem ao ponto em que preço se relaciona ao custo médio mínimo.
No monopólio, a demanda da firma é a demanda de mercado e a receita marginal fica abaixo do preço. O monopolista escolhe Q por RMg = CMg e encontra P na curva de demanda.
Monopólio natural decorre de economias de escala relevantes na faixa de demanda. Não confunda com qualquer empresa grande nem com monopólio criado exclusivamente por lei.

Resumo do conteúdo:
ESTRUTURA, RECEITA E LUCRO: Estruturas de mercado diferem pelo número de firmas, natureza do produto, barreiras à entrada e poder sobre preço. O lucro econômico é receita total menos custos econômicos. Lucro normal integra o custo de oportunidade; por isso, lucro econômico zero é compatível com permanência da firma.
CONCORRÊNCIA PERFEITA: O mercado possui muitos compradores e vendedores, produto homogêneo, livre entrada e saída e ampla informação. A firma individual não altera o preço e enfrenta demanda horizontal ao preço de mercado. Assim, preço, receita média e receita marginal coincidem. A maximização ocorre onde receita marginal iguala custo marginal crescente. No curto prazo, a firma produz se o preço cobre ao menos o custo variável médio. Se P fica entre CVMe e CTMe, há prejuízo, mas parte do custo fixo é coberta. Se P fica abaixo do mínimo do CVMe, ocorre fechamento temporário. No longo prazo, lucros atraem entrada e prejuízos provocam saída. O equilíbrio competitivo tende a lucro econômico zero e produção no mínimo do custo médio de longo prazo, sob as hipóteses do modelo.
MONOPÓLIO: Uma única firma atende o mercado protegido por barreiras legais, tecnológicas, econômicas ou de controle de insumo. A demanda é decrescente; para vender mais, o monopolista reduz o preço, fazendo a receita marginal ficar abaixo da demanda. Ele maximiza lucro escolhendo quantidade em RMg = CMg e, depois, obtém o preço na curva de demanda. Não escolhe preço e quantidade de forma independente. Em comparação com o resultado competitivo, tende a produzir menos e cobrar mais, gerando perda de peso morto.
MONOPÓLIO NATURAL E REGULAÇÃO: Monopólio natural ocorre quando economias de escala tornam uma única firma mais eficiente para atender a demanda relevante. Custo médio decrescente pode dificultar regulação pelo preço igual ao custo marginal, pois esse preço pode não cobrir o custo médio. Alternativas regulatórias envolvem preço pelo custo médio, subsídio, teto tarifário ou outras regras, cada qual com efeitos sobre eficiência e incentivos.
DISCRIMINAÇÃO E BEM-ESTAR: Quando consegue separar consumidores e impedir arbitragem, o monopolista pode praticar preços distintos. A discriminação altera distribuição de excedentes e, conforme o grau, pode modificar quantidade transacionada. A análise deve separar lucro da firma, excedente do consumidor e eficiência total.
COMO CAI EM PROVA: A prova combina gráficos, condições de fechamento, equilíbrio de longo prazo e comparação de bem-estar. Pegadinhas comuns: • dizer que firma competitiva escolhe o preço; • igualar preço e receita marginal no monopólio; • encerrar a firma competitiva sempre que há prejuízo; • tratar lucro econômico zero como falência; • obter o preço monopolista diretamente de RMg = CMg; • afirmar que monopólio não possui curva de demanda; • confundir monopólio natural com autorização estatal. Como resolver: Identifique a estrutura antes de calcular. Em concorrência perfeita, use P = RMg e compare preço com CVMe e CTMe. No monopólio, encontre primeiro Q em RMg = CMg e depois suba até a demanda para achar P. Compare excedentes e quantidade para avaliar eficiência.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/m5n1NhPRkUQ%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/7brm2ff0nas%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=412850%2C412835&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Direito Empresarial', subject: 'Sociedade Limitada', type: 'teoria', studyTip: `Dicas:
A limitada combina contratualidade e limitação de responsabilidade. Nas omissões, aplica-se a sociedade simples, salvo previsão contratual de regência supletiva pela Lei das S.A.
Ela pode ser constituída por uma ou mais pessoas. Sociedade limitada unipessoal não exige sócio fictício nem capital mínimo geral.
Cada sócio responde até o valor de suas quotas, mas todos respondem solidariamente pela integralização do capital social.

Resumo do conteúdo:
REGÊNCIA E CONSTITUIÇÃO: A sociedade limitada é regida pelos arts. 1.052 a 1.087 do Código Civil. Nas omissões, aplicam-se as regras da sociedade simples. O contrato pode prever regência supletiva pelas normas da sociedade anônima. A limitada pode ser pluripessoal ou unipessoal.
RESPONSABILIDADE E CAPITAL: O capital divide-se em quotas iguais ou desiguais. A responsabilidade de cada sócio limita- -se ao valor de suas quotas, mas todos respondem solidariamente pela integralização do capital. É vedada contribuição que consista em prestação de serviços.
QUOTAS E CESSÃO: As quotas são indivisíveis perante a sociedade, salvo para transferência. O contrato pode disciplinar cessão e preferência. Na omissão contratual, a cessão a sócio e a terceiro segue limites distintos e pode depender da ausência de oposição da parcela legal do capital.
ADMINISTRAÇÃO E FISCALIZAÇÃO: A administração cabe a uma ou mais pessoas designadas no contrato ou em ato separado. Administrador não sócio é admitido com aprovação exigida em lei. O conselho fiscal é facultativo e, quando instituído, possui composição, impedimentos e competências próprias.
DELIBERAÇÕES E SAÍDA DO SÓCIO: Matérias relevantes dependem de deliberação, reunião ou assembleia e quórum específico. A resolução em relação a um sócio pode decorrer de retirada, exclusão, morte ou outras hipóteses legais, com apuração de haveres e preservação da sociedade quando possível.
DISSOLUÇÃO, LIQUIDAÇÃO E EXTINÇÃO: A dissolução inaugura o encerramento; a liquidação realiza ativo e paga passivo; a partilha distribui eventual saldo; a extinção encerra a personalidade após as formalidades registrais.
OPERAÇÕES SOCIETÁRIAS: Transformação altera o tipo sem dissolver ou liquidar. Incorporação absorve uma ou mais sociedades por outra existente. Fusão reúne sociedades para formar nova pessoa. Cisão transfere parcelas patrimoniais, podendo ser total ou parcial.
COMO CAI EM PROVA: A banca cobra responsabilidade dos sócios, regência supletiva, capital, administração, deliberações e operações societárias. Pegadinhas comuns: • exigir pluralidade de sócios; • afirmar responsabilidade ilimitada por todas as dívidas; • admitir serviços na integralização do capital; • aplicar automaticamente a Lei das S.A.; • confundir dissolução com extinção imediata; • trocar incorporação, fusão e transformação. Como resolver: Identifique se a questão trata da sociedade, do sócio ou do administrador. Depois verifique contrato, integralização e quórum. Nas operações, acompanhe quais pessoas jurídicas sobrevivem e para onde o patrimônio é transferido.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/aSxpa1DIHng%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/0Rd0pujO2%2FU%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=406948&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Estatística', subject: 'Regressão Linear', type: 'teoria', studyTip: `Dicas:
Na regressão simples, Y é explicada por X por meio de uma parte sistemática e um erro: Y = beta zero + beta um X + erro.
O método dos mínimos quadrados escolhe a reta que minimiza a soma dos quadrados dos resíduos. Resíduo é observado menos estimado.
A inclinação indica a variação média estimada de Y para aumento de uma unidade em X. O intercepto só deve receber interpretação prática quando X igual a zero fizer sentido.
A reta estimada com intercepto passa pelo ponto formado pelas médias de X e Y.
R² mede a proporção da variabilidade de Y explicada pelo modelo; não prova causalidade nem garante adequação dos resíduos.
Na regressão simples, o sinal da inclinação acompanha o sinal da correlação e R² corresponde ao quadrado da correlação linear.

Resumo do conteúdo:
MODELO DE REGRESSÃO LINEAR: O modelo relaciona variável dependente Y a uma ou mais variáveis explicativas. Na regressão simples: Y = beta zero + beta um X + erro. Beta zero é o intercepto; beta um é a inclinação; o erro reúne fatores não explicados.
MÍNIMOS QUADRADOS: Os coeficientes estimados minimizam a soma dos quadrados dos resíduos. Na regressão simples, a inclinação relaciona covariância de X e Y à variância de X; o intercepto é a média de Y menos a inclinação multiplicada pela média de X.
VALORES AJUSTADOS E RESÍDUOS: Valor ajustado é o Y previsto pela reta. Resíduo é a diferença entre valor observado e ajustado. Com intercepto, a soma dos resíduos é zero e a reta passa pelo centroide das médias amostrais.
AVALIAÇÃO DO AJUSTE: A variabilidade total pode ser decomposta em parcela explicada e parcela residual. O coeficiente de determinação R² é a razão da variação explicada pela total, ou um menos a razão entre soma de quadrados residual e total. Seu valor fica entre zero e um no modelo usual com intercepto.
ANÁLISE DE VARIÂNCIA: A ANOVA organiza graus de liberdade, somas de quadrados e quadrados médios. O teste F avalia a significância global do modelo, comparando variação explicada e residual.
ANÁLISE DOS COEFICIENTES: Testes t e intervalos de confiança verificam se coeficientes diferem de valores especificados, especialmente zero. A conclusão depende de estimativa, erro-padrão, nível de significância e hipóteses do modelo.
PRESSUPOSTOS E REGRESSÃO MÚLTIPLA: A inferência exige atenção à linearidade, média condicional do erro, independência, variância constante e normalidade quando necessária aos testes. Na regressão múltipla, cada coeficiente mede efeito parcial, mantidas as demais variáveis constantes; o R² ajustado penaliza inclusão de variáveis pouco úteis.
COMO CAI EM PROVA: A banca cobra cálculo dos coeficientes, interpretação da reta, resíduos, R², ANOVA e testes dos parâmetros. Pegadinhas comuns: • inverter observado e estimado no resíduo; • interpretar inclinação como correlação; • concluir causalidade a partir de R² elevado; • afirmar que R² sempre diminui com nova variável; • confundir teste F global com teste individual; • ignorar unidades na interpretação do coeficiente. Como resolver: Escreva primeiro a equação e identifique X e Y. Separe cálculo, interpretação e inferência. Ao receber uma tabela ANOVA, confira a decomposição das somas de quadrados e os graus de liberdade antes de calcular F.` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Odi7Rm94yRQ%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=7149%2C7150%2C7166%2C7171%2C7152%2C7154&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Direito Administrativo', subject: 'Lei n. 14.133/2021 - Licitações', type: 'teoria', studyTip: `Dicas:
Estude a Lei n. 14.133/2021 por etapas: âmbito, planejamento, divulgação, propostas, julgamento, habilitação, recursos e homologação. A sequência organiza os detalhes.
Modalidade não se confunde com critério de julgamento nem com modo de disputa. São três classificações diferentes.
Pregão é utilizado para bens e serviços comuns; concorrência possui campo próprio; concurso, leilão e diálogo competitivo atendem hipóteses específicas.
Inexigibilidade decorre de inviabilidade de competição. Dispensa decorre de autorização legal para contratação direta mesmo quando a competição seria possível.
A fase preparatória é o núcleo do planejamento: necessidade, estudos, objeto, riscos, orçamento, edital e estratégia da contratação devem ser coerentes.
Não decore valores desatualizados sem conferir o decreto anual. Na prova, observe se a questão cobra o texto legal ou o valor atualizado indicado no enunciado.

Resumo do conteúdo:
ÂMBITO E PRINCÍPIOS: A Lei n. 14.133/2021 disciplina licitações e contratos das administrações diretas, autárquicas e fundacionais dos entes federativos e alcança estruturas indicadas em lei. Empresas estatais submetem-se, em regra, à legislação própria. Legalidade, planejamento, transparência, segregação de funções, competitividade, eficiência e julgamento objetivo orientam o processo.
OBJETIVOS E FASE PREPARATÓRIA: A licitação busca proposta apta a gerar resultado vantajoso, tratamento isonômico, justa competição e prevenção de sobrepreço e superfaturamento. A fase preparatória define necessidade, objeto, solução, orçamento, riscos, critérios, obrigações e compatibilidade com o planejamento.
MODALIDADES E CRITÉRIOS: As modalidades são pregão, concorrência, concurso, leilão e diálogo competitivo. Convite e tomada de preços não integram a nova lei. Os critérios incluem menor preço, maior desconto, melhor técnica ou conteúdo artístico, técnica e preço, maior lance e maior retorno econômico.
FASES DO PROCEDIMENTO: O rito comum compreende preparação, divulgação do edital, apresentação de propostas e lances, julgamento, habilitação, recurso e homologação. A habilitação pode anteceder propostas e julgamento quando houver motivação e previsão editalícia.
JULGAMENTO, DISPUTA E DESEMPATE: O edital define critérios objetivos e o modo de disputa aberto, fechado ou combinação admitida. A análise deve respeitar exequibilidade, conformidade e vantajosidade. Critérios de desempate e tratamento favorecido às microempresas seguem disciplina própria.
HABILITAÇÃO: Compreende habilitação jurídica, técnica, fiscal, social e trabalhista e econômico-financeira. As exigências devem ser necessárias e proporcionais ao objeto, sem restrição indevida à competição.
CONTRATAÇÃO DIRETA: Inexigibilidade pressupõe inviabilidade de competição, como em hipóteses legalmente exemplificadas. Dispensa decorre de hipótese prevista em lei. Ambas exigem processo formal com justificativa, razão da escolha, preço e demais elementos aplicáveis.
PROCEDIMENTOS AUXILIARES E PUBLICIDADE: Credenciamento, pré-qualificação, procedimento de manifestação de interesse, sistema de registro de preços e registro cadastral auxiliam contratações. O Portal Nacional de Contratações Públicas exerce papel central na publicidade e eficácia dos atos previstos.
COMO CAI EM PROVA: A banca explora literalidade, sequência das fases, classificação dos institutos e diferenças entre contratação direta e licitação. Pegadinhas comuns: • tratar critério de julgamento como modalidade; • manter convite e tomada de preços entre as modalidades; • afirmar que toda contratação direta dispensa processo formal; • confundir inexigibilidade com emergência; • colocar habilitação obrigatoriamente antes do julgamento; • exigir documento sem relação com o objeto. Como resolver: Localize o instituto e a etapa do procedimento. Pergunte se há competição possível, qual modalidade foi escolhida, qual critério julga a proposta e se a exigência é proporcional. Em alternativas literais, desconfie de palavras absolutas.` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/JxU381GUNTw%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/7bF4mVqNAEo%3D' },
      { goalId: meta9[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=429796&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 10
    const meta10 = await db.insert(goals).values({ weekId, number: 10, discipline: 'Revisão Geral', subject: 'Todas as disciplinas da semana', type: 'revisao' }).returning();
    await db.insert(materials).values([
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Auditoria Fiscal' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Contabilidade de Custos' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Economia' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Legislação Tributária' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Economia' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Empresarial' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Estatística' },
      { goalId: meta10[0].id, type: 'tarefa', description: 'Revisar Direito Administrativo' },
    ]);
    console.log('Week 12 seed completed successfully!');
  }


  
  if (!existingWeeks.some(w => w.number === 13)) {
    console.log('Seeding Week 13...');
    
    // Create Week 13
    const insertedWeek = await db.insert(weeks).values({
      number: 13,
      title: 'Semana 13'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Revisão Geral', subject: 'Todas as disciplinas da semana', type: 'revisao' }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Auditoria Fiscal' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Legislação Tributária' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Economia' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Direito Empresarial' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Tecnologia da Informação' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Economia' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Direito Administrativo' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Legislação Tributária' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Auditoria Fiscal', subject: 'Auditoria do SPED e da Nota Fiscal Eletrônica (NF-e)', type: 'teoria', studyTip: `Dicas:
Não reduza o SPED a um arquivo eletrônico. Ele unifica recepção, validação, armazenamento e autenticação de livros e documentos contábeis e fiscais em fluxo computadorizado.
A NF-e é o documento fiscal eletrônico, emitido e armazenado digitalmente. O DANFE é apenas sua representação gráfica auxiliar: acompanha a mercadoria e facilita a consulta, mas não substitui a NF-e. 105 Resumo do conteúdo:
SISTEMA PÚBLICO DE ESCRITURAÇÃO DIGITAL: O SPED moderniza obrigações acessórias e integra contribuinte, administrações tributárias e órgãos fiscalizadores. Unifica recepção, validação, armazenamento e autenticação de livros e documentos contábeis e fiscais em fluxo computadorizado. A certificação digital assegura autoria, integridade e validade jurídica. O sistema racionaliza obrigações e melhora a qualidade das informações, mas o acesso permanece submetido aos sigilos fiscal, comercial e bancário.
NOTA FISCAL ELETRÔNICA: A NF-e é documento exclusivamente digital que registra operações e prestações. Sua validade decorre da assinatura digital do emitente e da autorização de uso. O processo envolve geração, assinatura, transmissão, validação e autorização. Rejeição impede a autorização; denegação decorre de irregularidade fiscal; autorização não comprova a realização da operação.
ESTRUTURA, CHAVE E EVENTOS: O XML concentra os dados fiscais; a chave individualiza a NF-e e permite consulta. Eventos registram fatos relacionados ao documento, como cancelamento, carta de correção e manifestação do destinatário. Emitente e destinatário devem guardar o arquivo pelo prazo legal.
DANFE: O Documento Auxiliar da NF-e não é nota fiscal e não substitui o XML. Ele contém chave de acesso e representação resumida dos dados, auxilia o trânsito da mercadoria e pode servir de suporte para registro de ocorrências relativas à entrega.
EFD ICMS/IPI E TESTES DE AUDITORIA: A EFD reúne documentos fiscais, entradas, saídas, inventário, produção, estoque, apuração e CIAP em blocos e registros hierarquizados. A auditoria cruza NF-e e EFD, entradas e estoques, saídas e receitas, inventário e movimentação, créditos e documentação, apuração e recolhimentos. Quebras de sequência, cancelamentos escriturados, chaves inexistentes e duplicidades exigem investigação.
COMO CAI EM PROVA: A prova costuma cobrar conceitos literais do SPED e da NF-e, diferenças entre NF-e e DANFE, etapas de emissão, eventos e finalidade dos registros da EFD. Pegadinhas comuns: • tratar o DANFE como documento fiscal eletrônico; • afirmar que a autorização comprova a ocorrência material da operação; • dizer que o SPED elimina deveres de guarda e sigilo; • confundir rejeição, denegação e cancelamento; • analisar registros isoladamente, sem cruzar documentos, estoque e apuração; • trocar a finalidade dos blocos e controles da EFD. Como resolver: Identifique a camada cobrada: documento eletrônico, representação auxiliar, evento ou escrituração. Reconstrua o fluxo e procure a fonte independente que confirma cada informação. Em auditoria digital, coerência entre bases vale mais que um registro isolado.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/kIRGOu8yVak%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/R0cmRWKpJ6M%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=427291&desatualizada=0&anulada=0&query=nf-e&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Legislação Tributária', subject: 'LC n. 227/2026 - CGIBS: Disposições Gerais e Competências', type: 'teoria', studyTip: `Dicas:
O CGIBS é entidade pública de caráter técnico e operacional, sob regime especial, com sede e foro no Distrito Federal e independência técnica, administrativa, orçamentária e financeira.
Independência não significa ausência de controle ou prestação de contas. Significa inexistência de vinculação, tutela ou subordinação hierárquica a outro órgão da Administração.
Grave o núcleo do art. 2º: regulamento único e uniformização; arrecadação, compensações, retenções e distribuição; decisão do contencioso administrativo.
Os entes exercem integradamente, por meio do CGIBS, as competências administrativas relativas ao IBS. A execução fiscal continua compartilhada com administrações tributárias e procuradorias nos limites legais.
Não transfira automaticamente competências da CBS ao CGIBS. Nas regras comuns, há atuação coordenada com o Poder Executivo federal para harmonizar normas, interpretações, obrigações e procedimentos.
Em fiscalização e cobrança, separe coordenação do CGIBS, atuação dos entes e destinação de multas e juros. A banca tende a concentrar a troca justamente nesses sujeitos.

Resumo do conteúdo:
NATUREZA E POSIÇÃO INSTITUCIONAL: A LC n. 227/2026 institui o Comitê Gestor do IBS como entidade pública de caráter técnico e operacional, sob regime especial, com sede e foro no Distrito Federal. Sua independência é técnica, administrativa, orçamentária e financeira e sua atuação não se submete a vinculação, tutela ou hierarquia de outro órgão. O CGIBS define diretrizes e coordena a atuação integrada das administrações tributárias e procuradorias dos Estados, do Distrito Federal e dos Municípios, preservadas as competências de cada ente.
COMPETÊNCIAS ADMINISTRATIVAS CENTRAIS: Os entes exercem exclusivamente por meio do CGIBS três núcleos de competências relativas ao IBS: editar regulamento único e uniformizar interpretação e aplicação da legislação; arrecadar, compensar, reter e distribuir o produto da arrecadação; e decidir o contencioso administrativo. A centralização administrativa busca conferir uniformidade nacional ao imposto compartilhado, sem retirar a participação federativa prevista na Constituição e na lei complementar.
HARMONIZAÇÃO ENTRE IBS E CBS: Nas matérias comuns, o CGIBS atua com o Poder Executivo federal para harmonizar normas, interpretações, obrigações acessórias e procedimentos do IBS e da CBS. Também há compartilhamento de informações e possibilidade de atos conjuntos, de modo a reduzir soluções divergentes para tributos construídos sobre regras comuns.
OUTRAS ATRIBUIÇÕES: O Comitê coordena fiscalização, cobrança e inscrição em dívida, administra regimes específicos, promove educação fiscal, cuida de sua gestão orçamentária e financeira e presta contas aos órgãos de controle. Pode receber servidores das administrações tributárias dos entes e estruturar atividades administrativas conforme a lei.
FISCALIZAÇÃO COMPARTILHADA: A fiscalização do IBS é exercida pelas administrações tributárias dos entes, de forma integrada e sob coordenação do CGIBS. Procedimentos podem envolver atuação conjunta e compartilhamento de resultados, evitando duplicidade e decisões contraditórias.
COBRANÇA E REPRESENTAÇÃO: A cobrança administrativa e judicial, a representação e a inscrição em dívida ativa observam a coordenação definida na LC n. 227/2026 e a atuação das procuradorias competentes. Multas e juros seguem a destinação legal, razão pela qual a prova pode separar o produto do imposto dos acréscimos decorrentes da atuação fiscal.
COMO CAI EM PROVA: Como a lei é recente, espere cobrança literal sobre natureza, independência, competências e coordenação federativa. Pegadinhas comuns: • subordinar o CGIBS à Receita Federal, à PGFN ou ao Congresso Nacional; • concluir que independência elimina controle externo e prestação de contas; • atribuir ao Comitê a administração exclusiva da CBS; • retirar dos entes toda atuação fiscal e de cobrança; • trocar coordenação por execução exclusiva; • omitir o contencioso administrativo entre as competências centrais. Como resolver: Separe a questão em quatro colunas mentais: natureza do órgão, competência administrativa central, atividade executada pelos entes e coordenação com a União. Verbos como coordenar, uniformizar, arrecadar, distribuir e decidir precisam ser ligados ao sujeito correto.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/ABX5OD4mpyU%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/sU2X8x%2BUHcQ%3D' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Economia', subject: 'Falhas do Mercado: Externalidades, Assimetria de Informação e Relação Agente-Principal', type: 'teoria', studyTip: `Dicas:
Falha de mercado não significa ausência total de mercado. Significa que o equilíbrio descentralizado não produz alocação eficiente, geralmente porque preços não incorporam todos os custos, benefícios ou informações.
Em externalidade negativa, o custo marginal social supera o privado; na positiva, o benefício marginal social supera o privado. Antes de escolher imposto ou subsídio, identifique quem gera e quem recebe o efeito externo.
O imposto de Pigou busca internalizar o custo externo. Ele não é punição arbitrária: aproxima o incentivo privado do custo social na quantidade eficiente.
O Teorema de Coase depende de direitos de propriedade definidos e custos de transação baixos. A distribuição inicial dos direitos pode afetar renda, embora a barganha eficiente seja possível sob as hipóteses.
Seleção adversa ocorre antes do contrato, por informação oculta; risco moral ocorre depois, por ação ou comportamento não observado. Essa linha temporal resolve grande parte das questões.
Na relação agente-principal, contratos, monitoramento e incentivos tentam alinhar interesses. Nenhum mecanismo elimina gratuitamente assimetria: sempre há custo, risco residual ou trade-off. 110 Resumo do conteúdo:
POR QUE O MERCADO FALHA: O mercado é eficiente quando preços transmitem informação relevante e agentes internalizam custos e benefícios de suas escolhas. Externalidades, bens públicos, poder de mercado e informação assimétrica rompem essas condições. O resultado pode apresentar produção excessiva, produção insuficiente, exclusão ineficiente ou transações que deixam de ocorrer.
EXTERNALIDADES E EFICIÊNCIA: Externalidade é o efeito da ação de produtor ou consumidor sobre terceiro que não entra no preço. Na externalidade negativa, como poluição, o custo social inclui custo privado e dano externo; o mercado produz acima do nível eficiente. Na positiva, como vacinação ou educação, o benefício social excede o privado; o mercado tende a produzir abaixo do nível eficiente.
IMPOSTO DE PIGOU E INTERVENÇÃO: O tributo pigouviano procura igualar incentivo privado e custo social marginal. Para externalidade positiva, subsídios podem aproximar benefício privado e social. Regulação direta, padrões, licenças negociáveis e definição de direitos são alternativas; a escolha depende de informação, fiscalização, custos administrativos e possibilidade de mensurar o dano.
TEOREMA DE COASE: Com direitos de propriedade bem definidos, poucos agentes e custos de transação desprezíveis, as partes podem negociar e alcançar resultado eficiente, independentemente da alocação inicial do direito. Na prática, busca, negociação, monitoramento, comportamento estratégico e grande número de envolvidos limitam a solução privada. O teorema explica quando a barganha funciona; não afirma que o Estado nunca seja necessário.
ASSIMETRIA DE INFORMAÇÃO: Na seleção adversa, uma característica privada existe antes da contratação: maus riscos têm maior incentivo para participar e podem expulsar bons riscos. Sinalização parte do agente informado, como certificado; triagem parte do menos informado, como menu de contratos. Garantias, franquias e reputação ajudam a separar tipos. Risco moral surge depois do contrato quando uma parte altera comportamento porque não suporta integralmente suas consequências. Seguro pode reduzir cuidado; gestor pode assumir risco excessivo; empregado pode diminuir esforço. Coparticipação, monitoramento, remuneração variável e cláusulas contratuais mitigam o problema.
AGENTE-PRINCIPAL E DESENHO DE CONTRATOS: O principal delega tarefa ao agente, mas objetivos e informação não coincidem. O contrato deve equilibrar participação, incentivos, compartilhamento de risco e custo de monitoramento. Remuneração por desempenho pode alinhar interesses, porém também induzir foco excessivo em indicadores incompletos. A solução eficiente minimiza custos de agência, não promete controle perfeito.
COMO CAI EM PROVA: A prova apresenta situações concretas e pede a falha, o momento da assimetria ou o instrumento corretivo. Pegadinhas comuns: • chamar todo efeito sobre terceiros de externalidade, mesmo quando o preço já o incorpora; • inverter custo privado e custo social; • usar subsídio para externalidade negativa sem justificativa; • aplicar Coase com custos de transação elevados; • trocar seleção adversa por risco moral; • dizer que sinalização é iniciativa da parte desinformada; • supor que incentivo mais forte sempre melhora o contrato. Como resolver: Desenhe a linha do tempo: antes ou depois do contrato. Nas externalidades, compare quantidade de mercado e quantidade socialmente eficiente. Na agência, identifique quem decide, quem observa e quem suporta o risco.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/hTHUxS0EVl8%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403968&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Direito Empresarial', subject: 'Sociedade Anônima - Parte I', type: 'teoria', studyTip: `Dicas:
Sociedade por ações é gênero que inclui sociedade anônima e comandita por ações. Capital dividido em ações e constituição por estatuto são características centrais.
Na S.A., a responsabilidade do acionista limita-se ao preço de emissão das ações subscritas ou adquiridas. Não confunda preço de emissão com valor nominal, patrimonial ou de mercado.
A companhia é sempre empresária, qualquer que seja seu objeto. Sua denominação deve conter “companhia” ou “sociedade anônima”, mas “companhia” não pode aparecer ao final.
Companhia aberta admite valores mobiliários negociados no mercado e se submete à disciplina da CVM; companhia fechada não acessa publicamente esse mercado.
A constituição exige requisitos preliminares e formalidades próprias. Separe subscrição pública, sujeita à autorização e intermediação, da subscrição particular.
Capital autorizado, aumento de capital e valor das ações são temas diferentes. Leia o enunciado procurando exatamente qual decisão societária está em jogo.

Resumo do conteúdo:
SOCIEDADES POR AÇÕES: A Lei n. 6.404/1976 disciplina as sociedades por ações: sociedade anônima e comandita por ações. O capital é dividido em ações, o ato constitutivo é o estatuto e prevalece o caráter institucional e de capital, em contraste com sociedades contratuais centradas na pessoa dos sócios.
CARACTERÍSTICAS DA SOCIEDADE ANÔNIMA: A companhia possui capital dividido em ações e responsabilidade dos acionistas limitada ao preço de emissão das ações subscritas ou adquiridas. Ela é sempre empresária, independentemente do objeto social. A denominação deve ser acompanhada de “companhia” ou “sociedade anônima”, por extenso ou de forma abreviada. A expressão “companhia” não pode ser utilizada ao final. Nome de fundador, acionista ou pessoa relevante pode integrar a denominação.
COMPANHIA ABERTA E FECHADA: A companhia é aberta quando seus valores mobiliários são admitidos à negociação no mercado de valores mobiliários; é fechada quando não há essa admissão. A companhia aberta depende de registro e se sujeita à fiscalização e às normas da Comissão de Valores Mobiliários.
MERCADO DE VALORES MOBILIÁRIOS: O mercado pode compreender negociação em bolsa e em balcão, conforme estrutura e regras aplicáveis. A abertura de capital amplia acesso à poupança pública, mas impõe deveres mais intensos de informação, transparência e governança.
CONSTITUIÇÃO DA COMPANHIA: Entre os requisitos preliminares estão subscrição das ações em que se divide o capital, realização da entrada legal e depósito da parcela em dinheiro. A constituição por subscrição pública envolve colocação perante investidores, registro da emissão e intermediação de instituição financeira. Na subscrição particular, a formação ocorre por assembleia de fundação ou escritura pública, conforme a lei.
CAPITAL SOCIAL: O estatuto fixa o capital social, expresso em moeda nacional, e define a divisão em ações. Bens utilizados na integralização devem ser avaliados segundo o procedimento legal. O estatuto pode conter autorização para aumento do capital até limite determinado, hipótese de capital autorizado. Preço de emissão é o valor pago na subscrição; valor nominal decorre da divisão prevista quando existente; valor patrimonial relaciona patrimônio líquido e número de ações; valor de mercado resulta da negociação. Essas grandezas não são equivalentes.
COMO CAI EM PROVA: A cobrança costuma explorar conceitos básicos da Lei das S.A., responsabilidade, nome empresarial, classificação aberta/fechada, constituição e capital. Pegadinhas comuns: • dizer que toda sociedade por ações é sociedade anônima; • limitar responsabilidade pelo valor nominal, e não pelo preço de emissão; • tratar a S.A. como sociedade simples conforme seu objeto; • permitir “companhia” no final da denominação; • confundir companhia aberta com sociedade que possui muitos acionistas; • misturar subscrição pública e particular. Como resolver: Comece classificando o instituto: gênero, tipo societário, forma de captação ou valor da ação. Nas questões de constituição, monte a sequência dos requisitos e identifique se houve acesso à poupança pública. Nas questões de valores, escreva ao lado: emissão, nominal, patrimonial ou mercado.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/aSxpa1DIHng%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/49xf83k7bGA%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=406949&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Tecnologia da Informação', subject: 'Lei Geral de Proteção de Dados Pessoais - LGPD', type: 'teoria', studyTip: `Dicas:
Dado pessoal se refere a pessoa natural identificada ou identificável. Dado sensível é categoria legal específica, não qualquer informação considerada íntima.
Consentimento é apenas uma das bases legais. Antes de apontar ilicitude, verifique obrigação legal, contrato, tutela da saúde, legítimo interesse e demais hipóteses.
Controlador decide; operador trata dados em seu nome; encarregado atua como canal de comunicação. A banca troca esses papéis com frequência.
Anonimização afasta a incidência da LGPD quando não houver possibilidade razoável de reversão. Pseudonimização reduz associação direta, mas não torna automaticamente o dado anônimo.
Os princípios funcionam como teste de conformidade: finalidade, adequação, necessidade, livre acesso, qualidade, transparência, segurança, prevenção, não discriminação e responsabilização.

Resumo do conteúdo:
OBJETO, APLICAÇÃO E EXCEÇÕES: A LGPD disciplina o tratamento de dados pessoais, inclusive em meios digitais, realizado por pessoa natural ou jurídica de direito público ou privado, para proteger liberdade, privacidade e livre desenvolvimento da personalidade. Suas normas gerais são de interesse nacional. 115 A incidência depende das condições territoriais e materiais previstas em lei. Há exceções, como tratamento por pessoa natural para fins exclusivamente particulares e não econômicos e atividades sujeitas a regimes próprios, inclusive segurança pública e defesa nacional.
CONCEITOS ESSENCIAIS: Dado pessoal se relaciona a pessoa natural identificada ou identificável. Dado sensível abrange origem racial ou étnica, convicção religiosa, opinião política, filiação sindical ou a organização religiosa, filosófica ou política, saúde, vida sexual e dado genético ou biométrico vinculado à pessoa. Tratamento abrange operações como coleta, acesso, utilização, armazenamento, compartilhamento, eliminação e controle. Anonimização busca impedir identificação por meios técnicos razoáveis; pseudonimização mantém informação adicional separada e controlada.
PRINCÍPIOS E BASES LEGAIS: O tratamento deve respeitar boa-fé e princípios como finalidade, adequação, necessidade, transparência, segurança e responsabilização. As bases legais autorizam o tratamento em situações específicas. Consentimento deve ser livre, informado e inequívoco, mas não é requisito universal. Dados sensíveis possuem hipóteses próprias de tratamento. Crianças e adolescentes recebem proteção específica, orientada pelo melhor interesse e pelas condições legais aplicáveis.
DIREITOS DO TITULAR: O titular pode obter confirmação e acesso, correção, anonimização, bloqueio ou eliminação em hipóteses legais, portabilidade, informação sobre compartilhamento, revogação do consentimento e revisão de decisões tomadas unicamente com base em tratamento automatizado, nos termos da lei.
PODER PÚBLICO E TRANSFERÊNCIA INTERNACIONAL: O Poder Público deve atender finalidade pública e competência legal. Transferência internacional exige hipótese como proteção adequada, garantias, cooperação ou consentimento específico.
AGENTES, SEGURANÇA E RESPONSABILIDADE: Controlador decide; operador trata em seu nome; encarregado comunica-se com titulares e ANPD. Os agentes adotam segurança e comunicam incidentes relevantes. A responsabilidade depende do papel, da conduta e das excludentes.
ANPD E SANÇÕES: A ANPD regulamenta, orienta, fiscaliza e sanciona mediante processo administrativo. Há advertência, multa, publicização, bloqueio, eliminação e outras medidas, consideradas gravidade, boa-fé, reincidência e cooperação.
COMO CAI EM PROVA: A prova cobra sobretudo conceitos do art. 5º, princípios, bases legais, direitos do titular, papéis dos agentes, aplicação da lei e sanções. Pegadinhas comuns: • aplicar a LGPD apenas a empresas privadas ou apenas a meios digitais; • exigir consentimento em todo tratamento; • confundir controlador, operador e encarregado; • equiparar pseudonimização a anonimização ou afirmar que dado anonimizado permanece sempre sujeito à LGPD; • tratar sanção administrativa como única forma de responsabilização. Como resolver: Identifique dado, operação, agente e base jurídica; depois teste finalidade, necessidade e transparência. Termos como “sempre” e “somente mediante consentimento” costumam revelar generalizações incompatíveis com a lei.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/UjSelN1ERZg%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=404802%2C2932&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Economia', subject: 'Externalidades, Bens Públicos, Recursos Comuns e Funções do Estado', type: 'teoria', studyTip: `Dicas:
Classifique bens por duas perguntas: é possível excluir quem não paga? O consumo de uma pessoa reduz o disponível para outra? Excludente/rival é a matriz que organiza todo o tema.
Bem público puro é não rival e não excludente. Não confunda “bem fornecido pelo governo” com bem público econômico: um serviço estatal pode ser rival ou excludente.
O carona usufrui sem pagar e enfraquece o incentivo à provisão privada. Já a tragédia dos comuns decorre do uso excessivo de recurso rival e não excludente.
Externalidade negativa desloca a análise do custo privado para o custo social; positiva desloca do benefício privado para o social. Sempre identifique a quantidade eficiente.
Tetos e pisos de preços não corrigem automaticamente externalidades. Verifique se a política atinge a causa da falha ou apenas altera o preço observado.
As funções alocativa, distributiva e estabilizadora do Estado têm finalidades diferentes. Falha de mercado justifica atuação alocativa; desigualdade remete à distributiva; inflação e desemprego, à estabilizadora.

Resumo do conteúdo:
EXTERNALIDADES E INTERNALIZAÇÃO: Externalidades fazem custos ou benefícios sociais divergirem dos privados. Na negativa, a curva de custo marginal social fica acima da privada e o mercado oferece quantidade excessiva. Na positiva, o benefício marginal social supera o privado e a quantidade de mercado é insuficiente. Impostos, subsídios, regulação, licenças e negociação são instrumentos possíveis.
PIGOU E COASE: O imposto de Pigou procura cobrar por unidade o dano marginal externo na quantidade eficiente; o subsídio pode incentivar atividade com benefício externo. Coase mostra que direitos claros e custos de transação baixos permitem barganha privada. Número de partes, informação, fiscalização e poder de negociação determinam a viabilidade real da solução.
CLASSIFICAÇÃO DOS BENS: Bem privado é rival e excludente. Bem de clube é não rival até certo ponto, mas excludente. Recurso comum é rival e não excludente. Bem público puro é não rival e não excludente. Rivalidade diz respeito ao consumo; exclusão, à possibilidade de impedir acesso. A natureza econômica pode mudar com tecnologia, congestionamento e instituições.
CARONA E RECURSOS COMUNS: No bem público, o indivíduo pode ocultar sua disposição a pagar e esperar que outros financiem a oferta, gerando subprovisão. No recurso comum, cada usuário captura benefício privado, mas reparte o custo da exaustão com todos, gerando sobreuso. Soluções incluem propriedade, quotas, regulação, cobrança, monitoramento e gestão comunitária.
FUNÇÕES ECONÔMICAS DO ESTADO: A função alocativa corrige falhas e provê bens que o mercado oferta inadequadamente. A distributiva altera a distribuição de renda por tributos, transferências e gasto público. A estabilizadora atua sobre produto, emprego, inflação e ciclo econômico. Uma política pode cumprir mais de uma função, mas a questão geralmente pede a finalidade predominante.
CRESCIMENTO DAS DESPESAS PÚBLICAS: Urbanização, demanda por serviços sociais, envelhecimento, complexidade econômica, expansão administrativa e desenvolvimento elevam gastos públicos. A Lei de Wagner associa desenvolvimento ao crescimento da participação estatal. O efeito deslocamento destaca saltos de gasto em crises, que podem não retornar integralmente ao nível anterior.
COMO CAI EM PROVA: A banca combina conceitos com exemplos e gráficos de custo e benefício. Pegadinhas comuns: • definir bem público como qualquer bem estatal; • trocar rivalidade por exclusão; • classificar recurso comum como não rival; • confundir carona com tragédia dos comuns; • afirmar que imposto pigouviano elimina qualquer dano; • aplicar Coase sem direitos definidos; • associar combate à inflação à função distributiva. Como resolver: Faça a matriz rivalidade x exclusão antes de nomear o bem. Em externalidades, escreva privado e social ao lado de custo ou benefício. Nas funções do Estado, pergunte qual problema a política tenta corrigir.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/83qDpoPf%2Fps%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=412893&desatualizada=0&anulada=0&query=externalidade&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Direito Administrativo', subject: 'Lei n. 14.133/2021 - Contratos Administrativos', type: 'teoria', studyTip: `Dicas:
O contrato administrativo combina cláusulas pactuadas com prerrogativas legais da Administração. Direito privado aplica-se apenas supletivamente.
Diferencie reajuste, repactuação e revisão. O reajuste recompõe inflação por índice; a repactuação analisa variação de custos em serviços contínuos com dedicação de mão de obra; a revisão recompõe equilíbrio diante de eventos extraordinários.
Alteração unilateral possui hipóteses e limites. A Administração não pode usar sua prerrogativa para modificar livremente o equilíbrio econômico-financeiro ou descaracterizar o objeto.
Fiscalização não transfere à Administração a responsabilidade integral do contratado. O contratado continua responsável pela execução e pelos danos nos termos legais.
Extinção, nulidade e sanção não são sinônimos. Cada instituto possui pressupostos, procedimento, efeitos e garantias próprios.
Em qualquer questão, localize a fase: formação, eficácia, duração, execução, alteração, recebimento, extinção ou penalidade. Isso elimina boa parte das alternativas.

Resumo do conteúdo:
REGIME E FORMALIZAÇÃO: Os contratos da Lei n. 14.133/2021 regem-se por suas cláusulas e pelos preceitos de direito público, com aplicação supletiva da teoria geral dos contratos e do direito privado. Devem identificar partes, finalidade, autorização, processo e condições claras de execução, direitos, obrigações e responsabilidades. 120 A convocação do vencedor observa prazo e condições do edital. A recusa injustificada pode gerar perda do direito e sanção, enquanto a Administração pode convocar remanescentes nas condições e sequência legais.
EQUILÍBRIO ECONÔMICO-FINANCEIRO: O equilíbrio preserva a relação entre encargos e remuneração originalmente pactuada. Reajuste aplica índice após o interregno; repactuação demonstra variação de custos em contratos de serviços contínuos nas hipóteses próprias; revisão ou recomposição enfrenta fatos imprevisíveis, previsíveis de consequências incalculáveis, força maior, caso fortuito ou fato do príncipe.
EFICÁCIA, INSTRUMENTO E GARANTIA: A divulgação no PNCP é condição de eficácia nos termos legais. O instrumento de contrato é obrigatório nas hipóteses previstas e pode ser substituído por instrumentos equivalentes quando a lei admite. A garantia depende de previsão e escolha entre modalidades legais, respeitados percentuais e regimes específicos.
ALOCAÇÃO DE RISCOS E PRERROGATIVAS: A matriz de riscos distribui responsabilidades por eventos supervenientes. Entre as prerrogativas da Administração estão modificar e extinguir unilateralmente nas hipóteses legais, fiscalizar, aplicar sanções e ocupar provisoriamente bens ou pessoal em situações previstas. Essas prerrogativas não eliminam motivação, contraditório, limites quantitativos e dever de preservar o equilíbrio econômico-financeiro.
DURAÇÃO E EXECUÇÃO: A duração depende da natureza do objeto, disponibilidade orçamentária e hipóteses de prorrogação. Serviços e fornecimentos contínuos, contratos de escopo e contratos que geram receita possuem regras próprias. A execução deve ser acompanhada e fiscalizada por representantes designados. O contratado deve corrigir vícios, manter condições exigidas e responder pela execução. Alterações podem ser unilaterais ou consensuais conforme objeto, quantidade, regime e necessidade de recomposição.
EXTINÇÃO, RECEBIMENTO E SANÇÕES: A extinção exige hipótese legal, motivação e observância das garantias. O recebimento provisório e definitivo não afasta responsabilidades previstas. Infrações podem gerar advertência, multa, impedimento de licitar e contratar e declaração de inidoneidade, aplicadas segundo gravidade, competência e processo. Nulidade requer avaliação das consequências e do interesse público; nem toda ilegalidade conduz automaticamente à paralisação imediata sem exame dos efeitos.
COMO CAI EM PROVA: A banca cobra literalidade da Lei n. 14.133/2021, distinção entre institutos e limites das prerrogativas administrativas. Pegadinhas comuns: • aplicar direito privado como regime principal; • confundir reajuste, repactuação e revisão; • considerar ilimitada a alteração unilateral; • afirmar que fiscalização elimina responsabilidade do contratado; • confundir extinção unilateral com aplicação automática de sanção; • tratar nulidade como solução sem avaliação de consequências. Como resolver: Identifique evento e momento contratual; verifique quem decide, os limites e o impacto no equilíbrio. Em sanções, associe infração, gravidade, autoridade e defesa.` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/JxU381GUNTw%3D' },
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/%2FY8SFnOx3vQ%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=404429&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Legislação Tributária', subject: 'LC n. 227/2026 - CGIBS: Estrutura Organizacional', type: 'teoria', studyTip: `Dicas:
Memorize a estrutura básica como um mapa, não como lista solta: Conselho Superior; Presidência e Vice-Presidência; Diretoria Executiva e diretorias; Secretaria-Geral; Assessoria; Corregedoria; Auditoria Interna.
O Conselho Superior é o centro deliberativo. Presidência e Diretoria Executiva não absorvem automaticamente suas competências.
A composição do Conselho traduz o caráter federativo do IBS. Leia com atenção paridade, representação e forma de deliberação entre Estados, Distrito Federal e Municípios.
Sigilo fiscal permanece mesmo após o desligamento. A lei também disciplina conflitos de interesse durante o exercício e no período posterior.
Corregedoria e Auditoria Interna integram a estrutura básica; não são unidades externas ou meramente facultativas.
Em cada órgão, ligue três elementos: composição, escolha do titular e competência. A banca costuma conservar dois e trocar o terceiro.

Resumo do conteúdo:
ESTRUTURA ORGANIZACIONAL BÁSICA: Integram o CGIBS o Conselho Superior; Presidência e Vice-Presidência; Diretoria Executiva e suas diretorias; Secretaria-Geral; Assessoria de Relações Institucionais e Interfederativas; Corregedoria; e Auditoria Interna. A estrutura reúne funções deliberativas, executivas, administrativas, de assessoramento e de controle.
SIGILO E CONFLITO DE INTERESSES: Membros, empregados e servidores devem proteger informações fiscais, garantindo confidencialidade e integridade. O dever continua após o desligamento e seu descumprimento pode gerar responsabilidades em diferentes esferas. A lei descreve conflitos no exercício, como uso de informação privilegiada, atuação em interesse privado incompatível e recebimento indevido de vantagens. Também prevê restrições após o exercício, inclusive quarentena em hipóteses legais.
CONSELHO SUPERIOR: O Conselho Superior é órgão máximo de deliberação e representa Estados, Distrito Federal e Municípios segundo o modelo federativo estabelecido na Constituição e na LC n. 227/2026. Sua composição, indicação dos representantes, mandatos, impedimentos e regras de votação devem ser estudados em conjunto. 123 Entre suas competências estão aprovar normas, diretrizes, orçamento, organização interna e decisões estratégicas do Comitê, além de exercer atribuições expressamente reservadas pela lei.
PRESIDÊNCIA E VICE-PRESIDÊNCIA: A Presidência representa o CGIBS, conduz o Conselho e pratica atos de direção previstos. A Vice-Presidência substitui e auxilia conforme a lei e o regimento. Não se deve presumir que funções executivas autorizem rever livremente deliberações do Conselho.
SECRETARIA-GERAL E ASSESSORIA: A Secretaria-Geral presta suporte ao funcionamento institucional, aos colegiados e aos atos administrativos. A Assessoria de Relações Institucionais e Interfederativas articula o Comitê com entes e instituições, coerentemente com a natureza compartilhada do IBS.
CORREGEDORIA E AUDITORIA INTERNA: A Corregedoria atua na integridade disciplinar, orientação e apuração nos limites legais. A Auditoria Interna avalia controles, governança e gestão de riscos, preservada sua função de controle dentro da estrutura.
DIRETORIA EXECUTIVA E DIRETORIAS: A Diretoria Executiva implementa diretrizes e coordena a administração operacional. As diretorias subordinadas distribuem funções especializadas, como arrecadação, fiscalização, tributação, contencioso, tecnologia, tesouraria e atividades administrativas, conforme a organização legal e regimental.
COMO CAI EM PROVA: A tendência é cobrança literal da LC n. 227/2026, com foco na composição da estrutura e na distribuição de competências. Pegadinhas comuns: • excluir Corregedoria ou Auditoria Interna da estrutura básica; • afirmar que o sigilo termina com o desligamento; • trocar Conselho Superior por Diretoria Executiva como órgão deliberativo máximo; • ignorar o caráter federativo da composição; • confundir controle interno, atividade correcional e gestão executiva; • atribuir a um órgão competência reservada a outro. 124 Como resolver: Desenhe o organograma em três níveis: deliberação, direção/execução e apoio/controle. Em seguida, associe a cada unidade seu verbo principal. Quando a alternativa deslocar uma competência, confira se o órgão proposto possui função deliberativa, executiva, correcional ou de auditoria.` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/ABX5OD4mpyU%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/4SVQiY958%2B0%3D' },
    ]);
    
    console.log('Week 13 seed completed successfully!');
  }


  if (!existingWeeks.some(w => w.number === 15)) {
    console.log('Seeding Week 15...');
    
    // Create Week 15
    const insertedWeek = await db.insert(weeks).values({
      number: 15,
      title: 'Semana 15'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Revisão Geral', subject: 'Todas as disciplinas da semana', type: 'revisao' }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Direito Empresarial' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Economia' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Legislação Tributária' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Economia' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Estatística' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Legislação Tributária' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Economia' },
      { goalId: meta1[0].id, type: 'tarefa', description: 'Revisar Direito Administrativo' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Direito Empresarial', subject: 'Sociedade Anônima - Parte III: Acionistas, Órgãos Sociais, Administração e Demonstrações', type: 'teoria', studyTip: `Dicas:
O dever básico do acionista é integralizar as ações subscritas. A mora é de pleno direito e pode gerar execução, venda das ações em bolsa ou declaração de caducidade; não presuma exclusão automática.
Os direitos essenciais do art. 109 da Lei n. 6.404/1976 não podem ser afastados pelo estatuto nem pela assembleia. Faça uma lista própria: lucros, acervo, fiscalização, preferência e retirada.
No acordo de acionistas, identifique as matérias que podem ser vinculadas e o efeito do arquivamento na sede. Em prova, a banca costuma misturar validade entre as partes, oponibilidade à companhia e execução específica.
Separe os órgãos: assembleia delibera; conselho de administração orienta e fiscaliza; diretoria representa e executa; conselho fiscal controla a legalidade e as contas. Não transfira competências de um para outro.
Administrador não responde pessoalmente por obrigação regular da companhia. A responsabilidade aparece quando atua com culpa ou dolo dentro de suas atribuições ou viola lei ou estatuto.
Em demonstrações e dividendos, organize a sequência: resultado do exercício, prejuízos acumulados, provisão do IR, participações, reservas e dividendo. A banca explora percentuais e hipóteses de omissão estatutária. 157 Resumo do conteúdo:
ACIONISTA, INTEGRALIZAÇÃO E MORA: Acionista é o titular de ações da companhia. Sua principal obrigação é realizar a prestação correspondente às ações subscritas ou adquiridas, nas condições do estatuto ou do boletim. Se ambos forem omissos, a administração efetua chamada por avisos publicados ao menos três vezes e concede prazo não inferior a trinta dias. O inadimplemento constitui o acionista em mora de pleno direito, sujeitando-o a juros, correção e multa estatutária limitada a 10% da prestação. A companhia pode executar o valor, vender as ações em bolsa por conta e risco do remisso ou, frustradas as medidas, declará- -las caducas. Sem lucros ou reservas suficientes, há prazo para colocar as ações em comisso e, não encontrado comprador, reduzir o capital.
DIREITOS ESSENCIAIS E DIREITO DE RETIRADA: Nem estatuto nem assembleia podem retirar do acionista os direitos de participar dos lucros e do acervo na liquidação, fiscalizar a gestão, ter preferência nas emissões previstas em lei e retirar-se nas hipóteses legais. O recesso permite ao dissidente sair da companhia mediante reembolso quando ocorre deliberação legalmente qualificada; não é direito genérico diante de qualquer discordância.
ACORDO DE ACIONISTAS E PODER DE CONTROLE: O acordo pode disciplinar compra e venda de ações, preferência, exercício do voto e poder de controle. Arquivado na sede, vincula a companhia nos termos legais; a execução específica protege a obrigação assumida. Acionista controlador é quem, de modo permanente, usa a maioria dos votos para dirigir as atividades e eleger a maioria dos administradores. O poder deve servir ao objeto e à função social da companhia; abuso gera responsabilidade.
ÓRGÃOS DA COMPANHIA: A assembleia geral possui competência para matérias estruturais, eleição e destituição, contas, reformas estatutárias e reorganizações. Pode ser ordinária, quando aprecia matérias periódicas, ou extraordinária. O conselho de administração é órgão colegiado de deliberação e supervisão; a diretoria administra e representa a sociedade. O conselho fiscal fiscaliza atos, examina demonstrações e emite pareceres, sem assumir a gestão.
DEVERES E RESPONSABILIDADE DOS ADMINISTRADORES: Os administradores devem atuar com diligência, lealdade, informação e finalidade compatível com o interesse da companhia. Conflito de interesses exige abstenção. A responsabi158 lidade não decorre simplesmente do cargo: exige ato irregular, culpa ou dolo, violação legal ou estatutária e nexo com o dano, consideradas as hipóteses de solidariedade e exclusão previstas na lei.
DEMONSTRAÇÕES, LUCROS E DIVIDENDOS: Ao fim do exercício, a administração elabora as demonstrações exigidas, acompanhadas das notas e informações pertinentes. A destinação do lucro observa absorção de prejuízos, tributos, participações, reservas e dividendo obrigatório. Reserva legal, reservas estatutárias, contingências, incentivos e retenções possuem finalidades próprias e não podem ser tratadas como caixa livre.
ECONOMIA MISTA, COMANDITA POR AÇÕES E GRUPOS: A sociedade de economia mista submete-se à Lei das S.A. com peculiaridades de criação, controle e interesse público. Na comandita por ações, apenas acionistas podem administrar e os diretores respondem de modo próprio pelas obrigações sociais. Grupos de sociedades decorrem de convenção entre controladora e controladas, sem apagar automaticamente a personalidade de cada integrante.
COMO CAI EM PROVA: A cobrança costuma ser literal e comparativa, com foco em direitos essenciais, competências dos órgãos, deveres dos administradores e destinação do resultado. Pegadinhas comuns: • afirmar que o acionista remisso é excluído automaticamente; • permitir que estatuto suprima direito essencial; • confundir acordo válido entre acionistas com acordo oponível à companhia; • atribuir representação cotidiana ao conselho de administração; • transformar o conselho fiscal em órgão de gestão; • impor responsabilidade objetiva a todo administrador; • confundir dividendo obrigatório com distribuição integral do lucro. Como resolver: Identifique primeiro o sujeito: acionista, controlador, assembleia, conselho, diretoria ou conselho fiscal. Depois procure competência, condição e consequência. Em números, escreva o prazo ou percentual ao lado do instituto antes de avaliar a alternativa.` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/aSxpa1DIHng%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/7KLCoKUTLwk%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=406949&desatualizada=0&anulada=0&query=acionista+orgaos+administracao+demonstracoes+grupo+comandita&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Economia', subject: 'Moeda, Agregados Monetários, Base e Multiplicador', type: 'teoria', studyTip: `Dicas:
Moeda exerce funções de meio de troca, unidade de conta e reserva de valor. Diferencie função econômica de forma física.
Base monetária é passivo monetário do Banco Central; meios de pagamento incluem moeda em poder do público e depósitos utilizáveis para pagamentos.
Bancos criam moeda escritural ao conceder crédito. Eles não criam riqueza real nem multiplicam indefinidamente sem reservas, demanda e regulação.
O multiplicador relaciona meios de pagamento e base monetária. Maior preferência por papel-moeda ou reservas reduz a expansão potencial.
Agregados monetários ampliam progressivamente o conjunto de ativos por liquidez. Memorize a lógica de inclusão antes das listas.
Operações de mercado aberto, recolhimentos compulsórios e redesconto alteram liquidez por canais diferentes. Resumo do conteúdo:
FUNÇÕES E FORMAS DA MOEDA: Como meio de troca, a moeda reduz custos do escambo; como unidade de conta, expressa preços em padrão comum; como reserva de valor, transfere poder de compra no tempo. Liquidez indica facilidade de conversão em meio de pagamento com baixa perda.
BASE MONETÁRIA E MEIOS DE PAGAMENTO: A base reúne papel-moeda em poder do público e reservas bancárias. Os meios de pagamento incluem moeda manual e depósitos de elevada liquidez. A distinção separa moeda emitida pela autoridade da moeda escritural criada pelo sistema bancário.
CRIAÇÃO DE MOEDA E MULTIPLICADOR: Ao receber depósitos e conceder empréstimos, bancos geram novos depósitos. O multiplicador depende da proporção de moeda retida pelo público e das reservas mantidas pelos bancos. Compulsório maior, reservas excedentes ou preferência por espécie reduzem o multiplicador.
AGREGADOS MONETÁRIOS: Os agregados organizam ativos conforme liquidez, do conceito mais restrito ao mais amplo. A composição concreta segue a classificação oficial, mas a lógica é estável: cada agregado incorpora o anterior e acrescenta ativos menos líquidos ou com características de quase-moeda.
INSTRUMENTOS MONETÁRIOS: Compra de títulos pelo Banco Central injeta reservas; venda retira. Compulsórios alteram a capacidade de expansão do crédito. Redesconto fornece liquidez aos bancos e sua taxa influencia o custo de recorrer à autoridade monetária.
COMO CAI EM PROVA: A banca cobra balanços monetários, classificação e efeitos dos instrumentos. Pegadinhas comuns: • incluir reservas bancárias diretamente nos meios de pagamento do público; • confundir base monetária com agregado amplo; • dizer que depósito a prazo possui a mesma liquidez da moeda manual; • inverter compra e venda de títulos; • afirmar que compulsório maior eleva o multiplicador; • tratar criação bancária como ilimitada. Como resolver: Identifique quem detém o ativo e seu grau de liquidez. Nos instrumentos, acompanhe reservas bancárias, crédito e meios de pagamento nessa ordem.` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/LHFpOqSBR3I%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/DsJzF5KXQ7c%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403937&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Legislação Tributária', subject: 'Lei Complementar n. 160/2017 - Convalidação de Benefícios Fiscais de ICMS', type: 'teoria', studyTip: `Dicas:
A LC n. 160/2017 trata de benefícios de ICMS concedidos sem o procedimento exigido. O núcleo é permitir, por convênio, remissão dos créditos e reinstituição dos benefícios ainda vigentes.
Não aplique o quórum unânime da regra geral da LC n. 24/1975. A LC n. 160 criou quórum próprio: dois terços das unidades federadas e um terço das unidades de cada região.
Publicação, registro e depósito dos atos são condições centrais. A banca pode trocar esses requisitos por simples comunicação informal ao CONFAZ.
Os prazos de fruição variam conforme a natureza do benefício. Organize a escada 15-85-3-1 anos e associe cada faixa à atividade correspondente.
A reinstituição não autoriza ampliação ilimitada. Extensão a outros contribuintes e adesão a benefício de outra unidade dependem das condições legais e do mesmo prazo residual.
A lei também afasta efeitos tributários federais específicos ligados à subvenção, desde que cumpridos os requisitos legais; não transforme isso em imunidade geral. Resumo do conteúdo:
FINALIDADE DA LC N. 160/2017: A lei enfrentou incentivos e benefícios fiscais ou financeiro-fiscais de ICMS instituídos em desacordo com a exigência constitucional de deliberação interestadual. Por convênio celebrado nos termos da LC n. 24/1975, Estados e Distrito Federal podem deliberar sobre remissão dos créditos tributários decorrentes desses atos e reinstituição dos benefícios ainda em vigor.
QUÓRUM ESPECIAL: Para aprovação e ratificação do convênio de convalidação, exige-se voto favorável de, no mínimo, dois terços das unidades federadas e um terço das unidades de cada uma das cinco regiões. É uma exceção relevante ao modelo de unanimidade associado à concessão ordinária de benefícios de ICMS.
PUBLICAÇÃO, REGISTRO E DEPÓSITO: As unidades devem publicar em seus diários oficiais os atos normativos concessivos e efetuar registro e depósito no CONFAZ, conforme disciplina do convênio. O cumprimento dessas etapas fornece transparência e delimita os benefícios alcançados. A omissão impede tratar o incentivo como automaticamente convalidado.
PRAZOS DE FRUIÇÃO: Os prazos máximos remanescentes seguem a natureza da atividade: até quinze anos para atividades agropecuárias, industriais e investimentos em infraestrutura; oito anos para atividades portuárias e aeroportuárias vinculadas ao comércio internacional; cinco anos para atividades comerciais, observadas as condições legais; três anos para operações e prestações interestaduais com produtos agropecuários e extrativos vegetais in natura; e um ano para os demais casos.
REINSTITUIÇÃO, EXTENSÃO E ADESÃO: Depois de cumpridas as exigências, o ente pode reinstituir o benefício pelo prazo residual aplicável. A legislação admite, sob condições, extensão a contribuintes do território e adesão a benefícios concedidos por outra unidade da mesma região. Essas medidas não reabrem o prazo original nem autorizam benefício mais amplo que o permitido.
EFEITOS E SEGURANÇA JURÍDICA: A remissão alcança créditos constituídos ou não vinculados aos benefícios abrangidos. A lei procura estabilizar situações passadas sem dispensar o procedimento de publicidade e controle. Também disciplina reflexos de subvenções para investimento na tributação federal, desde que atendidos os requisitos próprios.
COMO CAI EM PROVA: A cobrança é quase sempre literal: objeto, quórum, requisitos, prazos e efeitos. Pegadinhas comuns: • exigir unanimidade para o convênio da LC n. 160; • considerar suficiente a maioria simples; 163 • esquecer o mínimo regional de um terço; • admitir convalidação sem publicação, registro e depósito; • trocar a ordem dos prazos 15-8-5-3-1; • reiniciar integralmente o prazo ao reinstituir; • confundir remissão do crédito com isenção futura automática. Como resolver: Monte três blocos: o que pode ser convalidado, como o convênio é aprovado e por quanto tempo o benefício pode continuar. Em cada alternativa, procure verbo, quórum e prazo; uma troca pequena costuma decidir a questão.` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/CckOCNTYa9I%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/9WRonpI2K5s%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=430492&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Economia', subject: 'Política Fiscal e Monetária no Modelo Keynesiano', type: 'teoria', studyTip: `Dicas:
No modelo keynesiano simples, a demanda efetiva determina o produto no curto prazo. Estoques indesejados sinalizam diferença entre produção e gasto planejado.
Consumo possui parcela autônoma e parcela induzida pela renda disponível. A propensão marginal a consumir fica entre zero e um e determina o tamanho do multiplicador.
O multiplicador dos gastos é positivo; o dos tributos é negativo e, em módulo, geralmente menor. Não aplique fórmulas antes de identificar se há impostos proporcionais, importações ou outras fugas.
Política fiscal desloca a curva IS; política monetária desloca a LM. Alterações da taxa de juros ao longo da própria curva não são deslocamentos. 164 Resumo do conteúdo:
MODELO KEYNESIANO SIMPLIFICADO: No curto prazo, com preços relativamente rígidos e capacidade ociosa, o nível de produção responde à demanda agregada planejada. O equilíbrio ocorre quando produção e despesa planejada coincidem. Se a produção supera a demanda, estoques aumentam involuntariamente e as firmas reduzem o produto; se a demanda supera a produção, ocorre o movimento inverso.
CONSUMO, POUPANÇA E MULTIPLICADOR: A função consumo pode ser escrita como consumo autônomo mais propensão marginal a consumir multiplicada pela renda disponível. A parcela da renda não consumida é poupada. Em modelo básico, o multiplicador dos gastos autônomos é 1 dividido por um menos a propensão marginal a consumir. Impostos, importações e outras fugas reduzem seu valor.
POLÍTICA FISCAL E CURVA IS: A curva IS reúne combinações de renda e juros que equilibram o mercado de bens. Maior gasto público ou menor tributação desloca a IS para a direita; contração fiscal faz o oposto. A inclinação depende da resposta do investimento aos juros e do gasto à renda.
POLÍTICA MONETÁRIA E CURVA LM: A LM representa equilíbrio entre oferta e demanda de moeda. Expansão monetária desloca a LM para a direita ou para baixo, reduzindo juros e elevando renda, mantidas as demais condições. A preferência pela liquidez e a sensibilidade da demanda monetária aos juros influenciam sua inclinação.
EQUILÍBRIO IS-LM E EFEITO EXPULSÃO: O encontro de IS e LM determina renda e juros no modelo. Expansão fiscal pode elevar juros e deslocar investimento privado, produzindo crowding out. Na armadilha da liquidez, a política monetária perde força e a fiscal tende a ser mais eficaz. Em situação clássica, a resposta pode se inverter.
COMO CAI EM PROVA: A prova cobra equilíbrio, multiplicadores, deslocamentos das curvas e eficácia comparada das políticas. Pegadinhas comuns: • trocar gasto planejado por produção efetiva; • usar propensão média no lugar da marginal; • dar sinal positivo ao multiplicador tributário; • deslocar IS por alteração da oferta monetária; • chamar movimento sobre a LM de deslocamento; • afirmar que expansão fiscal nunca afeta investimento privado. Como resolver: Identifique primeiro o mercado afetado e a curva que se desloca. Em cálculos, escreva todas as fugas antes de montar o multiplicador. Depois acompanhe a sequência: instrumento, curva, renda, juros e efeitos secundários.` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/LHFpOqSBR3I%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/%2Bf57pdsJTzo%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=413023&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Estatística', subject: 'Intervalos de Confiança', type: 'teoria', studyTip: `Dicas:
Intervalo de confiança estima parâmetro desconhecido. Não significa que determinada amostra tenha probabilidade variável de conter um parâmetro fixo após o cálculo.
Maior nível de confiança produz intervalo mais largo, mantidas as demais condições. Maior amostra reduz a margem de erro. 166 Resumo do conteúdo:
LEIS DOS GRANDES NÚMEROS: As leis dos grandes números estabelecem convergência da média amostral para o valor esperado à medida que a amostra cresce, sob condições apropriadas. A lei fraca trata de convergência em probabilidade; a forte, de convergência quase certa.
TEOREMA CENTRAL DO LIMITE: O TCL afirma que a distribuição padronizada da soma ou média amostral se aproxima da Normal quando o tamanho amostral cresce, sob condições. Ele fundamenta inferência sobre médias mesmo quando a população não é normal.
ESTIMAÇÃO PONTUAL E INTERVALAR: Estimador é regra aplicada à amostra; estimativa é o valor observado. Intervalo de confiança combina estimativa pontual e margem de erro para construir procedimento com nível de confiança definido.
MÉDIA COM VARIÂNCIA CONHECIDA: Quando a variância populacional é conhecida e as condições são atendidas, usa-se valor crítico da Normal: média amostral mais ou menos z crítico vezes sigma dividido pela raiz de n.
MÉDIA COM VARIÂNCIA DESCONHECIDA: Em amostra de população normal com variância desconhecida, usa-se t de Student, desvio padrão amostral e graus de liberdade n-1. A distribuição t possui caudas mais pesadas e converge para a Normal com o aumento dos graus de liberdade.
MARGEM DE ERRO E AMOSTRA: A margem aumenta com confiança e variabilidade e diminui com o tamanho amostral. Para reduzir a margem pela metade, normalmente é necessário multiplicar a amostra por quatro, mantidas as condições.
INTERVALO DE CREDIBILIDADE: Na abordagem bayesiana, o parâmetro recebe distribuição de probabilidade e o intervalo é construído a partir da distribuição posterior, permitindo interpretação distinta da frequentista.
COMO CAI EM PROVA: A banca cobra escolha da distribuição, cálculo do erro padrão, valor crítico, margem, tamanho amostral e interpretação. Pegadinhas comuns: • dizer que 95% dos dados estão no intervalo de confiança; • afirmar que o parâmetro muda entre amostras; • usar desvio padrão no lugar do erro padrão; • usar z automaticamente com variância desconhecida; • concluir que o TCL normaliza os dados originais; • confundir confiança frequentista com probabilidade posterior. Como resolver: Identifique parâmetro, variância conhecida ou desconhecida, tamanho e hipótese populacional. Escreva estimativa, erro padrão, valor crítico e margem antes de calcular.` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/EC1zYWgnhOE%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=7233&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Legislação Tributária', subject: 'Lei Complementar n. 87/1996 - Lei Kandir e Normas Gerais do ICMS', type: 'teoria', studyTip: `Dicas:
Organize a Lei Kandir por perguntas: o que incide, quando ocorre, onde é devido, quem paga, qual é a base e como se aproveita o crédito. Sem esse mapa, os artigos parecem uma lista desconexa.
ICMS alcança circulação jurídica de mercadorias, transporte interestadual e intermunicipal e comunicação onerosa. Transporte municipal e comunicação gratuita não entram automaticamente.
Importação pode ser tributada mesmo quando realizada por pessoa física ou não contribuinte habitual. O Estado competente relaciona-se ao destinatário jurídico, não simplesmente ao porto de desembaraço.
Não incidência, isenção e imunidade não são sinônimos. Nas exportações, observe também manutenção e aproveitamento dos créditos anteriores.
Base de cálculo e local da operação variam conforme mercadoria, serviço, importação e substituição. Nunca aplique uma fórmula única antes de identificar a hipótese.
A não cumulatividade depende de crédito idôneo e das limitações legais. Entrada alheia à atividade, uso pessoal e hipóteses de estorno merecem atenção especial. Resumo do conteúdo:
COMPETÊNCIA E HIPÓTESES DE INCIDÊNCIA: Estados e Distrito Federal instituem ICMS sobre circulação de mercadorias e prestações de transporte interestadual e intermunicipal e de comunicação, ainda que iniciadas no exterior. Também aparecem fornecimento de alimentação, importação de bens ou mercadorias, serviço iniciado ou prestado no exterior e mercadoria fornecida com serviço nas hipóteses definidas pela legislação complementar.
NÃO INCIDÊNCIA E EXPORTAÇÕES: A lei enumera situações fora do campo do imposto, como operações com livros, jornais e papel destinado à impressão, exportações, determinadas transferências e outras hipóteses legais. Exportação não gera débito e, conforme a disciplina constitucional e complementar, preserva créditos das operações anteriores. Cada hipótese deve ser lida com seus requisitos.
MOMENTO E LOCAL DA OPERAÇÃO: O fato gerador ocorre em momentos distintos: saída da mercadoria, fornecimento, início da prestação de transporte, ato final da comunicação, desembaraço aduaneiro, aquisição 169 em licitação de importado apreendido e entradas específicas. O local define o sujeito ativo e varia conforme estabelecimento, início da prestação, destinatário e natureza da operação. Na importação, a competência não se resolve apenas pelo local físico do desembaraço. Deve-se identificar o destinatário jurídico da operação e a estrutura contratual efetiva.
CONTRIBUINTES E RESPONSÁVEIS: Contribuinte é quem realiza com habitualidade ou intuito comercial operações de circulação ou prestações tributadas. A lei inclui hipóteses em que habitualidade é dispensada, especialmente importação. Responsabilidade pode ser atribuída a terceiros e a substitutos, inclusive por operações antecedentes, concomitantes ou subsequentes, nos limites legais.
BASE DE CÁLCULO: Em regra, a base reflete o valor da operação ou o preço do serviço. Integram-na valores previstos em lei, inclusive o próprio imposto em razão do cálculo por dentro. Importação agrega componentes legalmente enumerados. Descontos condicionais integram a base; descontos incondicionais seguem tratamento distinto. Na substituição tributária, a base pode considerar preço final, pauta ou margem de valor agregado conforme a hipótese.
NÃO CUMULATIVIDADE E CRÉDITOS: O imposto devido é compensado com o cobrado nas operações e prestações anteriores. O crédito exige documentação e vínculo admitido pela lei. Entradas para uso, consumo, ativo permanente e energia ou comunicação possuem disciplina e limitações próprias. Operações isentas ou não tributadas podem exigir anulação ou estorno, salvo manutenção expressamente autorizada.
JURISPRUDÊNCIA E LEITURA OPERACIONAL: Questões frequentemente combinam texto legal e entendimento dos tribunais sobre importação, leasing, transferência entre estabelecimentos, demanda de potência e créditos. Antes de usar precedente, identifique se a alternativa descreve exatamente os fatos e o período normativo correspondente.
COMO CAI EM PROVA: A Lei Kandir aparece em casos práticos e em alternativas que trocam um elemento da regra-matriz. Pegadinhas comuns: • tributar transporte exclusivamente municipal como ICMS; • exigir habitualidade em toda importação; 170 • atribuir imposto ao Estado do porto sem examinar destinatário; • confundir saída física com circulação jurídica em qualquer contexto; • excluir o próprio ICMS da base por presumir cálculo “por fora”; • admitir crédito sem documento ou vínculo; • estornar crédito de exportação automaticamente; • aplicar substituição tributária sem previsão legal. Como resolver: Reconstrua seis elementos: materialidade, momento, local, sujeito, base e crédito. Em casos de importação ou substituição, desenhe o fluxo da operação. Só depois confronte a literalidade da alternativa.` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/tegkKJ9Qh0s%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/79cKS5nkep8%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=432648&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Economia', subject: 'Oferta e Demanda Agregadas e Curva de Phillips', type: 'teoria', studyTip: `Dicas:
Demanda agregada relaciona nível de preços e produto demandado; oferta agregada relaciona preços e produto oferecido. Não são simples somas das curvas microeconômicas.
Política fiscal ou monetária expansionista tende a deslocar a DA para a direita. Choques de produtividade ou custos deslocam a OA.
No curto prazo, preços e salários rígidos permitem alteração do produto. No longo prazo, o produto retorna ao potencial e choques de demanda afetam principalmente preços. 171 Resumo do conteúdo:
DEMANDA AGREGADA: A DA representa combinações de nível de preços e produto compatíveis com equilíbrio dos mercados considerados. Queda do nível de preços pode aumentar saldos reais, reduzir juros e estimular gasto. Política fiscal, monetária, expectativas e setor externo deslocam a curva.
OFERTA AGREGADA: No curto prazo, rigidez nominal faz a oferta responder positivamente a preços e produção. No longo prazo, a oferta tende a ser vertical no produto potencial. Tecnologia, força de trabalho e capital alteram capacidade; custos e choques de oferta deslocam a curva de curto prazo.
CHOQUES E POLÍTICAS: Expansão da DA aumenta produto e preços no curto prazo, mas seu efeito real diminui com ajustes. Choque negativo de oferta eleva preços e reduz produto. A política enfrenta escolha difícil entre estabilizar inflação e atividade.
CURVA DE PHILLIPS: A relação original indicava associação inversa entre desemprego e inflação. A versão com expectativas mostra inflação dependente da inflação esperada e do desvio do desemprego em relação à taxa natural, além de choques de oferta.
EXPECTATIVAS, ESTAGFLAÇÃO E LUCAS: Quando expectativas se ajustam, a Phillips de longo prazo torna-se vertical. Estagflação mostrou que inflação e desemprego podem subir juntos. A crítica de Lucas alerta que parâmetros comportamentais mudam quando a política muda, limitando previsões baseadas apenas em relações históricas.
COMO CAI EM PROVA: A banca cobra direção dos deslocamentos e diferenças entre curto e longo prazo. 172 Pegadinhas comuns: • mover a economia ao longo da DA quando houve mudança fiscal; • deslocar DA por choque de petróleo; • afirmar que demanda altera produto potencial permanentemente; • negar estagflação; • usar Phillips como trade-off permanente; • ignorar expectativas na inflação. Como resolver: Classifique o choque como demanda ou oferta, determine a direção e separe curto e longo prazo. Na Phillips, identifique expectativa, desemprego natural e choque de oferta.` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/1QKQQ9gK9MI%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=413025&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Direito Administrativo', subject: 'Intervenção do Estado na Propriedade', type: 'teoria', studyTip: `Dicas:
Intervenções restritivas preservam a propriedade e limitam seu uso; desapropriação é supressiva e transfere o bem.
Competência para legislar sobre desapropriação é privativa da União, mas diferentes entes e delegados podem promovê-la nos limites legais.
A regra é indenização justa, prévia e em dinheiro. Exceções constitucionais utilizam títulos ou dispensam indenização em hipóteses sancionatórias.
A fase declaratória identifica finalidade e submete o bem ao regime expropriatório; a fase executória busca acordo ou ação judicial.
Imissão provisória na posse exige pressupostos legais, como urgência e depósito, e não encerra automaticamente a discussão indenizatória. 173 Resumo do conteúdo:
MODALIDADES DE INTERVENÇÃO: O Estado pode impor limitações, servidões, ocupações, requisições, tombamento e desapropriação. As primeiras restringem faculdades; desapropriação retira a propriedade mediante procedimento e indenização.
DESAPROPRIAÇÃO: É transferência compulsória por necessidade ou utilidade pública ou interesse social. A União legisla privativamente, enquanto entes e pessoas autorizadas podem declarar ou executar conforme competência.
FASES: A fase declaratória individualiza o bem e indica fundamento. A declaração sujeita o bem à força expropriatória e possui prazo de caducidade. A fase executória pode ser administrativa, por acordo, ou judicial.
INDENIZAÇÃO: Em regra, deve ser justa, prévia e em dinheiro. Reforma agrária e desapropriação urbanística sancionatória utilizam títulos conforme Constituição. Bens ligados a culturas ilícitas ou trabalho escravo podem ser expropriados sem indenização nas hipóteses constitucionais.
IMISSÃO PROVISÓRIA: Permite ingresso antecipado na posse quando presentes requisitos. O depósito não necessariamente corresponde ao valor final, que será apurado no processo.
ESPÉCIES E EFEITOS: Desapropriação indireta ocorre quando o Estado se apossa sem procedimento regular, gerando pretensão indenizatória. Desapropriação por zona abrange áreas beneficiadas ou necessárias à obra. Direito de extensão protege remanescente inutilizado.
TREDESTINAÇÃO E RETROCESSÃO: Tredestinação é alteração da finalidade. Se permanece interesse público, tende a ser lícita. Destinação privada ou abandono da finalidade pode gerar direito de retrocessão, conforme regime jurídico.
COMO CAI EM PROVA: A banca cobra competências, fases, indenização, modalidades e consequências da mudança de finalidade. Pegadinhas comuns: • chamar toda limitação de desapropriação; • confundir competência legislativa e executória; • afirmar que toda desapropriação é paga em dinheiro; • considerar declaração suficiente para transferir domínio; • tratar imissão provisória como sentença final; • dizer que qualquer mudança de finalidade gera retrocessão. Como resolver: Identifique se a propriedade foi mantida ou transferida, o fundamento, a fase e a forma indenizatória. Depois examine destino público e eventual direito do expropriado.` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/yiVd3By8mfA%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/0HTNAwpfQGY%3D' },
      { goalId: meta9[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=404426%2C404432&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);
    
    console.log('Week 15 seed completed successfully!');
  }

}

export { seed };

/* seed().catch((e) => {
  console.error('Seeding failed:', e);
  process.exit(1);
});
*/
