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
          localStorage.setItem('token', login.jwt)
          onAuthenticateUser(login)
        }}
        refetchQueries={() => {
          console.log('================refetchQueries====================')
          return ['currentUser']
        }}
      >
        {(login, { error }) => {
          const formErrors = error && error.graphQLErrors
          return (
            <LogIn
              formErrors={formErrors}
              onSubmit={({ email, password }) => {
                login({ variables: { email, password } })
              }}
            />
          )
        }}
      </Mutation>
    )
  }
}

export default LogInContainer
