import { makeVar } from '@apollo/client';

export const initStateOfEditStory = {
  isOpen: false,
  name: '',
  storyId: '',
};

export const createStoryModalState = makeVar({
  isOpen: false,
});

export const editStoryModalState = makeVar(initStateOfEditStory);
