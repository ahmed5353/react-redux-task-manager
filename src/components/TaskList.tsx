import { useState } from 'react';
import TaskItem from './TaskItem';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { Task } from '@/types/types';
// import { useSelector } from 'react-redux';

function TaskList() {
  const tasks = useSelector((state: { tasks: [] }) => state.tasks);
  const [filter, setFilter] = useState('All');

  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    if (filter === 'Active') return !task.completed;
    return task.priority === filter;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {['All', 'Active', 'Completed', 'High', 'Medium', 'Low'].map(
          (filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={twMerge(
                `px-3 py-1 rounded-full text-sm `,
                filter === filterOption
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              )}
            >
              {filterOption}
            </button>
          )
        )}
      </div>
      {filteredTasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {/* <TaskItem /> */}
    </div>
  );
}

export default TaskList;
