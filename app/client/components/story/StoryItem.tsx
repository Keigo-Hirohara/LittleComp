import React, { useState } from 'react';
import TaskListBlock from '../task/TaskListBlock';
import { PlusSquare, Edit2, Trash2 } from 'react-feather';
import CreateTaskModal from '../modal/CreateTaskModal';

const StoryItem = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  return (
    // Todo: If Story Item is last one, add border-b-2
    <div className="flex border-t-2 border-black3">
      <div className="mt-auto mb-auto pl-3 ml-6 h-full w-48">
        <h1 className="text-2xl">Gent開発</h1>
        <div className="flex mt-3">
          <div className="">
            <PlusSquare
              className="h-7 w-7 mr-3 mb-3"
              onClick={() => setIsCreateTaskModalOpen(true)}
            />
            <CreateTaskModal
              isOpened={isCreateTaskModalOpen}
              onClose={() => setIsCreateTaskModalOpen(false)}
            />
          </div>
          <Edit2 className="h-7 w-7 mr-3 mb-3" />
          <Trash2 className="h-7 w-7 mr-3 mb-3" />
        </div>
      </div>
      <div className="flex justify-between w-4/5 mr-10 ml-auto">
        {/* New */}
        <TaskListBlock />
        {/* In Progress */}
        <TaskListBlock />
        {/* Done */}
        <TaskListBlock />
      </div>
    </div>
  );
};

export default StoryItem;
