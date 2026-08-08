const fs = require('fs');

let content = fs.readFileSync('db/seed.ts', 'utf8');

const newWeek13 = `
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
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Auditoria Fiscal', subject: 'Auditoria do SPED e da Nota Fiscal Eletrônica (NF-e)', type: 'teoria', studyTip: \\\`Dicas:
Não reduza o SPED a um arquivo eletrônico. Ele unifica recepção, validação, armazenamento e autenticação de livros e documentos contábeis e fiscais em fluxo computadorizado.
A NF-e é o documento fiscal eletrônico, emitido e armazenado digitalmente. O DANFE é apenas sua representação gráfica auxiliar: acompanha a mercadoria e facilita a consulta, mas não substitui a NF-e. 105 Resumo do conteúdo:
SISTEMA PÚBLICO DE ESCRITURAÇÃO DIGITAL: O SPED moderniza obrigações acessórias e integra contribuinte, administrações tributárias e órgãos fiscalizadores. Unifica recepção, validação, armazenamento e autenticação de livros e documentos contábeis e fiscais em fluxo computadorizado. A certificação digital assegura autoria, integridade e validade jurídica. O sistema racionaliza obrigações e melhora a qualidade das informações, mas o acesso permanece submetido aos sigilos fiscal, comercial e bancário.
NOTA FISCAL ELETRÔNICA: A NF-e é documento exclusivamente digital que registra operações e prestações. Sua validade decorre da assinatura digital do emitente e da autorização de uso. O processo envolve geração, assinatura, transmissão, validação e autorização. Rejeição impede a autorização; denegação decorre de irregularidade fiscal; autorização não comprova a realização da operação.
ESTRUTURA, CHAVE E EVENTOS: O XML concentra os dados fiscais; a chave individualiza a NF-e e permite consulta. Eventos registram fatos relacionados ao documento, como cancelamento, carta de correção e manifestação do destinatário. Emitente e destinatário devem guardar o arquivo pelo prazo legal.
DANFE: O Documento Auxiliar da NF-e não é nota fiscal e não substitui o XML. Ele contém chave de acesso e representação resumida dos dados, auxilia o trânsito da mercadoria e pode servir de suporte para registro de ocorrências relativas à entrega.
EFD ICMS/IPI E TESTES DE AUDITORIA: A EFD reúne documentos fiscais, entradas, saídas, inventário, produção, estoque, apuração e CIAP em blocos e registros hierarquizados. A auditoria cruza NF-e e EFD, entradas e estoques, saídas e receitas, inventário e movimentação, créditos e documentação, apuração e recolhimentos. Quebras de sequência, cancelamentos escriturados, chaves inexistentes e duplicidades exigem investigação.
COMO CAI EM PROVA: A prova costuma cobrar conceitos literais do SPED e da NF-e, diferenças entre NF-e e DANFE, etapas de emissão, eventos e finalidade dos registros da EFD. Pegadinhas comuns: • tratar o DANFE como documento fiscal eletrônico; • afirmar que a autorização comprova a ocorrência material da operação; • dizer que o SPED elimina deveres de guarda e sigilo; • confundir rejeição, denegação e cancelamento; • analisar registros isoladamente, sem cruzar documentos, estoque e apuração; • trocar a finalidade dos blocos e controles da EFD. Como resolver: Identifique a camada cobrada: documento eletrônico, representação auxiliar, evento ou escrituração. Reconstrua o fluxo e procure a fonte independente que confirma cada informação. Em auditoria digital, coerência entre bases vale mais que um registro isolado.\\\` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/kIRGOu8yVak%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/R0cmRWKpJ6M%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=427291&desatualizada=0&anulada=0&query=nf-e&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Legislação Tributária', subject: 'LC n. 227/2026 - CGIBS: Disposições Gerais e Competências', type: 'teoria', studyTip: \\\`Dicas:
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
COMO CAI EM PROVA: Como a lei é recente, espere cobrança literal sobre natureza, independência, competências e coordenação federativa. Pegadinhas comuns: • subordinar o CGIBS à Receita Federal, à PGFN ou ao Congresso Nacional; • concluir que independência elimina controle externo e prestação de contas; • atribuir ao Comitê a administração exclusiva da CBS; • retirar dos entes toda atuação fiscal e de cobrança; • trocar coordenação por execução exclusiva; • omitir o contencioso administrativo entre as competências centrais. Como resolver: Separe a questão em quatro colunas mentais: natureza do órgão, competência administrativa central, atividade executada pelos entes e coordenação com a União. Verbos como coordenar, uniformizar, arrecadar, distribuir e decidir precisam ser ligados ao sujeito correto.\\\` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/ABX5OD4mpyU%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/sU2X8x%2BUHcQ%3D' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Economia', subject: 'Falhas do Mercado: Externalidades, Assimetria de Informação e Relação Agente-Principal', type: 'teoria', studyTip: \\\`Dicas:
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
COMO CAI EM PROVA: A prova apresenta situações concretas e pede a falha, o momento da assimetria ou o instrumento corretivo. Pegadinhas comuns: • chamar todo efeito sobre terceiros de externalidade, mesmo quando o preço já o incorpora; • inverter custo privado e custo social; • usar subsídio para externalidade negativa sem justificativa; • aplicar Coase com custos de transação elevados; • trocar seleção adversa por risco moral; • dizer que sinalização é iniciativa da parte desinformada; • supor que incentivo mais forte sempre melhora o contrato. Como resolver: Desenhe a linha do tempo: antes ou depois do contrato. Nas externalidades, compare quantidade de mercado e quantidade socialmente eficiente. Na agência, identifique quem decide, quem observa e quem suporta o risco.\\\` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/hTHUxS0EVl8%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403968&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Direito Empresarial', subject: 'Sociedade Anônima - Parte I', type: 'teoria', studyTip: \\\`Dicas:
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
COMO CAI EM PROVA: A cobrança costuma explorar conceitos básicos da Lei das S.A., responsabilidade, nome empresarial, classificação aberta/fechada, constituição e capital. Pegadinhas comuns: • dizer que toda sociedade por ações é sociedade anônima; • limitar responsabilidade pelo valor nominal, e não pelo preço de emissão; • tratar a S.A. como sociedade simples conforme seu objeto; • permitir “companhia” no final da denominação; • confundir companhia aberta com sociedade que possui muitos acionistas; • misturar subscrição pública e particular. Como resolver: Comece classificando o instituto: gênero, tipo societário, forma de captação ou valor da ação. Nas questões de constituição, monte a sequência dos requisitos e identifique se houve acesso à poupança pública. Nas questões de valores, escreva ao lado: emissão, nominal, patrimonial ou mercado.\\\` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/aSxpa1DIHng%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/49xf83k7bGA%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=406949&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Tecnologia da Informação', subject: 'Lei Geral de Proteção de Dados Pessoais - LGPD', type: 'teoria', studyTip: \\\`Dicas:
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
COMO CAI EM PROVA: A prova cobra sobretudo conceitos do art. 5º, princípios, bases legais, direitos do titular, papéis dos agentes, aplicação da lei e sanções. Pegadinhas comuns: • aplicar a LGPD apenas a empresas privadas ou apenas a meios digitais; • exigir consentimento em todo tratamento; • confundir controlador, operador e encarregado; • equiparar pseudonimização a anonimização ou afirmar que dado anonimizado permanece sempre sujeito à LGPD; • tratar sanção administrativa como única forma de responsabilização. Como resolver: Identifique dado, operação, agente e base jurídica; depois teste finalidade, necessidade e transparência. Termos como “sempre” e “somente mediante consentimento” costumam revelar generalizações incompatíveis com a lei.\\\` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/UjSelN1ERZg%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=404802%2C2932&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Economia', subject: 'Externalidades, Bens Públicos, Recursos Comuns e Funções do Estado', type: 'teoria', studyTip: \\\`Dicas:
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
COMO CAI EM PROVA: A banca combina conceitos com exemplos e gráficos de custo e benefício. Pegadinhas comuns: • definir bem público como qualquer bem estatal; • trocar rivalidade por exclusão; • classificar recurso comum como não rival; • confundir carona com tragédia dos comuns; • afirmar que imposto pigouviano elimina qualquer dano; • aplicar Coase sem direitos definidos; • associar combate à inflação à função distributiva. Como resolver: Faça a matriz rivalidade x exclusão antes de nomear o bem. Em externalidades, escreva privado e social ao lado de custo ou benefício. Nas funções do Estado, pergunte qual problema a política tenta corrigir.\\\` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/83qDpoPf%2Fps%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=412893&desatualizada=0&anulada=0&query=externalidade&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Direito Administrativo', subject: 'Lei n. 14.133/2021 - Contratos Administrativos', type: 'teoria', studyTip: \\\`Dicas:
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
COMO CAI EM PROVA: A banca cobra literalidade da Lei n. 14.133/2021, distinção entre institutos e limites das prerrogativas administrativas. Pegadinhas comuns: • aplicar direito privado como regime principal; • confundir reajuste, repactuação e revisão; • considerar ilimitada a alteração unilateral; • afirmar que fiscalização elimina responsabilidade do contratado; • confundir extinção unilateral com aplicação automática de sanção; • tratar nulidade como solução sem avaliação de consequências. Como resolver: Identifique evento e momento contratual; verifique quem decide, os limites e o impacto no equilíbrio. Em sanções, associe infração, gravidade, autoridade e defesa.\\\` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/JxU381GUNTw%3D' },
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/%2FY8SFnOx3vQ%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=404429&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Legislação Tributária', subject: 'LC n. 227/2026 - CGIBS: Estrutura Organizacional', type: 'teoria', studyTip: \\\`Dicas:
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
COMO CAI EM PROVA: A tendência é cobrança literal da LC n. 227/2026, com foco na composição da estrutura e na distribuição de competências. Pegadinhas comuns: • excluir Corregedoria ou Auditoria Interna da estrutura básica; • afirmar que o sigilo termina com o desligamento; • trocar Conselho Superior por Diretoria Executiva como órgão deliberativo máximo; • ignorar o caráter federativo da composição; • confundir controle interno, atividade correcional e gestão executiva; • atribuir a um órgão competência reservada a outro. 124 Como resolver: Desenhe o organograma em três níveis: deliberação, direção/execução e apoio/controle. Em seguida, associe a cada unidade seu verbo principal. Quando a alternativa deslocar uma competência, confira se o órgão proposto possui função deliberativa, executiva, correcional ou de auditoria.\\\` }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/ABX5OD4mpyU%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/4SVQiY958%2B0%3D' },
    ]);
    
    console.log('Week 13 seed completed successfully!');
  }
`;

const endIndex = content.lastIndexOf("}");
const beforeCatch = content.indexOf("seed().catch");

if (beforeCatch !== -1) {
    let lastClosingBrace = content.lastIndexOf("}", beforeCatch);
    if(lastClosingBrace !== -1) {
        content = content.substring(0, lastClosingBrace) + newWeek13 + "\n" + content.substring(lastClosingBrace);
        fs.writeFileSync('db/seed.ts', content);
        console.log('Successfully patched db/seed.ts for Week 13');
    } else {
        console.log('Could not find closing brace before seed().catch');
    }
} else {
  console.log('Could not find seed().catch block.', beforeCatch);
}
