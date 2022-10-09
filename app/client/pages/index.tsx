import type { NextPage } from 'next';
import TaskBlockBar from '../components/TaskBlockBar';
import StoryList from '../components/story/StoryList';
import CreateNewStoryButton from '../components/button/CreateNewStoryButton';
import CreateStoryModal from '../components/modal/CreateStoryModal';
import DeleteStoryAlert from '../components/modal/DeleteStoryAlert';
import EditStoryModal from '../components/modal/EditStoryModal';
import CreateTaskModal from '../components/modal/CreateTaskModal';
import EditTaskModal from '../components/modal/EditTaskModal';

const Home: NextPage = () => {
  return (
    <>
      <TaskBlockBar />
      <StoryList />
      <CreateNewStoryButton />
      {/* Todo: use destructuring assignment to each components */}
      <CreateStoryModal />
      <EditStoryModal />
      <DeleteStoryAlert />
      <CreateTaskModal />
      <EditTaskModal />
    </>
  );
};

export default Home;
