import React, { Component } from 'react'
import SignUp from './SignUp'

class SignupContainer extends Component {
  render() {
    return <SignUp onSubmit={this.props.onSignUp} />
  }
}
export default SignupContainer
