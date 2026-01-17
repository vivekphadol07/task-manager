/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUsers } from 'react-icons/lu';
import { IoMdContact } from 'react-icons/io';
import Modal from '../layouts/Modal';
import AvatarGroup from '../layouts/AvatarGroup';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.USERS.GET_ALL_USERS
      );
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users : ', error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl)
    .filter(Boolean); // avoid undefined images

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
    return () => {};
  }, [selectedUsers]);

  return (
    <div className='space-y-4 mt-2'>
      {selectedUserAvatars.length === 0 && (
        <button
          className='card-btn'
          onClick={() => setIsModalOpen(true)}
        >
          <LuUsers className='text-sm' /> Add Members
        </button>
      )}

      {selectedUserAvatars.length > 0 && (
        <div
          className='cursor-pointer'
          onClick={() => setIsModalOpen(true)}
        >
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className='space-y-4 h-[60vh] overflow-y-auto'>
          {allUsers.map((user) => (
            <div
              key={user._id}
              className='flex items-center gap-4 p-3 border-b border-slate-700'
            >
              {/* Avatar with fallback */}
              <div className='w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden'>
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.name}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <IoMdContact className='text-5xl text-slate-300' />
                )}
              </div>

              <div className='flex-1'>
                <p className='font-medium text-gray-200'>
                  {user.name}
                </p>
                <p className='text-[13px] text-slate-400'>
                  {user.email}
                </p>
              </div>

              <input
                type='checkbox'
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className='w-4 h-4 text-primary bg-slate-800 border-slate-600 rounded-sm outline-none cursor-pointer'
              />
            </div>
          ))}
        </div>

        <div className='flex justify-end gap-4 pt-4'>
          <button
            onClick={() => setIsModalOpen(false)}
            className='card-btn'
          >
            CANCEL
          </button>

          <button
            className='card-btn-fill'
            onClick={handleAssign}
          >
            DONE
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
