import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'
import schema from './data/schema'
import models from './models'
import jwt from 'express-jwt'
import cors from 'cors'

require('dotenv').config()

const GRAPHQL_PORT = 3001

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  '/graphql',
  bodyParser.json(),
  jwt({
    secret: process.env.JWT_SECRET,
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
