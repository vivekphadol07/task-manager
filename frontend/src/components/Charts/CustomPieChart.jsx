import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const CustomPieChart = ({ data, colors }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-slate-800 shadow-lg rounded-lg p-2 border border-slate-700'>
          <p className='text-xs font-semibold text-primary mb-1'>
            {payload[0].name}
          </p>
          <p className='text-sm text-slate-300'>
            Count:{' '}
            <span className='text-sm font-medium text-gray-200'>
              {payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className='flex flex-wrap justify-center gap-4 mt-4'>
        {payload.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className='flex items-center gap-2'
          >
            <div
              className='w-2.5 h-2.5 rounded-full'
              style={{ backgroundColor: entry.color }}
            />
            <span className='text-xs text-slate-300 font-medium'>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='bg-transparent mt-6'>
      <ResponsiveContainer width="100%" height={325}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
            stroke="none"          // ✅ REMOVE WHITE OUTLINE
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke="none"      // ✅ ENSURE NO SEGMENT BORDERS
              />
            ))}
          </Pie>

          <Tooltip content={CustomTooltip} />
          <Legend content={CustomLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
