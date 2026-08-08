import { db } from './index';
import { goals, weeks } from './schema';
import { eq, and } from 'drizzle-orm';

const tips = [
  {
    number: 1,
    tip: `Dicas:

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
COMO CAI EM PROVA: A banca costuma cobrar ideia central, inferência, sentido contextual de palavras, intenção do autor, função da linguagem, pressupostos, subentendidos e reescrita sem alteração de sentido. Pegadinhas comuns: • alternativa que extrapola o texto; • troca de possibilidade por certeza; • generalização indevida; • uso de conhecimento externo para forçar resposta; • confusão entre opinião do autor e opinião citada; • leitura de palavra isolada sem observar o contexto. Como resolver: Volte sempre ao trecho indicado. Marque o comando da questão e pergunte se a alternativa está realmente autorizada pelo texto. Em interpretação, a resposta correta não é a mais bonita: é a mais defensável dentro do texto.`
  },
  {
    number: 2,
    tip: `Dicas:

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
COMO CAI EM PROVA: Esse assunto costuma ser cobrado por troca de planos: Constituição no lugar de lei, competência no lugar de capacidade ativa, multa como se fosse tributo, decreto criando obrigação nova ou destinação da arrecadação definindo espécie tributária. Pegadinhas comuns: • dizer que tributo é sanção por ato ilícito; • afirmar que competência tributária pode ser delegada; • confundir lei complementar com lei ordinária instituidora; • tratar decreto como se pudesse inovar livremente; • achar que toda prestação em dinheiro ao Estado é tributo; • esquecer que atualização monetária, por si só, não é majoração; • confundir obrigação acessória com obrigação facultativa. Como resolver: Identifique o verbo da questão: instituir, arrecadar, fiscalizar, regulamentar, majorar, reduzir, definir ou cobrar. Depois, pergunte duas coisas: quem tem competência para isso? Qual instrumento jurídico pode fazer isso? Essa dupla pergunta evita respostas por impulso.`
  },
  {
    number: 3,
    tip: `Dicas:

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
COMO CAI EM PROVA: A cobrança costuma vir por conceito seco, classificação e troca de finalidade. A banca pergunta o objeto da Contabilidade, diferencia patrimônio de patrimônio líquido, confunde técnica contábil com finalidade ou tenta transformar lucro em objeto da ciência. Pegadinhas comuns: • dizer que o objeto da Contabilidade é o lucro; • confundir patrimônio com patrimônio líquido; • tratar auditoria como técnica de registro; • esquecer que ativo inclui bens e direitos; • confundir obrigação com patrimônio líquido; • achar que Contabilidade só se aplica a empresas lucrativas; • decorar a equação sem entender o efeito de cada elemento. Como resolver: Quando a questão falar em estrutura patrimonial, desenhe mentalmente: ativo de um lado; passivo e PL do outro. Depois pergunte se o enunciado fala de bem, direito, obrigação, capital próprio, receita, despesa ou técnica contábil. Essa triagem resolve a maioria das questões iniciais.`
  },
  {
    number: 4,
    tip: `Dicas:

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
COMO CAI EM PROVA: A cobrança é muito marcada por troca de listas: fundamento vira objetivo, objetivo vira princípio internacional, forma de Estado vira forma de governo. Pegadinhas comuns: • dizer que federação é forma de governo; • confundir soberania com autonomia; • colocar pluralismo político como objetivo; • trocar independência nacional por objetivo interno; • afirmar que há hierarquia entre os Poderes; • confundir República com Federação; • tratar presidencialismo como forma de governo. Como resolver: Monte cinco caixas: forma de Estado, forma de governo, sistema de governo, art. 1º, art. 3º e art. 4º. Quando a questão trouxer uma expressão constitucional, primeiro descubra a caixa correta. Só depois julgue o item.`
  },
  {
    number: 5,
    tip: `Dicas:

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
COMO CAI EM PROVA: A cobrança costuma ser conceitual e por distinção. A banca pergunta o que é COBIT, o que ele não é, diferença entre governança e gestão, princípios, componentes, fatores de desenho, domínios e objetivos. Pegadinhas comuns: • tratar COBIT como metodologia rígida; • limitar I&T ao setor de TI; • confundir governança com gestão; • dizer que COBIT serve apenas para segurança; • misturar princípios do sistema com princípios do framework; • chamar fator de desenho de componente; • achar que COBIT substitui ITIL ou métodos ágeis. Como resolver: Quando aparecer COBIT, procure a lógica de alinhamento: partes interessadas, objetivos corporativos, objetivos de I&T, valor, risco e recursos. Se a alternativa reduzir COBIT a ferramenta operacional, software ou checklist rígido, desconfie.`
  },
  {
    number: 6,
    tip: `Dicas:

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
COMO CAI EM PROVA: A banca cobra muito por identificação do princípio em situações concretas. Ela descreve uma conduta administrativa e pergunta qual princípio foi violado ou aplicado. Pegadinhas comuns: • colocar razoabilidade como princípio expresso do art. 37; • afirmar que há hierarquia entre princípios; • tratar publicidade como absoluta; • confundir impessoalidade com publicidade; • esquecer princípios implícitos; • dizer que eficiência permite ignorar formalidades legais; • confundir autotutela com tutela administrativa; • achar que supremacia do interesse público autoriza abuso. Como resolver: Leia o caso concreto e pergunte qual valor jurídico está em jogo: lei, finalidade, ética, transparência, resultado, equilíbrio, motivação, continuidade ou segurança jurídica. Se a questão trouxer conduta concreta, não responda pela palavra mais bonita; responda pelo problema jurídico central.`
  },
  {
    number: 7,
    tip: `Dicas:

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
COMO CAI EM PROVA: A cobrança vem por identificação de proposições, negação correta, conectivos e tabela- -verdade. A banca explora principalmente a diferença entre linguagem comum e linguagem lógica. Pegadinhas comuns: • tratar pergunta como proposição; • negar frase universal de forma intuitiva e errada; • confundir “ou” inclusivo com exclusivo; • errar a negação de “e” e “ou”; • montar tabela-verdade sem identificar proposições simples; • achar que negação é sempre trocar por antônimo; • ignorar palavras como “todo”, “algum”, “nenhum”, “se”, “e” e “ou”. Como resolver: Traduza a frase para símbolos simples. Depois aplique a regra do conectivo. Se o item envolver negação, escreva a frase negada com calma antes de olhar as alternativas. Em Raciocínio Lógico, organização vale mais do que pressa.`
  },
  {
    number: 8,
    tip: `Dicas:

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
COMO CAI EM PROVA: Esse tema cai por literalidade constitucional, exceções e comparação entre institutos. A banca troca anterioridade por noventena, imunidade por isenção e limitação por competência. Pegadinhas comuns: • dizer que o art. 150 esgota todas as limitações; • confundir imunidade com isenção; • trocar anterioridade anual por noventena; • esquecer exceções; • tratar não confisco como regra matemática fixa; • achar que toda imunidade depende de lei para existir; • confundir limitação constitucional com mera política fiscal. Como resolver: Separe por grupos: princípios, anterioridades, imunidades e limitações específicas. Depois, revise as exceções como lista própria. Em cada item, pergunte: a questão fala de competência, cobrança, prazo, igualdade, retroatividade, confisco ou hipótese imune?`
  },
  {
    number: 9,
    tip: `Dicas:

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
COMO CAI EM PROVA: A banca cobra classificação de contas, teorias das contas, natureza de saldo, plano de contas, razonete e diferença entre contas patrimoniais e de resultado. Pegadinhas comuns: • confundir teoria materialista com patrimonialista; • classificar receita como conta patrimonial; • tratar débito como sinônimo de dívida; • esquecer que PL integra contas patrimoniais; • errar os grupos da teoria personalista; • achar que toda conta de ativo tem sempre saldo devedor sem exceções; • confundir plano de contas com demonstração contábil. Como resolver: Antes de responder, pergunte: a conta representa patrimônio ou resultado? Depois identifique se ela pertence a ativo, passivo, PL, receita ou despesa. Só então pense em débito, crédito e saldo. Essa ordem evita chute mecânico.`
  },
  {
    number: 10,
    tip: `Dicas:

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
COMO CAI EM PROVA: A cobrança vem por conceito e distinção. A banca pergunta o que é ITIL, quais são os conceitos básicos, o que é valor, utilidade, garantia, SVS, cadeia de valor, princípios orientadores e categorias de práticas. Pegadinhas comuns: • dizer que ITIL exige ferramenta específica; • confundir produto com serviço; • tratar valor como algo criado só pelo provedor; • inverter utilidade e garantia; • confundir prática com processo obrigatório e rígido; • esquecer que serviço reduz custos e riscos do consumidor; • confundir saída entregue com resultado alcançado; • tratar melhoria contínua como etapa isolada. Como resolver: Sempre procure a lógica de serviço: consumidor, provedor, resultado, custo, risco e valor. Se a alternativa transformar ITIL em regra fixa, software específico ou visão puramente técnica, desconfie. ITIL 4 é sobre serviço gerando valor.`
  }
];

async function run() {
  const week = await db.select().from(weeks).where(eq(weeks.number, 1)).limit(1);
  if (week.length === 0) {
    console.error('Semana 1 não encontrada!');
    return;
  }

  const weekId = week[0].id;

  for (const { number, tip } of tips) {
    await db.update(goals)
      .set({ studyTip: tip })
      .where(and(
        eq(goals.weekId, weekId),
        eq(goals.number, number)
      ));
    console.log(`Updated Meta ${number} da Semana 1`);
  }

  console.log('Update concluído!');
}

run().catch(console.error);
