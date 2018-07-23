import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import LogIn from './LogIn'

const LOGIN_MUTATION = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
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
        {login => (
          <LogIn
            onSubmit={({ email, password }) => {
              login({ variables: { email, password } })
            }}
          />
        )}
      </Mutation>
    )
  }
}

export default LogInContainer
