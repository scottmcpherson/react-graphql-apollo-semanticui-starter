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
        {(signup, { data, error }) => {
          if (Array.isArray(error) && error.length) {
            error.graphQLErrors.forEach(err => {
              console.log('err:: ', err)
            })
          }
          console.log('error:: ', error)
          return (
            <SignUp
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
