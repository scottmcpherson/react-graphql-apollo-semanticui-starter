import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import isFunction from 'lodash/isFunction'
import get from 'lodash/get'

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      email
    }
  }
`

class AuthWrapper extends React.Component {
  onAuthenticateUser = ({ jwt, ...data }) => {
    localStorage.setItem('token', jwt)

    // This is kind of a hack to re-fetch the user
    // after they login or signup.
    // It would be much better to just update
    // the local currentUser with the returned user data
    // but the following issue is preventing that:
    // https://github.com/apollographql/react-apollo/issues/2209
    if (this.refetch && isFunction(this.refetch)) {
      // Need to wait for the user fetch to complete
      // So it doesn't redirect back to login
      this.refetch().then(() => {
        const from = get(
          this,
          'props.history.location.state.from.pathname',
          '/'
        )
        this.props.history.push(from)
      })
    }
  }

  onLogout = () => {
    this.props.client.resetStore()
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  renderChildren(loading, data, error) {
    const { children } = this.props
    const { onAuthenticateUser, onLogout } = this

    return React.Children.map(children, child =>
      React.cloneElement(child, {
        onLogout,
        onAuthenticateUser,
        isFetchingUser: loading,
        currentUser: data && data.currentUser
      })
    )
  }

  render() {
    return (
      <Query query={CURRENT_USER_QUERY} fetchPolicy="cache-and-network">
        {({ loading, data, error, refetch }) => {
          this.refetch = refetch
          return this.renderChildren(loading, data, error)
        }}
      </Query>
    )
  }
}

export default AuthWrapper
