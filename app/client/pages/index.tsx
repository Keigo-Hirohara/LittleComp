import type { NextPage } from 'next';
import TaskBlockBar from '../components/TaskBlockBar';
import StoryList from '../components/story/StoryList';
import CreateNewStoryButton from '../components/button/CreateNewStoryButton';

const Home: NextPage = () => {
  return (
    <>
      <TaskBlockBar />
      <StoryList />
      <CreateNewStoryButton />
    </>
  );
};

export default Home;
