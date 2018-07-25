import React from 'react'
import gql from 'graphql-tag'
import { Input } from 'semantic-ui-react'
import { PUBLIC_TASKS_QUERY, PRIVATE_TASKS_QUERY } from '../TasksList'
import { Mutation } from 'react-apollo'

const ADD_PRIVATE_TASK_MUTATION = gql`
  mutation addPrivateTask($title: String!) {
    addPrivateTask(title: $title) {
      id
      title
    }
  }
`

const ADD_PUBLIC_TASK_MUTATION = gql`
  mutation addPublicTask($title: String!) {
    addPublicTask(title: $title) {
      id
      title
    }
  }
`

const AddTask = ({ isPrivateTasks }) => {
  const mutation = isPrivateTasks
    ? ADD_PRIVATE_TASK_MUTATION
    : ADD_PUBLIC_TASK_MUTATION

  const query = isPrivateTasks ? PRIVATE_TASKS_QUERY : PUBLIC_TASKS_QUERY

  return (
    <Mutation mutation={mutation} refetchQueries={[{ query }]}>
      {(addTask, { error }) => {
        return (
          <Input
            icon="add"
            iconPosition="left"
            placeholder="Add task..."
            onKeyUp={evt => {
              if (evt.keyCode === 13) {
                evt.persist()
                addTask({
                  variables: { title: evt.target.value }
                }).then(() => {
                  evt.target.value = ''
                })
              }
            }}
          />
        )
      }}
    </Mutation>
  )
}

export default AddTask
