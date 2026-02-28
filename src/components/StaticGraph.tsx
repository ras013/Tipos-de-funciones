import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip } from 'recharts';
import { FunctionDefinition } from '../data/functions';

interface StaticGraphProps {
  func: FunctionDefinition;
  params: Record<string, number>;
  variantId?: string;
}

const StaticGraph: React.FC<StaticGraphProps> = ({ func, params, variantId }) => {
  const data = [];
  
  // Determine which evaluate function to use
  let evaluate = func.evaluate;
  if (variantId && func.variants) {
    const variant = func.variants.find(v => v.id === variantId);
    if (variant) {
      evaluate = variant.evaluate;
    }
  }

  for (let x = -10; x <= 10; x += 0.2) {
    const xVal = Math.round(x * 10) / 10;
    const yVal = evaluate(xVal, params);
    // Filter out extreme values for better visualization in static graphs
    if (yVal !== null && Math.abs(yVal) <= 15) {
      data.push({ x: xVal, y: yVal });
    } else {
      data.push({ x: xVal, y: null });
    }
  }

  return (
    <div className="w-full h-[250px] bg-slate-50 rounded-lg border border-slate-200">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="x" 
            type="number" 
            domain={[-10, 10]} 
            hide
          />
          <YAxis 
            domain={['auto', 'auto']} 
            hide
          />
          <ReferenceLine x={0} stroke="#cbd5e1" />
          <ReferenceLine y={0} stroke="#cbd5e1" />
          <Tooltip 
            formatter={(value: number) => [value?.toFixed(2), 'y']}
            labelFormatter={(label) => `x = ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="y" 
            stroke={func.hexColor} 
            strokeWidth={2} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StaticGraph;
