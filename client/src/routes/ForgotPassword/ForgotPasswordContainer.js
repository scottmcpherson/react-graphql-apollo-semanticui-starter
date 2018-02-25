import React, { Component } from 'react'
import ForgotPassword from './ForgotPassword'

class ForgotPasswordContainer extends Component {
  render() {
    return <ForgotPassword onSubmit={this.props.onForgotPassword} />
  }
}
export default ForgotPasswordContainer
