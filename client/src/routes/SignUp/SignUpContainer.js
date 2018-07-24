import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import SignUp from './SignUp'

const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
      jwt
    }
  }
`

class SignupContainer extends Component {
  render() {
    const { onAuthenticateUser } = this.props
    return (
      <Mutation
        errorPolicy="all"
        mutation={SIGNUP_MUTATION}
        onCompleted={({ signup }) => {
          onAuthenticateUser(signup)
        }}
      >
        {(signup, { error }) => {
          const formErrors = error && error.graphQLErrors
          return (
            <SignUp
              formErrors={formErrors}
              onSubmit={({ email, password }) => {
                signup({ variables: { email, password } })
              }}
            />
          )
        }}
      </Mutation>
    )
  }
}
export default SignupContainer
