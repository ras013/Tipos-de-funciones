import React, { useState } from 'react';
import { FunctionDefinition } from '../data/functions';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizSectionProps {
  func: FunctionDefinition;
}

const QuizSection: React.FC<QuizSectionProps> = ({ func }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  // Reset when function changes
  React.useEffect(() => {
    resetQuiz();
  }, [func.id]);

  const isCorrect = selectedOption === func.quiz.correctAnswer;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-semibold text-slate-900">Ponte a prueba</h3>
        </div>
        <p className="text-slate-600">{func.quiz.question}</p>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid gap-3">
          {func.quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !isSubmitted && setSelectedOption(index)}
              disabled={isSubmitted}
              className={`
                relative p-4 text-left rounded-xl border-2 transition-all
                ${isSubmitted 
                  ? index === func.quiz.correctAnswer
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                    : index === selectedOption
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : 'border-slate-100 text-slate-400'
                  : selectedOption === index
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                    : 'border-slate-100 hover:border-slate-200 text-slate-700 hover:bg-slate-50'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isSubmitted && index === func.quiz.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                )}
                {isSubmitted && index === selectedOption && index !== func.quiz.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
              >
                Verificar Respuesta
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}
            >
              <p className="font-medium mb-2">
                {isCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😔'}
              </p>
              <p className="text-sm opacity-90">
                {isCorrect 
                  ? 'Has entendido bien el concepto.' 
                  : `La respuesta correcta era: ${func.quiz.options[func.quiz.correctAnswer]}`
                }
              </p>
              <button 
                onClick={resetQuiz}
                className="mt-3 text-sm font-semibold underline hover:no-underline"
              >
                Intentar de nuevo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizSection;
