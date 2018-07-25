import React from 'react'
import { Message } from 'semantic-ui-react'

const FormMessageErrors = ({ errors }) => {
  const areErrors = !!(Array.isArray(errors) && errors.length)

  if (!areErrors) return null

  if (errors.length === 1) return <Message error content={errors[0].message} />

  return <Message error list={errors.map(err => err.message)} />
}

export default FormMessageErrors
