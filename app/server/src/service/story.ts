import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStories = async () => {
  return await prisma.story.findMany();
};

export const createStory = async (name: string) => {
  const id = new Date().getTime().toString();
  const newStory = await prisma.story.create({
    data: {
      id,
      name,
    },
  });
  return newStory;
};

export const changeStoryName = async (id: string, newName: string) => {
  const updatedStory = await prisma.story.update({
    where: {
      id,
    },
    data: {
      name: newName,
    },
  });
  return updatedStory;
};

export const deleteStory = async (id: string) => {
  const deleteStory = await prisma.story.delete({
    where: {
      id,
    },
  });
  return deleteStory;
};
