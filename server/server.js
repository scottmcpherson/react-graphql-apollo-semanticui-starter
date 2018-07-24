import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import models from './models'
import jwt from 'express-jwt'
import cors from 'cors'
import resolvers from './data/resolvers'
import typeDefs from './data/typeDefs'
require('dotenv').config()

const GRAPHQL_PORT = 3001

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
  })
)

// Add the user into graphql context so resolver can access it
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { user: req.user }
  }
})

server.applyMiddleware({ app })

app.listen(GRAPHQL_PORT, () => {
  models.sequelize.sync()
  console.log(
    `🚀 Server ready at http://localhost:${GRAPHQL_PORT}${server.graphqlPath}`
  )
})
