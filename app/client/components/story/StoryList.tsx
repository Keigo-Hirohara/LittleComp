import StoryItem from './StoryItem';
import React, { useEffect } from 'react';
import { Story } from '../../types/Story';
import { useStory } from '../../hooks/useStory';

const StoryList = (): JSX.Element => {
  const { getStories } = useStory();
  useEffect(() => {
    getStories.refetch();
  }, [getStories]);

  if (getStories.loading) {
    return <div className="animate-spin h-8 w-8 bg-green3 rounded-xl"></div>;
  }
  if (getStories.error) {
    return <h1>Something went wrong... </h1>;
  }
  return (
    <div className="z-0 border-b-2 border-black3">
      {getStories.data.getStories.map(({ name, id }: Story, index: number) => (
        <StoryItem name={name} id={id} key={index} />
      ))}
    </div>
  );
};

export default StoryList;
