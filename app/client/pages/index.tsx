import type { NextPage } from 'next'
import TaskBlockBar from '../components/TaskBlockBar'
import StoryList from '../components/story/StoryList'

const Home: NextPage = () => {
  return (
    <>
     <TaskBlockBar/>
     <StoryList/>
    </>
  )
}

export default Home
