import React from 'react';
import TaskItem from './TaskItem';
import { useQuery } from '@apollo/client';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { GET_TASKS } from '../../query/task/getTasks';

const DoneTaskBlock = (props: any) => {
  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: {
      storyId: props.storyId,
      status: 'done',
    },
  });

  if (loading) {
    return <div className="">読み込み中</div>;
  }

  if (error) {
    return <div className="">エラー</div>;
  }
  return (
    <Droppable droppableId="done">
      {(provided) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-wrap w-80 pt-3 pl-3"
          >
            {data.getTasks.map((task: any, index: any) => {
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
                          taskName={task.name}
                          storyId={props.storyId}
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
