import React from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import AuthFormContainer from '../../components/AuthFormContainer'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

const validate = values => {
  const errors = {}
  const requiredFields = ['username', 'email', 'password']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
  <Form.Input
    required
    fluid
    margin="normal"
    error={touched && !!error}
    {...input}
    {...custom}
  />
)

const ForgotPasswordForm = ({ handleSubmit, pristine, submitting }) => {
  return (
    <AuthFormContainer header="Reset password">
      <Form size="large" onSubmit={handleSubmit}>
        <Segment>
          <Field name="email" label="Email" component={renderTextField} />

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

export default reduxForm({
  form: 'ForgotPassword',
  validate
})(ForgotPasswordForm)
