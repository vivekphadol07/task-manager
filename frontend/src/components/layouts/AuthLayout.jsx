import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-900">

      <div className="w-full md:w-[60vw] px-12 pt-8 pb-12 flex flex-col">
        <h2 className="text-lg font-medium text-gray-200 mb-4">
          Task Manager
        </h2>

        {children}
      </div>

      <div className="hidden md:flex w-[40vw] h-screen items-center justify-center 
        bg-slate-800 bg-[url('/UI_Image.png')] bg-cover bg-no-repeat bg-center 
        overflow-hidden p-8 border-l border-slate-700">
      </div>

    </div>
  );
};

export default AuthLayout;
