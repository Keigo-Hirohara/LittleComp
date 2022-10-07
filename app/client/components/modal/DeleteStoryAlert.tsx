import { useMutation } from '@apollo/client';
import React from 'react';
import { AlertCircle } from 'react-feather';
import { GET_STORIES } from '../../query/story/getStories';
import DELETE_STORY from '../../query/story/deleteStory';
import { StoryModalArgsType } from '../../types/StoryModalArgsType';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteStoryAlert = ({
  isOpen,
  onClose,
  name,
  storyId,
}: StoryModalArgsType): JSX.Element | null => {
  const [deleteStory] = useMutation(DELETE_STORY, {
    refetchQueries: [{ query: GET_STORIES }, 'getStories'],
  });
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="flex justify-center items-center overflow-auto fixed inset-0 m-auto z-20 bg-black1 bg-opacity-20"
      onClick={onClose}
    >
      {/* Todo: Add new custom margin and width value to tailwind.config.js not use [] */}
      <div
        className="flex flex-col items-center bg-white h-307 rounded-2xl shadow-2xl px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <AlertCircle className="w-45 h-45 text-red1 mt-38 mb-22 py-10" />
        <h2 className="text-xl mb-51">
          {name}
          <br />
          を削除してよろしいですか？
        </h2>
        <button
          className="w-4/5 bg-red1 py-6 mb-10 rounded-xl text-white"
          onClick={async (event) => {
            console.log(storyId);
            event.preventDefault();
            const {
              data: {
                deleteStory: { success, message },
              },
            } = await deleteStory({ variables: { targetId: storyId } });
            if (success) {
              toast.success(message);
            }
            onClose();
          }}
        >
          削除
        </button>
        <button
          className="w-4/5 bg-black3 py-6 mb-16 rounded-xl"
          onClick={onClose}
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default DeleteStoryAlert;
