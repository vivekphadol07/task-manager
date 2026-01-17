import React from 'react';

const InfoCards = ({ icon, label, value, color }) => {
  return (
    <div className='flex items-center gap-x-3'>
      <div className={`w-2 md:w-2 h-3 md:h-5 ${color} rounded-full`} />

      <p className='text-xs md:text-[14px] text-slate-400'>
        <span className='text-sm md:text-[15px] text-gray-200 font-semibold'>
          {value}
        </span>{' '}
        {label}
      </p>
    </div>
  );
};

export default InfoCards;
