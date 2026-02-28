import React, { useState } from 'react';
import { functionsData } from '../data/functions';
import InteractiveGraph from './InteractiveGraph';
import QuizSection from './QuizSection';
import LearnSection from './LearnSection';
import PracticeSection from './PracticeSection';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const TypesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(functionsData[0].id);
  const activeFunc = functionsData.find(f => f.id === activeTab) || functionsData[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-8">
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
              Funciones Algebraicas
            </h3>
            <div className="space-y-1">
              {functionsData.filter(f => f.type === 'algebraic').map(func => (
                <button
                  key={func.id}
                  onClick={() => setActiveTab(func.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${activeTab === func.id 
                      ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${func.color}`} />
                    {func.name}
                  </div>
                  {activeTab === func.id && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
              Funciones Trascendentales
            </h3>
            <div className="space-y-1">
              {functionsData.filter(f => f.type === 'transcendental').map(func => (
                <button
                  key={func.id}
                  onClick={() => setActiveTab(func.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${activeTab === func.id 
                      ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${func.color}`} />
                    {func.name}
                  </div>
                  {activeTab === func.id && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-bold text-slate-900">{activeFunc.name}</h2>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full uppercase tracking-wide">
                {activeFunc.type === 'algebraic' ? 'Algebraica' : 'Trascendental'}
              </span>
            </div>

            <InteractiveGraph func={activeFunc} />
            
            <LearnSection func={activeFunc} />

            <PracticeSection func={activeFunc} />
            
            <QuizSection func={activeFunc} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TypesSection;
