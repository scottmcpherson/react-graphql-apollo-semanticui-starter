import React from 'react'
import { Container } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import TobBar from '../../components/TopBar'

const MainLayout = ({
  client,
  component: Component,
  currentUser,
  isFetchingUser,
  onLogout,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div>
          <TobBar
            currentUser={currentUser}
            isFetchingUser={isFetchingUser}
            onLogout={onLogout}
          />

          <Container text style={{ marginTop: '7em' }}>
            <Component {...matchProps} {...rest} />
          </Container>
        </div>
      )}
    />
  )
}

export default MainLayout
