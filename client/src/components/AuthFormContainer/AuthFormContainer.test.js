import React from 'react'
import ReactDOM from 'react-dom'
import AuthFormContainer from './'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AuthFormContainer />, div)
  ReactDOM.unmountComponentAtNode(div)
})
