import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Button } from 'semantic-ui-react'
import { PUBLIC_TASKS_QUERY, PRIVATE_TASKS_QUERY } from '../TasksList'

const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      message
    }
  }
`

const DeleteTask = ({ isPrivateTasks, id }) => {
  const query = isPrivateTasks ? PRIVATE_TASKS_QUERY : PUBLIC_TASKS_QUERY
  return (
    <Mutation mutation={DELETE_TASK_MUTATION} refetchQueries={[{ query }]}>
      {(deleteTask, { error }) => (
        <Button
          onClick={e => {
            e.persist()
            deleteTask({ variables: { id } })
          }}
        >
          Remove
        </Button>
      )}
    </Mutation>
  )
}

export default DeleteTask
