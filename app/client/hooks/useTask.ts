import { useMutation, useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { CREATE_TASK } from '../query/task/createTask';
import { DELETE_TASK } from '../query/task/deleteTask';
import { GET_TASKS } from '../query/task/getTasks';
import { RENAME_TASK } from '../query/task/renameTask';
import { UPDATE_TASK_STATUS } from '../query/task/updateTaskStatus';

export const useTask = (storyId: string, status?: string) => {
  const [createTaskMutation] = useMutation(CREATE_TASK);
  const [renameTaskMutation] = useMutation(RENAME_TASK);
  const [updateTaskStatusMutation] = useMutation(UPDATE_TASK_STATUS);
  const [deleteTaskMutation] = useMutation(DELETE_TASK);
  const getTasks = useQuery(GET_TASKS, {
    variables: {
      storyId,
      status,
    },
  });

  const createTask = useCallback(async (taskName: string, storyId: string) => {
    return await createTaskMutation({
      variables: {
        taskName,
        storyId,
      },
      onCompleted: () => {
        getTasks.refetch();
      },
    });
  }, []);

  const renameTask = useCallback(async (targetId: string, newName: string) => {
    return await renameTaskMutation({
      variables: {
        targetId,
        newName,
      },
      onCompleted: () => {
        getTasks.refetch();
      },
    });
  }, []);

  const updateTaskStatus = useCallback(
    async (targetId: string, newStatus: string) => {
      return await updateTaskStatusMutation({
        variables: {
          targetId,
          newStatus,
        },
        refetchQueries: [
          { query: GET_TASKS, variables: { storyId: storyId, status: 'new' } },
          {
            query: GET_TASKS,
            variables: { storyId: storyId, status: 'inprogress' },
          },
          { query: GET_TASKS, variables: { storyId: storyId, status: 'done' } },
        ],
      });
    },
    []
  );
  const deleteTask = useCallback(async (targetId: string) => {
    return await deleteTaskMutation({
      variables: {
        targetId,
      },
      onCompleted: () => {
        getTasks.refetch();
      },
    });
  }, []);

  return {
    getTasks,
    createTask,
    renameTask,
    updateTaskStatus,
    deleteTask,
  };
};
