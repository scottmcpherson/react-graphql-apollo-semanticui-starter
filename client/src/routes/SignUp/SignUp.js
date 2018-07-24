import React from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import FormMessageErrors from '../../components/FormMessageErrors'
import AuthFormContainer from '../../components/AuthFormContainer'

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

const SignUpForm = ({ handleSubmit, pristine, submitting, formErrors }) => {
  const isFormErrors = !!(Array.isArray(formErrors) && formErrors.length)
  return (
    <AuthFormContainer header="Sign up">
      <Form size="large" onSubmit={handleSubmit} error={isFormErrors}>
        <Segment>
          <FormMessageErrors errors={formErrors} />
          <Field name="email" label="Email" component={renderTextField} />
          <Field name="password" label="Password" component={renderTextField} />

          <Button
            color="teal"
            fluid
            size="large"
            disabled={pristine || submitting}
          >
            Sign Up
          </Button>
          <div style={{ marginTop: '15px' }}>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </Segment>
      </Form>
      <Message>
        Already have an account? <Link to="/login">Log In</Link>
      </Message>
    </AuthFormContainer>
  )
}

export default reduxForm({
  form: 'SignUp',
  validate
})(SignUpForm)
