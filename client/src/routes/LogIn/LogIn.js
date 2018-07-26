import React from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import TextField from '../../components/TextField'
import FormMessage from '../../components/FormMessage'
import AuthFormContainer from '../../components/AuthFormContainer'
import { required, email } from '../../utils/validations'

const LogInForm = ({ handleSubmit, pristine, submitting, formErrors }) => {
  const isFormErrors = !!(Array.isArray(formErrors) && formErrors.length)
  return (
    <AuthFormContainer header="Log in to your account">
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
            component={TextField}
            validate={[required]}
          />

          <Button
            color="teal"
            fluid
            size="large"
            disabled={pristine || submitting}
          >
            Login
          </Button>
          <div style={{ marginTop: '15px' }}>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </Segment>
      </Form>
      <Message>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Message>
    </AuthFormContainer>
  )
}

export default reduxForm({ form: 'Login' })(LogInForm)
