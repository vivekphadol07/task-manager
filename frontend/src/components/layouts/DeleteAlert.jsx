import React from 'react';

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className='text-sm text-slate-300'>
        {content}
      </p>

      <div className='flex justify-end mt-6'>
        <button
          type='button'
          className='flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium
          text-rose-400 whitespace-nowrap bg-rose-400/10
          border border-rose-400/20 rounded-lg
          px-4 py-2 cursor-pointer
          hover:bg-rose-400/20'
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
