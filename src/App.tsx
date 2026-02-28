import React, { useState } from 'react';
import IntroductionSection from './components/IntroductionSection';
import TypesSection from './components/TypesSection';
import { Sigma, BookOpen, LayoutGrid } from 'lucide-react';

function App() {
  const [activeMainTab, setActiveMainTab] = useState<'intro' | 'types'>('intro');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Sigma className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 hidden sm:block">
              Guía Visual de Funciones
            </h1>
          </div>
          
          {/* Main Tabs Navigation */}
          <nav className="flex p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveMainTab('intro')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${activeMainTab === 'intro' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }
              `}
            >
              <BookOpen className="w-4 h-4" />
              Introducción
            </button>
            <button
              onClick={() => setActiveMainTab('types')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${activeMainTab === 'types' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }
              `}
            >
              <LayoutGrid className="w-4 h-4" />
              Tipos de Funciones
            </button>
          </nav>
        </div>
      </header>

      <main>
        {activeMainTab === 'intro' ? (
          <IntroductionSection />
        ) : (
          <TypesSection />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          <p>© 2024 Guía Visual de Funciones. Creado con fines educativos.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
