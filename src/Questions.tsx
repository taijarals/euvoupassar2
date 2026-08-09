import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Sparkles, Brain, Search, BookOpen, CheckCircle, XCircle, ChevronDown, Check, BarChart2 } from 'lucide-react';

interface Question {
  id: number;
  goalId: number;
  source: string;
  banca?: string;
  statement: string;
  options: string[];
  correctIndex: number;
  explanations: string[];
  createdAt: string;
  attempts: any[];
  goal: {
    id: number;
    discipline: string;
    subject: string;
    weekId: number;
  };
  week: {
    id: number;
    number: number;
    title: string;
  };
}

export default function Questions() {
  const queryClient = useQueryClient();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [selectedWeek, setSelectedWeek] = useState<number | ''>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  
  // Generator state
  const [source, setSource] = useState<'ia_nova' | 'ia_estilo_concurso'>('ia_nova');
  const [banca, setBanca] = useState<string>('FCC');
  const [quantity, setQuantity] = useState<number>(3);
  
  // Data fetching
  const { data: questions = [], isLoading: loadingQuestions } = useQuery<Question[]>({
    queryKey: ['questions'],
    queryFn: async () => {
      const res = await fetch('/api/questions');
      if (!res.ok) throw new Error('Failed to fetch questions');
      return res.json();
    }
  });

  const { data: weeks = [] } = useQuery({
    queryKey: ['weeks'],
    queryFn: async () => {
      const res = await fetch('/api/weeks');
      return res.json();
    }
  });

  const { data: stats } = useQuery({
    queryKey: ['questions', 'stats', selectedDiscipline, selectedWeek],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedDiscipline) params.append('discipline', selectedDiscipline);
      if (selectedWeek) params.append('weekId', selectedWeek.toString());
      if (selectedSubject) params.append('subject', selectedSubject);
      const res = await fetch(`/api/questions/stats?${params.toString()}`);
      return res.json();
    }
  });

  const generateMutation = useMutation({
    mutationFn: async (goalIds: number[]) => {
      const res = await fetch('/api/questions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goalIds,
          source,
          banca: source === 'ia_estilo_concurso' ? banca : undefined,
          quantity
        })
      });
      if (!res.ok) throw new Error('Failed to generate');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
    onError: (e: any) => {
      alert('Erro ao gerar questões: ' + e.message);
    }
  });

  // Filter questions for display and for generator
  const filteredQuestions = questions.filter(q => {
    if (selectedDiscipline && q.goal?.discipline !== selectedDiscipline) return false;
    if (selectedWeek && q.goal?.weekId !== selectedWeek) return false;
    if (selectedSubject && q.goal?.subject !== selectedSubject) return false;
    return true;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Derive available goals for generator based on filters
  // To do this properly, we need to fetch goals. We can extract unique goals from the questions, 
  // but if there are no questions yet, we can't filter. Let's fetch goals.
  const { data: goals = [] } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const res = await fetch('/api/stats'); // Actually /api/stats only has aggregated data, wait we need /api/goals, but we don't have a GET /api/goals endpoint?
      // Let's use weeks data, which has goals inside it.
      const weeksRes = await fetch('/api/weeks');
      const weeksData = await weeksRes.json();
      const allGoals: any[] = [];
      weeksData.forEach((w: any) => {
        if (w.goals) {
           w.goals.forEach((g: any) => allGoals.push({...g, weekId: w.id}));
        }
      });
      return allGoals;
    }
  });

  const filteredGoals = goals.filter((g: any) => {
    if (selectedDiscipline && g.discipline !== selectedDiscipline) return false;
    if (selectedWeek && g.weekId !== selectedWeek) return false;
    if (selectedSubject && g.subject !== selectedSubject) return false;
    return true;
  });

  const disciplines = Array.from(new Set(goals.map((g: any) => g.discipline))).sort();
  
  const goalsForSubjects = goals.filter((g: any) => {
    if (selectedDiscipline && g.discipline !== selectedDiscipline) return false;
    if (selectedWeek && g.weekId !== selectedWeek) return false;
    return true;
  });
  const subjects = Array.from(new Set(goalsForSubjects.map((g: any) => g.subject))).sort() as string[];

  const handleGenerate = () => {
    const goalIds = filteredGoals.map((g: any) => g.id);
    if (goalIds.length === 0) {
      alert('Nenhuma meta encontrada com os filtros atuais. Limpe os filtros ou adicione metas.');
      return;
    }
    generateMutation.mutate(goalIds);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Questões de Revisão</h1>
          <p className="text-slate-500 mt-1">Gere e resolva questões focadas no seu edital.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap gap-4 items-end shadow-xs">
        <div className="space-y-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Semana</label>
          <select 
            value={selectedWeek} 
            onChange={e => {
              setSelectedWeek(e.target.value ? Number(e.target.value) : '');
              setSelectedSubject(''); // reset subject when week changes
            }}
            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          >
            <option value="">Todas as Semanas</option>
            {weeks.map((w: any) => (
              <option key={w.id} value={w.id}>Semana {w.number}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Disciplina</label>
          <select 
            value={selectedDiscipline} 
            onChange={e => {
              setSelectedDiscipline(e.target.value);
              setSelectedSubject(''); // reset subject when discipline changes
            }}
            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          >
            <option value="">Todas as Disciplinas</option>
            {disciplines.map((d: any) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assunto</label>
          <select 
            value={selectedSubject} 
            onChange={e => setSelectedSubject(e.target.value)}
            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          >
            <option value="">Todos os Assuntos</option>
            {subjects.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Generator Panel */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h2 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Gerar Questões
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Tipo de Questão</label>
                <select 
                  value={source} 
                  onChange={(e: any) => setSource(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                >
                  <option value="ia_nova">IA — Questão Inédita</option>
                  <option value="ia_estilo_concurso">IA — Estilo de Banca</option>
                </select>
              </div>

              {source === 'ia_estilo_concurso' && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="text-sm font-medium text-slate-700">Banca Inspiradora</label>
                  <select 
                    value={banca} 
                    onChange={e => setBanca(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  >
                    <option value="FCC">FCC</option>
                    <option value="FGV">FGV</option>
                    <option value="CESPE/CEBRASPE">CESPE / CEBRASPE</option>
                  </select>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Quantidade</label>
                <select 
                  value={quantity} 
                  onChange={e => setQuantity(Number(e.target.value))}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                >
                  <option value={1}>1 questão</option>
                  <option value={3}>3 questões</option>
                  <option value={5}>5 questões</option>
                  <option value={10}>10 questões</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={generateMutation.isPending}
                  className="w-full h-10 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {generateMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Gerando...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4" />
                      <span>Gerar Questões</span>
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 mt-3 px-2">
                  Baseado nos filtros ativos ({filteredGoals.length} meta(s)/assunto(s)).
                </p>
              </div>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h2 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <BarChart2 className="w-5 h-5 text-emerald-600" />
              Estatísticas
            </h2>
            
            {stats ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1">Respondidas</p>
                    <p className="text-xl font-bold text-slate-800">{stats.total}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1">Acertos</p>
                    <p className="text-xl font-bold text-emerald-600">
                      {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
                    </p>
                  </div>
                </div>
                
                {Object.keys(stats.byDiscipline || {}).length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase">Por disciplina</h3>
                    {Object.entries(stats.byDiscipline).map(([disc, data]: [string, any]) => (
                      <div key={disc} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-slate-700 truncate pr-2">{disc}</span>
                          <span className="text-slate-500">{data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full" 
                            style={{ width: `${data.total > 0 ? (data.correct / data.total) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-20 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="md:col-span-2 space-y-4">
          {loadingQuestions ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-slate-400 min-h-[400px]">
              <div className="w-8 h-8 border-2 border-slate-200 border-t-purple-500 rounded-full animate-spin mb-4" />
              <p>Carregando questões...</p>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center shadow-xs">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">Nenhuma questão encontrada</h3>
              <p className="text-slate-500 text-sm max-w-sm">
                Ajuste os filtros ou use o painel ao lado para gerar novas questões baseadas no seu material de estudo.
              </p>
            </div>
          ) : (
            filteredQuestions.map(q => <QuestionCard key={q.id} question={q} />)
          )}
        </div>
      </div>
    </div>
  );
}

function QuestionCard({ question }: { question: Question }) {
  const queryClient = useQueryClient();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAttempt, setLastAttempt] = useState<{isCorrect: boolean, correctIndex: number, explanations: string[]} | null>(null);

  const answerMutation = useMutation({
    mutationFn: async (selectedIndex: number) => {
      const res = await fetch(`/api/questions/${question.id}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedIndex })
      });
      if (!res.ok) throw new Error('Failed to submit answer');
      return res.json();
    },
    onSuccess: (data) => {
      setLastAttempt(data);
      setShowExplanation(true);
      queryClient.invalidateQueries({ queryKey: ['questions', 'stats'] });
    }
  });

  const handleSubmit = () => {
    if (selectedOption === null) return;
    answerMutation.mutate(selectedOption);
  };

  const getOptionLabel = (index: number) => {
    if (question.banca === 'CESPE/CEBRASPE') {
      return index === 0 ? 'Certo' : 'Errado'; // Wait, let's just use the option text
    }
    return String.fromCharCode(65 + index); // A, B, C, D, E
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="px-5 py-3 bg-slate-50/80 border-b border-slate-100 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
            question.source === 'ia_estilo_concurso' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {question.source === 'ia_estilo_concurso' ? `IA — Estilo ${question.banca}` : 'IA — Inédita'}
          </span>
          {question.goal && (
            <span className="text-xs text-slate-500 font-medium">
              {question.goal.discipline}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-5 md:p-6">
        <p className="text-slate-800 text-[15px] leading-relaxed mb-6 font-medium whitespace-pre-wrap">
          {question.statement}
        </p>

        <div className="space-y-2.5 mb-6">
          {question.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const isSubmitted = !!lastAttempt;
            const isCorrect = isSubmitted && lastAttempt.correctIndex === i;
            const isWrongSelected = isSubmitted && isSelected && !isCorrect;

            let btnClass = "w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ";
            
            if (isSubmitted) {
              if (isCorrect) {
                btnClass += "bg-emerald-50 border-emerald-200 text-emerald-900";
              } else if (isWrongSelected) {
                btnClass += "bg-red-50 border-red-200 text-red-900";
              } else {
                btnClass += "bg-slate-50 border-slate-100 text-slate-500 opacity-60";
              }
            } else {
              if (isSelected) {
                btnClass += "bg-blue-50 border-blue-300 text-blue-900 shadow-[0_0_0_2px_rgba(59,130,246,0.1)]";
              } else {
                btnClass += "bg-white border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-slate-50 cursor-pointer";
              }
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => !isSubmitted && setSelectedOption(i)}
                disabled={isSubmitted}
                className={btnClass}
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                  isSubmitted 
                    ? isCorrect ? 'bg-emerald-500 text-white' : isWrongSelected ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-500'
                    : isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {isSubmitted && isCorrect ? <Check className="w-3.5 h-3.5" /> : getOptionLabel(i)}
                </div>
                <div className="text-sm pt-0.5">{opt}</div>
              </button>
            );
          })}
        </div>

        {!lastAttempt ? (
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null || answerMutation.isPending}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {answerMutation.isPending ? 'Enviando...' : 'Responder'}
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <div className={`p-4 rounded-xl mb-4 border flex items-start gap-3 ${
              lastAttempt.isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
            }`}>
              {lastAttempt.isCorrect ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className={`font-bold ${lastAttempt.isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>
                  {lastAttempt.isCorrect ? 'Você acertou!' : 'Você errou!'}
                </h4>
                <p className={`text-sm mt-1 ${lastAttempt.isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                  {lastAttempt.isCorrect 
                    ? 'Ótimo trabalho! Leia o comentário abaixo para fixar o conteúdo.' 
                    : 'Não desanime! Verifique o comentário abaixo para entender o erro e aprender.'}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <button 
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  Gabarito Comentado
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showExplanation ? 'rotate-180' : ''}`} />
              </button>
              
              {showExplanation && (
                <div className="p-4 border-t border-slate-200 space-y-4">
                  {lastAttempt.explanations.map((exp, i) => (
                    <div key={i} className="text-sm">
                      <span className={`font-bold mr-2 ${i === lastAttempt.correctIndex ? 'text-emerald-600' : 'text-slate-700'}`}>
                        Alternativa {getOptionLabel(i)} {i === lastAttempt.correctIndex ? '(Correta)' : ''}:
                      </span>
                      <span className="text-slate-600 leading-relaxed">{exp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setSelectedOption(null);
                  setLastAttempt(null);
                  setShowExplanation(false);
                }}
                className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
