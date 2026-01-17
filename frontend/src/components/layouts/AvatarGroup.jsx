import React from 'react';
import { IoMdContact } from 'react-icons/io';

const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
  return (
    <div className='flex items-center'>
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <div
          key={index}
          className='w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 
                     flex items-center justify-center border border-slate-500 
                     -ml-3 first:ml-0 overflow-hidden'
        >
          {avatar ? (
            <img
              src={avatar}
              alt={`Avatar ${index}`}
              className='w-full h-full object-cover'
            />
          ) : (
            <IoMdContact className='text-5xl text-slate-300 opacity-90' />
          )}
        </div>
      ))}

      {avatars.length > maxVisible && (
        <div
          className='w-9 h-9 flex items-center justify-center 
                     bg-slate-700 text-xs font-medium text-gray-200 
                     rounded-full border border-slate-600 -ml-3'
        >
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
