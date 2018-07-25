import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Query } from 'react-apollo'

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

  onAuthenticateUser = ({ jwt, ...data }) => {
    localStorage.setItem('token', jwt)

    this.props.client.cache.writeQuery({
      query: CURRENT_USER_QUERY,
      data: {
        currentUser: data
      }
    })
    this.props.history.push('/')
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

  renderChildren(loading, data, error) {
    const { children } = this.props
    const currentUser = data && data.currentUser
    const { onAuthenticateUser, onLogout } = this

    console.log('data:: ', data)
    // console.log(
    //   'renderChildren this.props.client.cache:: ',
    //   this.props.client.cache
    // )

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
    return (
      <Query query={CURRENT_USER_QUERY} fetchPolicy="cache-and-network">
        {({ loading, data, error }) =>
          this.renderChildren(loading, data, error)
        }
      </Query>
    )
  }
}

export default compose(graphql(CURRENT_USER_QUERY))(AuthWrapper)
