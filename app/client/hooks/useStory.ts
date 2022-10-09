import { useMutation, useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { atom } from 'recoil';
import CREATE_STORY from '../query/story/createStory';
import DELETE_STORY from '../query/story/deleteStory';
import EDIT_STORY from '../query/story/editStory';
import { GET_STORIES } from '../query/story/getStories';

export const useStory = () => {
  const getStories = useQuery(GET_STORIES);
  const [createStoryMutate] = useMutation(CREATE_STORY);
  const [renameStoryMutate] = useMutation(EDIT_STORY);
  const [deleteStoryMutate] = useMutation(DELETE_STORY);

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
