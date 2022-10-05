import TaskBlockBarItem from './TaskBlockBarItam';

const TaskBlockBar = (): JSX.Element => {
  return (
    <div className="flex justify-between w-4/5 mr-32 ml-auto mt-10 mb-10">
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
