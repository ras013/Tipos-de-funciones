import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Table2, LineChart, ArrowRight, Check, RefreshCw, Play } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Scatter, Tooltip } from 'recharts';

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [calculatedPoints, setCalculatedPoints] = useState<number[]>([]); // Indices of calculated points
  const [showLine, setShowLine] = useState(false);

  const steps = [
    { id: 0, title: '1. Evaluación', icon: Calculator, desc: 'Sustituir y calcular' },
    { id: 1, title: '2. Tabulación', icon: Table2, desc: 'Organizar pares (x,y)' },
    { id: 2, title: '3. Graficación', icon: LineChart, desc: 'Ubicar puntos y unir' }
  ];

  // Function: f(x) = 2x - 1
  const examplePoints = [
    { x: -1, y: -3 },
    { x: 0, y: -1 },
    { x: 1, y: 1 },
    { x: 2, y: 3 }
  ];

  const calculatePoint = (idx: number) => {
    if (!calculatedPoints.includes(idx)) {
      setCalculatedPoints([...calculatedPoints, idx]);
    }
  };

  const reset = () => {
    setActiveStep(0);
    setCalculatedPoints([]);
    setShowLine(false);
  };

  const nextStep = () => {
    if (activeStep < 2) setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const isStepComplete = () => {
    if (activeStep === 0) return calculatedPoints.length === examplePoints.length;
    if (activeStep === 1) return true; // Just viewing
    if (activeStep === 2) return showLine;
    return false;
  };

  return (
    <section id="proceso" className="py-16 border-t border-slate-200 bg-white scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Proceso de Representación Gráfica</h2>
          <p className="text-slate-600 mt-2">Una guía interactiva paso a paso para graficar <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">f(x) = 2x - 1</span></p>
        </div>

        {/* Stepper */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center w-full max-w-3xl">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`relative flex flex-col items-center group focus:outline-none`}
                >
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all z-10
                    ${activeStep === step.id 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg scale-110' 
                      : activeStep > step.id 
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-white border-slate-200 text-slate-400 group-hover:border-indigo-300'
                    }
                  `}>
                    {activeStep > step.id ? <Check className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <div className="absolute top-14 w-32 text-center">
                    <p className={`text-sm font-bold ${activeStep === step.id ? 'text-indigo-600' : 'text-slate-500'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-400 hidden sm:block">{step.desc}</p>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${activeStep > index ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Interactive Stage */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm min-h-[500px] flex flex-col md:flex-row">
          
          {/* Left Panel: Controls & Math */}
          <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col">
            <AnimatePresence mode="wait">
              {activeStep === 0 && (
                <motion.div 
                  key="step0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6 flex-1"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">1. Evaluación</h3>
                    <p className="text-slate-600">Selecciona valores de <span className="font-mono font-bold">x</span> para calcular su imagen <span className="font-mono font-bold">y</span>.</p>
                  </div>
                  
                  <div className="space-y-3">
                    {examplePoints.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => calculatePoint(idx)}
                        disabled={calculatedPoints.includes(idx)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between
                          ${calculatedPoints.includes(idx) 
                            ? 'bg-emerald-50 border-emerald-200 opacity-80' 
                            : 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-md'
                          }
                        `}
                      >
                        <div className="font-mono text-lg">
                          <span className="text-slate-500">x = {p.x}</span>
                          <span className="mx-3 text-slate-300">→</span>
                          <span className={calculatedPoints.includes(idx) ? 'text-slate-900' : 'text-slate-400'}>
                            f({p.x}) = 2({p.x}) - 1
                          </span>
                        </div>
                        {calculatedPoints.includes(idx) ? (
                          <span className="font-bold text-emerald-600 text-xl">= {p.y}</span>
                        ) : (
                          <span className="text-indigo-600 text-sm font-bold bg-indigo-50 px-3 py-1 rounded-full">Calcular</span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeStep === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6 flex-1"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">2. Tabulación</h3>
                    <p className="text-slate-600">Organizamos los valores calculados en una tabla de pares ordenados <span className="font-mono font-bold">(x, y)</span>.</p>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-center">
                      <thead className="bg-slate-100 text-slate-600 font-semibold">
                        <tr>
                          <th className="py-3 border-r border-slate-200">x</th>
                          <th className="py-3 border-r border-slate-200">f(x) = 2x - 1</th>
                          <th className="py-3">Punto (x, y)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {examplePoints.map((p, idx) => (
                          <motion.tr 
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <td className="py-3 font-mono text-slate-600 border-r border-slate-100">{p.x}</td>
                            <td className="py-3 font-mono text-slate-900 border-r border-slate-100">{p.y}</td>
                            <td className="py-3 font-mono text-indigo-600 font-medium">({p.x}, {p.y})</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6 flex-1"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">3. Graficación</h3>
                    <p className="text-slate-600">Ubicamos los puntos en el plano cartesiano y los unimos para revelar la forma de la función.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Puntos a graficar:</h4>
                      <div className="flex flex-wrap gap-2">
                        {examplePoints.map((p, idx) => (
                          <div key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-mono text-sm border border-indigo-100">
                            ({p.x}, {p.y})
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setShowLine(!showLine)}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2
                        ${showLine 
                          ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200'
                        }
                      `}
                    >
                      {showLine ? <RefreshCw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      {showLine ? 'Reiniciar Gráfica' : 'Trazar Línea'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-auto pt-6 flex justify-between">
              <button
                onClick={prevStep}
                disabled={activeStep === 0}
                className="px-4 py-2 text-slate-500 font-medium hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              {activeStep < 2 ? (
                <button
                  onClick={nextStep}
                  disabled={activeStep === 0 && calculatedPoints.length < examplePoints.length}
                  className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                >
                  Siguiente <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={reset}
                  className="px-6 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  Volver al inicio
                </button>
              )}
            </div>
          </div>

          {/* Right Panel: Visualization */}
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-4 relative">
            <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-slate-200 text-xs font-mono text-slate-500 shadow-sm">
              f(x) = 2x - 1
            </div>
            <ResponsiveContainer width="100%" height="100%" minHeight={400}>
              <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  domain={[-3, 3]} 
                  ticks={[-3, -2, -1, 0, 1, 2, 3]}
                  stroke="#94a3b8"
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  domain={[-5, 5]} 
                  ticks={[-4, -2, 0, 2, 4]}
                  stroke="#94a3b8"
                />
                <ReferenceLine x={0} stroke="#cbd5e1" />
                <ReferenceLine y={0} stroke="#cbd5e1" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 border border-slate-200 shadow-lg rounded-lg text-sm font-mono">
                          <p>x: {data.x}</p>
                          <p>y: {data.y}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                {/* Points that appear as they are calculated */}
                <Scatter 
                  name="Puntos" 
                  data={
                    activeStep === 0 
                      ? examplePoints.filter((_, i) => calculatedPoints.includes(i))
                      : examplePoints
                  } 
                  fill="#4f46e5" 
                  shape="circle"
                />

                {/* The line connecting them (Step 3) */}
                {activeStep === 2 && showLine && (
                  <Line
                    type="monotone"
                    data={examplePoints}
                    dataKey="y"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={false}
                    animationDuration={1500}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
