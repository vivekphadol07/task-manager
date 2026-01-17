import React from 'react';

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className='my-2'>
      <div className='flex'>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`relative px-3 md:px-4 text-sm font-medium cursor-pointer
              ${
                activeTab === tab.label
                  ? 'text-primary'
                  : 'text-slate-400 hover:text-gray-200'
              }`}
          >
            <div className='flex items-center'>
              <span className='text-xs'>{tab.label}</span>

              <span
                className={`text-xs ml-2 px-2 py-0.5 rounded-full
                  ${
                    activeTab === tab.label
                      ? 'bg-primary text-white'
                      : 'bg-slate-700 text-slate-300'
                  }`}
              >
                {tab.count}
              </span>
            </div>

            {/* underline only for active tab */}
            {activeTab === tab.label && (
              <div className='absolute bottom-0 left-0 w-full h-0.5 bg-primary -my-2' />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusTabs;
