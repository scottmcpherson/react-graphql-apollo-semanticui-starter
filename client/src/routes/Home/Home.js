import React from 'react'
import { Header } from 'semantic-ui-react'

const MainLayout = () => {
  return (
    <div>
      <Header as="h1">
        A simple task list app to illustrate apollo with graphql
      </Header>
      <p>
        Private and public tasks use polling on a 5 second interval to keep the
        data up to date. At a later point, it might be worth exploring web
        sockets using apollos network interface.
      </p>
    </div>
  )
}

export default MainLayout
