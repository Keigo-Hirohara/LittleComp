import { gql, useMutation } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';

const EDIT_STORY = gql`
  mutation Mutation($targetId: ID!, $newName: String!) {
    renameStory(targetId: $targetId, newName: $newName) {
      code
      success
      message
      story {
        id
        name
      }
    }
  }
`;

const EditStoryModal = (props: any) => {
  if (!props.isOpened) {
    return null;
  }
  const [renameStory] = useMutation(EDIT_STORY);
  const [consideredStoryName, setConsideredStoryName] = useState(
    props.storyName
  );
  useEffect(() => {
    console.log(props);
  }, []);

  const handleStoryNameChanged = useCallback((event: any) => {
    setConsideredStoryName(event.target.value);
  }, []);
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
        <h2 className="mt-10 ml-12 text-xl"> ストーリーの編集</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault;
            renameStory({
              variables: {
                targetId: props.storyId,
                newName: consideredStoryName,
              },
            });
          }}
        >
          {/* Todo: Arrange textarea input values font-size, padding, ... */}
          <textarea
            className="block mx-auto my-7 border-[1px] border-black3 rounded-2xl w-4/5 h-40 resize-none"
            value={consideredStoryName}
            onChange={handleStoryNameChanged}
          ></textarea>
          <div className="text-right bg-black3 mt-5 w-full rounded-b-2xl py-5">
            <button
              className="mr-5 bg-black3 w-32 py-1 text-black2"
              onClick={props.onClose}
            >
              キャンセル
            </button>
            <input
              type="submit"
              value="完了"
              className="bg-green1 w-40 mr-5 py-1 rounded-xl text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStoryModal;
