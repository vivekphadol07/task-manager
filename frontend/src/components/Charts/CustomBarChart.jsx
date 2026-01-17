import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const CustomBarChart = ({ data }) => {

  // Function to alternate colors (unchanged logic)
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case 'High':
        return '#FB7185'; // rose-400

      case 'Medium':
        return '#FDBA74'; // orange-300

      case 'Low':
        return '#34D399'; // emerald-400

      default:
        return '#34D399';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-slate-800 shadow-lg rounded-lg p-2 border border-slate-700'>
          <p className='text-xs font-semibold text-primary mb-1'>
            {payload[0].payload.priority}
          </p>

          <p className='text-sm text-slate-300'>
            Count:{' '}
            <span className='text-sm font-medium text-gray-200'>
              {payload[0].payload.count}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='bg-transparent mt-6'>
      <ResponsiveContainer width='100%' height={325}>
        <BarChart data={data}>
          <CartesianGrid stroke='none' />

          <XAxis
            dataKey='priority'
            tick={{ fontSize: 12, fill: '#CBD5E1' }} // slate-300
            stroke='none'
          />

          <YAxis
            tick={{ fontSize: 12, fill: '#CBD5E1' }} // slate-300
            stroke='none'
          />

          <Tooltip
            content={CustomTooltip}
            cursor={{ fill: 'transparent' }}
          />

          <Bar
            dataKey='count'
            nameKey='priority'
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
