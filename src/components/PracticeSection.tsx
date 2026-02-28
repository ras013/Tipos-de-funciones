import React, { useState } from 'react';
import { FunctionDefinition } from '../data/functions';
import StaticGraph from './StaticGraph';
import { ChevronDown, ChevronUp, Lightbulb, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PracticeSectionProps {
  func: FunctionDefinition;
}

const PracticeSection: React.FC<PracticeSectionProps> = ({ func }) => {
  const [showSolution, setShowSolution] = useState(false);

  // Reset state when function changes
  React.useEffect(() => {
    setShowSolution(false);
  }, [func.id]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Solved Example */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-indigo-50/30 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-slate-900">Ejemplo Resuelto</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-medium text-slate-900 mb-2">{func.solvedProblem.title}</h4>
            <p className="text-slate-600 text-sm mb-4">{func.solvedProblem.description}</p>
            
            <StaticGraph 
              func={func} 
              params={func.solvedProblem.graphParams} 
              variantId={func.solvedProblem.variantId}
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pasos de Solución</p>
            <ul className="space-y-2">
              {func.solvedProblem.steps.map((step, idx) => (
                <li key={idx} className="text-sm text-slate-700 flex gap-2">
                  <span className="font-mono text-indigo-500 font-bold">{idx + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Proposed Problem */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-amber-50/30 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-slate-900">Desafío Propuesto</h3>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-6">
            <h4 className="font-medium text-slate-900 mb-2">{func.proposedProblem.title}</h4>
            <p className="text-slate-600 text-sm">{func.proposedProblem.description}</p>
          </div>

          <div className="mt-auto">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
            >
              {showSolution ? 'Ocultar Solución' : 'Mostrar Solución'}
              {showSolution ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {showSolution && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 space-y-4">
                    <StaticGraph 
                      func={func} 
                      params={func.proposedProblem.graphParams}
                      variantId={func.proposedProblem.variantId}
                    />
                    <ul className="space-y-2 bg-slate-50 p-4 rounded-xl">
                      {func.proposedProblem.solutionSteps.map((step, idx) => (
                        <li key={idx} className="text-sm text-slate-700 flex gap-2">
                          <span className="font-mono text-emerald-500 font-bold">✓</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeSection;
