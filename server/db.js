const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const JwtStratery = require('passport-jwt').Strategy
const cookieParser = require('cookie-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
const router = express.Router()

app.use(cors({ credentials: true }))
app.use(cookieParser())

const cookieExtractor = (req) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['token']
  }
  return token
}

passport.use(
  new JwtStratery(
    {
      secretOrKey: 'secret-token', // TODO: use dotenv instead
      jwtFromRequest: cookieExtractor,
      jsonWebTokenOptions: {
        maxAge: '2d',
      },
    },
    async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ username: jwt_payload.username })
        if (user) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'User authentication failed' })
        }
      } catch (err) {
        return done(err, false, { message: 'User authentication failed' })
      }
    },
  ),
)

app.use(passport.initialize())

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
})
const Movie = mongoose.model('Movie', movieSchema)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})
const User = mongoose.model('User', userSchema)

app.use(express.json())

router.get(
  '/user/check',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.status(200).json({
      authorized: true,
    })
  },
)

router.post('/login', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const user = await User.findOne({ username: username })
  if (user) {
    // User is present, check whether the password matches or not

    // TODO: use bcrypt to compare hashed passwords
    if (user.password === password) {
      // TODO: send JWT token
      const payload = {
        username,
      }
      const token = jwt.sign(payload, 'jwt-secret', {
        expiresIn: '1d',
      })
      return res
        .status(200)
        .cookie('token', {
          httpOnly: true,
          maxAge: 172800000,
          sameSite: 'None',
        })
        .json({
          username,
          token,
        })
    } else {
      // pretend that user doesn't exist in case the password doesn't match
      return res.status(404).json({ message: 'Username or password is wrong' })
    }
  } else {
    return res.status(404).json({ message: 'user not found' })
  }
})

router.post('/signup', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  // TODO: hash password and store
  // TODO: don't allow similar records
  const user = new User({
    username,
    password,
  })
  const dbUser = await user.save()
  return res.status(200).json({ message: 'success' })
})

router.post('/logout', async (req, res) => {
  res.clearCookie('token', {
    sameSite: 'None',
  })
  return res.status(200).json({
    message: 'Logged Out',
  })
})

app.get('/movies', (req, res) => {
  const year = parseInt(req.query.year)
  Movie.find({ year: year })
    .sort({ rating: -1 })
    .exec((err, movies) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(movies)
      }
    })
})

router.put('/:id', (req, res) => {
  Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, movie) => {
      if (error) return res.status(500).send(error)
      res.json(movie)
    },
  )
})

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
