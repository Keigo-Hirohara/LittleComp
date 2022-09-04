import React from 'react';
import TaskBlock from './taskBlock';

const TaskBlockBar = () => {
  return (
    <div className="flex justify-between w-4/5 mr-10 ml-auto mt-3 mb-3">
      <TaskBlock className="bg-green3" text="New" color="text-green1"/>
      <TaskBlock className="bg-blue3" text="In Progress" color="text-blue1"/>
      <TaskBlock className="bg-red3" text="Done" color="text-red1"/>
    </div>
  );
};

export default TaskBlockBar;