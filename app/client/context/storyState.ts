import { makeVar } from '@apollo/client';
import { StoryModalState } from '../types/StoryModalState';

export const initStateOfStoryModal: StoryModalState = {
  isOpen: false,
  name: '',
  storyId: '',
};

export const createStoryModalState = makeVar({
  isOpen: false,
});

export const editStoryModalState = makeVar(initStateOfStoryModal);

export const deleteStoryAlertState = makeVar(initStateOfStoryModal);
