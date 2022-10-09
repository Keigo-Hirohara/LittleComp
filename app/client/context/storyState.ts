import { makeVar } from '@apollo/client';

export const createStoryModalState = makeVar({
  isOpen: false,
});
