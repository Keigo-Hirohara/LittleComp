import { ChangeEventHandler, ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStory } from '../../hooks/useStory';
import { createStoryModalState } from '../../context/storyState';
import { useReactiveVar } from '@apollo/client';

const CreateStoryModal = (): JSX.Element | null => {
  const { createStory } = useStory();
  const [inputStoryName, setInputStoryName] = useState<string>('');
  const createStoryModal = useReactiveVar(createStoryModalState);
  const handleChangeTextArea: ChangeEventHandler<HTMLElement> = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputStoryName(event.target.value);
  };
  if (!createStoryModal.isOpen) {
    return null;
  }

  return (
    <div>
      <div
        className="flex justify-center items-center overflow-auto fixed inset-0 m-auto bg-black1 bg-opacity-20 backdrop-blur-md z-20"
        onClick={() => {
          setInputStoryName('');
          createStoryModalState({ isOpen: false });
        }}
      >
        <div
          className="bg-white h-256 w-410 rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mt-32 ml-38 text-xl">ストーリーの新規作成</h2>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const {
                data: {
                  createStory: { success, message },
                },
              } = await createStory(inputStoryName);
              if (success) {
                toast.success(message);
              }
              setInputStoryName('');
              createStoryModalState({ isOpen: false });
            }}
          >
            <textarea
              className="block mx-auto my-22 p-5 border border-black3 rounded-2xl w-4/5 h-128 resize-none"
              onChange={handleChangeTextArea}
              value={inputStoryName}
            ></textarea>
            <div className="text-right bg-black3 mt-16 w-full rounded-b-2xl py-16">
              <button
                className="mr-16 bg-black3 w-102 py-3 text-black2"
                onClick={() => {
                  setInputStoryName('');
                  createStoryModalState({ isOpen: false });
                }}
              >
                キャンセル
              </button>
              <input
                className="bg-blue1 w-128 mr-16 py-3 rounded-xl text-white"
                type="submit"
                value="作成"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryModal;
