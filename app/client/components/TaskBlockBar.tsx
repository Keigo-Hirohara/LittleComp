import TaskBlockBarItem from './TaskBlockBarItam';

const TaskBlockBar = (): JSX.Element => {
  return (
    <div className="flex justify-between w-4/5 mr-10 ml-auto mt-3 mb-3">
      <TaskBlockBarItem className="bg-green3" text="New" color="text-green1" />
      <TaskBlockBarItem
        className="bg-blue3"
        text="In Progress"
        color="text-blue1"
      />
      <TaskBlockBarItem className="bg-red3" text="Done" color="text-red1" />
    </div>
  );
};

export default TaskBlockBar;
