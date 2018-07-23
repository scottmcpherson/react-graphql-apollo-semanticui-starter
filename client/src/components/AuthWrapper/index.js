import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

class AuthWrapper extends React.Component {
  state = {
    currentUser: null
  }

  componentWillReceiveProps({ data: { currentUser } }) {
    if (currentUser) {
      this.setState({
        currentUser
      })
    }
  }

  onLogin = ({ email, password }) => {
    const { login } = this.props

    login(email, password)
      .then(({ data: { login } }) => {
        localStorage.setItem('token', login.jwt)
        this.setState(
          {
            currentUser: login
          },
          () => {
            this.props.history.push('/')
          }
        )
      })
      .catch(err => {
        console.log('err:: ', err.graphQLErrors)
      })
  }

  onSignUp = ({ email, password }) => {
    const { signup } = this.props

    signup(email, password)
      .then(({ data: { signup } }) => {
        localStorage.setItem('token', signup.jwt)
        this.setState(
          {
            currentUser: signup
          },
          () => {
            this.props.history.push('/')
          }
        )
      })
      .catch(e => {
        console.log('e:: ', e.graphQLErrors)
      })
  }

  onForgotPassword = ({ email }) => {
    const { forgotPassword } = this.props

    forgotPassword(email)
      .then(({ data: { forgotPassword } }) => {
        // TODO: Implement
        this.setState({
          isFormSubmitting: false
        })
      })
      .catch(e => {
        console.log('e:: ', e.graphQLErrors)
      })
  }

  onLogout = () => {
    this.setState({ currentUser: null })
    this.props.client.resetStore()
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  renderChildren() {
    const { children, data } = this.props
    const { loading } = data
    const { currentUser } = this.state
    const { onLogin, onSignUp, onLogout, onForgotPassword } = this

    return React.Children.map(children, child =>
      React.cloneElement(child, {
        currentUser,
        onLogin,
        onSignUp,
        onLogout,
        onForgotPassword,
        isFetchingUser: loading
      })
    )
  }

  render() {
    return this.renderChildren()
  }
}

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      email
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      jwt
    }
  }
`

const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
      jwt
    }
  }
`

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`

export default compose(
  graphql(CURRENT_USER_QUERY),
  graphql(LOGIN_MUTATION, {
    props: ({ mutate }) => ({
      login: (email, password) => mutate({ variables: { email, password } })
    })
  }),
  graphql(SIGNUP_MUTATION, {
    props: ({ mutate }) => ({
      signup: (email, password) => mutate({ variables: { email, password } })
    })
  }),
  graphql(FORGOT_PASSWORD_MUTATION, {
    props: ({ mutate }) => ({
      forgotPassword: email => mutate({ variables: { email } })
    })
  })
)(AuthWrapper)
