import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      email
    }
  }
`

class AuthWrapper extends React.Component {
  state = {
    currentUser: null
  }
  onAuthenticateUser = currentUser => {
    localStorage.setItem('token', currentUser.jwt)
    console.log('currentUser:: ', currentUser)
    this.setState({ currentUser }, () => {
      this.props.history.push('/')
    })
  }

  onLogout = () => {
    this.setState({ currentUser: null })
    this.props.client.resetStore()
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { data } = this.props
    const existingCurrentUser = this.state.currentUser
    const currentUser = data && data.currentUser
    if (currentUser && existingCurrentUser !== currentUser) {
      this.setState({ currentUser })
    }
  }

  renderChildren() {
    const {
      children,
      data: { loading }
    } = this.props
    const { currentUser } = this.state
    const { onAuthenticateUser, onLogout } = this

    return React.Children.map(children, child =>
      React.cloneElement(child, {
        currentUser,
        onLogout,
        onAuthenticateUser,
        isFetchingUser: loading
      })
    )
  }

  render() {
    return this.renderChildren()
  }
}

export default compose(graphql(CURRENT_USER_QUERY))(AuthWrapper)
