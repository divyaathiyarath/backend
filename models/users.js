const mongoose = require('mongoose')
const config = require('../config')
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: { type: String }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model(
  config.DATABASE.userCollectionName,
  userSchema
)
