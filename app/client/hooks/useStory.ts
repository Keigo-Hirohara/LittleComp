import { useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import CREATE_STORY from '../query/story/createStory';
import DELETE_STORY from '../query/story/deleteStory';
import EDIT_STORY from '../query/story/editStory';
import { GET_STORIES } from '../query/story/getStories';
import { Story } from '../types/Story';

export const useStory = () => {
  // Todo: specify more detailed type instead of any
  const getStories = useQuery<any, null>(GET_STORIES);
  const [createStoryMutate] = useMutation<any, { name: string }>(CREATE_STORY);
  const [renameStoryMutate] = useMutation<
    any,
    { targetId: string; newName: string }
  >(EDIT_STORY);
  const [deleteStoryMutate] = useMutation<any, { targetId: string }>(
    DELETE_STORY
  );

  const createStory = useCallback(async (storyName: string) => {
    return await createStoryMutate({
      variables: { name: storyName },
      onCompleted: () => {
        getStories.refetch();
      },
    });
  }, []);

  const renameStory = useCallback(async (targetId: string, newName: string) => {
    return await renameStoryMutate({
      variables: { targetId, newName },
      onCompleted: () => {
        getStories.refetch();
      },
    });
  }, []);

  const deleteStory = useCallback(async (targetId: string) => {
    return await deleteStoryMutate({
      variables: { targetId },
      onCompleted: () => {
        getStories.refetch();
      },
    });
  }, []);

  return {
    getStories,
    createStory,
    renameStory,
    deleteStory,
  };
};
