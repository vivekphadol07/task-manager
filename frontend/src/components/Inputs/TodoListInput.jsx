import React, { useState } from 'react';
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  // Function to handle adding an option
  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption("");
    }
  };

  // Function to handle deleting an option
  const handleDeleteOption = (index) => {
    const updateArr = todoList.filter((_, idx) => idx !== index);
    setTodoList(updateArr);
  };

  return (
    <div>
      {todoList.map((item, index) => (
        <div
          key={index}
          className='flex justify-between bg-slate-800 border border-slate-700 px-3 py-2 rounded-md mt-2'
        >
          <p className='text-xs text-gray-200'>
            <span className='text-xs text-slate-400 font-semibold mr-2'>
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            {item}
          </p>

          <button
            className='cursor-pointer'
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className='text-lg text-rose-400 hover:text-rose-300' />
          </button>
        </div>
      ))}

      <div className='flex items-center gap-5 mt-4'>
        <input
          type="text"
          placeholder='Enter Task'
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className='w-full text-[13px] text-gray-200 outline-none bg-slate-900 border border-slate-700 px-3 py-2 rounded-md placeholder:text-slate-400'
        />

        <button
          className='card-btn whitespace-nowrap'
          onClick={handleAddOption}
        >
          <HiMiniPlus /> Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
