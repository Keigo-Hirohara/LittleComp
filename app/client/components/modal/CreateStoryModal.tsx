import { gql, useMutation } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { GET_STORIES } from '../../query';

const MAKE_STORY = gql`
  mutation Mutation($name: String!) {
    createStory(name: $name) {
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

const CreateStoryModal = (props: any) => {
  const [makeStory] = useMutation(MAKE_STORY, {
    refetchQueries: [{ query: GET_STORIES }, 'getStories'],
  });
  const [inputStoryName, setInputStoryName] = useState('');
  const handleChangeTextArea = useCallback((event: any) => {
    setInputStoryName(event.target.value);
  }, []);
  if (!props.isOpen) {
    return null;
  }

  return (
    <div>
      <div
        className="flex justify-center items-center overflow-auto fixed inset-0 m-auto bg-black1 bg-opacity-20 backdrop-blur-md z-20"
        onClick={props.onClose}
      >
        {/* Todo: Add new custom margin and width value to tailwind.config.js not use [] */}
        <div
          className="bg-white h-80 w-[32rem] rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mt-10 ml-12 text-xl">ストーリーの新規作成</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              makeStory({ variables: { name: inputStoryName } });
              props.onClose();
            }}
          >
            {/* Todo: Arrange textarea input values font-size, padding, ... */}
            <textarea
              className="block mx-auto my-7 border-[1px] border-black3 rounded-2xl w-4/5 h-40 resize-none"
              onChange={handleChangeTextArea}
              value={inputStoryName}
            ></textarea>
            <div className="text-right bg-black3 mt-5 w-full rounded-b-2xl py-5">
              <button
                className="mr-5 bg-black3 w-32 py-1 text-black2"
                onClick={props.onClose}
              >
                キャンセル
              </button>
              <input
                className="bg-blue1 w-40 mr-5 py-1 rounded-xl text-white"
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
