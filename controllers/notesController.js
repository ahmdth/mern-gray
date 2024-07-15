const asyncHandler = require('express-async-handler')
const Note = require('../models/Note');
const User = require('../models/User');

const index = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean()
  if (!notes) {
    return res.status(400).json({ message: 'no notes found' })
  }
  res.status(200).json(notes)
})

const show = asyncHandler(async (req, res) => {
  res.status(200).json({ note: Note.findById(req.id).select('-password') })
})

const create = asyncHandler(async (req, res) => {
  const user = await User.findOne({})
  const { title, description } = req.body
  const note = await Note.create({ user, title, description })
  res.status(201).json({ note })
})

const update = asyncHandler(async (req, res) => {
  const { title, description } = req.body
  const { id } = req.params
  const note = await Note.findOneAndUpdate({ id }, { title, description })
  res.status(204).json({ note })
})

const destroy = asyncHandler(async (req, res) => {
  const { id } = req.params
  const note = await Note.findById(id)
  if (!note) {
    res.status(204).json({ message: 'note not found' })
  }
  await Note.deleteOne(id)
  res.status(204).json({ message: 'note delete successfully' })
})

module.exports = { index, create, show, update, destroy }