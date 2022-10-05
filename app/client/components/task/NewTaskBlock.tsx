import React from 'react';
import TaskItem from './TaskItem';
import { GET_TASKS } from '../../query/task/getTasks';
import { useQuery } from '@apollo/client';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { TaskBlockArgsType } from '../../types/TaskBlockArgsType';
import { TaskType } from '../../types/TaskType';

// Todo: Integrate into one component new, inprogress, done

const NewTaskBlock = ({ storyId }: TaskBlockArgsType): JSX.Element => {
  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: {
      storyId: storyId,
      status: 'new',
    },
  });

  if (loading) {
    return <div className="">読み込み中</div>;
  }

  if (error) {
    return <div className="">エラー発生</div>;
  }
  return (
    <Droppable droppableId="new">
      {(provided) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-wrap w-80 pt-10 pl-10"
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
                          status="new"
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

export default NewTaskBlock;
