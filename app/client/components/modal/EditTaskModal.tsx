import { useState, ChangeEvent, ChangeEventHandler } from 'react';
import { Trash2 } from 'react-feather';
import { TaskModalArgsType } from '../../types/TaskModalArgsType';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTask } from '../../hooks/useTask';

const EditTaskModal = ({
  name,
  storyId,
  status,
  isOpen,
  onClose,
  id,
}: TaskModalArgsType): JSX.Element | null => {
  const [consideredTaskName, setConsideredTaskName] = useState<string>(
    name || ''
  );
  const { renameTask, deleteTask } = useTask(storyId, status);
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
      <div
        className="bg-white h-256 w-410 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mt-32 ml-38 text-xl"> タスクの編集</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (!id) {
              return;
            }
            const {
              data: {
                renameTask: { success, message },
              },
            } = await renameTask(id, consideredTaskName);
            if (success) {
              toast.success(message);
            }
            onClose();
          }}
        >
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
                if (!id) {
                  return;
                }
                event.preventDefault();
                const {
                  data: {
                    deleteTask: { success, message },
                  },
                } = await deleteTask(id);
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
