// import express from 'express'
// import passport from 'passport'
// import jwt from 'jwt-simple'

// function tokenForUser(user) {
//   const timestamp = new Date().getTime()
//   return jwt.encode(
//     { sub: user.id, iat: timestamp, email: user.email },
//     process.env.SECRET
//   )
// }

// export function setupLocalLogin(app) {
//   require('./config/passport')(passport)

//   // sign up and sign in are handled by auth controller
//   app.post(
//     '/signin',
//     passport.authenticate('local-login', { session: false }),
//     (req, res) => {
//       res.send({
//         id: req.user.id,
//         email: req.user.email,
//         token: tokenForUser(req.user)
//       })
//     }
//   )

//   app.post(
//     '/signup',
//     passport.authenticate('local-signup', { session: false }),
//     (req, res) => {
//       res.send({
//         id: req.user.id,
//         email: req.user.email,
//         token: tokenForUser(req.user)
//       })
//     }
//   )

//   app.get(
//     '/user',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
//       if (req.user) {
//         res.send({ id: req.user._id, email: req.user.email })
//       } else {
//         res.send(null)
//       }
//     }
//   )

//   app.post('/forgot-password', (req, res) => {
//     const { email } = req
//     console.log('Reset password email here')
//     res.send(null)
//   })

//   app.post('/reset-password', (req, res) => {
//     const { resetCode } = req
//     if (!resetCode) res.send(null)
//   })
// }
