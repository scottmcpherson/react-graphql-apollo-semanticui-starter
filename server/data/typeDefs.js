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

type CreateTaskPublicPayload {
  task: Task
}

input CreatePrivateTaskInput {
  title: String!
}

type CreateTaskPrivatePayload {
  task: Task
}

input LoginInput {
  email: String!, 
  password: String!
}

type LoginPayload {
  user: User
  jwt: String
}

input SignupInput {
  email: String!, 
  password: String!
}

type SignupPayload {
  user: User
  jwt: String
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
  login(input: LoginInput!): LoginPayload
  signup(input: SignupInput!): SignupPayload
  forgotPassword(input: ForgotPasswordInput!): ForgotPasswordPayload
  resetPassword(input: ResetPasswordInput!): ResetPasswordPayload
  verifyEmail(input: VerifyEmailInput!): VerifyEmailPayload
  createPublicTask(input: CreatePublicTaskInput!): CreateTaskPublicPayload
  createPrivateTask(input: CreatePrivateTaskInput!): CreateTaskPrivatePayload
  deleteTask(id: ID!): Message
}
`

export default typeDefs
