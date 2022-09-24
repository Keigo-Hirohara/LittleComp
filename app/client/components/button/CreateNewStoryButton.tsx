import React, { useState } from 'react';
import { PlusCircle } from 'react-feather';
import CreateStoryModal from '../modal/CreateStoryModal';

const CreateNewStoryButton = () => {
  const [isCreateStoryModalOpen, setIsCreateStoryModalOpen] = useState(false);
  return (
    <div className="relative">
      {/* Todo: Re-exam which method should use Icons size prop or tailwind calssName styling... */}
      <PlusCircle
        strokeWidth={1}
        className="fixed bottom-4 right-4 w-20 h-20 text-blue1 bg-blue3 rounded-full shadow-xl opacity-80"
        onClick={() => setIsCreateStoryModalOpen(true)}
      />
      <CreateStoryModal
        isOpen={isCreateStoryModalOpen}
        onClose={() => setIsCreateStoryModalOpen(false)}
      />
    </div>
  );
};

export default CreateNewStoryButton;
