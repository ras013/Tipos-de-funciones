import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { FunctionDefinition } from '../data/functions';
import { motion } from 'motion/react';

interface InteractiveGraphProps {
  func: FunctionDefinition;
}

const InteractiveGraph: React.FC<InteractiveGraphProps> = ({ func }) => {
  const [params, setParams] = useState<Record<string, number>>({});
  const [data, setData] = useState<{ x: number; y: number | null }[]>([]);
  const [activeVariantId, setActiveVariantId] = useState<string | null>(null);

  // Initialize params when function changes
  useEffect(() => {
    const initialParams: Record<string, number> = {};
    Object.entries(func.params).forEach(([key, config]) => {
      initialParams[key] = config.default;
    });
    setParams(initialParams);
    
    // Set default variant if exists (e.g. 'sin' for trig)
    if (func.variants && func.variants.length > 0) {
      setActiveVariantId(func.variants[0].id);
    } else {
      setActiveVariantId(null);
    }
  }, [func.id]);

  // Generate graph data
  useEffect(() => {
    const newData = [];
    
    // Determine evaluate function
    let evaluate = func.evaluate;
    if (activeVariantId && func.variants) {
      const variant = func.variants.find(v => v.id === activeVariantId);
      if (variant) {
        evaluate = variant.evaluate;
      }
    }

    // Domain from -10 to 10
    for (let x = -10; x <= 10; x += 0.2) { // Increased resolution slightly
      // Avoid precision issues
      const xVal = Math.round(x * 10) / 10;
      const yVal = evaluate(xVal, params);
      
      // Filter out extreme values (asymptotes) for better visualization
      if (yVal !== null && Math.abs(yVal) > 20) {
         newData.push({ x: xVal, y: null });
      } else {
         newData.push({ x: xVal, y: yVal });
      }
    }
    setData(newData);
  }, [params, func, activeVariantId]);

  const handleParamChange = (key: string, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const getDisplayFormula = () => {
    if (activeVariantId && func.variants) {
      const variant = func.variants.find(v => v.id === activeVariantId);
      if (variant) {
        // Simple replacement for variants
        let formula = variant.formula;
        Object.entries(params).forEach(([key, val]) => {
           formula = formula.replace(key, val.toString());
        });
        // Special handling for A and B in trig functions if not replaced above
        // The variant formula is like 'sin(Bx)', so we construct the full string manually if needed
        // But let's try to be generic first.
        // Actually, for trig, the main getDisplayFormula is generic: f(x) = A sin(Bx)
        // We should probably construct it here based on the variant name.
        return `f(x) = ${params['A']} · ${variant.name.toLowerCase()}(${params['B']}x)`;
      }
    }
    return func.getDisplayFormula(params);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex-1 min-h-[300px] lg:min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="x" 
              type="number" 
              domain={[-10, 10]} 
              allowDataOverflow={false}
              stroke="#64748b"
            />
            <YAxis 
              domain={[-10, 10]} 
              allowDataOverflow={true}
              stroke="#64748b"
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [value?.toFixed(2), 'f(x)']}
              labelFormatter={(label) => `x = ${label}`}
            />
            <ReferenceLine x={0} stroke="#94a3b8" />
            <ReferenceLine y={0} stroke="#94a3b8" />
            <Line 
              type="monotone" 
              dataKey="y" 
              stroke={func.hexColor}
              strokeWidth={3} 
              dot={false} 
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full lg:w-80 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">Parámetros</h3>
          <p className="text-sm text-slate-500">Ajusta los valores para ver cómo cambia la gráfica.</p>
        </div>
        
        <div className="space-y-4">
          {Object.entries(func.params).map(([key, config]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <label htmlFor={key} className="font-medium text-slate-700">{config.label}</label>
                <span className="font-mono text-slate-600">{params[key]}</span>
              </div>
              <input
                type="range"
                id={key}
                min={config.min}
                max={config.max}
                step={config.step}
                value={params[key] || config.default}
                onChange={(e) => handleParamChange(key, parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <h4 className="font-medium text-slate-900 mb-2">Fórmula Actual:</h4>
          
          {/* Variant Selector (Buttons) */}
          {func.variants && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {func.variants.map(variant => (
                <button
                  key={variant.id}
                  onClick={() => setActiveVariantId(variant.id)}
                  className={`
                    text-xs py-1 px-2 rounded border transition-colors
                    ${activeVariantId === variant.id 
                      ? 'bg-indigo-100 border-indigo-200 text-indigo-700 font-medium' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }
                  `}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          )}

          <div className="font-mono text-lg text-indigo-600 break-all">
            {getDisplayFormula()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGraph;
