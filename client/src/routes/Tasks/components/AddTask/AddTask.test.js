import React from 'react'
import AddTask, { CREATE_PUBLIC_TASK_MUTATION } from './'
import { MockedProvider } from 'react-apollo/test-utils'
import TestRenderer from 'react-test-renderer'
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
      value: 'Test title'
    }
  })

  await wait(0)

  const tree = component.toJSON()
  console.log('tree:: ', tree)

  expect(tree.children).toContain('Deleted!')
})
