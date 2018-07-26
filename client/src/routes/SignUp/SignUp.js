import React from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import TextField from '../../components/TextField'
import FormMessage from '../../components/FormMessage'
import AuthFormContainer from '../../components/AuthFormContainer'
import { required, email } from '../../utils/validations'

const SignUpForm = ({ handleSubmit, pristine, submitting, formErrors }) => {
  const isFormErrors = !!(Array.isArray(formErrors) && formErrors.length)
  return (
    <AuthFormContainer header="Sign up">
      <Form size="large" onSubmit={handleSubmit} error={isFormErrors}>
        <Segment>
          <FormMessage color="red" messages={formErrors} />
          <Field
            name="email"
            label="Email"
            component={TextField}
            validate={[required, email]}
          />
          <Field
            type="password"
            name="password"
            label="Password"
            validate={[required]}
            component={TextField}
          />

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

export default reduxForm({ form: 'SignUp' })(SignUpForm)
