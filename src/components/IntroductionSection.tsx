import React from 'react';
import ProcessSection from './ProcessSection';
import { motion } from 'motion/react';
import { ArrowRight, Box, History, TrendingUp, Activity, Globe } from 'lucide-react';

const TimelineItem = ({ year, title, description, align }: { year: string, title: string, description: string, align: 'left' | 'right' }) => (
  <div className={`flex ${align === 'right' ? 'flex-row-reverse' : ''} w-full mb-8`}>
    <div className="w-5/12"></div>
    <div className="w-2/12 flex justify-center relative">
      <div className="h-full w-1 bg-indigo-100 absolute top-0 bottom-0"></div>
      <div className="w-4 h-4 bg-indigo-600 rounded-full relative z-10 mt-1 border-4 border-white shadow-sm"></div>
    </div>
    <div className={`w-5/12 ${align === 'right' ? 'text-right pr-8' : 'pl-8'}`}>
      <span className="text-indigo-600 font-bold text-sm">{year}</span>
      <h4 className="text-lg font-bold text-slate-900">{title}</h4>
      <p className="text-slate-600 text-sm mt-1">{description}</p>
    </div>
  </div>
);

const IntroductionSection: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* 1. ¿Qué es una función? */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">¿Qué es una Función?</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
            En matemáticas, una función es como una máquina mágica: le das un ingrediente (entrada), aplica una regla específica, y te devuelve un producto (salida).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Box className="w-32 h-32" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Box className="w-6 h-6 text-indigo-600" />
              La "Caja Negra"
            </h3>
            <div className="flex items-center justify-between gap-4 text-center">
              <div className="flex-1">
                <div className="bg-slate-100 rounded-lg p-3 mb-2 font-mono text-slate-600">x</div>
                <span className="text-sm font-medium text-slate-500">Entrada (Dominio)</span>
              </div>
              <ArrowRight className="w-6 h-6 text-indigo-400" />
              <div className="flex-1 bg-indigo-600 rounded-xl p-6 text-white shadow-lg shadow-indigo-200">
                <span className="font-serif italic text-2xl">f</span>
                <p className="text-xs mt-1 opacity-80">Regla</p>
              </div>
              <ArrowRight className="w-6 h-6 text-indigo-400" />
              <div className="flex-1">
                <div className="bg-slate-100 rounded-lg p-3 mb-2 font-mono text-slate-600">f(x)</div>
                <span className="text-sm font-medium text-slate-500">Salida (Rango)</span>
              </div>
            </div>
            <p className="mt-6 text-slate-600 text-sm">
              Por ejemplo, si la regla es "multiplicar por 2", cuando entra un 3, sale un 6. ¡Nunca saldrá un 7 ni un 5! Para cada entrada, hay <strong>exactamente una</strong> salida.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">¿Por qué importa en la vida real?</h3>
            <div className="grid gap-4">
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Economía</h4>
                  <p className="text-sm text-slate-600">El costo de un taxi depende de los kilómetros recorridos. (Función Lineal)</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Medicina</h4>
                  <p className="text-sm text-slate-600">La concentración de un medicamento en la sangre disminuye con el tiempo. (Función Exponencial)</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Física</h4>
                  <p className="text-sm text-slate-600">La trayectoria de un balón lanzado al aire. (Función Cuadrática)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Historia y Línea de Tiempo */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
              <History className="w-8 h-8 text-indigo-600" />
              Historia de las Funciones
            </h2>
            <p className="text-slate-600 mt-2">La evolución de una de las ideas más poderosas de la matemática.</p>
          </div>

          <div className="relative">
            <TimelineItem 
              year="2000 a.C." 
              title="Babilonios" 
              description="Usaban tablas de cuadrados, cubos y recíprocos. Aunque no tenían el concepto abstracto, ya asociaban cantidades dependientes."
              align="left"
            />
            <TimelineItem 
              year="Siglo XIV" 
              title="Nicole Oresme" 
              description="Utilizó gráficas para representar cómo cambiaban las cualidades (como la velocidad) con el tiempo, un precursor del plano cartesiano."
              align="right"
            />
            <TimelineItem 
              year="1637" 
              title="René Descartes" 
              description="Introdujo la Geometría Analítica. Mostró que las curvas geométricas podían expresarse mediante ecuaciones algebraicas."
              align="left"
            />
            <TimelineItem 
              year="1694" 
              title="Gottfried Leibniz" 
              description="Acuñó el término 'función' para describir cantidades relacionadas con una curva, como la pendiente."
              align="right"
            />
            <TimelineItem 
              year="1734" 
              title="Leonhard Euler" 
              description="Introdujo la notación f(x) que usamos hoy en día. Definió la función como una expresión analítica."
              align="left"
            />
            <TimelineItem 
              year="1837" 
              title="Peter Dirichlet" 
              description="Dio la definición moderna y general: una correspondencia arbitraria entre dos conjuntos, sin necesidad de una fórmula explícita."
              align="right"
            />
          </div>
        </div>
      </section>

      {/* 3. Proceso de Representación (Reutilizado) */}
      <ProcessSection />
    </div>
  );
};

export default IntroductionSection;
