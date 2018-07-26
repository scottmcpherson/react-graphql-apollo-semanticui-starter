import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import ResetPassword from './ResetPassword'
import { Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import get from 'lodash/get'

const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      message
    }
  }
`
class ResetPasswordContainer extends Component {
  render() {
    const token = get(this, 'props.match.params.token')
    return (
      <Mutation mutation={RESET_PASSWORD_MUTATION}>
        {(resetPassword, { data, error }) => {
          const formErrors = error && error.graphQLErrors
          const message = get(data, 'resetPassword.message')
          if (message) {
            return (
              <Message color="green">
                Password Reset! <Link to="/login">Go to login</Link>
              </Message>
            )
          }
          return (
            <ResetPassword
              formErrors={formErrors}
              onSubmit={({ password }) => {
                resetPassword({ variables: { input: { token, password } } })
              }}
            />
          )
        }}
      </Mutation>
    )
  }
}
export default ResetPasswordContainer
