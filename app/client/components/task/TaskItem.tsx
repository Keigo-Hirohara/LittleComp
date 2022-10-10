import { Edit2 } from 'react-feather';
import { editTaskModalState } from '../../context/taskState';
import { TaskType } from '../../types/TaskType';

const TaskItem = (props: TaskType): JSX.Element => {
  return (
    <div className="relative w-80 h-80 bg-green1 rounded-3xl ml-10 mb-10">
      <p className="flex items-center h-64 text-white text-xs mx-5 w-4/5 break-words text-ellipsis">
        {props.name}
      </p>
      <Edit2
        onClick={() =>
          editTaskModalState({
            isOpen: true,
            storyId: props.storyId,
            name: props.name,
            status: props.status,
            id: props.id,
          })
        }
        className=" w-13 h-13 absolute bottom-5 right-5 text-white"
      />
    </div>
  );
};

export default TaskItem;
