import React from 'react'
import { Container } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router-dom'
import TobBar from '../../components/TopBar'
import Loader from '../../components/Loader'

const MainLayout = ({
  client,
  component: Component,
  currentUser,
  isFetchingUser,
  onLogout,
  checkAuth,
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
            {checkAuth &&
              !isFetchingUser &&
              !currentUser && (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: matchProps.location }
                  }}
                />
              )}
            {isFetchingUser && <Loader />}
            {!isFetchingUser && <Component {...matchProps} {...rest} />}
          </Container>
        </div>
      )}
    />
  )
}

export default MainLayout
