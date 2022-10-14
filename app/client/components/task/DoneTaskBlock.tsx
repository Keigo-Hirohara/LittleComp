import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import { Task } from '../../types/Task';
import { useTask } from '../../hooks/useTask';

const DoneTaskBlock = ({ storyId }: { storyId: string }): JSX.Element => {
  const { getTasks } = useTask(storyId, 'done');

  if (getTasks.loading) {
    return <div className="">loading</div>;
  }
  if (getTasks.error) {
    return <div className="">error</div>;
  }
  return (
    <Droppable droppableId="done">
      {(provided) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-wrap w-3/12 pt-10 pl-10"
          >
            {getTasks.data.getTasks.map((task: Task, index: number) => {
              return (
                <Draggable key={task.id} draggableId={task.id} index={index}>
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
                          status="done"
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

export default DoneTaskBlock;
