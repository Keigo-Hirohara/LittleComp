import React from 'react';
import StoryItem from './StoryItem';
import { useQuery } from '@apollo/client';
import { GET_STORIES } from '../../query/story/getStories';
import { StoryType } from '../../types/StoryType';

const StoryList = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_STORIES);
  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>Something went wrong...</h1>;
  }
  return (
    <div className="z-0">
      {data.getStories.map(({ name, id }: StoryType, index: number) => (
        <StoryItem name={name} id={id} key={index} />
      ))}
    </div>
  );
};

export default StoryList;
