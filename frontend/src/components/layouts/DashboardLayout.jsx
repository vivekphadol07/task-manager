import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className='bg-slate-900 min-h-screen'>
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className='flex'>
          <div className='max-[1080px]:hidden'>
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className='grow mx-5 text-gray-200'>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
