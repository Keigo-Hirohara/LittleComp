import { CreatetaskArgsType } from '../types/CreateTaskArgsType';
import { DeleteStoryArgsType } from '../types/DeleteStoryArgsType';
import { RenameStoryArgsType } from '../types/RenameStoryArgsType';
import { updateTaskStatusArgsType } from '../types/UpdateTaskStatusArgsType';
import { prisma } from './prismaClient';

export const getTasks = async (_: null, args: any) => {
  return await prisma.task.findMany({
    where: {
      story_id: args.storyId,
      status: args.status,
    },
  });
};

// Todo: add error handling and use these functions directly

export const createTask = async (
  _: null,
  { taskName, storyId }: CreatetaskArgsType
) => {
  const id = new Date().getTime().toString();
  const newTask = await prisma.task.create({
    data: {
      id,
      name: taskName,
      status: 'new',
      story_id: storyId,
    },
  });
  console.log(newTask);
  return {
    code: 201,
    success: true,
    message: 'New task was successfully created!',
    task: newTask,
  };
};

export const renameTask = async (
  _: null,
  { targetId, newName }: RenameStoryArgsType
) => {
  const renamedTask = await prisma.task.update({
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
    message: 'The task was successfully renamed!',
    story: renamedTask,
  };
};

export const updateTaskStatus = async (
  _: null,
  { targetId, newStatus }: updateTaskStatusArgsType
) => {
  try {
    const movedTask = await prisma.task.update({
      where: {
        id: targetId,
      },
      data: {
        status: newStatus,
      },
    });
    return {
      code: 201,
      success: true,
      message: 'The task was successfully renamed!',
      story: movedTask,
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (
  _: null,
  { targetId }: DeleteStoryArgsType
) => {
  await prisma.task.delete({
    where: {
      id: targetId,
    },
  });
  return {
    code: 204,
    success: true,
    message: 'The task was successfully deleted!',
  };
};
