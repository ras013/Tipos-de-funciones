import React from 'react';
import { FunctionDefinition } from '../data/functions';
import { BookOpen, Calculator } from 'lucide-react';

interface LearnSectionProps {
  func: FunctionDefinition;
}

const LearnSection: React.FC<LearnSectionProps> = ({ func }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <div className={`p-2 rounded-lg ${func.color} bg-opacity-10`}>
            <BookOpen className={`w-5 h-5 ${func.color.replace('bg-', 'text-')}`} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Concepto Clave</h3>
        </div>
        <p className="text-slate-600 leading-relaxed">
          {func.description}
        </p>
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fórmula General</span>
          <p className="font-mono text-xl text-slate-900 mt-1">{func.formula}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <div className={`p-2 rounded-lg ${func.color} bg-opacity-10`}>
            <Calculator className={`w-5 h-5 ${func.color.replace('bg-', 'text-')}`} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Ejemplo Resuelto</h3>
        </div>
        <div className="space-y-3">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Problema</span>
            <p className="text-slate-700 font-medium">{func.example.problem}</p>
          </div>
          <div className="pt-3 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Solución</span>
            <p className="text-slate-600">{func.example.solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnSection;
