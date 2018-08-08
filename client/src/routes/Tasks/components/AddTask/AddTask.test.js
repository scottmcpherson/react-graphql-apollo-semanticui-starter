import React from 'react'
import AddTask, { CREATE_PUBLIC_TASK_MUTATION } from './'
import { MockedProvider } from 'react-apollo/test-utils'
import TestRenderer from 'react-test-renderer'
import { PUBLIC_TASKS_QUERY } from '../TasksList'
import wait from 'waait'

it('should create public task', async () => {
  const createPublicTask = { id: 1, title: 'Task one' }

  const mocks = [
    {
      request: {
        query: CREATE_PUBLIC_TASK_MUTATION,
        variables: { input: { title: createPublicTask.title } }
      },
      result: { data: { createPublicTask } }
    },
    {
      request: {
        query: PUBLIC_TASKS_QUERY
      },
      result: {
        data: { publicTasks: [createPublicTask] }
      }
    }
  ]

  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AddTask isPrivateTasks={false} />
    </MockedProvider>
  )

  const input = component.root.findByType('input')

  input.props.onKeyUp({
    keyCode: 13,
    persist: () => {},
    target: {
      value: createPublicTask.title
    }
  })

  await wait(0)
})
