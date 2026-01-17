import React from 'react';
import { IoMdContact } from 'react-icons/io';
import StatusCard from './StatusCard';

const UserCard = ({ userInfo }) => {
  return (
    <div className='user-card p-2 bg-slate-800 border border-slate-700'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {/* Avatar with fallback */}
          <div className='w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-600'>
            {userInfo?.profileImageUrl ? (
              <img
                src={userInfo.profileImageUrl}
                alt='Avatar'
                className='w-full h-full object-cover'
              />
            ) : (
              <IoMdContact className='text-5xl text-slate-300'/>
            )}
          </div>

          <div>
            <p className='text-sm font-medium text-gray-200'>
              {userInfo?.name}
            </p>
            <p className='text-xs text-slate-400'>
              {userInfo?.email}
            </p>
          </div>
        </div>
      </div>

      <div className='flex items-end gap-3 mt-5'>
        <StatusCard
          label='Pending'
          count={userInfo?.pendingTasks || 0}
          status='Pending'
        />

        <StatusCard
          label='In Progress'
          count={userInfo?.inProgressTasks || 0}
          status='In Progress'
        />

        <StatusCard
          label='Completed'
          count={userInfo?.completedTasks || 0}
          status='Completed'
        />
      </div>
    </div>
  );
};

export default UserCard;
