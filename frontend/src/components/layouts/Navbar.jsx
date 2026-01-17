import React, { useState } from 'react';
import SideMenu from './SideMenu';
import { HiOutlineX, HiOutlineMenu } from 'react-icons/hi';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className='flex gap-5 bg-slate-900 border-b border-slate-700 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
      <button
        className='block lg:hidden text-gray-200'
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className='text-2xl' />
        ) : (
          <HiOutlineMenu className='text-2xl' />
        )}
      </button>

      <h2 className='text-lg font-medium text-gray-200'>
        Task Management
      </h2>

      {openSideMenu && (
        <div className='fixed top-15.25 -ml-4 bg-slate-900'>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
