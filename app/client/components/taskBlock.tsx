import React from 'react';

// Todo: Clearly define argument types 
const TaskBlock = ({className, text, color}: any) => {
  return (
    <div className={`w-80 h-14 rounded-2xl ${className}`}>
      <h2 className={`inline-block align-middle text-xl ml-6 ${color}`}>{text}</h2>
    </div>
  );
};

export default TaskBlock;