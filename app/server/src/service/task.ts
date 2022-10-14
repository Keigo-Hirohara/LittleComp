import { AuthenticationError } from 'apollo-server';
import { prisma } from './prismaClient';
import { VerifiedObject } from '../types/Context';
import { CreateTask } from '../types/CreateTask';
import { DeleteStory } from '../types/DeleteStory';
import { RenameStory } from '../types/RenameStory';
import { UpdateTaskStatus } from '../types/UpdateTaskStatus';

export const getTasks = async (_: null, args: any) => {
  return await prisma.task.findMany({
    where: {
      story_id: args.storyId,
      status: args.status,
    },
  });
};

export const createTask = async (
  _: null,
  { taskName, storyId }: CreateTask,
  { verified }: { verified: VerifiedObject }
) => {
  if (!verified) {
    throw new AuthenticationError('ログインし直してください');
  }
  const id = new Date().getTime().toString();
  const newTask = await prisma.task.create({
    data: {
      id,
      name: taskName,
      status: 'new',
      story_id: storyId,
    },
  });
  return {
    code: 201,
    success: true,
    message: 'New task was successfully created!',
    task: newTask,
  };
};

export const renameTask = async (
  _: null,
  { targetId, newName }: RenameStory,
  { verified }: { verified: VerifiedObject }
) => {
  if (!verified) {
    throw new AuthenticationError('ログインし直してください');
  }
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
  { targetId, newStatus }: UpdateTaskStatus,
  { verified }: { verified: VerifiedObject }
) => {
  if (!verified) {
    throw new AuthenticationError('ログインし直してください');
  }
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
};

export const deleteTask = async (
  _: null,
  { targetId }: DeleteStory,
  { verified }: { verified: VerifiedObject }
) => {
  if (!verified) {
    throw new AuthenticationError('ログインし直してください');
  }
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
