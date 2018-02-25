import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Input } from 'semantic-ui-react'
import { PUBLIC_TASKS_QUERY } from '../TasksList'

const AddTask = ({ mutate }) => {
  const handleKeyUp = evt => {
    if (evt.keyCode === 13) {
      evt.persist()
      mutate({
        variables: { title: evt.target.value },
        refetchQueries: [{ query: PUBLIC_TASKS_QUERY }]
      }).then(res => {
        evt.target.value = ''
      })
    }
  }

  return (
    <Input
      icon="add"
      iconPosition="left"
      placeholder="Add task..."
      onKeyUp={handleKeyUp}
    />
  )
}

const ADD_PUBLIC_TASK_MUTATION = gql`
  mutation addPublicTask($title: String!) {
    addPublicTask(title: $title) {
      id
      title
    }
  }
`

export default graphql(ADD_PUBLIC_TASK_MUTATION)(AddTask)
