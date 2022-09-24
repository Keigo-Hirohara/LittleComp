import React from 'react';
import StoryItem from './StoryItem';
import { fakeDatabase } from '../../services/fakeDB';

const StoryList = () => {
  return (
    <div className="z-0">
      {fakeDatabase.map((story) => (
        <StoryItem storyName={story.name} />
      ))}
    </div>
  );
};

export default StoryList;
