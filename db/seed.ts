import { db } from './index.js';
import { weeks, goals, materials } from './schema.js';
import { migrate } from 'drizzle-orm/libsql/migrator';

async function seed() {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  
  console.log('Checking for existing data...');
  const existingWeeks = await db.select().from(weeks);
  
  if (existingWeeks.length === 0) {
    console.log('Seeding initial data...');
    
    // Create Week 1
    const insertedWeek = await db.insert(weeks).values({
      number: 1,
      title: 'Semana 1'
    }).returning();
    const weekId = insertedWeek[0].id;
    
    // Meta 1
    const meta1 = await db.insert(goals).values({ weekId, number: 1, discipline: 'Língua Portuguesa', subject: 'Compreensão e Interpretação de Textos', type: 'teoria' }).returning();
    await db.insert(materials).values([
      { goalId: meta1[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 2', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/jCi8taOyq0A%3D' },
      { goalId: meta1[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/vkugTTdYiig%3D' },
      { goalId: meta1[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=403701,409511,421058,430370,419148,419149,419150,408995,403705,409010,409011,409012,419151,419152,408983,408984,408985,419154,419155,419156,419157,419158,419160,419161,419162,419163,408987,403683,403684,403685,403686,403687,403688,403689,403690,403691,403692,403693,403694,403695,403696,403697,403698,403699,408988,408989,408990,408991,408992,408993,419164,419165,419166,419167,419168,419169,419170,419171,419172,419173,419174,403707,408996,408997,408998,408999,409000,409001,403706,409576,409577,409587,419175,419176,403708,409578,409579,409580,409581,409582,409583,409584,409585,409586,403703,403702,409512,419177,419178,419179,419180,419181,419182,419183,419184,409517,409519,409518,409524,409525,409526,409527,409528,409529,409530,409531,409532,409533,409534,409535,409536,409537,409538,409510,409539,409540,409541,419186,409542,409544,419187,419188,419189,419190,419191,419192,419193,419194,419195,419196,419197,419198,419199,409520,419200,419201,419202,419203,419204,419205,419207,419208,419209,419210,419211,419212,419213,419214,419216,419219&desatualizada=0&anulada=0&query=definicao+funcao&auth=force' },
    ]);

    // Meta 2
    const meta2 = await db.insert(goals).values({ weekId, number: 2, discipline: 'Direito Tributário', subject: 'Introdução ao Direito Tributário', type: 'teoria' }).returning();
    await db.insert(materials).values([
      { goalId: meta2[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 14', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/pPzClkNrXAA%3D' },
      { goalId: meta2[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/WhQpZlUAtuI%3D' },
      { goalId: meta2[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407145,415863,415864,407155,417876,407154,407168,417609,417590,417591,417592,417593,417594&desatualizada=0&anulada=0&auth=force' },
    ]);

    // Meta 3
    const meta3 = await db.insert(goals).values({ weekId, number: 3, discipline: 'Contabilidade Geral', subject: 'Introdução à Contabilidade', type: 'teoria' }).returning();
    await db.insert(materials).values([
      { goalId: meta3[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 10', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/I5Mo3DI0hqU%3D' },
      { goalId: meta3[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/sQjwCmhAjGQ%3D' },
      { goalId: meta3[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=291366,416839,4300,104&desatualizada=0&anulada=0&auth=force' },
    ]);

    // Meta 4
    const meta4 = await db.insert(goals).values({ weekId, number: 4, discipline: 'Direito Constitucional', subject: 'Princípios Fundamentais', type: 'teoria' }).returning();
    await db.insert(materials).values([
      { goalId: meta4[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 2', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/l2hw2yBR6tc%3D' },
      { goalId: meta4[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/fMOtrQZYp5E%3D' },
      { goalId: meta4[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=405212&qd=0&qa=0&auth=force' },
    ]);

    // Meta 5
    const meta5 = await db.insert(goals).values({ weekId, number: 5, discipline: 'Tecnologia da Informação', subject: 'COBIT 2019', type: 'teoria' }).returning();
    await db.insert(materials).values([
      { goalId: meta5[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 16', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Xs8nJUwuSvc%3D' },
      { goalId: meta5[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/p7ZNKhwmM8Y%3D' },
      { goalId: meta5[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=14&desatualizada=0&anulada=0&query=COBIT+2019&auth=force' },
    ]);

    // Meta 6
    const meta6 = await db.insert(goals).values({ weekId, number: 6, discipline: 'Direito Administrativo', subject: 'Princípios Administrativos', type: 'teoria' }).returning();
    await db.insert(materials).values([
      { goalId: meta6[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 3', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/HhmIvHPk+OI%3D' },
      { goalId: meta6[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/EwwNj8J1xpM%3D' },
      { goalId: meta6[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?a=407787&qd=0&qa=0&auth=force' },
    ]);

    // Meta 7
    const meta7 = await db.insert(goals).values({ weekId, number: 7, discipline: 'Raciocínio Lógico', subject: 'Operadores Lógicos Fundamentais', type: 'teoria' }).returning();
    await db.insert(materials).values([
      { goalId: meta7[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 12', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/fUp/ImIRTe4%3D' },
      { goalId: meta7[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/LeFrHnEMxbg%3D' },
      { goalId: meta7[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=411081,411082,411083&desatualizada=0&anulada=0&auth=force' },
    ]);

    // Meta 8
    const meta8 = await db.insert(goals).values({ weekId, number: 8, discipline: 'Direito Tributário', subject: 'Limitações Constitucionais ao Poder de Tributar', type: 'teoria' }).returning();
    await db.insert(materials).values([
      { goalId: meta8[0].id, type: 'videoaula', description: 'Videoaula: aulas 1 a 18', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/awsHjIGoZec%3D' },
      { goalId: meta8[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/Y9UpPwoKLXY%3D' },
      { goalId: meta8[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=407146,415865,415867,417595,417596,417597,417598,417599,415868,417600,415869,417601,415870,417602,415871,415877,415878,415879,415881,415882,415883,415884,415886,415887,415866,415888,417603,417604,415889,417605,417606,415890,417609,417610,417611,417612,417613,417614,417615,417616,417617,417618,417620,417621,417622,417623,417624,417625,417626,417627&desatualizada=0&anulada=0&query=conceitos&auth=force' },
    ]);

    // Meta 9
    const meta9 = await db.insert(goals).values({ weekId, number: 9, discipline: 'Contabilidade Geral', subject: 'Contas', type: 'teoria' }).returning();
    await db.insert(materials).values([
      { goalId: meta9[0].id, type: 'videoaula', description: 'Videoaula: aulas 2 a 9', link: 'https://www.grancursosonline.com.br/aluno/curso/video/codigo/FKuOwzb74N0%3D/v/Coo4wULrDLA%3D' },
      { goalId: meta9[0].id, type: 'pdf', description: 'PDF completo', link: 'https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/FKuOwzb74N0%3D/a/v/OfBnZ5Xfg%3D' },
      { goalId: meta9[0].id, type: 'questoes', description: '20 questões', link: 'https://questoes.grancursosonline.com.br/aluno/filtro/concursos?assunto=4341,4340,4339,4347,4342,104&desatualizada=0&anulada=0&auth=force' },
    ]);

    // Meta 10
    const meta10 = await db.insert(goals).values({ weekId, number: 10, discipline: 'Tecnologia da Informação', subject: 'ITIL 4 (Parte I)', type: 'teoria' }).returning();
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
    
    console.log('Seed completed successfully!');
  } else {
    console.log('Database already contains data, skipping seed.');
  }
}

seed().catch(console.error);
