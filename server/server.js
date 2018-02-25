import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'
import schema from './data/schema'
import models from './models'
import { setupLocalLogin } from './localLogin'
import cors from 'cors'
import jwt from 'express-jwt'

require('dotenv').config()

const GRAPHQL_PORT = 3001

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// setupLocalLogin(app)

app.use(
  '/graphql',
  bodyParser.json(),
  jwt({
    secret: 'SECRET',
    credentialsRequired: false
  }),
  graphqlExpress(async req => ({
    schema,
    context: {
      user: req.user
    }
  }))
)
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(GRAPHQL_PORT, () => {
  models.sequelize.sync()
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
})
