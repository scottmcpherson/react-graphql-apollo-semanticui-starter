import React from 'react'
import { List } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import DeleteTask from '../DeleteTask'
const TasksList = ({ data: { loading, error, publicTasks } }) => {
  if (loading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <List divided verticalAlign="middle">
      {publicTasks.map(task => (
        <List.Item key={task.id}>
          <List.Content floated="right">
            <DeleteTask task={task} />
          </List.Content>
          <List.Content>{task.title}</List.Content>
        </List.Item>
      ))}
    </List>
  )
}

export const PUBLIC_TASKS_QUERY = gql`
  query PublicTasksQuery {
    publicTasks {
      id
      title
    }
  }
`

export default graphql(PUBLIC_TASKS_QUERY, {
  options: { pollInterval: 5000 }
})(TasksList)
