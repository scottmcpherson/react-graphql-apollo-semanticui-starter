const fetch = require('node-fetch')
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = db.User
const Task = db.Task

const resolvers = {
  Query: {
    currentUser: async (root, {}, { user }) => {
      if (!user) {
        throw new Error('Invalid token')
      }
      const loginInUser = await User.findOne({ where: { id: user.id } })
      return loginInUser
    },
    publicTasks: async (root, {}) => {
      const tasks = await Task.findAll({ attributes: ['id', 'title'] })
      return tasks
    }
  },
  Mutation: {
    login: async (root, { email, password }) => {
      const user = await User.findOne({ where: { email } })
      if (!user) {
        throw new Error('Email not found')
      }

      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
        throw new Error('Password is incorrect')
      }

      user.jwt = jwt.sign({ id: user.id }, 'SECRET')

      return user
    },
    signup: async (root, { email, password }) => {
      const existingUser = await User.findOne({ where: { email } })

      if (existingUser) {
        throw new Error('Email already used')
      }
      const hash = await bcrypt.hash(password, 10)

      const user = await User.create({
        email,
        password: hash
      })

      user.jwt = jwt.sign({ id: user.id }, 'SECRET')

      return user
    },
    forgotPassword: async (root, { email }, { user }) => {
      if (!user) {
        throw new Error('Invalid token')
      }

      console.log(`Forgot password email here for ${email}`)

      return { message: 'Success' }
    },
    resetPassword: async (root, { password, token }, { user }) => {
      if (!user) {
        throw new Error('Invalid token')
      }

      console.log(`Reset password here`)

      return { message: 'Success' }
    },
    addPublicTask: async (root, { title }) => {
      const task = await Task.create({
        title
      })
      return task
    },
    deleteTask: async (root, { id }) => {
      const task = await Task.destroy({ where: { id } })
      return { status: 'ok' }
    }
  }
}

export default resolvers
