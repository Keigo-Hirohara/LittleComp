import { CreateStoryArgsType } from '../types/CreateStoryArgsType';
import { RenameStoryArgsType } from '../types/RenameStoryArgsType';
import { DeleteStoryArgsType } from '../types/DeleteStoryArgsType';
import { prisma } from './prismaClient';
import { AuthenticationError } from 'apollo-server';

export const getStories = async (_: null, __: null, { verified }: any) => {
  if (!verified) {
    throw new AuthenticationError('ログインし直してください');
  }
  return await prisma.story.findMany({
    where: {
      user_id: verified.id,
    },
  });
};
// Todo: add error handling and use these functions directly
export const createStory = async (
  _: null,
  { name }: CreateStoryArgsType,
  { verified }: any
) => {
  if (!verified) {
    throw new AuthenticationError('ログインし直してください');
  }
  const id = new Date().getTime().toString();
  const newStory = await prisma.story.create({
    data: {
      id,
      name,
      user_id: verified.id,
    },
  });
  return {
    code: 201,
    success: true,
    message: 'New story was successfully created!',
    newStory,
  };
};

export const renameStory = async (
  _: null,
  { targetId, newName }: RenameStoryArgsType,
  { verified }: any
) => {
  if (!verified) {
    throw new AuthenticationError('ログインし直してください');
  }
  const renamedStory = await prisma.story.update({
    where: {
      id: targetId,
    },
    data: {
      name: newName,
    },
  });
  return {
    code: 201,
    success: true,
    message: 'The Story was successfully renamed!',
    story: renamedStory,
  };
};

export const deleteStory = async (
  _: null,
  { targetId }: DeleteStoryArgsType,
  { verified }: any
) => {
  if (!verified) {
    throw new AuthenticationError('ログインし直してください');
  }
  await prisma.story.delete({
    where: {
      id: targetId,
    },
  });
  return {
    code: 204,
    success: true,
    message: 'The story was successfully deleted!',
  };
};
