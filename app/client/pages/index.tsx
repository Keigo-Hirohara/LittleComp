import type { NextPage } from 'next';
import TaskBlockBar from '../components/TaskBlockBar';
import StoryList from '../components/story/StoryList';
import CreateNewStoryButton from '../components/button/CreateNewStoryButton';
import CreateStoryModal from '../components/modal/CreateStoryModal';
import DeleteStoryAlert from '../components/modal/DeleteStoryAlert';
import EditStoryModal from '../components/modal/EditStoryModal';
import CreateTaskModal from '../components/modal/CreateTaskModal';
import EditTaskModal from '../components/modal/EditTaskModal';
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { getUser } = useUser();
  const router = useRouter();
  if ((getUser.data && !getUser.data?.getUser) || getUser.error) {
    router.push('/signin');
    return null;
  }

  if (getUser.loading) {
    return null;
  }

  // Todo: add validataUser if respond with error, move to login page
  return (
    <>
      <TaskBlockBar />
      <StoryList />
      <CreateNewStoryButton />
      <CreateStoryModal />
      <EditStoryModal />
      <DeleteStoryAlert />
      <CreateTaskModal />
      <EditTaskModal />
    </>
  );
};

export default Home;
