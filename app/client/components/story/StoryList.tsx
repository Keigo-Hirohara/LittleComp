import StoryItem from './StoryItem';
import React, { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { Story } from '../../types/Story';
import { useStory } from '../../hooks/useStory';

const StoryList = (): JSX.Element => {
  const { getStories } = useStory();
  const router: NextRouter = useRouter();
  useEffect(() => {
    getStories.refetch();
  }, [getStories]);

  if (getStories.loading) {
    return <h1>loading</h1>;
  }
  if (getStories.error) {
    if (getStories.error.message == 'ログインし直してください') {
      router.push('/signin');
    }
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
