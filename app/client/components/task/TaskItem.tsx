import React, { useState } from 'react';
import { Edit2 } from 'react-feather';
import { TaskType } from '../../types/TaskType';
import EditTaskModal from '../modal/EditTaskModal';

const TaskItem = (props: TaskType): JSX.Element => {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  return (
    <div className="relative w-64 h-64 bg-green1 rounded-3xl ml-10 mb-10">
      <p className="flex items-center h-64 text-white text-xs mx-5 w-4/5 break-words text-ellipsis">
        {props.name}
      </p>
      <Edit2
        onClick={() => setIsEditTaskModalOpen(true)}
        className=" w-13 h-13 absolute bottom-5 right-5 text-white"
      />
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        onClose={() => setIsEditTaskModalOpen(false)}
        id={props.id}
        status={props.status}
        storyId={props.storyId}
        name={props.name}
      />
    </div>
  );
};

export default TaskItem;
