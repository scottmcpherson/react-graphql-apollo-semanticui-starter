import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

const LogInForm = ({ children, header }) => {
  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            {header}
          </Header>

          {children}
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default LogInForm
