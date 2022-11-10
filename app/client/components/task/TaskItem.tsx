import { Edit2 } from 'react-feather';
import { Task } from '../../types/Task';
import { editTaskModalState } from '../../context/taskState';

const TaskItem = (props: Task): JSX.Element => {
  return (
    <div className="relative flex items-center w-80 h-80 bg-green1 rounded-3xl ml-10 mb-10">
      <p className=" text-white text-xs mx-5 break-words line-clamp-4">
        {props.name}
      </p>
      <Edit2
        onClick={() =>
          editTaskModalState({
            isOpen: true,
            storyId: props.storyId,
            name: props.name,
            status: props.status,
            taskId: props.id,
          })
        }
        className=" w-13 h-13 absolute bottom-5 right-5 text-white"
      />
    </div>
  );
};

export default TaskItem;
