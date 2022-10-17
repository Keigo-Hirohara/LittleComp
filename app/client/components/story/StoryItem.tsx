import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { NextRouter, useRouter } from 'next/router';
import { PlusSquare, Edit2, Trash2 } from 'react-feather';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import {
  deleteStoryAlertState,
  editStoryModalState,
} from '../../context/storyState';
import { Story } from '../../types/Story';
import { useTask } from '../../hooks/useTask';
import { useUser } from '../../hooks/useUser';
import NewTaskBlock from '../task/NewTaskBlock';
import DoneTaskBlock from '../task/DoneTaskBlock';
import InProgressTaskBlock from '../task/InProgressTaskBlock';
import { createTaskModalState } from '../../context/taskState';

const StoryItem = ({ name, id }: Story): JSX.Element => {
  const { updateTaskStatus } = useTask(id, 'new');
  const router: NextRouter = useRouter();
  const { getUser } = useUser();

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      try {
        await updateTaskStatus(
          result.draggableId,
          result.destination.droppableId
        );
      } catch (error: any) {
        if (error.message == 'ログインし直してください') {
          try {
            await getUser.client.resetStore();
          } catch (error: any) {
            console.log(error.message);
          }
          toast.error(error.message);
          router.push('/signin');
        }
      }
    },
    [getUser, router, updateTaskStatus]
  );

  if (getUser.error) {
    return <>error</>;
  }
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
