import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useRoute, useLocation } from 'wouter';
import { ChevronLeft, Plus, ExternalLink, Video, FileText, CheckSquare, Square, Trash2, PenLine, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

type Material = {
  id: number;
  goalId: number;
  description: string;
  type: 'videoaula' | 'pdf' | 'questoes' | 'tarefa';
  link?: string;
  completed: boolean;
  completedAt?: string;
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
  week: {
    id: number;
    number: number;
    title: string;
  };
};

const TypeIcon = ({ type, className }: { type: string, className?: string }) => {
  switch (type) {
    case 'videoaula': return <Video className={className} />;
    case 'pdf': return <FileText className={className} />;
    case 'questoes': return <CheckSquare className={className} />;
    default: return <CheckSquare className={className} />;
  }
};

const TypeLabel = ({ type }: { type: string }) => {
  switch (type) {
    case 'videoaula': return 'Videoaula';
    case 'pdf': return 'PDF';
    case 'questoes': return 'Questões';
    case 'tarefa': return 'Tarefa';
    default: return 'Material';
  }
};

export default function GoalDetail() {
  const [, params] = useRoute('/metas/:id');
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const goalId = parseInt(params?.id || '0');

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMaterialId, setEditingMaterialId] = useState<number | null>(null);
  const [newMaterial, setNewMaterial] = useState<{description: string, type: Material['type'], link: string}>({ 
    description: '', type: 'videoaula', link: '' 
  });

  const openAddMaterialModal = () => {
    setEditingMaterialId(null);
    setNewMaterial({ description: '', type: 'videoaula', link: '' });
    setShowAddModal(true);
  };

  const openEditMaterialModal = (mat: Material) => {
    setEditingMaterialId(mat.id);
    setNewMaterial({ description: mat.description, type: mat.type, link: mat.link || '' });
    setShowAddModal(true);
  };

  const { data: goal, isLoading } = useQuery<Goal>({
    queryKey: ['goal', goalId],
    queryFn: async () => {
      const res = await fetch(`/api/goals/${goalId}`);
      if (!res.ok) throw new Error('Falha ao carregar meta');
      const data = await res.json();
      return data;
    }
  });

  const toggleMaterial = useMutation({
    mutationFn: async ({ id, completed }: { id: number, completed: boolean }) => {
      const res = await fetch(`/api/materials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goal', goalId] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['weeks'] });
    }
  });

  const saveMaterial = useMutation({
    mutationFn: async (material: typeof newMaterial) => {
      const isEditing = editingMaterialId !== null;
      const url = isEditing ? `/api/materials/${editingMaterialId}` : '/api/materials';
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing ? { ...material } : { ...material, goalId };
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goal', goalId] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['weeks'] });
      setShowAddModal(false);
      setNewMaterial({ description: '', type: 'videoaula', link: '' });
      setEditingMaterialId(null);
    }
  });

  const deleteMaterial = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/materials/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goal', goalId] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['weeks'] });
    }
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-10 w-32 bg-slate-200 rounded"></div>
      <div className="h-32 bg-slate-200 rounded-xl"></div>
      <div className="h-64 bg-slate-200 rounded-xl"></div>
    </div>;
  }

  if (!goal) return <div>Meta não encontrada.</div>;

  const total = goal.materials.length;
  const completed = goal.materials.filter(m => m.completed).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Agrupar materiais
  const groupedMaterials = goal.materials.reduce((acc, m) => {
    if (!acc[m.type]) acc[m.type] = [];
    acc[m.type].push(m);
    return acc;
  }, {} as Record<string, Material[]>);

  const typeOrder = ['videoaula', 'pdf', 'questoes', 'tarefa'];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors font-medium">
        <ChevronLeft className="w-4 h-4" /> Voltar para Plano
      </Link>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
        {progress === 100 && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -mr-16 -mt-16 flex items-end justify-start p-6">
            <CheckSquare className="w-8 h-8 text-emerald-500" />
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2 text-sm text-emerald-600 font-semibold">
              <span>Semana {goal.week?.number} / Meta {goal.number}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{goal.discipline}</h1>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              {goal.type === 'revisao' && (
                <span className="bg-amber-100 text-amber-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded mr-1">Revisão</span>
              )}
              {goal.subject}
            </p>
          </div>
        </div>

        {goal.studyTip && (
          <div className="mb-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800">
            <BookOpen className="w-5 h-5 flex-shrink-0 text-blue-500 mt-0.5" />
            <div className="text-sm whitespace-pre-wrap">
              <span className="font-semibold block mb-1">Dica de Estudo</span>
              {goal.studyTip}
            </div>
          </div>
        )}

        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex justify-between items-end mb-2">
            <div>
              <div className="text-sm font-medium text-slate-500 mb-1">Progresso da Meta</div>
              <div className="text-2xl font-bold text-emerald-700">{progress}%</div>
            </div>
            <div className="text-sm font-medium text-slate-600">
              {total - completed > 0 ? `Faltam ${total - completed} itens` : 'Tudo concluído! 🎉'}
            </div>
          </div>
          <div className="bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Materiais de Estudo</h2>
        <button 
          onClick={openAddMaterialModal}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>

      {total === 0 ? (
        <div className="text-center py-12 bg-white border border-dashed border-slate-300 rounded-2xl">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">Nenhum material</h3>
          <p className="text-slate-500">Adicione materiais ou tarefas a esta meta.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {typeOrder.map(type => {
            const mats = groupedMaterials[type];
            if (!mats || mats.length === 0) return null;
            
            return (
              <div key={type} className="space-y-3">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
                  <TypeIcon type={type} className="w-4 h-4" />
                  <TypeLabel type={type} />
                  <span className="ml-auto bg-slate-100 text-slate-500 py-0.5 px-2 rounded-full text-xs">
                    {mats.length}
                  </span>
                </h3>
                
                <div className="grid gap-3">
                  {mats.map(mat => (
                    <div 
                      key={mat.id} 
                      className={`group flex flex-col sm:flex-row sm:items-center gap-4 bg-white border rounded-xl p-4 transition-all ${
                        mat.completed ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <button 
                        onClick={() => toggleMaterial.mutate({ id: mat.id, completed: !mat.completed })}
                        className="flex-shrink-0 flex items-start sm:items-center gap-3 text-left"
                      >
                        {mat.completed ? (
                          <CheckSquare className="w-6 h-6 text-emerald-500 mt-0.5 sm:mt-0" />
                        ) : (
                          <Square className="w-6 h-6 text-slate-300 group-hover:text-emerald-400 transition-colors mt-0.5 sm:mt-0" />
                        )}
                        <span className={`font-medium text-base ${mat.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                          {mat.description}
                        </span>
                      </button>
                      
                      <div className="flex items-center gap-2 sm:ml-auto pl-9 sm:pl-0">
                        {mat.link && (
                          <a 
                            href={mat.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Abrir
                          </a>
                        )}
                        <button 
                          onClick={() => openEditMaterialModal(mat)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors sm:opacity-0 group-hover:opacity-100"
                          title="Editar material"
                        >
                          <PenLine className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            if(confirm('Excluir este material?')) {
                              deleteMaterial.mutate(mat.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors sm:opacity-0 group-hover:opacity-100"
                          title="Excluir material"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">{editingMaterialId ? 'Editar Material' : 'Novo Material'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); saveMaterial.mutate(newMaterial); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ex: Videoaula 01 a 03"
                  value={newMaterial.description}
                  onChange={e => setNewMaterial({...newMaterial, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['videoaula', 'pdf', 'questoes', 'tarefa'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewMaterial({...newMaterial, type})}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border text-sm font-medium transition-colors ${
                        newMaterial.type === type 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <TypeIcon type={type} className="w-5 h-5 mb-1" />
                      <TypeLabel type={type} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Link (opcional)</label>
                <input 
                  type="url" 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="https://..."
                  value={newMaterial.link}
                  onChange={e => setNewMaterial({...newMaterial, link: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={saveMaterial.isPending}
                  className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {saveMaterial.isPending ? 'Salvando...' : (editingMaterialId ? 'Salvar Alterações' : 'Adicionar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
