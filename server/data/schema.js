import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import resolvers from './resolvers'
import mocks from './mocks'

const typeDefs = `
type Query {
  currentUser: User
  publicTasks: [Task]
  privateTasks: [Task]
}

type User {
  id: Int
  firstName: String
  lastName: String
  email: String
  password: String
  jwt: String
}

type Message {
  message: String 
}

type Status {
  status: String 
}

type Task {
  id: ID!
  title: String!
  isPublic: Boolean
  UserId: ID
}

type Mutation {
  login(email: String!, password: String!): User
  signup(email: String!, password: String!): User
  forgotPassword(email: String!): Message
  resetPassword(password: String!, token: String!): Message
  addPublicTask(title: String!): Task
  addPrivateTask(title: String!): Task
  deleteTask(id: ID!): Status
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

// addMockFunctionsToSchema({ schema, mocks })

export default schema
