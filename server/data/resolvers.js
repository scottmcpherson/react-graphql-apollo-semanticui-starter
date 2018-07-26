const db = require('../models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jsonWebToken = require('jsonwebtoken')
const moment = require('moment')
const { AuthenticationError, UserInputError } = require('apollo-server-express')
const User = db.user
const Task = db.task

const resolvers = {
  Query: {
    currentUser: async (root, {}, { user }) => {
      if (!user) throw new AuthenticationError('Invalid token')

      const loginInUser = await User.findOne({ where: { id: user.id } })
      return loginInUser
    },
    publicTasks: async (root, {}) => {
      return await Task.findAll({
        where: { isPublic: true },
        attributes: ['id', 'title']
      })
    },
    privateTasks: async (root, {}, { user }) => {
      if (!user) throw new AuthenticationError('Invalid token')

      return await Task.findAll({ where: { userId: user.id, isPublic: false } })
    }
  },
  Mutation: {
    login: async (root, { input: { email, password } }) => {
      const user = await User.findOne({ where: { email } })
      if (!user) throw new UserInputError('Email not found')

      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
        throw new UserInputError('Email or password is incorrect')
      }

      const jwt = jsonWebToken.sign({ id: user.id }, process.env.JWT_SECRET)

      return { user, jwt }
    },
    signup: async (root, { input: { email, password } }) => {
      const existingUser = await User.findOne({ where: { email } })

      if (existingUser) throw new UserInputError('Email already used')

      const hash = await bcrypt.hash(password, 10)
      const token = crypto.randomBytes(20).toString('hex')
      const tokenExpiration = Date.now() + 10800000 // In 3 hours

      // This url will need to be read dynamically from somewhere
      // to reflect the environment that it is created in
      // or possibly be changed based off of your setup
      const link = `http://localhost:3000/verify-email/${token}`

      // You will need to setup an email service here
      console.log('')
      console.error(`This needs to be implemented on the backend`)
      console.log(
        `For testing purposes, here is your email verification link: ${link}`
      )
      console.log('')

      const user = await User.create({
        email,
        password: hash,
        token,
        tokenExpiration
      })

      const jwt = jsonWebToken.sign({ id: user.id }, process.env.JWT_SECRET)

      return { user, jwt }
    },
    forgotPassword: async (root, { input: { email } }) => {
      const user = await User.findOne({ where: { email } })
      if (!user) throw new UserInputError('No Search Results')

      const token = crypto.randomBytes(20).toString('hex')
      const tokenExpiration = Date.now() + 10800000 // In 3 hours
      await user.update({ token, tokenExpiration })

      // This url will need to be read dynamically from somewhere
      // to reflect the environment that it is created in
      // or possibly be changed based off of your setup
      const link = `http://localhost:3000/reset-password/${token}`

      // You will need to setup an email service here
      console.log('')
      console.error(`This needs to be implemented on the backend`)
      console.log(
        `For testing purposes, here is your password reset verification link: ${link}`
      )
      console.log('')

      return { message: 'Success! Check your server logs for a test link' }
    },

    resetPassword: async (root, { input: { token, password } }) => {
      const user = await User.findOne({ where: { token } })
      if (!user) throw new UserInputError('Invalid token')
      const hash = await bcrypt.hash(password, 10)
      const now = moment()
      const tokenExpiration = moment(user.tokenExpiration)

      if (now.isAfter(tokenExpiration))
        throw new UserInputError('Token is expired')

      await user.update({
        password: hash,
        token: null,
        tokenExpiration: null
      })

      return { message: 'Success' }
    },
    verifyEmail: async (root, { input: { token } }) => {
      const user = await User.findOne({ where: { token } })
      if (!user) throw new UserInputError('Invalid token')

      await user.update({
        token: null,
        tokenExpiration: null,
        isEmailVerified: true
      })

      return { message: 'Success' }
    },
    createPublicTask: async (root, { input: { title } }) => {
      const task = await Task.create({
        title,
        isPublic: true
      })
      return task
    },
    createPrivateTask: async (root, { input: { title } }, { user }) => {
      if (!user) throw new AuthenticationError('Invalid token')
      const task = await Task.create({
        title,
        userId: user.id,
        isPublic: false
      })
      return task
    },
    deleteTask: async (root, { id }) => {
      await Task.destroy({ where: { id } })
      return { status: 'ok' }
    }
  }
}

export default resolvers
