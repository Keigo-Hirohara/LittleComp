import { ChangeEventHandler, ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../../query/task/createTask';
import { GET_TASKS } from '../../query/task/getTasks';
import { TaskModalArgsType } from '../../types/TaskModalArgsType';

// Todo: define and specify more explicative argument type
const CreateTaskModal = ({
  storyId,
  isOpen,
  onClose,
}: TaskModalArgsType): JSX.Element | null => {
  const [inputTaskName, setInputTaskName] = useState<string>('');
  const handleChangeTextArea: ChangeEventHandler<HTMLElement> = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputTaskName(event.target.value);
  };
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: { storyId: storyId, status: 'new' },
      },
      'getTasks',
    ],
  });
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
        <h2 className="mt-32 ml-38 text-xl">タスクの追加</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            createTask({
              variables: { storyId: storyId, taskName: inputTaskName },
            });
            onClose();
          }}
        >
          {/* Todo: Arrange textarea input values font-size, padding, ... */}
          <textarea
            className="block mx-auto my-22 border border-black3 rounded-2xl w-4/5 h-128 resize-none"
            onChange={handleChangeTextArea}
            value={inputTaskName}
          ></textarea>
          <div className="text-right bg-black3 w-full rounded-b-2xl py-16">
            <button
              className="mr-16 bg-black3 w-102 py-3 text-black2"
              onClick={onClose}
            >
              キャンセル
            </button>
            <button className="bg-blue1 w-128 mr-16 py-3 rounded-xl text-white">
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
