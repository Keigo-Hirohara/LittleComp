import React from 'react';
import StoryItem from './StoryItem';
import { StoryType } from '../../types/StoryType';
import { useStory } from '../../hooks/useStory';
import { useRouter } from 'next/router';

const StoryList = (): JSX.Element => {
  const { getStories } = useStory();
  const router = useRouter();
  if (getStories.loading) {
    return <h1>loading</h1>;
  }
  if (getStories.error) {
    router.push('/signin');
    return <h1>Something went wrong... </h1>;
  }
  if (getStories.data.code == 401) {
    router.push('/signin');
  }
  return (
    <div className="z-0 border-b-2 border-black3">
      {getStories.data.getStories.map(
        ({ name, id }: StoryType, index: number) => (
          <StoryItem name={name} id={id} key={index} />
        )
      )}
    </div>
  );
};

export default StoryList;
