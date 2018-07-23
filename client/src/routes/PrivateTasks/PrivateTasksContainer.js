import React from 'react'
import AddTask from './components/AddTask'
import TasksList from './components/TasksList'

const PublicTasksContainer = () => {
  return (
    <div>
      <TasksList />
      <AddTask />
    </div>
  )
}

export default PublicTasksContainer
