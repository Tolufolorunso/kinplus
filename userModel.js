const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    religious: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    phone: String,
    type: {
      type: String,
      required: true,
      default: 'inHouse',
      enum: ['inHouse', 'guest']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
