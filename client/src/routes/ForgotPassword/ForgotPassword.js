import React from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import AuthFormContainer from '../../components/AuthFormContainer'
import FormMessage from '../../components/FormMessage'
import TextField from '../../components/TextField'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { required } from '../../utils/validations'

const ForgotPasswordForm = ({
  handleSubmit,
  pristine,
  submitting,
  formErrors
}) => {
  const isFormErrors = !!(Array.isArray(formErrors) && formErrors.length)
  return (
    <AuthFormContainer header="Reset password">
      <Form size="large" onSubmit={handleSubmit} error={isFormErrors}>
        <Segment>
          <FormMessage color="red" messages={formErrors} />
          <Field
            name="email"
            label="Email"
            component={TextField}
            validate={[required]}
          />

          <Button
            color="teal"
            fluid
            size="large"
            disabled={pristine || submitting}
          >
            Send Reset Link
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

export default reduxForm({ form: 'ForgotPassword' })(ForgotPasswordForm)
