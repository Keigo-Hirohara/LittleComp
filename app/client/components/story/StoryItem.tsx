import React, { useState } from 'react';
import NewTaskBlock from '../task/NewTaskBlock';
import InProgressTaskBlock from '../task/InProgressTaskBlock';
import DoneTaskBlock from '../task/DoneTaskBlock';
import { PlusSquare, Edit2, Trash2 } from 'react-feather';
import CreateTaskModal from '../modal/CreateTaskModal';
import EditStoryModal from '../modal/EditStoryModal';
import DeleteStoryAlert from '../modal/DeleteStoryAlert';

const StoryItem = ({ storyName, id }: any) => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isEditStoryModalOpen, setIsEditStoryModalOpen] = useState(false);
  const [isDeleteStoryAlertOpen, setIsDeleteStoryAlertOpen] = useState(false);
  return (
    // Todo: If Story Item is last one, add border-b-2
    <div className="flex border-t-2 border-black3">
      <div className="mt-auto mb-auto pl-3 ml-6 h-full w-48">
        <h1 className="text-2xl">{storyName}</h1>
        <div className="flex mt-3">
          <PlusSquare
            className="h-7 w-7 mr-3 mb-3"
            onClick={() => setIsCreateTaskModalOpen(true)}
          />
          <Edit2
            className="h-7 w-7 mr-3 mb-3"
            onClick={() => setIsEditStoryModalOpen(true)}
          />
          <Trash2
            className="h-7 w-7 mr-3 mb-3"
            onClick={() => setIsDeleteStoryAlertOpen(true)}
          />
        </div>
      </div>
      <div className="flex justify-between w-4/5 mr-10 ml-auto">
        {/* New */}
        <NewTaskBlock storyId={id} />
        {/* In Progress */}
        <InProgressTaskBlock storyId={id} />
        {/* Done */}
        <DoneTaskBlock storyId={id} />
      </div>

      <CreateTaskModal
        isOpened={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        storyId={id}
      />

      <EditStoryModal
        isOpened={isEditStoryModalOpen}
        onClose={() => setIsEditStoryModalOpen(false)}
        storyName={storyName}
        storyId={id}
      />
      <DeleteStoryAlert
        isOpened={isDeleteStoryAlertOpen}
        onClose={() => setIsDeleteStoryAlertOpen(false)}
        storyId={id}
      />
    </div>
  );
};

export default StoryItem;
