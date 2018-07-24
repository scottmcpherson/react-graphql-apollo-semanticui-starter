import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import ForgotPassword from './ForgotPassword'

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`
class ForgotPasswordContainer extends Component {
  render() {
    return (
      <Mutation mutation={FORGOT_PASSWORD_MUTATION}>
        {forgotPassword => (
          <ForgotPassword
            onSubmit={({ email }) => {
              forgotPassword({ variables: { email } }).then(() => {})
            }}
          />
        )}
      </Mutation>
    )
  }
}
export default ForgotPasswordContainer
