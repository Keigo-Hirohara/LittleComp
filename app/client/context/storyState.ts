import { makeVar } from '@apollo/client';

export const initStateOfStoryModal = {
  isOpen: false,
  name: '',
  storyId: '',
};

export const createStoryModalState = makeVar({
  isOpen: false,
});

export const editStoryModalState = makeVar(initStateOfStoryModal);

export const deleteStoryAlertState = makeVar(initStateOfStoryModal);
