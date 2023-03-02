import './config/loadEnv.mjs'

import cors from 'cors'
import express from 'express'
import { errorHandler } from './middlewares/index.mjs'

import MongoStore from 'connect-mongo'
import session from 'express-session'
import connection from './config/database.mjs'

import router from './routes/index.mjs'

/* General setup */

const SERVER_PORT = process.env.SERVER_PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)


/* Express session setup */

const sessionStore = MongoStore.create(
  {
    mongoUrl: 'mongodb://root:root@172.17.0.2:27017/',
    collection: 'sessions'
  }
)

/* NOTE funciona mas não sei porq */
// const sessionStore = connection

app.use(
  session({
    store: sessionStore,

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      /* Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec) */
      maxAge: 1000 * 60 * 60 * 24
    },
  })
)

/* Setup Passport authentication */
// Need to require the entire Passport config module so app.js knows about it
import passport from 'passport'
import './config/passport.mjs'
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  console.log('>> session', req.session)
  console.log('>> user', req.user)
  next()
})

/* Setup Express routes */
app.use(router)

/* Start the Express server */
app.listen(SERVER_PORT, err => {
  if (err) {
    throw err
  }

  console.log(`🌐 Express.js server is running on port: ${SERVER_PORT}`)
})
