import { useMutation } from '@apollo/client';
import React from 'react';
import { Trash2 } from 'react-feather';
import { DELETE_TASK } from '../../query/task/deleteTask';
import { GET_TASKS } from '../../query/task/getTasks';

const EditTaskModal = (props: any) => {
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: { storyId: props.storyId, status: props.status },
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
        <h2 className="mt-10 ml-12 text-xl"> タスクの編集</h2>
        <form action="">
          {/* Todo: Arrange textarea input values font-size, padding, ... */}
          <textarea className="block mx-auto my-7 border-[1px] border-black3 rounded-2xl w-4/5 h-40 resize-none"></textarea>
          <div className="relative text-right bg-black3 mt-5 w-full rounded-b-2xl py-5">
            <Trash2
              strokeWidth={1}
              className="absolute inline left-5 top-6"
              onClick={(event) => {
                console.log(props.status);
                event.preventDefault();
                deleteTask({
                  variables: { targetId: props.id },
                });
                props.onClose();
              }}
            />
            <button
              className="mr-5 bg-black3 w-32 py-1 text-black2"
              onClick={props.onClose}
            >
              キャンセル
            </button>
            <button className="bg-green1 w-40 mr-5 py-1 rounded-xl text-white">
              完了
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
