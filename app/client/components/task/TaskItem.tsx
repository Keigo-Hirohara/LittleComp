import React, { useState } from 'react';
import { Edit2 } from 'react-feather';
import EditTaskModal from '../modal/EditTaskModal';

const TaskItem = () => {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  return (
    <div className="relative w-20 h-20 bg-green1 rounded-3xl ml-3 mb-3">
      <p className="flex items-center h-20 text-white text-xs mx-1.5 w-4/5">
        TaskItemの中のスタイリング
      </p>
      <Edit2
        onClick={() => setIsEditTaskModalOpen(true)}
        className=" w-4 h-4 absolute bottom-1.5 right-1.5 text-white"
      />
      <EditTaskModal
        isOpened={isEditTaskModalOpen}
        onClose={() => setIsEditTaskModalOpen(false)}
      />
    </div>
  );
};

export default TaskItem;
