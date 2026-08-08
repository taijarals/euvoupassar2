import re

with open('db/seed.ts', 'r') as f:
    content = f.read()

# Remove any existing week 15 code if we partially added it
if 'if (!existingWeeks.some(w => w.number === 15)) {' in content:
    content = content[:content.find('if (!existingWeeks.some(w => w.number === 15)) {')] + content[content.rfind('}', 0, content.find('seed().catch')):]

week15 = """
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
"""

brace_before_catch = content.rfind('}', 0, content.find('seed().catch'))
if brace_before_catch != -1:
    content = content[:brace_before_catch] + week15 + "\n" + content[brace_before_catch:]
    with open('db/seed.ts', 'w') as f:
        f.write(content)
    print("Successfully patched db/seed.ts for Week 15")
else:
    print("Could not find seed().catch block.")

