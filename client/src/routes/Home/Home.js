import React from 'react'
import { Header } from 'semantic-ui-react'

const MainLayout = props => {
  return (
    <div>
      <Header as="h1">
        A simple task list app to illustrate apollo with graphql
      </Header>
      <p>Public tasks link subscriptions to make it sudo real-time</p>
      <p>Private tasks link uses polling on a 5 second interval</p>
    </div>
  )
}

export default MainLayout
