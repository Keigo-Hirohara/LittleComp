import React from 'react';
import DoneTaskblock from '../task/DoneTaskBlock';
import InProgressTaskBlock from '../task/InProgressTaskBlock';
import NewTaskBlock from '../task/NewTaskBlock';
import { PlusSquare, Edit3, Trash2 } from 'react-feather';

const StoryItem = () => {
  return (
    <div className="h-56 pt-3 pb-3 border-t border-b border-black3">
      <div className="flex flex-col justify-center pl-3 ml-6 h-full w-48">
        <h1 className="text-2xl">PT開発</h1>
        <div className="flex mt-3">
          <PlusSquare className="h-7 w-7 mr-3 mb-3" />
          <Edit3 className="h-7 w-7 mr-3 mb-3" />
          <Trash2 className="h-7 w-7 mr-3 mb-3" />
        </div>
      </div>
      <NewTaskBlock />
      <InProgressTaskBlock />
      <DoneTaskblock />
    </div>
  );
};

export default StoryItem;
