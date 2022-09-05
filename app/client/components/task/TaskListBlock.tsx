import React from 'react';
import TaskItem from './TaskItem';

const NewTaskBlock = () => {
  return (
    <div className="flex flex-wrap w-80 pt-3 pl-3">
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
    </div>
  );
};

export default NewTaskBlock;
