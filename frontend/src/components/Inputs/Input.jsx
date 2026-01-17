import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className='text-[13px] text-slate-400'>
        {label}
      </label>

      <div className='input-box'>
        <input
          type={
            type === 'password'
              ? showPassword
                ? 'text'
                : 'password'
              : type
          }
          placeholder={placeholder}
          className='w-full bg-transparent outline-none text-gray-200 placeholder:text-slate-400'
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className='text-primary cursor-pointer'
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className='text-slate-400 cursor-pointer hover:text-gray-200'
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
