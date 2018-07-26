import React from 'react'
import { Message } from 'semantic-ui-react'

const FormMessage = ({ color = 'green', messages, children }) => {
  const areMessages = !!(Array.isArray(messages) && messages.length)

  if (!areMessages) return null

  if (messages.length === 1)
    return (
      <Message color={color} content={messages[0].message}>
        {children}
      </Message>
    )

  return (
    <Message color={color} list={messages.map(msg => msg.message)}>
      {children}
    </Message>
  )
}

export default FormMessage
