import React from 'react'
import { List } from 'semantic-ui-react'
import gql from 'graphql-tag'
import DeleteTask from '../DeleteTask'
import { Query } from 'react-apollo'
import Loader from '../../../../components/Loader'

export const PUBLIC_TASKS_QUERY = gql`
  query PublicTasksQuery {
    publicTasks {
      id
      title
    }
  }
`

export const PRIVATE_TASKS_QUERY = gql`
  query PrivateTasksQuery {
    privateTasks {
      id
      title
    }
  }
`

const TasksList = ({ isPrivateTasks }) => {
  const query = isPrivateTasks ? PRIVATE_TASKS_QUERY : PUBLIC_TASKS_QUERY
  return (
    <Query query={query} fetchPolicy="cache-and-network">
      {({ data, loading }) => {
        const tasks = isPrivateTasks
          ? data && data.privateTasks
          : data && data.publicTasks
        const isTasks = !!(Array.isArray(tasks) && tasks.length)

        if (loading) return <Loader />
        if (!isTasks) return null

        return (
          <List divided verticalAlign="middle">
            {tasks.map(task => (
              <List.Item key={task.id}>
                <List.Content floated="right">
                  <DeleteTask id={task.id} isPrivateTasks={isPrivateTasks} />
                </List.Content>
                <List.Content>{task.title}</List.Content>
              </List.Item>
            ))}
          </List>
        )
      }}
    </Query>
  )
}

export default TasksList
