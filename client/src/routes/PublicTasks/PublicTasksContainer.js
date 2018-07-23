import React from 'react'
import AddTask from './components/AddTask'
import TasksList from './components/TasksList'

const PublicTasksContainer = () => {
  return (
    <div>
      <AddTask />
      <TasksList />
    </div>
  )
}

export default PublicTasksContainer
