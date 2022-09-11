import type { NextPage } from 'next';
import TaskBlockBar from '../components/TaskBlockBar';
import StoryList from '../components/story/StoryList';
import { useState } from 'react';

const Home: NextPage = () => {
  const [isModalOpen, setIsModalModal] = useState<boolean>(false);
  return (
    <>
      <TaskBlockBar />
      <StoryList />
    </>
  );
};

export default Home;
