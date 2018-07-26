const typeDefs = `
type Query {
  currentUser: User
  publicTasks: [Task]
  privateTasks: [Task]
}

type User {
  id: ID
  firstName: String
  lastName: String
  email: String
  password: String
}

type Message {
  message: String 
}

type Task {
  id: ID!
  title: String!
  isPublic: Boolean
  UserId: ID
}

input CreatePublicTaskInput {
  title: String!
}

input CreatePrivateTaskInput {
  title: String!
}

type AuthPayload {
  user: User
  jwt: String
}

input LoginInput {
  email: String!, 
  password: String!
}

input SignupInput {
  email: String!, 
  password: String!
}

input ForgotPasswordInput {
  email: String!
}

type ForgotPasswordPayload {
  message: String
}

input ResetPasswordInput {
  token: String!
  password: String!
}

type ResetPasswordPayload {
  message: String
}

input VerifyEmailInput {
  token: String!
}

type VerifyEmailPayload {
  message: String
}

type Mutation {
  login(input: LoginInput!): AuthPayload
  signup(input: SignupInput!): AuthPayload
  forgotPassword(input: ForgotPasswordInput!): ForgotPasswordPayload
  resetPassword(input: ResetPasswordInput!): ResetPasswordPayload
  verifyEmail(input: VerifyEmailInput!): VerifyEmailPayload
  createPublicTask(input: CreatePublicTaskInput!): Task
  createPrivateTask(input: CreatePrivateTaskInput!): Task
  deleteTask(id: ID!): Message
}
`

export default typeDefs
