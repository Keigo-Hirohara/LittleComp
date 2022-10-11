import { useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import NewTaskBlock from '../task/NewTaskBlock';
import InProgressTaskBlock from '../task/InProgressTaskBlock';
import DoneTaskBlock from '../task/DoneTaskBlock';
import { PlusSquare, Edit2, Trash2 } from 'react-feather';
import { StoryType } from '../../types/StoryType';
import { useTask } from '../../hooks/useTask';
import {
  deleteStoryAlertState,
  editStoryModalState,
} from '../../context/storyState';
import { createTaskModalState } from '../../context/taskState';
import { useRouter } from 'next/router';

const StoryItem = ({ name, id }: StoryType): JSX.Element => {
  const { updateTaskStatus } = useTask(id);
  const router = useRouter();

  const onDragEnd = useCallback(async (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    try {
      await updateTaskStatus(
        result.draggableId,
        result.destination.droppableId
      );
    } catch (error) {
      router.push('/signin');
      console.log(error);
    }
  }, []);

  return (
    <div className="flex border-t-2 border-black3">
      <div className="mt-auto mb-auto pl-10 ml-19 w-154 break-words">
        <h1 className="text-2xl">{name}</h1>
        <div className="flex mt-10">
          <PlusSquare
            className="h-22 w-22 mr-10 mb-10"
            onClick={() => {
              createTaskModalState({ isOpen: true, storyId: id });
            }}
          />
          <Edit2
            className="h-22 w-22 mr-10 mb-10"
            onClick={() => {
              editStoryModalState({ isOpen: true, name, storyId: id });
            }}
          />
          <Trash2
            className="h-22 w-22 mr-10 mb-10"
            onClick={() =>
              deleteStoryAlertState({
                isOpen: true,
                name,
                storyId: id,
              })
            }
          />
        </div>
      </div>
      <div className="flex justify-between w-4/5 mr-32 ml-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <NewTaskBlock storyId={id} />
          <InProgressTaskBlock storyId={id} />
          <DoneTaskBlock storyId={id} />
        </DragDropContext>
      </div>
    </div>
  );
};

export default StoryItem;
