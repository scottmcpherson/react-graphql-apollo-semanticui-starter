import React from 'react'
import gql from 'graphql-tag'
import { Input } from 'semantic-ui-react'
import { PUBLIC_TASKS_QUERY, PRIVATE_TASKS_QUERY } from '../TasksList'
import { Mutation } from 'react-apollo'

// Nesting using inputs to avoid overly verbose APIs
// This article provides a good explanation:
// https://blog.apollographql.com/designing-graphql-mutations-e09de826ed97
export const CREATE_PRIVATE_TASK_MUTATION = gql`
  mutation createPrivateTask($input: CreatePrivateTaskInput!) {
    createPrivateTask(input: $input) {
      id
      title
    }
  }
`

export const CREATE_PUBLIC_TASK_MUTATION = gql`
  mutation createPublicTask($input: CreatePublicTaskInput!) {
    createPublicTask(input: $input) {
      id
      title
    }
  }
`

const AddTask = ({ isPrivateTasks }) => {
  const mutation = isPrivateTasks
    ? CREATE_PRIVATE_TASK_MUTATION
    : CREATE_PUBLIC_TASK_MUTATION

  const query = isPrivateTasks ? PRIVATE_TASKS_QUERY : PUBLIC_TASKS_QUERY

  return (
    <Mutation mutation={mutation} refetchQueries={[{ query }]}>
      {(addTask, { error }) => {
        return (
          <Input
            icon="add"
            iconPosition="left"
            placeholder="Add task..."
            onKeyUp={e => {
              if (e.keyCode === 13) {
                e.persist()
                const input = { title: e.target.value }
                console.log('input:: ', input)
                addTask({
                  variables: { input }
                }).then(() => {
                  e.target.value = ''
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
