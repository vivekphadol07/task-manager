/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { IoMdContact } from 'react-icons/io';

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const [sideMenuData, setSideMenuData] = useState([]);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === 'logout') {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
    };

    useEffect(() => {
        if (user) {
            setSideMenuData(
                user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
            );
        }
        return () => { };
    }, [user]);

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-slate-900 border-r border-slate-700 sticky top-15.25 z-20'>
            <div className='flex flex-col items-center justify-center mb-7 pt-5'>
                <div className='w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden'>
                    {user?.profileImageUrl ? (
                        <img
                            src={user.profileImageUrl}
                            alt="Profile"
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <IoMdContact className='text-slate-300' size={100} />
                    )}
                </div>

                {user?.role === 'admin' && (
                    <div className='text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1'>
                        Admin
                    </div>
                )}

                <h5 className='text-gray-200 font-medium leading-6 mt-3'>
                    {user?.name || ''}
                </h5>

                <p className='text-[12px] text-slate-400'>
                    {user?.email || ''}
                </p>
            </div>

            {sideMenuData.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px]
            ${activeMenu === item.label
                            ? 'text-primary bg-linear-to-r from-primary/10 to-transparent border-r-4 border-primary'
                            : 'text-slate-400 hover:text-gray-200 hover:bg-slate-800'
                        }
            py-3 px-6 mb-3 cursor-pointer`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className='text-xl' />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default SideMenu;
