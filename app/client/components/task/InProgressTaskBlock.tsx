import React from 'react';
import TaskItem from './TaskItem';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../../query/task/getTasks';

const InProgressTaskBlock = (props: any) => {
  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: {
      storyId: props.storyId,
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
    <div className="flex flex-wrap w-80 pt-3 pl-3">
      {data.getTasks.map((task: any, index: any) => (
        <TaskItem key={index} />
      ))}
    </div>
  );
};

export default InProgressTaskBlock;
