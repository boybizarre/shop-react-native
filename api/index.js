const mongoose = require('mongoose');
const dotenv = require('dotenv');

// errors
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message, err.stack);

  // By doing this we are giving the server time to run the remaining requests and gracefully shutdown
  process.exit(1);
});

const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// models
const User = require('../api/models/user');

// helper functions
const sendVerificationEmail = require('./utils/email');

const app = express();

const port = process.env.PORT || 8000;
app.use(cors());

// app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db)
  .then((connection) => {
    console.log('Connection successful!');
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// endpoint to register a new user
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: 'Email already registered!',
      });
    }

    // create a new user
    const newUser = new User({ name, email, password });

    // generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString('hex');

    // save user to the database
    await newUser.save();

    // console.log('got to this point');

    // send verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    // console.log('got to this point 2');

    res.status(200).json({
      status: true,
      message: 'You have registered successfully!',
    });
  } catch (error) {
    console.log('Error registering new user!', error);
    res.status(500).json({
      message: 'Registration failed',
    });
  }
});

// endpoint to verify email
app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;

    // find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'Invalid verification token',
      });
    }

    // mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    // save user to the database
    await user.save();

    res.status(200).json({
      status: true,
      message: 'Email verified successfully!',
    });
  } catch (error) {
    console.log('Email verification failed', error);
    res.status(500).json({
      status: false,
      message: 'Email verification failed',
    });
  }
});

// endpoint to log in the user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) check if email and password exists
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide an email and password!',
      });
    }

    // 2) check if user exist and password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      // instance method
      return res.status(401).json({
        message: 'Incorrect email or password',
      });
    }

    const signInToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      token: signInToken,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Login Failed',
    });
  }
});

// endpoint to save a new address
app.post('/address', async (req, res) => {
  try {
    // 1) Getting token and check it it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    const { address } = req.body;

    console.log(req.body, 'req.body');
    console.log(address, 'address');

    // 2) verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    console.log(decoded, 'decoded-addaddress');

    // find the user by id
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: 'The user belonging to this token no longer exists',
      });
    }

    // add the address to the user's addresses array
    user.addresses.push(address);

    // save the updated user to the database
    await user.save();

    res.status(200).json({
      message: 'Address added successfully!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding address',
    });
  }
});

app.get('/all-addresses', async (req, res) => {
  try {
    // 1) Getting token and check it it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    // 2) verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    console.log(decoded, 'decoded-alladdresses');

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: 'The user belonging to this token no longer exists',
      });
    }

    // fetch addresses
    const addresses = user.addresses;

    res.status(200).json({
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retreiving addresses',
    });
  }
});

//  - - - - - - - - - - - - - - - - - - - - - -

// unhandled rejections are errors that have to do with unresolved promises
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);

  // By doing this we are giving the server time to run the remaining requests and gracefully shutdown
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋🏽 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('💥 Process terminated.');
  });
});
