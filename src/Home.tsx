import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Plus, ChevronRight, Video, FileText, CheckCircle2, Target, ExternalLink, CalendarDays, CheckSquare } from 'lucide-react';

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
      <section className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-600/20">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Resumo do Progresso</h1>
            <p className="text-emerald-100 mt-1">Seu avanço rumo à aprovação</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-black">{totalProgress}%</div>
              <div className="text-xs uppercase tracking-wider text-emerald-200 font-semibold mt-1">Concluído</div>
            </div>
            
            <div className="h-12 w-px bg-emerald-500/50 hidden md:block"></div>
            
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-xl font-bold">{stats?.completedGoals || 0}/{stats?.totalGoals || 0}</div>
                <div className="text-xs text-emerald-200">Metas</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{stats?.completedMaterials || 0}/{stats?.totalMaterials || 0}</div>
                <div className="text-xs text-emerald-200">Materiais</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6 mb-4 bg-emerald-800/50 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${totalProgress}%` }}
          />
        </div>

        {/* Breakdown by Type */}
        {stats && (
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-emerald-500/30">
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

      {/* Weeks & Goals List */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Plano de Estudos</h2>
        </div>

        {weeks?.map(week => (
          <div key={week.id} className="mb-10">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <CalendarDays className="w-5 h-5 text-emerald-600" />
              Semana {week.number} - {week.title}
            </h3>
            
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
        ))}

        {weeks?.length === 0 && (
          <div className="text-center py-12 bg-white border border-dashed border-slate-300 rounded-2xl">
            <Target className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">Nenhum plano ainda</h3>
          </div>
        )}
      </section>

    </div>
  );
}

