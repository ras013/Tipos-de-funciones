export type FunctionType = 'algebraic' | 'transcendental';

export interface FunctionDefinition {
  id: string;
  name: string;
  type: FunctionType;
  formula: string;
  description: string;
  color: string;
  hexColor: string;
  params: Record<string, { min: number; max: number; step: number; default: number; label: string }>;
  evaluate: (x: number, params: Record<string, number>) => number | null;
  getDisplayFormula: (params: Record<string, number>) => string;
  variants?: {
    id: string;
    name: string;
    formula: string;
    evaluate: (x: number, params: Record<string, number>) => number | null;
  }[];
  example: {
    problem: string;
    solution: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number; // index
  };
  solvedProblem: {
    title: string;
    description: string;
    steps: string[];
    graphParams: Record<string, number>;
    variantId?: string;
  };
  proposedProblem: {
    title: string;
    description: string;
    solutionSteps: string[];
    graphParams: Record<string, number>;
    variantId?: string;
  };
}

export const functionsData: FunctionDefinition[] = [
  {
    id: 'linear',
    name: 'Lineal',
    type: 'algebraic',
    formula: 'f(x) = mx + b',
    description: 'Una línea recta con pendiente constante m. Representa una relación de proporcionalidad directa con un desplazamiento.',
    color: 'bg-orange-500',
    hexColor: '#f97316',
    params: {
      m: { min: -5, max: 5, step: 0.5, default: 1, label: 'Pendiente (m)' },
      b: { min: -5, max: 5, step: 0.5, default: 0, label: 'Intersección (b)' }
    },
    evaluate: (x, { m, b }) => m * x + b,
    getDisplayFormula: ({ m, b }) => {
      const bSign = b >= 0 ? '+' : '-';
      return `f(x) = ${m}x ${bSign} ${Math.abs(b)}`;
    },
    example: {
      problem: 'Si f(x) = 2x + 1, calcula f(3).',
      solution: 'Sustituimos x por 3: f(3) = 2(3) + 1 = 6 + 1 = 7.'
    },
    quiz: {
      question: '¿Qué representa "b" en la función lineal f(x) = mx + b?',
      options: ['La pendiente', 'El punto de corte con el eje Y', 'El punto de corte con el eje X', 'El grado de la función'],
      correctAnswer: 1
    },
    solvedProblem: {
      title: 'Costo de un Taxi',
      description: 'Un taxi cobra una tarifa base de $2.00 más $1.50 por cada kilómetro recorrido. Escribe la función y grafica el costo para 4 km.',
      steps: [
        'Identificamos la tarifa base (b = 2) y el costo por km (m = 1.5).',
        'La función es f(x) = 1.5x + 2.',
        'Evaluamos para x = 4: f(4) = 1.5(4) + 2 = 6 + 2 = 8.',
        'El costo por 4 km es $8.00.'
      ],
      graphParams: { m: 1.5, b: 2 }
    },
    proposedProblem: {
      title: 'Depreciación Lineal',
      description: 'Una máquina nueva cuesta $10. Se deprecia $2 por año. Escribe la función de su valor f(x) en función del tiempo x.',
      solutionSteps: [
        'Valor inicial (b) = 10.',
        'Tasa de cambio (m) = -2 (porque pierde valor).',
        'Función: f(x) = -2x + 10.',
        'A los 5 años (x=5), f(5) = -2(5) + 10 = 0. La máquina no vale nada.'
      ],
      graphParams: { m: -2, b: 10 }
    }
  },
  {
    id: 'quadratic',
    name: 'Cuadrática',
    type: 'algebraic',
    formula: 'f(x) = ax² + bx + c',
    description: 'Una parábola con un punto máximo o mínimo llamado vértice. Simétrica respecto a su eje.',
    color: 'bg-blue-500',
    hexColor: '#3b82f6',
    params: {
      a: { min: -3, max: 3, step: 0.1, default: 1, label: 'Cuadrático (a)' },
      b: { min: -5, max: 5, step: 0.5, default: 0, label: 'Lineal (b)' },
      c: { min: -5, max: 5, step: 0.5, default: 0, label: 'Independiente (c)' }
    },
    evaluate: (x, { a, b, c }) => a * x * x + b * x + c,
    getDisplayFormula: ({ a, b, c }) => {
      const bSign = b >= 0 ? '+' : '-';
      const cSign = c >= 0 ? '+' : '-';
      return `f(x) = ${a}x² ${bSign} ${Math.abs(b)}x ${cSign} ${Math.abs(c)}`;
    },
    example: {
      problem: 'Encuentra el vértice de f(x) = x² - 4x + 3.',
      solution: 'La coordenada x del vértice es -b/(2a) = -(-4)/2 = 2. Luego f(2) = 2² - 4(2) + 3 = -1. Vértice: (2, -1).'
    },
    quiz: {
      question: 'Si "a" es negativo en f(x) = ax² + bx + c, ¿hacia dónde abre la parábola?',
      options: ['Hacia arriba', 'Hacia abajo', 'Hacia la derecha', 'Hacia la izquierda'],
      correctAnswer: 1
    },
    solvedProblem: {
      title: 'Lanzamiento de Proyectil',
      description: 'La altura de una pelota está dada por h(t) = -t² + 4t, donde t es el tiempo en segundos. ¿Cuál es la altura máxima?',
      steps: [
        'Identificamos a = -1, b = 4, c = 0.',
        'El tiempo del vértice es t = -b/(2a) = -4/(2*-1) = 2 segundos.',
        'La altura máxima es h(2) = -(2)² + 4(2) = -4 + 8 = 4 metros.',
        'El vértice es (2, 4).'
      ],
      graphParams: { a: -1, b: 4, c: 0 }
    },
    proposedProblem: {
      title: 'Área Máxima',
      description: 'Se quiere cercar un jardín rectangular con 12m de valla usando una pared existente. El área es A(x) = x(12 - 2x) = -2x² + 12x. Encuentra el área máxima.',
      solutionSteps: [
        'Función: f(x) = -2x² + 12x.',
        'Vértice x = -12 / (2 * -2) = 3.',
        'Área máxima f(3) = -2(3)² + 12(3) = -18 + 36 = 18 m².'
      ],
      graphParams: { a: -2, b: 12, c: 0 }
    }
  },
  {
    id: 'cubic',
    name: 'Cúbica',
    type: 'algebraic',
    formula: 'f(x) = ax³ + bx² + cx + d',
    description: 'Polinomio de grado 3. Tiene forma de "S" y puede tener hasta dos puntos de cambio de concavidad.',
    color: 'bg-indigo-500',
    hexColor: '#6366f1',
    params: {
      a: { min: -2, max: 2, step: 0.1, default: 1, label: 'Cúbico (a)' },
      b: { min: -3, max: 3, step: 0.5, default: 0, label: 'Cuadrático (b)' },
      c: { min: -3, max: 3, step: 0.5, default: 0, label: 'Lineal (c)' },
      d: { min: -3, max: 3, step: 0.5, default: 0, label: 'Independiente (d)' }
    },
    evaluate: (x, { a, b, c, d }) => a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d,
    getDisplayFormula: ({ a, b, c, d }) => {
      const bSign = b >= 0 ? '+' : '-';
      const cSign = c >= 0 ? '+' : '-';
      const dSign = d >= 0 ? '+' : '-';
      return `f(x) = ${a}x³ ${bSign} ${Math.abs(b)}x² ${cSign} ${Math.abs(c)}x ${dSign} ${Math.abs(d)}`;
    },
    example: {
      problem: 'Evalúa f(x) = x³ - 2 en x = 2.',
      solution: 'f(2) = 2³ - 2 = 8 - 2 = 6.'
    },
    quiz: {
      question: '¿Cuál es el dominio de una función cúbica polinómica estándar?',
      options: ['Solo números positivos', 'Solo números negativos', 'Todos los números reales', 'Entre -1 y 1'],
      correctAnswer: 2
    },
    solvedProblem: {
      title: 'Volumen de una Caja',
      description: 'El volumen de una caja variable está dado por V(x) = x³ - 4x. Analiza sus raíces.',
      steps: [
        'Factorizamos: x(x² - 4) = x(x-2)(x+2).',
        'Las raíces son x = 0, x = 2, x = -2.',
        'La gráfica corta el eje X en estos tres puntos.',
        'Nota: En un contexto físico, solo x > 2 tendría sentido positivo para volumen si x es una dimensión ajustada.'
      ],
      graphParams: { a: 1, b: 0, c: -4, d: 0 }
    },
    proposedProblem: {
      title: 'Punto de Inflexión',
      description: 'Dada f(x) = x³. Encuentra el comportamiento cerca de x=0.',
      solutionSteps: [
        'La función es f(x) = x³.',
        'En x=0, f(0)=0.',
        'Para x<0, f(x) es negativo. Para x>0, f(x) es positivo.',
        'x=0 es un punto de inflexión donde cambia la concavidad.'
      ],
      graphParams: { a: 1, b: 0, c: 0, d: 0 }
    }
  },
  {
    id: 'radical',
    name: 'Radical',
    type: 'algebraic',
    formula: 'f(x) = a√(x - h) + k',
    description: 'Función que involucra la raíz de la variable. Su dominio está restringido para raíces pares (x ≥ h).',
    color: 'bg-emerald-500',
    hexColor: '#10b981',
    params: {
      a: { min: 0.5, max: 3, step: 0.5, default: 1, label: 'Escala (a)' },
      h: { min: -5, max: 5, step: 1, default: 0, label: 'Desplazamiento X (h)' },
      k: { min: -3, max: 3, step: 1, default: 0, label: 'Desplazamiento Y (k)' }
    },
    evaluate: (x, { a, h, k }) => {
      if (x < h) return null;
      return a * Math.sqrt(x - h) + k;
    },
    getDisplayFormula: ({ a, h, k }) => {
      const hSign = h >= 0 ? '-' : '+'; // Inside sqrt, x - h
      const kSign = k >= 0 ? '+' : '-';
      return `f(x) = ${a}√(x ${hSign} ${Math.abs(h)}) ${kSign} ${Math.abs(k)}`;
    },
    example: {
      problem: '¿Cuál es el dominio de f(x) = √(x - 3)?',
      solution: 'El radicando debe ser mayor o igual a cero: x - 3 ≥ 0, por lo tanto x ≥ 3.'
    },
    quiz: {
      question: '¿Por qué la función f(x) = √x no está definida para x = -4 en los números reales?',
      options: ['Porque es muy pequeño', 'Porque no existen raíces cuadradas reales de números negativos', 'Porque es cero', 'Porque es impar'],
      correctAnswer: 1
    },
    solvedProblem: {
      title: 'Velocidad de Caída',
      description: 'La velocidad de un objeto que cae es v(d) = √(19.6d), donde d es la distancia. Calcula v para d=5m.',
      steps: [
        'Sustituimos d = 5 en la función.',
        'v(5) = √(19.6 * 5) = √98.',
        'v(5) ≈ 9.9 m/s.',
        'La gráfica comienza en (0,0) y crece curvándose hacia la derecha.'
      ],
      graphParams: { a: 4.42, h: 0, k: 0 } // approx sqrt(19.6) is 4.42
    },
    proposedProblem: {
      title: 'Desplazamiento Radical',
      description: 'Grafica f(x) = √(x + 2) - 1. ¿Dónde comienza la gráfica?',
      solutionSteps: [
        'El dominio es x + 2 ≥ 0 → x ≥ -2.',
        'El punto de inicio es (-2, -1).',
        'Para x = 2: f(2) = √(4) - 1 = 2 - 1 = 1. Pasa por (2, 1).'
      ],
      graphParams: { a: 1, h: -2, k: -1 }
    }
  },
  {
    id: 'exponential',
    name: 'Exponencial',
    type: 'transcendental',
    formula: 'f(x) = a · b^x',
    description: 'La variable está en el exponente. Modela crecimiento (b > 1) o decrecimiento (0 < b < 1) rápido.',
    color: 'bg-red-500',
    hexColor: '#ef4444',
    params: {
      a: { min: 0.5, max: 3, step: 0.5, default: 1, label: 'Escala (a)' },
      b: { min: 0.1, max: 4, step: 0.1, default: 2, label: 'Base (b)' }
    },
    evaluate: (x, { a, b }) => a * Math.pow(b, x),
    getDisplayFormula: ({ a, b }) => {
      return `f(x) = ${a} · ${b}^x`;
    },
    example: {
      problem: 'Si una bacteria se duplica cada hora (f(x) = 2^x), ¿cuántas habrá en 3 horas?',
      solution: 'f(3) = 2³ = 8 bacterias.'
    },
    quiz: {
      question: '¿Qué pasa con f(x) = 2^x cuando x tiende a infinito?',
      options: ['Se acerca a 0', 'Se acerca a 1', 'Crece indefinidamente', 'Oscila'],
      correctAnswer: 2
    },
    solvedProblem: {
      title: 'Interés Compuesto',
      description: 'Una inversión crece según A(t) = 1 · (1.5)^t. ¿Cuánto vale en t=2?',
      steps: [
        'Base b = 1.5 (crecimiento del 50%).',
        'Evaluamos en t = 2.',
        'A(2) = 1 · (1.5)² = 2.25.',
        'La gráfica pasa por (0,1) y sube rápidamente.'
      ],
      graphParams: { a: 1, b: 1.5 }
    },
    proposedProblem: {
      title: 'Decaimiento Radiactivo',
      description: 'Una sustancia se reduce a la mitad cada periodo: f(x) = (0.5)^x. ¿Qué valor tiene en x=2?',
      solutionSteps: [
        'Base b = 0.5 (0 < b < 1, es decreciente).',
        'f(2) = (0.5)² = 0.25.',
        'La gráfica baja acercándose a 0 pero nunca lo toca (asíntota horizontal).'
      ],
      graphParams: { a: 1, b: 0.5 }
    }
  },
  {
    id: 'logarithmic',
    name: 'Logarítmica',
    type: 'transcendental',
    formula: 'f(x) = log_b(x)',
    description: 'Inversa de la función exponencial. Crece muy lentamente. Solo definida para x > 0.',
    color: 'bg-teal-500',
    hexColor: '#14b8a6',
    params: {
      b: { min: 2, max: 10, step: 1, default: 2, label: 'Base (b)' }
    },
    evaluate: (x, { b }) => {
      if (x <= 0) return null;
      return Math.log(x) / Math.log(b);
    },
    getDisplayFormula: ({ b }) => {
      return `f(x) = log_${b}(x)`;
    },
    example: {
      problem: 'Calcula log₂(8).',
      solution: 'Buscamos a qué exponente elevar 2 para obtener 8. 2³ = 8, así que log₂(8) = 3.'
    },
    quiz: {
      question: '¿Cuál es el valor de log(1) en cualquier base?',
      options: ['1', '0', 'Infinito', 'La base'],
      correctAnswer: 1
    },
    solvedProblem: {
      title: 'Escala Richter',
      description: 'La magnitud de un sismo se relaciona logarítmicamente con su energía. Si f(x) = log₁₀(x), halla f(100).',
      steps: [
        'Usamos base b = 10.',
        'Evaluamos x = 100.',
        'f(100) = log₁₀(100) = 2, porque 10² = 100.',
        'La gráfica pasa por (1,0) y (10,1).'
      ],
      graphParams: { b: 10 }
    },
    proposedProblem: {
      title: 'Dominio Logarítmico',
      description: 'Para f(x) = log₂(x), ¿qué sucede si intentas evaluar x = 0 o x = -1?',
      solutionSteps: [
        'El logaritmo no está definido para números no positivos.',
        'La gráfica tiene una asíntota vertical en x = 0.',
        'Solo existe gráfica a la derecha del eje Y.'
      ],
      graphParams: { b: 2 }
    }
  },
  {
    id: 'trigonometric',
    name: 'Trigonométrica',
    type: 'transcendental',
    formula: 'f(x) = A · func(B · x)',
    description: 'Funciones periódicas que modelan ondas y oscilaciones. Incluye Seno, Coseno, Tangente y sus inversas.',
    color: 'bg-yellow-500',
    hexColor: '#eab308',
    params: {
      A: { min: 0.5, max: 3, step: 0.5, default: 1, label: 'Amplitud (A)' },
      B: { min: 0.5, max: 3, step: 0.5, default: 1, label: 'Frecuencia (B)' }
    },
    variants: [
      { id: 'sin', name: 'Seno', formula: 'sin(Bx)', evaluate: (x, { A, B }) => A * Math.sin(B * x) },
      { id: 'cos', name: 'Coseno', formula: 'cos(Bx)', evaluate: (x, { A, B }) => A * Math.cos(B * x) },
      { id: 'tan', name: 'Tangente', formula: 'tan(Bx)', evaluate: (x, { A, B }) => {
          const val = A * Math.tan(B * x);
          return Math.abs(val) > 10 ? null : val; // Clamp asymptotes
        } 
      },
      { id: 'cot', name: 'Cotangente', formula: 'cot(Bx)', evaluate: (x, { A, B }) => {
          const val = A * (1 / Math.tan(B * x));
          return Math.abs(val) > 10 ? null : val;
        }
      },
      { id: 'sec', name: 'Secante', formula: 'sec(Bx)', evaluate: (x, { A, B }) => {
          const val = A * (1 / Math.cos(B * x));
          return Math.abs(val) > 10 ? null : val;
        }
      },
      { id: 'csc', name: 'Cosecante', formula: 'csc(Bx)', evaluate: (x, { A, B }) => {
          const val = A * (1 / Math.sin(B * x));
          return Math.abs(val) > 10 ? null : val;
        }
      },
      { id: 'asin', name: 'ArcSeno', formula: 'arcsin(x)', evaluate: (x, { A, B }) => {
          // Domain [-1, 1] for standard arcsin
          if (x < -1 || x > 1) return null;
          return A * Math.asin(x);
        }
      },
      { id: 'acos', name: 'ArcCoseno', formula: 'arccos(x)', evaluate: (x, { A, B }) => {
          if (x < -1 || x > 1) return null;
          return A * Math.acos(x);
        }
      },
      { id: 'atan', name: 'ArcTangente', formula: 'arctan(x)', evaluate: (x, { A, B }) => A * Math.atan(B * x) }
    ],
    evaluate: (x, { A, B }) => A * Math.sin(B * x), // Default to sin
    getDisplayFormula: ({ A, B }) => {
      return `f(x) = ${A} · sin(${B}x)`; // Default display
    },
    example: {
      problem: '¿Cuál es el valor máximo de f(x) = 3sin(x)?',
      solution: 'El seno oscila entre -1 y 1. Multiplicado por 3, oscila entre -3 y 3. El máximo es 3.'
    },
    quiz: {
      question: '¿Cuál es el periodo de la función f(x) = sin(x)?',
      options: ['π', '2π', 'π/2', '1'],
      correctAnswer: 1
    },
    solvedProblem: {
      title: 'Onda Sonora',
      description: 'Una onda de sonido se modela con y = 2sin(x). Grafica un ciclo.',
      steps: [
        'Amplitud A = 2. La onda sube hasta 2 y baja hasta -2.',
        'Periodo = 2π ≈ 6.28.',
        'Comienza en (0,0), sube al máximo en π/2, cruza en π, baja al mínimo en 3π/2.',
        'Termina el ciclo en 2π.'
      ],
      graphParams: { A: 2, B: 1 },
      variantId: 'sin'
    },
    proposedProblem: {
      title: 'Función Coseno',
      description: 'Grafica y = cos(x). ¿En qué se diferencia del seno?',
      solutionSteps: [
        'El coseno comienza en su máximo (0, 1), no en (0,0).',
        'Tiene la misma forma de onda pero desplazada π/2 a la izquierda.',
        'Corta el eje X en π/2 y 3π/2.'
      ],
      graphParams: { A: 1, B: 1 },
      variantId: 'cos'
    }
  },
  {
    id: 'piecewise',
    name: 'A Trozos',
    type: 'transcendental',
    formula: 'f(x) = { x < 0: x + a ; x ≥ 0: x² + b }',
    description: 'Definida por diferentes fórmulas según el intervalo del dominio. En este ejemplo: lineal para x < 0 y cuadrática para x ≥ 0.',
    color: 'bg-pink-500',
    hexColor: '#ec4899',
    params: {
      a: { min: -3, max: 3, step: 1, default: 0, label: 'Desplazamiento Lineal (a)' },
      b: { min: -3, max: 3, step: 1, default: 0, label: 'Desplazamiento Cuadrático (b)' }
    },
    evaluate: (x, { a, b }) => {
      if (x < 0) return x + a;
      return x * x + b;
    },
    getDisplayFormula: ({ a, b }) => {
      const aSign = a >= 0 ? '+' : '-';
      const bSign = b >= 0 ? '+' : '-';
      return `f(x) = { x < 0: x ${aSign} ${Math.abs(a)} ; x ≥ 0: x² ${bSign} ${Math.abs(b)} }`;
    },
    example: {
      problem: 'Si f(x) = { 2x si x<0; x+1 si x≥0 }, halla f(-2) y f(2).',
      solution: 'Para x=-2 (x<0): 2(-2) = -4. Para x=2 (x≥0): 2+1 = 3.'
    },
    quiz: {
      question: '¿Es siempre continua una función a trozos?',
      options: ['Sí, siempre', 'No, puede tener saltos', 'Solo si es lineal', 'Nunca es continua'],
      correctAnswer: 1
    },
    solvedProblem: {
      title: 'Valor Absoluto',
      description: 'La función valor absoluto f(x) = |x| es una función a trozos: -x si x<0, x si x≥0.',
      steps: [
        'Para x = -2, f(-2) = -(-2) = 2.',
        'Para x = 2, f(2) = 2.',
        'La gráfica forma una "V" con vértice en el origen.',
        'En nuestro simulador, ajusta a=0 y b=0, pero nota que la parte derecha es x² (parábola), no x lineal.'
      ],
      graphParams: { a: 0, b: 0 }
    },
    proposedProblem: {
      title: 'Salto Discontinuo',
      description: 'Configura a = 2 y b = -1. ¿Qué pasa en x = 0?',
      solutionSteps: [
        'Límite por izquierda (x→0⁻): 0 + 2 = 2.',
        'Límite por derecha (x→0⁺): 0² - 1 = -1.',
        'Hay un salto de 2 a -1. La función no es continua en x=0.'
      ],
      graphParams: { a: 2, b: -1 }
    }
  }
];
