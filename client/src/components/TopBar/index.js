import React from 'react'
import { Container, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const TobBar = ({ currentUser, isFetchingUser, onLogout }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={Link} to="/" header>
          Project Name
        </Menu.Item>

        <Menu.Item as={Link} to="/public-tasks" header>
          Public Tasks
        </Menu.Item>
        <Menu.Item as={Link} to="/private-tasks" header>
          Private Tasks
        </Menu.Item>
        {!currentUser &&
          !isFetchingUser && (
            <Menu.Menu position="right">
              <Menu.Item as={Link} to="/signup" header>
                Sign Up
              </Menu.Item>
              <Menu.Item as={Link} to="/login" header>
                Log In
              </Menu.Item>
            </Menu.Menu>
          )}
        {currentUser &&
          !isFetchingUser && (
            <Menu.Menu position="right">
              <Menu.Item onClick={onLogout} header>
                Log Out
              </Menu.Item>
            </Menu.Menu>
          )}
      </Container>
    </Menu>
  )
}

export default TobBar
