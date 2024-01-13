const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  verificationToken: String,
  addresses: [
    {
      name: String,
      mobileNo: String,
      houseNo: String,
      street: String,
      landmark: String,
      country: String,
      postalCode: String,
    },
  ],

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// HASHING PASSWORD
userSchema.pre('save', async function (next) {
  //checks if password has not been modified
  if (!this.isModified('password')) return next();

  // hashing the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  
  next();
});

// instance methods
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword); //returns true or false
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
