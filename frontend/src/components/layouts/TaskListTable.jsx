import React from 'react';
import moment from 'moment';

const TaskListTable = ({ tableData }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20';
      case 'Pending':
        return 'bg-violet-500/10 text-violet-400 border border-violet-400/20';
      case 'In Progress':
        return 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20';
      default:
        return 'bg-slate-700 text-slate-300 border border-slate-600';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-400 border border-red-400/20';
      case 'Medium':
        return 'bg-orange-500/10 text-orange-400 border border-orange-400/20';
      case 'Low':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20';
      default:
        return 'bg-slate-700 text-slate-300 border border-slate-600';
    }
  };

  return (
    <div className='overflow-x-auto p-0 rounded-lg mt-3'>
      <table className='min-w-full'>
        <thead>
          <tr className='text-left border-b border-slate-700'>
            <th className='py-3 px-4 text-slate-300 font-medium text-[13px]'>
              Name
            </th>
            <th className='py-3 px-4 text-slate-300 font-medium text-[13px]'>
              Status
            </th>
            <th className='py-3 px-4 text-slate-300 font-medium text-[13px]'>
              Priority
            </th>
            <th className='py-3 px-4 text-slate-300 font-medium text-[13px] hidden md:table-cell'>
              Created On
            </th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((task) => (
            <tr key={task._id} className='border-t border-slate-700'>
              <td className='my-3 mx-4 text-gray-200 text-[13px] line-clamp-1 overflow-hidden'>
                {task.title}
              </td>

              <td className='py-4 px-4'>
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>

              <td className='py-4 px-4'>
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </td>

              <td className='py-4 px-4 text-gray-200 text-[13px] text-nowrap hidden md:table-cell'>
                {task.createdAt
                  ? moment(task.createdAt).format('Do MM YYYY')
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
