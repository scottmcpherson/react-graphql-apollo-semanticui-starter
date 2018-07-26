import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import LogIn from './LogIn'

const LOGIN_MUTATION = gql`
  mutation LogIn($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
      }
      jwt
    }
  }
`

class LogInContainer extends Component {
  render() {
    const { onAuthenticateUser } = this.props
    return (
      <Mutation
        mutation={LOGIN_MUTATION}
        onCompleted={({ login }) => {
          onAuthenticateUser(login)
        }}
      >
        {(login, { error }) => {
          const formErrors = error && error.graphQLErrors
          return (
            <LogIn
              formErrors={formErrors}
              onSubmit={({ email, password }) => {
                login({ variables: { input: { email, password } } })
              }}
            />
          )
        }}
      </Mutation>
    )
  }
}

export default LogInContainer
