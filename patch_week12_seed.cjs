const fs = require('fs');

let content = fs.readFileSync('db/seed.ts', 'utf8');

// First, remove the previously injected Week 12 to avoid duplicates if it was partially injected
const existingWeek12Index = content.indexOf('if (!existingWeeks.some(w => w.number === 12)) {');
if (existingWeek12Index !== -1) {
  const seedCatchIndex = content.indexOf('seed().catch');
  let braceBeforeCatch = content.lastIndexOf("}", seedCatchIndex);
  // Revert content to before week 12
  content = content.substring(0, existingWeek12Index) + content.substring(braceBeforeCatch);
}

const newWeek12 = `
  if (!existingWeeks.some(w => w.number === 12)) {
    console.log('Seeding Week 12...');
    
    // Create Week 12
    const insertedWeek = await db.insert(weeks).values({
      number: 12,
      title: 'Semana 12'
    }).returning();
    const weekId = insertedWeek[0].id;

    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Auditoria Fiscal', subject: 'Auditoria Fiscal do Passivo, Patrimônio Líquido e Resultado', type: 'teoria', studyTip: \`Dicas:
Passivo fictício é uma obrigação inexistente, já paga ou sem exigibilidade comprovada que permanece registrada. Ele provoca superavaliação do Passivo e pode sustentar presunção de omissão de receitas.
Passivo oculto é uma obrigação real que não foi contabilizada. Ele provoca subavaliação do Passivo e pode estar associado a compras não registradas, despesas omitidas ou empréstimos não reconhecidos.

Resumo do conteúdo:
OBJETIVOS DA AUDITORIA DO PASSIVO: A auditoria busca verificar se as obrigações pertencem à entidade, foram integralmente registradas, estão corretamente mensuradas e classificadas e foram apresentadas adequadamente. No Passivo, a integridade é especialmente importante, pois a ausência de registro pode ocultar dívidas e reduzir artificialmente o endividamento.
PASSIVO FICTÍCIO E PASSIVO OCULTO: Passivo fictício é o saldo representativo de obrigação inexistente, já liquidada ou não comprovada. Como permanece contabilizado sem corresponder a uma dívida real, superavalia o Passivo. Passivo oculto é uma obrigação existente que não foi registrada. Sua omissão subavalia o Passivo e pode também omitir a compra, a despesa, o custo ou a origem dos recursos relacionados à operação.
FORNECEDORES: A auditoria verifica se as aquisições a prazo foram devidamente registradas, se as obrigações surgiram no momento adequado e se os saldos correspondem a dívidas reais. Entre os procedimentos relevantes, destacam-se a análise da relação de fornecedores, o exame de notas fiscais e duplicatas, a comparação com razão contábil, a verificação de pagamentos posteriores, o recálculo e a circularização. O corte das operações merece atenção: mercadoria recebida antes do encerramento pode gerar obrigação ainda não contabilizada, mesmo que a nota ou o pagamento apareça posteriormente.
EMPRÉSTIMOS, DUPLICATAS E CONTINGÊNCIAS: Em empréstimos e financiamentos, devem ser examinados contratos, confirmações bancárias, encargos, garantias, classificação e relacionamento com partes relacionadas. Operações formalmente apresentadas como fornecedores podem, em essência, representar financiamento. Duplicatas descontadas exigem comprovação da existência do título e da efetiva operação financeira. Nas contingências, analise a natureza da obrigação, a probabilidade de saída de recursos, a mensuração e a necessidade de reconhecimento ou divulgação.
PATRIMÔNIO LÍQUIDO: A auditoria verifica autorização, ocorrência, integralidade, classificação e conformidade dos eventos que alteram o PL. Aumento de capital exige comprovação da subscrição e da efetiva integralização. Reservas devem respeitar sua origem e finalidade. Ações em tesouraria e lucros ou prejuízos acumulados precisam estar corretamente registrados e respaldados pelas deliberações societárias.
RECEITAS, DESPESAS E CUSTOS: A auditoria das receitas procura identificar omissões, reconhecimento em período incorreto, valores fictícios e classificações inadequadas. O auditor pode confrontar documentos fiscais, movimentação bancária, contas a receber, estoques, livros fiscais e registros contábeis. Despesas ou custos superavaliados reduzem artificialmente o resultado. Devem ser examinados documentação, competência, vínculo com a atividade, efetiva ocorrência e critérios de apropriação. Em custos, a manipulação pode ocorrer por compras fictícias, consumo não comprovado, avaliação incorreta de estoques ou apropriação indevida de gastos.
COMO CAI EM PROVA: A banca costuma apresentar uma situação contábil e pedir a irregularidade identificada, seu efeito patrimonial ou o procedimento de auditoria mais adequado. Pegadinhas comuns: • inverter passivo fictício e passivo oculto; • afirmar que passivo fictício subavalia as obrigações; • procurar passivos ocultos apenas nos saldos já registrados; • confundir circularização de fornecedores com contagem física de caixa; • aceitar aumento de capital sem comprovação da entrega dos recursos; • analisar receita, despesa ou custo sem identificar o efeito sobre o resultado. Como resolver: Primeiro, determine se a obrigação existe e se foi contabilizada. Depois, identifique a direção da distorção: saldo maior ou menor que o correto. Por fim, escolha o procedimento que produz evidência diretamente relacionada ao risco. Em contas de Resultado, reconstrua o efeito completo sobre lucro, patrimônio e eventual base tributável.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula (parte 1)', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/WjdEZbGy4r4%3D' },
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula (parte 2)', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/0yhgQSEC3zI%3D' },
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula (parte 3)', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/WXSs3AHAsVI%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/YlvBAbG1bo8%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=427260&desatualizada=0&anulada=0&query=passivo+PL+resultado&auth=force&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Contabilidade de Custos', subject: 'Custos para a Tomada de Decisão', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra cálculos encadeados e comparação entre modalidades de ponto de equilíbrio. Pegadinhas comuns: • tratar margem de contribuição como lucro líquido; • usar custo fixo unitário no numerador; • esquecer despesas variáveis; • incluir depreciação no ponto de equilíbrio financeiro quando o enunciado manda excluí-la; • confundir lucro desejado com margem de contribuição; • inverter a interpretação da margem de segurança. Como resolver: Monte uma pequena demonstração: Receita - Variáveis = Margem de Contribuição - Fixos = Resultado. Só então selecione a fórmula. Ao final, confira se a unidade pedida é quantidade, valor monetário ou percentual.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/audBPLsV5zo%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=416696&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Economia', subject: 'Teoria dos Custos no Curto e no Longo Prazo', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra fórmulas, leitura de curvas e distinção entre curto prazo, longo prazo, escala e escopo. Pegadinhas comuns: • afirmar que custo fixo médio é constante; • incluir custo fixo na variação do custo marginal; • dizer que CMg corta as médias em qualquer ponto; • confundir lucro econômico zero com ausência de remuneração; • trocar isoquanta por isocusto; • confundir economia de escala com economia de escopo. Como resolver: Comece classificando o horizonte. Depois escreva CT = CFT + CVT e divida pela quantidade quando a questão pedir médias. Em gráficos, compare CMg com a média. Em escolha de fatores, separe tecnologia, mostrada pela isoquanta, de preços e orçamento, mostrados pela isocusto.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/m5n1NhPRkUQ%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/0DtyD16jq64%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403964%2C412818%2C412819%2C412823%2C412824%2C412825%2C412826%2C426747%2C412827%2C412828%2C412829%2C412831&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Legislação Tributária', subject: 'IBS e CBS - Importação, Exportação e Regimes Aduaneiros', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A prova tende a cobrar condições do crédito e detalhes literais das operações de importação e exportação. Pegadinhas comuns: • permitir compensação cruzada entre IBS e CBS; • admitir crédito sem extinção do débito anterior; • tratar uso pessoal como aquisição creditável comum; • aplicar regras de bens materiais a serviços e intangíveis; • confundir localização do fornecedor com local da operação; • afirmar que exportação obriga cancelamento geral dos créditos. Como resolver: Identifique primeiro se a operação é interna, importação ou exportação. Depois classifique o objeto e percorra momento, local, base, sujeito passivo e crédito. Só responda após localizar a exceção indicada no enunciado.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/GfPu1JqERIo%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/ZaL34bFioY8%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=438078&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'Noções de Modelagem Dimensional - Parte II', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra comparações entre OLTP e OLAP, conceitos de BI e identificação das operações sobre cubos. Pegadinhas comuns: • tratar BI como sinônimo exclusivo de Data Warehouse; • dizer que OLAP é voltado a transações operacionais; • inverter roll-up e drill-down; • confundir slice com pivot; • afirmar que ROLAP abandona bancos relacionais; • trocar dimensão por medida. Como resolver: Observe o verbo do enunciado. Agregar aponta para roll-up; detalhar, drill-down; recortar, slice ou dice; reorganizar eixos, pivot. Em arquitetura, pergunte se a prioridade é registrar operação ou analisar histórico.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/7xuvYKdx9%2BY%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/vIBtYApwANk%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=416884,8095,8111&qd=0&qa=0&auth=force&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Economia', subject: 'Estruturas de Mercado: Concorrência Perfeita e Monopólio', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A prova combina gráficos, condições de fechamento, equilíbrio de longo prazo e comparação de bem-estar. Pegadinhas comuns: • dizer que firma competitiva escolhe o preço; • igualar preço e receita marginal no monopólio; • encerrar a firma competitiva sempre que há prejuízo; • tratar lucro econômico zero como falência; • obter o preço monopolista diretamente de RMg = CMg; • afirmar que monopólio não possui curva de demanda; • confundir monopólio natural com autorização estatal. Como resolver: Identifique a estrutura antes de calcular. Em concorrência perfeita, use P = RMg e compare preço com CVMe e CTMe. No monopólio, encontre primeiro Q em RMg = CMg e depois suba até a demanda para achar P. Compare excedentes e quantidade para avaliar eficiência.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/m5n1NhPRkUQ%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/7brm2ff0nas%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=412850%2C412835&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Direito Empresarial', subject: 'Sociedade Limitada', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra responsabilidade dos sócios, regência supletiva, capital, administração, deliberações e operações societárias. Pegadinhas comuns: • exigir pluralidade de sócios; • afirmar responsabilidade ilimitada por todas as dívidas; • admitir serviços na integralização do capital; • aplicar automaticamente a Lei das S.A.; • confundir dissolução com extinção imediata; • trocar incorporação, fusão e transformação. Como resolver: Identifique se a questão trata da sociedade, do sócio ou do administrador. Depois verifique contrato, integralização e quórum. Nas operações, acompanhe quais pessoas jurídicas sobrevivem e para onde o patrimônio é transferido.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/aSxpa1DIHng%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/0Rd0pujO2%2FU%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=406948&desatualizada=0&anulada=0&auth=force&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Estatística', subject: 'Regressão Linear', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca cobra cálculo dos coeficientes, interpretação da reta, resíduos, R², ANOVA e testes dos parâmetros. Pegadinhas comuns: • inverter observado e estimado no resíduo; • interpretar inclinação como correlação; • concluir causalidade a partir de R² elevado; • afirmar que R² sempre diminui com nova variável; • confundir teste F global com teste individual; • ignorar unidades na interpretação do coeficiente. Como resolver: Escreva primeiro a equação e identifique X e Y. Separe cálculo, interpretação e inferência. Ao receber uma tabela ANOVA, confira a decomposição das somas de quadrados e os graus de liberdade antes de calcular F.\` }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Odi7Rm94yRQ%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: 'Questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=7149%2C7150%2C7166%2C7171%2C7152%2C7154&desatualizada=0&anulada=0&query=&auth=force&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Direito Administrativo', subject: 'Lei n. 14.133/2021 - Licitações', type: 'teoria', studyTip: \`Dicas:
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
COMO CAI EM PROVA: A banca explora literalidade, sequência das fases, classificação dos institutos e diferenças entre contratação direta e licitação. Pegadinhas comuns: • tratar critério de julgamento como modalidade; • manter convite e tomada de preços entre as modalidades; • afirmar que toda contratação direta dispensa processo formal; • confundir inexigibilidade com emergência; • colocar habilitação obrigatoriamente antes do julgamento; • exigir documento sem relação com o objeto. Como resolver: Localize o instituto e a etapa do procedimento. Pergunte se há competição possível, qual modalidade foi escolhida, qual critério julga a proposta e se a exigência é proporcional. Em alternativas literais, desconfie de palavras absolutas.\` }).returning();
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
`;

const endIndex = content.lastIndexOf("}"); // find the last closing brace (assuming it's before seed().catch)
const beforeCatch = content.indexOf("seed().catch");

if (beforeCatch !== -1) {
    let lastClosingBrace = content.lastIndexOf("}", beforeCatch);
    if(lastClosingBrace !== -1) {
        content = content.substring(0, lastClosingBrace) + newWeek12 + "\n" + content.substring(lastClosingBrace);
        fs.writeFileSync('db/seed.ts', content);
        console.log('Successfully patched db/seed.ts for Week 12');
    } else {
        console.log('Could not find closing brace before seed().catch');
    }
} else {
  console.log('Could not find seed().catch block.', beforeCatch);
}
