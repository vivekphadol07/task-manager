/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import AvatarGroup from '../../components/layouts/AvatarGroup';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = () => {
    switch (task?.status) {
      case 'In Progress':
        return 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20';

      case 'Completed':
        return 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20';

      default:
        return 'text-violet-400 bg-violet-400/10 border border-violet-400/20';
    }
  };

  // get Task info by ID
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );

      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error('Error Fetching task:', error);
    }
  };

  // handle todo check
  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist];
    const taskId = id;

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed;

      try {
        const response = await axiosInstance.put(
          API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
          { todoChecklist }
        );

        if (response.status === 200) {
          setTask(response.data?.task || task);
        } else {
          todoChecklist[index].completed =
            !todoChecklist[index].completed;
        }
      } catch (error) {
        todoChecklist[index].completed =
          !todoChecklist[index].completed;
      }
    }
  };

  // Handle attachment link click
  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = 'https://' + link;
    }
    window.open(link, '_blank');
  };

  useEffect(() => {
    if (id) getTaskDetailsByID();
    return () => {};
  }, [id]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className='mt-5'>
        {task && (
          <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
            <div className='form-card col-span-3'>
              <div className='flex items-center justify-between'>
                <h2 className='text-sm md:text-xl font-medium text-gray-200'>
                  {task?.title}
                </h2>

                <div
                  className={`text-[11px] md:text-[13px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}
                >
                  {task?.status}
                </div>
              </div>

              <div className='mt-4'>
                <InfoBox label="Description" value={task?.description} />
              </div>

              <div className='grid grid-cols-12 gap-4 mt-4'>
                <div className='col-span-6 md:col-end-4'>
                  <InfoBox label='Priority' value={task?.priority} />
                </div>

                <div className='col-span-6 md:col-end-4'>
                  <InfoBox
                    label='Due Date'
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format('Do MMM YYYY')
                        : 'N/A'
                    }
                  />
                </div>

                <div className='col-span-6 md:col-end-4'>
                  <label className='text-xs font-medium text-slate-400'>
                    Assigned To
                  </label>

                  <AvatarGroup
                    avatars={
                      task?.assignedTo?.map(
                        (item) => item.profileImageUrl
                      ) || []
                    }
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className='mt-2'>
                <label className='text-xs font-medium text-slate-400'>
                  Todo Checklist
                </label>

                {task?.todoChecklist?.map((item, index) => (
                  <TodoChecklist
                    key={`todo_${index}`}
                    text={item.text}
                    isChecked={item?.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              </div>

              {task?.attachments?.length > 0 && (
                <div className='mt-2'>
                  <label className='text-xs font-medium text-slate-400'>
                    Attachments
                  </label>

                  {task?.attachments?.map((link, index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

/* ================== SUB COMPONENTS ================== */

const InfoBox = ({ label, value }) => {
  return (
    <>
      <label className='text-xs font-medium text-slate-400'>
        {label}
      </label>

      <p className='text-[12px] md:text-[13px] font-medium text-gray-200 mt-0.5'>
        {value}
      </p>
    </>
  );
};

const TodoChecklist = ({ text, isChecked, onChange }) => {
  return (
    <div className='flex items-center gap-3 p-3'>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={onChange}
        className='w-4 h-4 text-primary bg-slate-800 border-slate-600 rounded-sm outline-none cursor-pointer'
      />

      <p className='text-[13px] text-gray-200'>{text}</p>
    </div>
  );
};

const Attachment = ({ link, index, onClick }) => {
  return (
    <div
      className='flex justify-between bg-slate-800 border border-slate-700 px-3 py-2 rounded-md mb-3 mt-2 cursor-pointer hover:bg-slate-700'
      onClick={onClick}
    >
      <div className='flex-1 flex items-center gap-3'>
        <span className='text-xs text-slate-400 font-semibold mr-2'>
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>

        <p className='text-xs text-gray-200'>{link}</p>
      </div>

      <LuSquareArrowOutUpRight className='text-slate-400' />
    </div>
  );
};
