import React from 'react'
import AddTask from './components/AddTask'
import TasksList from './components/TasksList'

// Note: this combines both the private and public tasks
// The disadvantage of this approach is a refetch happens
// every time the route switches from public to private
// which shows the loading indicator
const TasksContainer = ({ match: { path } }) => {
  const isPrivateTasks = path.includes('private')
  return (
    <div>
      <TasksList isPrivateTasks={isPrivateTasks} />
      <AddTask isPrivateTasks={isPrivateTasks} />
    </div>
  )
}

export default TasksContainer
