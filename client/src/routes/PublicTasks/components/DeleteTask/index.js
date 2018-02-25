import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Button } from 'semantic-ui-react'
import { PUBLIC_TASKS_QUERY } from '../TasksList'

const DeleteTask = ({ mutate, task: { id } }) => {
  const handleClick = evt => {
    evt.persist()
    mutate({
      variables: { id },
      refetchQueries: [{ query: PUBLIC_TASKS_QUERY }]
    })
  }

  return <Button onClick={handleClick}>Remove</Button>
}

const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      status
    }
  }
`

export default graphql(DELETE_TASK_MUTATION)(DeleteTask)
