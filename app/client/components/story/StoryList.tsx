import React from 'react';
import StoryItem from './StoryItem';
import { useQuery } from '@apollo/client';
import { GET_STORIES } from '../../query';

// Todo: Move to graphql folder later
// const GET_STORIES = gql`
//   query Query {
//     getStories {
//       id
//       name
//     }
//   }
// `;

const StoryList = () => {
  const { loading, error, data } = useQuery(GET_STORIES);
  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>Something went wrong...</h1>;
  }
  return (
    <div className="z-0">
      {data.getStories.map((story: any, index: number) => (
        <StoryItem storyName={story.name} id={story.id} key={index} />
      ))}
    </div>
  );
};

export default StoryList;
