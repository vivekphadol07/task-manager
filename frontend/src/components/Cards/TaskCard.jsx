/* eslint-disable no-unused-vars */
import React from 'react';
import Progress from '../layouts/Progress';
import moment from 'moment';
import AvatarGroup from '../layouts/AvatarGroup';
import { LuPaperclip } from 'react-icons/lu';

const TaskCard = ({
  key,
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {

  const getStatusTagColor = () => {
    switch (status) {
      case 'In Progress':
        return 'text-cyan-400 bg-cyan-500/10 border border-cyan-400/20';

      case 'Completed':
        return 'text-emerald-400 bg-emerald-500/10 border border-emerald-400/20';

      default:
        return 'text-violet-400 bg-violet-500/10 border border-violet-400/20';
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case 'Low':
        return 'text-emerald-400 bg-emerald-500/10 border border-emerald-400/20';

      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border border-amber-400/20';

      case 'High':
        return 'text-rose-400 bg-rose-500/10 border border-rose-400/20';

      default:
        return 'text-slate-300 bg-slate-700 border border-slate-600';
    }
  };

  return (
    <div
      className='bg-slate-800 rounded-xl shadow-lg shadow-black/20 border border-slate-700 cursor-pointer'
      onClick={onClick}
    >
      {/* Status & Priority */}
      <div className='flex items-end gap-3 px-4 mt-3'>
        <div className={`text-[11px] font-medium px-4 py-0.5 rounded ${getStatusTagColor()}`}>
          {status}
        </div>

        <div className={`text-[11px] font-medium px-4 py-0.5 rounded ${getPriorityTagColor()}`}>
          {priority} Priority
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`px-4 border-l-[3px] ${
          status === 'In Progress'
            ? 'border-cyan-400'
            : status === 'Completed'
            ? 'border-emerald-400'
            : 'border-violet-400'
        }`}
      >
        <p className='text-sm font-medium text-gray-200 mt-4 line-clamp-2'>
          {title}
        </p>

        <p className='text-xs text-slate-400 mt-1.5 line-clamp-2 leading-4.5'>
          {description}
        </p>

        <p className='text-[13px] text-slate-300 font-medium mt-2 mb-2 leading-4.5'>
          Task Done:{' '}
          <span className='font-semibold text-gray-200'>
            {completedTodoCount} / {todoChecklist?.length || 0}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </div>

      {/* Footer */}
      <div className='px-4 mb-3'>
        <div className='flex items-center justify-between my-1'>
          <div>
            <label className='text-xs text-slate-400'>
              Start Date
            </label>

            <p className='text-[13px] font-medium text-gray-200'>
              {moment(createdAt).format('Do MMM YYYY')}
            </p>
          </div>

          <div>
            <label className='text-xs text-slate-400'>
              Due Date
            </label>

            <p className='text-[13px] font-medium text-gray-200'>
              {moment(dueDate).format('Do MMM YYYY')}
            </p>
          </div>
        </div>

        <div className='flex items-center justify-between mt-3'>
          <AvatarGroup avatars={assignedTo || []} />

          {attachmentCount > 0 && (
            <div className='flex items-center gap-2 bg-blue-500/10 px-2.5 py-1.5 rounded-lg'>
              <LuPaperclip className='text-blue-400' />
              <span className='text-xs text-gray-200'>
                {attachmentCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
