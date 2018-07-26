import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import ForgotPassword from './ForgotPassword'
import FormMessage from '../../components/FormMessage'
import gql from 'graphql-tag'
import get from 'lodash/get'

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      message
    }
  }
`
class ForgotPasswordContainer extends Component {
  render() {
    return (
      <Mutation mutation={FORGOT_PASSWORD_MUTATION}>
        {(forgotPassword, { data, error }) => {
          const formErrors = error && error.graphQLErrors
          const message = get(data, 'forgotPassword.message')
          if (message) {
            return <FormMessage messages={[{ message }]} />
          }
          return (
            <ForgotPassword
              formErrors={formErrors}
              onSubmit={({ email }) => {
                forgotPassword({ variables: { input: { email } } })
              }}
            />
          )
        }}
      </Mutation>
    )
  }
}
export default ForgotPasswordContainer
