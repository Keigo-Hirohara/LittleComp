import { PlusCircle } from 'react-feather';
import { createStoryModalState } from '../../context/storyState';

const CreateNewStoryButton = (): JSX.Element => {
  return (
    <div className="relative">
      {/* Todo: Re-exam which method should use Icons size prop or tailwind calssName styling... */}
      <PlusCircle
        strokeWidth={1}
        className="fixed bottom-13 right-13 w-64 h-64 text-blue1 bg-blue3 rounded-full shadow-xl opacity-80"
        onClick={() => {
          createStoryModalState({ isOpen: true });
        }}
      />
    </div>
  );
};

export default CreateNewStoryButton;
