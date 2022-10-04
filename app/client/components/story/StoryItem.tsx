import React, { useState, useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import NewTaskBlock from '../task/NewTaskBlock';
import InProgressTaskBlock from '../task/InProgressTaskBlock';
import DoneTaskBlock from '../task/DoneTaskBlock';
import { PlusSquare, Edit2, Trash2 } from 'react-feather';
import CreateTaskModal from '../modal/CreateTaskModal';
import EditStoryModal from '../modal/EditStoryModal';
import DeleteStoryAlert from '../modal/DeleteStoryAlert';
import { UPDATE_TASK_STATUS } from '../../query/task/updateTaskStatus';
import { GET_TASKS } from '../../query/task/getTasks';
import { useMutation } from '@apollo/client';
import { StoryType } from '../../types/StoryType';

const StoryItem = ({ name, id }: StoryType): JSX.Element => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isEditStoryModalOpen, setIsEditStoryModalOpen] = useState(false);
  const [isDeleteStoryAlertOpen, setIsDeleteStoryAlertOpen] = useState(false);

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS, {
    refetchQueries: [
      { query: GET_TASKS, variables: { storyId: id, status: 'new' } },
      { query: GET_TASKS, variables: { storyId: id, status: 'inprogress' } },
      { query: GET_TASKS, variables: { storyId: id, status: 'done' } },
      'getStories',
    ],
  });

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) {
      return;
    }
    console.log(result.draggableId);
    console.log(result.destination.droppableId);
    try {
      updateTaskStatus({
        variables: {
          targetId: result.draggableId,
          newStatus: result.destination.droppableId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    // Todo: If Story Item is last one, add border-b-2
    <div className="flex border-t-2 border-black3">
      <div className="mt-auto mb-auto pl-3 ml-6 h-full w-48">
        <h1 className="text-2xl">{name}</h1>
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
        <DragDropContext onDragEnd={onDragEnd}>
          <NewTaskBlock storyId={id} />
          <InProgressTaskBlock storyId={id} />
          <DoneTaskBlock storyId={id} />
        </DragDropContext>
      </div>

      <CreateTaskModal
        isOpened={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        storyId={id}
      />

      <EditStoryModal
        isOpened={isEditStoryModalOpen}
        onClose={() => setIsEditStoryModalOpen(false)}
        storyName={name}
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
