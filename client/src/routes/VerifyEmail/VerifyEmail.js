import React from 'react'
import FormMessage from '../../components/FormMessage'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { Message } from 'semantic-ui-react'

export default class VerifyEmail extends React.Component {
  componentDidMount() {
    const { token, verifyEmail } = this.props
    verifyEmail({
      variables: { input: { token } }
    })
  }
  render() {
    const { areErrors, errors, message } = this.props

    if (areErrors) {
      return <FormMessage color="red" messages={errors} />
    } else if (message) {
      return (
        <Message color="green">
          Email Verified! <Link to="/login">Go to login</Link>
        </Message>
      )
    } else {
      return <Loader />
    }
  }
}
