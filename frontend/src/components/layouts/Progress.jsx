import React from 'react';

const Progress = ({ progress, status }) => {
  const getColor = () => {
    switch (status) {
      case 'In Progress':
        return 'bg-cyan-400';

      case 'Completed':
        return 'bg-emerald-400';

      default:
        return 'bg-violet-400';
    }
  };

  return (
    <div className='w-full bg-slate-700 rounded-full h-1.5'>
      <div
        className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Progress;
