import { useMutation } from '@apollo/client';
import { useState, ChangeEvent, ChangeEventHandler, useEffect } from 'react';
import { Trash2 } from 'react-feather';
import { DELETE_TASK } from '../../query/task/deleteTask';
import { GET_TASKS } from '../../query/task/getTasks';
import { RENAME_TASK } from '../../query/task/renameTask';
import { TaskModalArgsType } from '../../types/TaskModalArgsType';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTaskModal = ({
  name,
  storyId,
  status,
  isOpen,
  onClose,
  id,
}: TaskModalArgsType): JSX.Element | null => {
  const [consideredTaskName, setConsideredTaskName] = useState(name);
  useEffect(() => {
    setConsideredTaskName(name);
  }, [name]);
  const [renameTask] = useMutation(RENAME_TASK, {
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: { storyId: storyId, status: status },
      },
    ],
  });
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: { storyId: storyId, status: status },
      },
    ],
  });
  const handleTaskNameChanged: ChangeEventHandler<HTMLElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConsideredTaskName(event.target.value);
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="flex justify-center items-center overflow-auto fixed inset-0 m-auto bg-black1 bg-opacity-20 backdrop-blur-md z-20"
      onClick={onClose}
    >
      {/* Todo: Add new custom margin and width value to tailwind.config.js not use [] */}
      <div
        className="bg-white h-256 w-410 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mt-32 ml-38 text-xl"> タスクの編集</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const {
              data: {
                renameTask: { success, message },
              },
            } = await renameTask({
              variables: {
                targetId: id,
                newName: consideredTaskName,
              },
            });
            if (success) {
              toast.success(message);
            }
            onClose();
          }}
        >
          {/* Todo: Arrange textarea input values font-size, padding, ... */}
          <textarea
            className="block mx-auto my-22 p-5 border border-black3 rounded-2xl w-4/5 h-128 resize-none"
            onChange={handleTaskNameChanged}
            value={consideredTaskName}
          ></textarea>
          <div className="relative text-right bg-black3 mt-16 w-full rounded-b-2xl py-16">
            <Trash2
              strokeWidth={1}
              className="absolute inline left-16 top-19"
              onClick={async (event) => {
                event.preventDefault();
                const {
                  data: {
                    deleteTask: { success, message },
                  },
                } = await deleteTask({
                  variables: { targetId: id },
                });
                if (success) {
                  toast.success(message);
                }
                onClose();
              }}
            />
            <button
              className="mr-16 bg-black3 w-102 py-3 text-black2"
              onClick={onClose}
            >
              キャンセル
            </button>
            <button className="bg-green1 w-128 mr-16 py-3 rounded-xl text-white">
              完了
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
