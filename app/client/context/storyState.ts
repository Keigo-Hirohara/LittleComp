import { makeVar } from '@apollo/client';

export const initStateOfModal = {
  isOpen: false,
  name: '',
  storyId: '',
};

export const createStoryModalState = makeVar({
  isOpen: false,
});

export const editStoryModalState = makeVar(initStateOfModal);

export const deleteStoryAlertState = makeVar(initStateOfModal);
