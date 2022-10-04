import { ChangeEventHandler, ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../../query/task/createTask';
import { GET_TASKS } from '../../query/task/getTasks';
import { TaskModalArgsType } from '../../types/TaskModalArgsType';

// Todo: define and specify more explicative argument type
const CreateTaskModal = (props: TaskModalArgsType) => {
  const [inputTaskName, setInputTaskName] = useState('');
  const handleChangeTextArea: ChangeEventHandler<HTMLElement> = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputTaskName(event.target.value);
  };
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: { storyId: props.storyId, status: 'new' },
      },
      'getTasks',
    ],
  });
  if (!props.isOpened) {
    return null;
  }
  return (
    <div
      className="flex justify-center items-center overflow-auto fixed inset-0 m-auto bg-black1 bg-opacity-20 backdrop-blur-md z-20"
      onClick={props.onClose}
    >
      {/* Todo: Add new custom margin and width value to tailwind.config.js not use [] */}
      <div
        className="bg-white h-80 w-[32rem] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mt-10 ml-12 text-xl">タスクの追加</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            createTask({
              variables: { storyId: props.storyId, taskName: inputTaskName },
            });
            props.onClose();
          }}
        >
          {/* Todo: Arrange textarea input values font-size, padding, ... */}
          <textarea
            className="block mx-auto my-7 border-[1px] border-black3 rounded-2xl w-4/5 h-40 resize-none"
            onChange={handleChangeTextArea}
            value={inputTaskName}
          ></textarea>
          <div className="text-right bg-black3 mt-5 w-full rounded-b-2xl py-5">
            <button
              className="mr-5 bg-black3 w-32 py-1 text-black2"
              onClick={props.onClose}
            >
              キャンセル
            </button>
            <button className="bg-blue1 w-40 mr-5 py-1 rounded-xl text-white">
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
