import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-400">
        {label}
      </label>

      <div className={`input-box ${error ? 'border border-red-500' : ''}`}>
        <input
          type={
            type === 'password'
              ? showPassword
                ? 'text'
                : 'password'
              : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-gray-200 placeholder:text-slate-400"
          value={value}
          onChange={onChange}
          pattern={
            type === 'password'
              ? '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$'
              : undefined
          }
          title={
            type === 'password'
              ? 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol'
              : undefined
          }
          required={type === 'password'}
        />

        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer hover:text-gray-200"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1">
          Password must contain at least 8 characters, uppercase, lowercase, number, and symbol.
        </p>
      )}
    </div>
  );
};

export default Input;
