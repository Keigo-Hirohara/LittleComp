import { useMutation } from '@apollo/client';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { GET_STORIES } from '../../query/story/getStories';
import EDIT_STORY from '../../query/story/editStory';
import { StoryModalArgsType } from '../../types/StoryModalArgsType';

const EditStoryModal = ({
  name,
  isOpen,
  onClose,
  storyId,
}: StoryModalArgsType): JSX.Element | null => {
  const [renameStory] = useMutation(EDIT_STORY, {
    refetchQueries: [{ query: GET_STORIES }, 'getStories'],
  });
  const [consideredStoryName, setConsideredStoryName] = useState<
    string | undefined
  >(name);

  const handleStoryNameChanged: ChangeEventHandler<HTMLElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConsideredStoryName(event.target.value);
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
        <h2 className="mt-32 ml-38 text-xl"> ストーリーの編集</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            renameStory({
              variables: {
                targetId: storyId,
                newName: consideredStoryName,
              },
            });
            // Todo: Set empty value of textarea
            // setConsideredStoryName('');
            onClose();
          }}
        >
          {/* Todo: Arrange textarea input values font-size, padding, ... */}
          <textarea
            className="block mx-auto my-22 border border-black3 rounded-2xl w-4/5 h-128 resize-none"
            value={consideredStoryName}
            onChange={handleStoryNameChanged}
          ></textarea>
          <div className="text-right bg-black3 w-full rounded-b-2xl py-16">
            <button
              className="mr-16 bg-black3 w-102 py-3 text-black2"
              onClick={onClose}
            >
              キャンセル
            </button>
            <input
              type="submit"
              value="完了"
              className="bg-green1 w-128 mr-16 py-3 rounded-xl text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStoryModal;
