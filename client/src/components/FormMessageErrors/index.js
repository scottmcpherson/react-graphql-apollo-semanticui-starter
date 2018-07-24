import React from 'react'
import { Message } from 'semantic-ui-react'

const FormMessageErrors = ({ errors }) => {
  const areErrors = !!(Array.isArray(errors) && errors.length)

  if (!areErrors) return <span />

  return <Message error list={errors.map(err => err.message)} />
}

export default FormMessageErrors
