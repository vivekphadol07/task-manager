import React from 'react';

const StatusCard = ({ label, count, status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'In Progress':
        return {
          wrapper: 'bg-cyan-500/10 border-cyan-400/30',
          dot: 'bg-cyan-400',
          count: 'text-cyan-300',
        };

      case 'Completed':
        return {
          wrapper: 'bg-emerald-500/10 border-emerald-400/30',
          dot: 'bg-emerald-400',
          count: 'text-emerald-300',
        };

      default:
        return {
          wrapper: 'bg-violet-500/10 border-violet-400/30',
          dot: 'bg-violet-400',
          count: 'text-violet-300',
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${styles.wrapper}`}
    >

      {/* Count */}
      <span className={`text-sm font-semibold ${styles.count}`}>
        {count}
      </span>

      {/* Label */}
      <span className='text-xs text-slate-300 whitespace-nowrap'>
        {label}
      </span>
    </div>
  );
};

export default StatusCard;
