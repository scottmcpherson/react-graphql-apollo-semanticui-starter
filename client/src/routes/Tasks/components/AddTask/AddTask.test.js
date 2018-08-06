import React from 'react'
import { ApolloProvider } from 'react-apollo'
import AddTask, {
  CREATE_PRIVATE_TASK_MUTATION,
  CREATE_PUBLIC_TASK_MUTATION
} from './'
import { MockedProvider } from 'react-apollo/test-utils'
import TestRenderer from 'react-test-renderer'

it('calls the mutate method on Apollo Client', () => {
  TestRenderer.create(
    <MockedProvider mocks={[]}>
      <AddTask />
    </MockedProvider>
  )
})
