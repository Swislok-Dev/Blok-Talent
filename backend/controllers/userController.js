const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Regist new user
// POST /api/users/register
const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(401)
    throw new Error('Please enter all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ username })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    username,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
      createdAt: user.createdAt,
      dateNow: new Date(Date.now()),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// Authenticate a user
// POST /api/users/login
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),

      createdAt: user.createdAt,
      dateNow: new Date(Date.now()),
    })
  } else if (!user) {
    res.status(404)
    throw new Error('User not found')
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// Logout user
// GET /api/users/logout
const logout = asyncHandler(async (req, res) => {
  const options = {
    expires: new Date(Date.now() + 10000),
  }
  try {
    res.cookie('jwt', 'expiredtoken', options)
    res.status(200).json({ status: 'success', options: options })
  } catch (error) {
    res.status(400).json({ message: 'user not logged out' })
  }
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1m',
  })
}
module.exports = {
  register,
  login,
  logout,
}
