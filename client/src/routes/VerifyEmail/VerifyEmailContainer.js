import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import VerifyEmail from './VerifyEmail'
import gql from 'graphql-tag'
import get from 'lodash/get'

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      message
    }
  }
`

class VerifyEmailContainer extends Component {
  render() {
    const token = get(this, 'props.match.params.token')
    return (
      <Mutation mutation={VERIFY_EMAIL_MUTATION}>
        {(verifyEmail, { data, error }) => {
          const errors = error && error.graphQLErrors
          const areErrors = !!(Array.isArray(errors) && errors.length)
          const message = get(data, 'verifyEmail.message')
          console.log('areErrors:: ', areErrors)
          return (
            <VerifyEmail
              areErrors={areErrors}
              errors={errors}
              message={message}
              token={token}
              verifyEmail={verifyEmail}
            />
          )
        }}
      </Mutation>
    )
  }
}
export default VerifyEmailContainer
