import React from 'react'
import { Container, Menu } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

const MainLayout = ({ client, component: Component, ...rest }) => {
  console.log('rest:', rest)
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div>
          <Menu fixed="top" inverted>
            <Container>
              <Menu.Item as={Link} to="/" header>
                Project Name
              </Menu.Item>

              <Menu.Item as={Link} to="/tasks" header>
                Tasks
              </Menu.Item>

              <Menu.Menu position="right">
                <Menu.Item as={Link} to="/signup" header>
                  Sign Up
                </Menu.Item>
                <Menu.Item as={Link} to="/login" header>
                  Log In
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>

          <Container text style={{ marginTop: '7em' }}>
            <Component {...matchProps} {...rest} />
          </Container>
        </div>
      )}
    />
  )
}

export default MainLayout
