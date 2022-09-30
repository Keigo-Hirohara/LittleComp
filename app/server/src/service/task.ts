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

export const createTask = async (_: null, args: any) => {
  const id = new Date().getTime().toString();
  const newTask = await prisma.task.create({
    data: {
      id,
      name: args.taskName,
      status: 'new',
      story_id: args.storyId,
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

export const renameTask = async (_: null, args: any) => {
  const renamedTask = await prisma.task.update({
    where: {
      id: args.targetId,
    },
    data: {
      name: args.newName,
    },
  });

  return {
    code: 201,
    success: true,
    message: 'The task was successfully renamed!',
    story: renamedTask,
  };
};

export const updateTaskStatus = async (_: null, args: any) => {
  const movedTask = await prisma.task.update({
    where: {
      id: args.targetId,
    },
    data: {
      status: args.newStatus,
    },
  });
  return {
    code: 201,
    success: true,
    message: 'The task was successfully renamed!',
    story: movedTask,
  };
};

export const deleteTask = async (_: null, args: any) => {
  await prisma.task.delete({
    where: {
      id: args.targetId,
    },
  });
  return {
    code: 204,
    success: true,
    message: 'The task was successfully deleted!',
  };
};
