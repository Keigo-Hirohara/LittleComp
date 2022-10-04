import React from 'react';
import TaskItem from './TaskItem';
import { useQuery } from '@apollo/client';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { GET_TASKS } from '../../query/task/getTasks';
import { TaskBlockArgsType } from '../../types/TaskBlockArgsType';
import { TaskType } from '../../types/TaskType';

const InProgressTaskBlock = ({ storyId }: TaskBlockArgsType) => {
  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: {
      storyId: storyId,
      status: 'inprogress',
    },
  });

  if (loading) {
    return <div className="">読み込み中</div>;
  }

  if (error) {
    return <div className="">エラー</div>;
  }
  return (
    <Droppable droppableId="inprogress">
      {(provided) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-wrap w-80 pt-3 pl-3"
          >
            {data.getTasks.map((task: TaskType, index: number) => {
              return (
                <Draggable key={index} draggableId={task.id} index={index}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem
                          name={task.name}
                          storyId={storyId}
                          status="inprogress"
                          id={task.id}
                        />
                      </div>
                    );
                  }}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default InProgressTaskBlock;
