import { TaskBlockBarItem } from '../types/TaskBlockBarItem';

// Todo: Clearly define argument types
const TaskBlockBarItem = ({
  className,
  text,
  color,
}: TaskBlockBarItem): JSX.Element => {
  return (
    <div className={`flex items-center w-3/12 h-45 rounded-2xl ${className}`}>
      <h2 className={`text-xl ml-19 ${color}`}>{text}</h2>
    </div>
  );
};

export default TaskBlockBarItem;
