import React from 'react'
// import { gql, graphql } from 'react-apollo'
import AddTask from '../../components/AddTask'
import TasksList from '../../components/TasksList'

const PublicTasksContainer = ({ mutate }) => {
  return (
    <div>
      <AddTask />
      <TasksList />
    </div>
  )
}

export default PublicTasksContainer
