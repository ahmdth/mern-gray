const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// userSchema.pre('save', () => {
//   const user = this
//   const salt = bcrypt.genSaltSync(10)
//   const hash = bcrypt.hashSync(user.password, salt)
//   user.password = hash
// })

module.exports = model('User', userSchema)