// load all the things we need
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// load up the user model
const db = require('../models')
const User = db.User

// expose this function to our app using module.exports
module.exports = function(passport) {
  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with username
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(async function() {
          // find a user whose username is the same as the forms username
          // we are checking to see if the user trying to login already exists
          try {
            const user = await User.findOne({ where: { email } })

            // check to see if theres already a user with that username
            if (user) {
              return done(null, false, {
                signupMessage: 'That Email is already taken.'
              })
            } else {
              // if there is no user with that username
              // create the user
              try {
                const newUser = await User.create({
                  email,
                  password
                })
                return done(null, newUser)
              } catch (err) {
                console.log('err:: ', err)
                throw err
              }
            }
          } catch (err) {
            console.log(err)
            return done(err)
          }
        })
      }
    )
  )

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with username
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      async (req, email, password, done) => {
        // callback with username and password from our form

        // find a user whose username is the same as the forms username
        // we are checking to see if the user trying to login already exists
        try {
          const user = await User.findOne({ where: { email } })
          if (!user)
            return done(null, false, { loginMessage: 'No user found.' }) // req.flash is the way to set flashdata using connect-flash

          const isMatch = await user.comparePassword(password)

          // if the user is found but the password is wrong
          if (!isMatch)
            return done(null, false, { loginMessage: 'Oops! Wrong password.' }) // create the loginMessage and save it to session as flashdata

          // all is well, return successful user
          return done(null, user)
        } catch (err) {
          console.log(err)
          return done(err)
        }
      }
    )
  )

  // Setup options for JWT Strategy
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    //secretOrKey: config.secret
    secretOrKey: process.env.SECRET
  }

  // Create JWT Strategy
  const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub)
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    } catch (err) {
      done(err, false)
    }
  })

  passport.use('jwt', jwtLogin)
}
