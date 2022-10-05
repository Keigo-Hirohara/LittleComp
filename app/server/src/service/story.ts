import { CreateStoryArgsType } from '../types/CreateStoryArgsType';
import { RenameStoryArgsType } from '../types/RenameStoryArgsType';
import { DeleteStoryArgsType } from '../types/DeleteStoryArgsType';
import { prisma } from './prismaClient';

export const getStories = async () => {
  return await prisma.story.findMany();
};
// Todo: add error handling and use these functions directly
export const createStory = async (_: null, { name }: CreateStoryArgsType) => {
  try {
    const id = new Date().getTime().toString();
    const newStory = await prisma.story.create({
      data: {
        id,
        name,
      },
    });
    return {
      code: 201,
      success: true,
      message: 'New story was successfully created!',
      newStory,
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      success: false,
      message: error,
    };
  }
};

// export const changeStoryName = async (id: string, newName: string) => {

//   return updatedStory;
// };

export const renameStory = async (
  _: null,
  { targetId, newName }: RenameStoryArgsType
) => {
  try {
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
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      success: false,
      message: error,
    };
  }
};

export const deleteStory = async (
  _: null,
  { targetId }: DeleteStoryArgsType
) => {
  try {
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
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      success: false,
      message: 'Something went wrong on deleting story...',
    };
  }
};
