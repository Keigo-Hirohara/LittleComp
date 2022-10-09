import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStory } from '../../hooks/useStory';
import { useReactiveVar } from '@apollo/client';
import {
  editStoryModalState,
  initStateOfEditStory,
} from '../../context/storyState';

const EditStoryModal = (): JSX.Element | null => {
  const { renameStory } = useStory();
  const editStoryModal = useReactiveVar(editStoryModalState);
  const [consideredStoryName, setConsideredStoryName] = useState<string>(
    editStoryModal.name
  );
  const handleStoryNameChanged: ChangeEventHandler<HTMLElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConsideredStoryName(event.target.value);
  };
  useEffect(() => {
    setConsideredStoryName(editStoryModal.name);
  }, [editStoryModal]);
  if (!editStoryModal.isOpen) {
    return null;
  }
  return (
    <div
      className="flex justify-center items-center overflow-auto fixed inset-0 m-auto bg-black1 bg-opacity-20 backdrop-blur-md z-20"
      onClick={() => {
        editStoryModalState(initStateOfEditStory);
      }}
    >
      <div
        className="bg-white h-256 w-410 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mt-32 ml-38 text-xl"> ストーリーの編集</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const {
              data: {
                renameStory: { success, message },
              },
            } = await renameStory(editStoryModal.storyId, consideredStoryName);
            if (success) {
              toast.success(message);
            }
            setConsideredStoryName('');
            editStoryModalState(initStateOfEditStory);
          }}
        >
          <textarea
            className="block mx-auto my-22 p-5 border border-black3 rounded-2xl w-4/5 h-128 resize-none"
            value={consideredStoryName}
            onChange={handleStoryNameChanged}
          ></textarea>
          <div className="text-right bg-black3 w-full rounded-b-2xl py-16">
            <button
              className="mr-16 bg-black3 w-102 py-3 text-black2"
              onClick={() => {
                editStoryModalState(initStateOfEditStory);
              }}
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
