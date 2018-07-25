import React from 'react'
import { Form } from 'semantic-ui-react'

const TextField = ({ input, meta: { touched, error }, ...custom }) => (
  <Form.Input
    required
    fluid
    margin="normal"
    error={touched && !!error}
    {...input}
    {...custom}
  />
)

export default TextField
