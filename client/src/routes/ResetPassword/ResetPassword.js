import React from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import AuthFormContainer from '../../components/AuthFormContainer'
import FormMessage from '../../components/FormMessage'
import TextField from '../../components/TextField'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { required } from '../../utils/validations'

const ResetPasswordForm = ({
  pristine,
  submitting,
  formErrors,
  handleSubmit
}) => {
  const areFormErrors = !!(Array.isArray(formErrors) && formErrors.length)
  return (
    <AuthFormContainer header="Create new password">
      <Form size="large" onSubmit={handleSubmit} error={areFormErrors}>
        <Segment>
          <FormMessage color="red" messages={formErrors} />
          <Field
            name="password"
            label="New Password"
            component={TextField}
            validate={[required]}
          />

          <Button
            color="teal"
            fluid
            size="large"
            disabled={pristine || submitting}
          >
            Reset Password
          </Button>
        </Segment>
      </Form>
      <Message>
        <Link to="/login" style={{ marginTop: '10px' }}>
          Back to Log In
        </Link>
      </Message>
    </AuthFormContainer>
  )
}

export default reduxForm({ form: 'ResetPassword' })(ResetPasswordForm)
