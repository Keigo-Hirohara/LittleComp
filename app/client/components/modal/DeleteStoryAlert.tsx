import { useMutation } from '@apollo/client';
import React from 'react';
import { AlertCircle } from 'react-feather';
import { GET_STORIES } from '../../query/story/getStories';
import DELETE_STORY from '../../query/story/deleteStory';
import { StoryModalArgsType } from '../../types/StoryModalArgsType';

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
        className="flex flex-col items-center bg-white h-96 w-80 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <AlertCircle className="w-14 h-14 text-red1 mt-12 mb-7" />
        <h2 className="text-xl mb-16">
          ストーリー: {name}を削除して
          <br />
          よろしいですか？
        </h2>
        <button
          className="w-4/5 bg-red1 py-2 mb-3 rounded-xl text-white"
          onClick={(event) => {
            console.log(storyId);
            event.preventDefault();
            deleteStory({ variables: { targetId: storyId } });
            onClose();
          }}
        >
          削除
        </button>
        <button className="w-4/5 bg-black3 py-2 rounded-xl" onClick={onClose}>
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default DeleteStoryAlert;
