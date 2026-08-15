import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Plus, ChevronRight, Video, FileText, CheckCircle2, Target, ExternalLink, CalendarDays, CheckSquare, ChevronDown, ChevronUp } from 'lucide-react';

type Material = {
  id: number;
  goalId: number;
  type: 'videoaula' | 'pdf' | 'questoes' | 'tarefa';
  description: string;
  link?: string;
  completed: boolean;
};

type Goal = {
  id: number;
  weekId: number;
  number: number;
  discipline: string;
  subject: string;
  type: 'teoria' | 'revisao';
  studyTip?: string;
  materials: Material[];
};

type Week = {
  id: number;
  number: number;
  title: string;
  goals: Goal[];
};

export default function Home() {
  const queryClient = useQueryClient();
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({});
  const [initialized, setInitialized] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Todas as disciplinas');

  const { data: weeks, isLoading } = useQuery<Week[]>({
    queryKey: ['weeks'],
    queryFn: async () => {
      const res = await fetch('/api/weeks');
      if (!res.ok) throw new Error('Falha ao carregar');
      return res.json();
    }
  });

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Falha ao carregar estatísticas');
      return res.json();
    }
  });

  React.useEffect(() => {
    if (weeks && weeks.length > 0 && !initialized) {
      let activeWeekId = weeks[weeks.length - 1].id; // fallback to last week
      
      for (const week of weeks) {
        const totalMat = week.goals.reduce((acc, g) => acc + g.materials.length, 0);
        const compMat = week.goals.reduce((acc, g) => acc + g.materials.filter(m => m.completed).length, 0);
        if (totalMat === 0 || compMat < totalMat) {
          activeWeekId = week.id;
          break;
        }
      }
      
      setExpandedWeeks({ [activeWeekId]: true });
      setInitialized(true);
    }
  }, [weeks, initialized]);

  const disciplines = React.useMemo(() => {
    if (!weeks) return [];
    const discSet = new Set<string>();
    weeks.forEach(week => {
      week.goals.forEach(goal => {
        if (goal.discipline) {
          discSet.add(goal.discipline);
        }
      });
    });
    return Array.from(discSet).sort();
  }, [weeks]);

  const filteredGoals = React.useMemo(() => {
    if (!weeks || selectedDiscipline === 'Todas as disciplinas') return null;
    const flatGoals: (Goal & { weekTitle: string, weekNumber: number })[] = [];
    weeks.forEach(week => {
      week.goals.forEach(goal => {
        if (goal.discipline === selectedDiscipline) {
          flatGoals.push({ ...goal, weekTitle: week.title, weekNumber: week.number });
        }
      });
    });
    return flatGoals.sort((a, b) => a.weekNumber - b.weekNumber);
  }, [weeks, selectedDiscipline]);

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-32 bg-slate-200 rounded-xl"></div>
      <div className="h-20 bg-slate-200 rounded-xl"></div>
      <div className="h-20 bg-slate-200 rounded-xl"></div>
    </div>;
  }

  const totalProgress = stats ? 
    (stats.totalMaterials > 0 ? Math.round((stats.completedMaterials / stats.totalMaterials) * 100) : 0) 
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Links Úteis */}
      <section className="flex flex-col sm:flex-row gap-3">
        <a 
          href="https://www.grancursosonline.com.br/aluno/curso/video/codigo/7NprxfFr1Ho%3D/v/dZBW0NCOqaw%3D/c/PB4vmZABDPY%3D"
          target="_blank" rel="noreferrer"
          className="flex-1 bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:border-emerald-300 hover:shadow-sm transition-all"
        >
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-slate-800 text-sm">Curso Base</div>
            <div className="text-xs text-slate-500">SEFAZ/BA - Auditor Fiscal</div>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
        </a>
        <a 
          href="https://t.me/+Ulk98T6c91dlYmE5"
          target="_blank" rel="noreferrer"
          className="flex-1 bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:border-blue-300 hover:shadow-sm transition-all"
        >
          <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-slate-800 text-sm">Grupo de Estudos</div>
            <div className="text-xs text-slate-500">Telegram Oficial</div>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
        </a>
      </section>

      {/* Stats Card */}
      <section className="bg-emerald-600 rounded-2xl py-6 md:p-6 text-white shadow-lg shadow-emerald-600/20 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between px-6 md:px-0">
          <div>
            <h1 className="text-2xl font-bold">Resumo do Progresso</h1>
            <p className="text-emerald-100 mt-1">Seu avanço rumo à aprovação</p>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 w-[calc(100%+3rem)] md:w-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="snap-center shrink-0 w-[140px] md:w-auto bg-emerald-700/40 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none flex flex-col items-center justify-center">
              <div className="text-4xl font-black">{totalProgress}%</div>
              <div className="text-xs uppercase tracking-wider text-emerald-200 font-semibold mt-1">Concluído</div>
            </div>
            
            <div className="h-12 w-px bg-emerald-500/50 hidden md:block"></div>
            
            <div className="snap-center shrink-0 w-[140px] md:w-auto bg-emerald-700/40 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none flex flex-col items-center justify-center">
              <div className="text-2xl md:text-xl font-bold">{stats?.completedGoals || 0}/{stats?.totalGoals || 0}</div>
              <div className="text-xs text-emerald-200 mt-1 md:mt-0">Metas</div>
            </div>

            <div className="snap-center shrink-0 w-[140px] md:w-auto bg-emerald-700/40 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none flex flex-col items-center justify-center">
              <div className="text-2xl md:text-xl font-bold">{stats?.completedMaterials || 0}/{stats?.totalMaterials || 0}</div>
              <div className="text-xs text-emerald-200 mt-1 md:mt-0">Materiais</div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6 mb-2 md:mb-4 bg-emerald-800/50 rounded-full h-2 overflow-hidden mx-6 md:mx-0">
          <div 
            className="bg-white h-full rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${totalProgress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        {/* Breakdown by Type */}
        {stats && (
          <div className="hidden md:grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-emerald-500/30 px-6 md:px-0">
            <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-1 sm:gap-2">
              <Video className="w-4 h-4 text-emerald-200" />
              <div className="text-sm font-medium text-emerald-100 hidden sm:block">Vídeos:</div>
              <div className="text-sm font-bold">{stats.byType.videoaula.completed}/{stats.byType.videoaula.total}</div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-1 sm:gap-2 border-l border-emerald-500/30">
              <FileText className="w-4 h-4 text-emerald-200" />
              <div className="text-sm font-medium text-emerald-100 hidden sm:block">PDFs:</div>
              <div className="text-sm font-bold">{stats.byType.pdf.completed}/{stats.byType.pdf.total}</div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-1 sm:gap-2 border-l border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <div className="text-sm font-medium text-emerald-100 hidden sm:block">Questões:</div>
              <div className="text-sm font-bold">{stats.byType.questoes.completed}/{stats.byType.questoes.total}</div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-1 sm:gap-2 border-l border-emerald-500/30">
              <CheckSquare className="w-4 h-4 text-emerald-200" />
              <div className="text-sm font-medium text-emerald-100 hidden sm:block">Tarefas:</div>
              <div className="text-sm font-bold">{stats.byType.tarefa.completed}/{stats.byType.tarefa.total}</div>
            </div>
          </div>
        )}
      </section>

      {/* Progresso por Tipo de Material */}
      {stats && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Progresso por Tipo de Material</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Vídeos */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <Video className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-sm">Vídeos</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{stats.byType.videoaula.completed}/{stats.byType.videoaula.total}</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500 font-medium">Progresso</span>
                  <span className="text-xs font-bold text-emerald-700">{stats.byType.videoaula.total > 0 ? Math.round((stats.byType.videoaula.completed / stats.byType.videoaula.total) * 100) : 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${stats.byType.videoaula.total > 0 && stats.byType.videoaula.completed === stats.byType.videoaula.total ? 'bg-emerald-500' : 'bg-emerald-400'}`} 
                    style={{ width: `${stats.byType.videoaula.total > 0 ? Math.round((stats.byType.videoaula.completed / stats.byType.videoaula.total) * 100) : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* PDFs */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-sm">PDFs</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{stats.byType.pdf.completed}/{stats.byType.pdf.total}</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500 font-medium">Progresso</span>
                  <span className="text-xs font-bold text-emerald-700">{stats.byType.pdf.total > 0 ? Math.round((stats.byType.pdf.completed / stats.byType.pdf.total) * 100) : 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${stats.byType.pdf.total > 0 && stats.byType.pdf.completed === stats.byType.pdf.total ? 'bg-emerald-500' : 'bg-emerald-400'}`} 
                    style={{ width: `${stats.byType.pdf.total > 0 ? Math.round((stats.byType.pdf.completed / stats.byType.pdf.total) * 100) : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Questões */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-sm">Questões</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{stats.byType.questoes.completed}/{stats.byType.questoes.total}</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500 font-medium">Progresso</span>
                  <span className="text-xs font-bold text-emerald-700">{stats.byType.questoes.total > 0 ? Math.round((stats.byType.questoes.completed / stats.byType.questoes.total) * 100) : 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${stats.byType.questoes.total > 0 && stats.byType.questoes.completed === stats.byType.questoes.total ? 'bg-emerald-500' : 'bg-emerald-400'}`} 
                    style={{ width: `${stats.byType.questoes.total > 0 ? Math.round((stats.byType.questoes.completed / stats.byType.questoes.total) * 100) : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Tarefas */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-sm">Tarefas</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{stats.byType.tarefa.completed}/{stats.byType.tarefa.total}</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500 font-medium">Progresso</span>
                  <span className="text-xs font-bold text-emerald-700">{stats.byType.tarefa.total > 0 ? Math.round((stats.byType.tarefa.completed / stats.byType.tarefa.total) * 100) : 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${stats.byType.tarefa.total > 0 && stats.byType.tarefa.completed === stats.byType.tarefa.total ? 'bg-emerald-500' : 'bg-emerald-400'}`} 
                    style={{ width: `${stats.byType.tarefa.total > 0 ? Math.round((stats.byType.tarefa.completed / stats.byType.tarefa.total) * 100) : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Weeks & Goals List */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-slate-800">Plano de Estudos</h2>
          <select 
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
            className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 sm:max-w-xs w-full shadow-sm"
          >
            <option value="Todas as disciplinas">Todas as disciplinas</option>
            {disciplines.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredGoals ? (
            <div className="p-4 sm:p-6 bg-slate-50/50 rounded-xl border border-slate-200">
              <div className="space-y-3">
                {filteredGoals.map(goal => {
                  const totalMat = goal.materials.length;
                  const completedMat = goal.materials.filter(m => m.completed).length;
                  const progress = totalMat > 0 ? Math.round((completedMat / totalMat) * 100) : 0;
                  
                  return (
                    <Link href={`/metas/${goal.id}`} key={goal.id}>
                      <div className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-start sm:items-center gap-3">
                            {progress === 100 ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                            ) : (
                              <div className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 flex items-center justify-center bg-slate-100 rounded-full text-xs font-bold text-slate-500">
                                {goal.number}
                              </div>
                            )}
                            <div>
                              <h4 className={`font-semibold text-base sm:text-lg ${progress === 100 ? 'text-slate-500 line-through' : 'text-slate-800 group-hover:text-emerald-700'}`}>
                                Semana {goal.weekNumber} — {goal.discipline}
                              </h4>
                              <p className="text-slate-500 text-sm mt-0.5 line-clamp-1">
                                {goal.type === 'revisao' ? <span className="bg-amber-100 text-amber-800 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded mr-2">Revisão</span> : null}
                                {goal.subject}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 sm:w-48 justify-between sm:justify-end pl-8 sm:pl-0">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs font-medium mb-1">
                              <span className="text-slate-500">{completedMat}/{totalMat}</span>
                              <span className={progress === 100 ? 'text-emerald-600' : 'text-slate-700'}>{progress}%</span>
                            </div>
                            <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors hidden sm:block" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
                {filteredGoals.length === 0 && (
                  <div className="text-center py-6 text-slate-500">Nenhuma meta encontrada para esta disciplina.</div>
                )}
              </div>
            </div>
          ) : (
            weeks?.map(week => {
            const totalWeekMaterials = week.goals.reduce((acc, g) => acc + g.materials.length, 0);
            const completedWeekMaterials = week.goals.reduce((acc, g) => acc + g.materials.filter(m => m.completed).length, 0);
            const weekProgress = totalWeekMaterials > 0 ? Math.round((completedWeekMaterials / totalWeekMaterials) * 100) : 0;
            const isExpanded = !!expandedWeeks[week.id];

            return (
              <div key={week.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setExpandedWeeks(prev => ({ ...prev, [week.id]: !prev[week.id] }))}
                  className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${weekProgress === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      <CalendarDays className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-base sm:text-lg font-bold text-slate-800">Semana {week.number} - {week.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        {completedWeekMaterials}/{totalWeekMaterials} materiais concluídos
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="hidden sm:block w-32">
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className={weekProgress === 100 ? 'text-emerald-600' : 'text-slate-700'}>{weekProgress}%</span>
                      </div>
                      <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${weekProgress === 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                          style={{ width: `${weekProgress}%` }}
                        />
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="p-4 sm:p-6 pt-2 border-t border-slate-100 bg-slate-50/50">
                    <div className="space-y-3">
                      {week.goals.map(goal => {
                        const totalMat = goal.materials.length;
                        const completedMat = goal.materials.filter(m => m.completed).length;
                        const progress = totalMat > 0 ? Math.round((completedMat / totalMat) * 100) : 0;
                        
                        return (
                          <Link href={`/metas/${goal.id}`} key={goal.id}>
                            <div className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center gap-4">
                              <div className="flex-1">
                                <div className="flex items-start sm:items-center gap-3">
                                  {progress === 100 ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                                  ) : (
                                    <div className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 flex items-center justify-center bg-slate-100 rounded-full text-xs font-bold text-slate-500">
                                      {goal.number}
                                    </div>
                                  )}
                                  <div>
                                    <h4 className={`font-semibold text-base sm:text-lg ${progress === 100 ? 'text-slate-500 line-through' : 'text-slate-800 group-hover:text-emerald-700'}`}>
                                      {goal.discipline}
                                    </h4>
                                    <p className="text-slate-500 text-sm mt-0.5 line-clamp-1">
                                      {goal.type === 'revisao' ? <span className="bg-amber-100 text-amber-800 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded mr-2">Revisão</span> : null}
                                      {goal.subject}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-6 sm:w-48 justify-between sm:justify-end pl-8 sm:pl-0">
                                <div className="flex-1">
                                  <div className="flex justify-between text-xs font-medium mb-1">
                                    <span className="text-slate-500">{completedMat}/{totalMat}</span>
                                    <span className={progress === 100 ? 'text-emerald-600' : 'text-slate-700'}>{progress}%</span>
                                  </div>
                                  <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                                      style={{ width: `${progress}%` }}
                                    />
                                  </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors hidden sm:block" />
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          }))}
          
          {!filteredGoals && weeks?.length === 0 && (
            <div className="text-center py-12 bg-white border border-dashed border-slate-300 rounded-2xl">
              <Target className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">Nenhum plano ainda</h3>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

