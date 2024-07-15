const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const index = asyncHandler(async (req, res) => {
  const users = await User.find().lean()
  if (!users) {
    return res.status(400).json({ message: 'no users found' })
  }
  res.status(200).json(users)
})

const show = asyncHandler(async (req, res) => {
  res.status(200).json({ user: User.findById(req.id).select('-password') })
})

const create = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.create({ name, email, password })
  res.status(201).json({ user })
})

const update = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const { id } = req.params
  const user = await User.findOneAndUpdate({ id }, { name, email, password })
  res.status(204).json({ user })
})

const destroy = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user) {
    res.status(204).json({ message: 'user not found' })
  }
  await User.deleteOne(id)
  res.status(204).json({ message: 'user delete successfully' })
})

module.exports = { index, create, show, update, destroy }