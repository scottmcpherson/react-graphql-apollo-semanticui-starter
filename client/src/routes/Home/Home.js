import React from 'react'
import { Header } from 'semantic-ui-react'

const MainLayout = props => {
  console.log('props:: ', props)
  return (
    <div>
      <Header as="h1">Semantic UI React Fixed Template</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>
        A text container is used for the main container, which is useful for
        single column layouts.
      </p>
    </div>
  )
}

export default MainLayout
