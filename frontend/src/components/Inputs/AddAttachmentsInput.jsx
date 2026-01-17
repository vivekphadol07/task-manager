import React, { useState } from 'react';
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2';
import { LuPaperclip } from 'react-icons/lu';

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  // Function to handle adding an option
  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  // Function to handle deleting an option
  const handleDeleteOption = (index) => {
    const updateArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updateArr);
  };

  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={index}
          className='flex justify-between bg-slate-800 border border-slate-700 px-3 py-2 rounded-md mt-2'
        >
          <div className='flex-1 flex items-center gap-3 border border-slate-700 rounded-md px-2'>
            <LuPaperclip className='text-slate-400' />
            <p className='text-xs text-gray-200'>
              {item}
            </p>
          </div>

          <button
            className='cursor-pointer'
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className='text-lg text-rose-400 hover:text-rose-300' />
          </button>
        </div>
      ))}

      <div className='flex items-center gap-5 mt-4'>
        <div className='flex-1 flex items-center gap-3 border border-slate-700 rounded-md px-3 bg-slate-900'>
          <LuPaperclip className='text-slate-400' />

          <input
            type='text'
            placeholder='Add File Link'
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className='w-full text-[13px] text-gray-200 outline-none bg-transparent py-2 placeholder:text-slate-400'
          />
        </div>

        <button
          className='card-btn whitespace-nowrap'
          onClick={handleAddOption}
        >
          <HiMiniPlus className='text-lg' /> Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
