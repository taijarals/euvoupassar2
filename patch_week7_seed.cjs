const fs = require('fs');

let content = fs.readFileSync('db/seed.ts', 'utf8');

const newWeek7 = `
  if (!existingWeeks.some(w => w.number === 7)) {
    console.log('Seeding Week 7...');
    
    // Create Week 7
    const insertedWeek = await db.insert(weeks).values({
      number: 7,
      title: 'Semana 7'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Língua Portuguesa', subject: 'Emprego e Sentido das Classes Gramaticais – Parte II', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra classes gramaticais por identificação, efeito de sentido e reescrita. O ponto principal é perceber função contextual. Pegadinhas comuns: • classificar palavra pela forma isolada; • ignorar que pronome retoma termo anterior; • trocar conjunções com valores lógicos diferentes; • esquecer que advérbio pode modificar uma oração inteira; • analisar preposição sem observar regência; • aceitar reescrita que preserva correção, mas muda sentido. Como resolver: Localize o verbo, identifique a relação entre os termos e só depois classifique a palavra. Em reescrita, confira três coisas: correção gramatical, manutenção do sentido e preservação da coesão.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/ikA1NZhrVPk%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/gav5pO%2FguWo%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=419336&desatualizada=0&anulada=0&query=emprego+sentido&auth=force&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Direito Tributário', subject: 'Tributos de Competência Federal', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra tributos federais por competência, fato gerador, função fiscal/extrafiscal, princípios aplicáveis e confusão entre impostos. Pegadinhas comuns: • confundir ITR com imposto municipal; • tratar IPI como cumulativo; • esquecer a seletividade do IPI; • achar que IOF alcança qualquer movimentação financeira; • confundir importação/exportação com circulação interna; • trocar competência tributária por capacidade de fiscalizar ou arrecadar. Como resolver: Identifique primeiro o fato econômico: renda, industrialização, importação, exportação, propriedade rural ou operação financeira específica. Depois associe ao imposto federal correspondente e confira se há regra constitucional especial.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/SUZk5QCMX5Q%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/iQeZWmAypdY%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407188%2C407198%2C417658%2C417659%2C417660%2C417661%2C407199%2C417663%2C417665%2C417666%2C417667%2C407202%2C417670%2C417672%2C417673%2C417674%2C407201%2C417676%2C417677%2C417678%2C417680%2C407200%2C417681%2C417682%2C407203%2C417688%2C417689%2C417690%2C407207%2C407208%2C407206&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Contabilidade Geral', subject: 'Patrimônio Líquido', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra PL por classificação de contas, lançamentos, destinação do lucro, reservas, ações em tesouraria e efeitos no total do patrimônio líquido. Pegadinhas comuns: 177 • tratar gasto de emissão de ações como despesa; • confundir reserva de capital com reserva de lucros; • tratar reserva para contingências como provisão; • classificar ações em tesouraria no ativo; • achar que toda movimentação interna altera o total do PL; • confundir capital subscrito com integralizado. Como resolver: Pergunte qual é a origem do fato: sócio, lucro, avaliação patrimonial, recompra de ações ou obrigação. Depois veja se altera o total do PL ou apenas muda sua composição interna.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/4ewNuJuHA20%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/NCoPQu1L1EA%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=4417%2C4399%2C104&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Direito Constitucional', subject: 'Poder Executivo', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra literalidade constitucional, ordem sucessória, competências delegáveis, responsabilidade do Presidente e diferença entre crimes comuns e de responsabilidade. Pegadinhas comuns: • inverter Câmara e Senado na linha sucessória; • confundir substituição com sucessão; • atribuir julgamento de crime comum ao Senado; • dizer que conselho decide em vez de consultar; • considerar todas as competências indelegáveis; • esquecer a autorização da Câmara para processamento. Como resolver: Separe a questão por bloco: investidura, atribuição, sucessão ou responsabilidade. Em responsabilidade, identifique primeiro se é crime comum ou de responsabilidade.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/3VNASGWdk9M%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Ycu8lFkjpHY%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?in=1&a=405260%2C405199&qd=0&qa=0&q=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'Banco de Dados Relacionais – Parte II', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra identificação de chaves, integridade referencial, normalização e efeitos de dependências funcionais. Também pode pedir comandos SQL por categoria. Pegadinhas comuns: • confundir chave primária com estrangeira; • aceitar valor nulo em chave primária; • chamar qualquer redundância de erro sem analisar dependência; • inverter 2FN e 3FN; • confundir DDL com DML; • achar que normalização sempre melhora desempenho. Como resolver: Desenhe a tabela, marque a chave, identifique dependências e procure redundâncias. Depois classifique a forma normal ou a anomalia pedida.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/hMHUc7wKf%2Fo%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=8045&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Direito Administrativo', subject: 'Controle Administrativo', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra muito a diferença entre anulação e revogação, além de controle interno, externo, judicial e autotutela. Pegadinhas comuns: • dizer que o Judiciário revoga ato administrativo; • confundir ilegalidade com inconveniência; • afirmar que revogação retroage como regra; • revogar ato vinculado; • ignorar contraditório quando a anulação afeta particular; • confundir controle externo com controle hierárquico. Como resolver: Primeiro identifique o problema: ilegalidade ou mérito. Depois veja quem está controlando: própria Administração, Judiciário, Legislativo/Tribunal de Contas ou sociedade.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/wzg7Mfx4WaI%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/q0KxpFGom7E%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?r=TODAS&a=408388&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Matemática Financeira', subject: 'Sistemas de Amortização', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra cálculo de prestação, amortização, juros, saldo devedor, comparação SAC x Price e interpretação de tabela. Pegadinhas comuns: • calcular juros sobre o principal inicial em todos os períodos; • confundir amortização com prestação; • dizer que no SAC a prestação é constante; • dizer que na Price a amortização é constante; • esquecer conversão de taxa; • usar fórmula sem verificar se o sistema é SAC ou Price. Como resolver: Identifique o sistema. Se for SAC, calcule amortização constante primeiro. Se for Price, calcule prestação constante. Depois preencha juros e saldo devedor período a período.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/PcQF1Bo2RQQ%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/jYYoI2jh9hg%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=408979%2C403813%2C403814%2C403815&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Estatística', subject: 'Distribuição de Probabilidade', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra distribuição por tabelas, cálculo de probabilidade faltante, esperança, variância, acumulada e interpretação de eventos. Pegadinhas comuns: 189 • esquecer que a soma das probabilidades deve ser 1; • confundir probabilidade pontual com acumulada; • calcular média simples em vez de média ponderada; • ignorar complemento; • tratar variável contínua como discreta; • errar desigualdade em “menor que” e “menor ou igual”. Como resolver: Primeiro classifique a variável. Depois monte tabela com valor, probabilidade e produtos necessários. Só aplique fórmula depois de entender o evento pedido.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/yrGBlDvYy1Q%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=416510&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Contabilidade de Custos', subject: 'Conceitos Gerais, Classificação e Apuração de Custos', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca costuma apresentar fatos isolados e pedir sua classificação, ou fornecer estoques e componentes do custo para calcular produção acabada e custo dos produtos vendidos. Pegadinhas comuns: • tratar todo pagamento como despesa; • confundir desembolso com o momento do reconhecimento do custo; • classificar gasto administrativo como custo apenas porque ocorreu dentro da fábrica; • considerar todo desperdício como custo normal; • afirmar que custo fixo por unidade permanece constante; • confundir custo primário com custo de transformação; • misturar custos diretos/indiretos com fixos/variáveis; • esquecer os estoques inicial e final na apuração. Como resolver: Monte uma sequência mental: o recurso foi adquirido, consumido na produção, estocado ou levado ao resultado? Depois identifique o critério pedido pela questão. Nos cálculos, desenhe o fluxo matéria-prima -> produção em elaboração -> produtos acabados -> CPV e só então substitua os valores.\` }).returning();
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
`;

const endIndex = content.lastIndexOf("}"); // find the last closing brace (assuming it's before seed().catch)
const beforeCatch = content.indexOf("seed().catch");

if (beforeCatch !== -1) {
    let lastClosingBrace = content.lastIndexOf("}", beforeCatch);
    if(lastClosingBrace !== -1) {
        content = content.substring(0, lastClosingBrace) + newWeek7 + "\n" + content.substring(lastClosingBrace);
        fs.writeFileSync('db/seed.ts', content);
        console.log('Successfully patched db/seed.ts for Week 7');
    } else {
        console.log('Could not find closing brace before seed().catch');
    }
} else {
  console.log('Could not find seed().catch block.', beforeCatch);
}
