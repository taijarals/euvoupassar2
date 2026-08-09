import React from 'react';
import { Route, Switch, Link, useLocation } from 'wouter';
import Home from './Home';
import GoalDetail from './GoalDetail';
import Questions from './Questions';
import { Target, CheckSquare } from 'lucide-react';

export default function App() {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-lg">
            <Target className="w-6 h-6 text-emerald-600" />
            <span className="text-emerald-800">SEFAZ-BA <span className="font-light text-slate-500">Estudos</span></span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className={`text-sm font-medium transition-colors ${location === '/' ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-900'}`}>
              Metas
            </Link>
            <Link href="/questoes" className={`text-sm font-medium transition-colors ${location.startsWith('/questoes') ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-900'}`}>
              Questões
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/metas/:id" component={GoalDetail} />
          <Route path="/questoes" component={Questions} />
          <Route>
            <div className="text-center py-20 text-slate-500">
              <h2 className="text-2xl font-bold text-slate-700 mb-2">Página não encontrada</h2>
              <p>A rota solicitada não existe.</p>
              <Link href="/" className="text-emerald-600 hover:underline mt-4 inline-block">Voltar ao início</Link>
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  );
}
