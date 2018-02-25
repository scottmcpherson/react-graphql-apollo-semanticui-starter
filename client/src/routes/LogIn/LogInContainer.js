import React, { Component } from 'react'
import LogIn from './LogIn'

class LogInContainer extends Component {
  render() {
    return <LogIn onSubmit={this.props.onLogin} />
  }
}
export default LogInContainer
