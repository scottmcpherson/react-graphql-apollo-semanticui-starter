const fetch = require('node-fetch')
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = db.User

const sports = {
  sports: [
    { id: 1, name: 'football' },
    { id: 2, name: 'basketball' },
    { id: 3, name: 'baseball' }
  ],
  matches: [
    { id: 1, sport: 'football', homeTeam: 'Bucs', awayTeam: 'Falcons' },
    { id: 2, sport: 'basketball', homeTeam: 'Nics', awayTeam: 'Heat' },
    { id: 3, sport: 'baseball', homeTeam: 'Braves', awayTeam: 'Yankees' }
  ],
  findAll() {
    return this.sports
  },
  getMatches(sportName) {
    return this.matches.filter(match => match.sport === sportName)
  },
  getSport(sportName) {
    return this.sports.find(sport => sport.Name === sportName)
  }
}

const resolvers = {
  Query: {
    currentUser: async (root, {}, { user }) => {
      if (!user) {
        throw new Error('Invalid token')
      }
      const loginInUser = await User.findOne({ where: { id: user.id } })
      return loginInUser
    },
    sportMatches(root, { sportName }) {
      return sports.getMatches(sportName)
    },
    sports(root, { limit }, context) {
      return sports.findAll().slice(0, limit)
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
    }
  },
  Sport: {
    matches(sport) {
      return sports.getMatches(sport.name)
    }
  },
  Match: {
    sport(match) {
      const { sport } = match
      return sports.getSport(sport.sport)
    }
  }
}

export default resolvers
