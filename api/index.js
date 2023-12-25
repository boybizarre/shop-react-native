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
const nodemailer = require('nodemailer');
const cors = require('cors')
const jwt = require('jsonwebtoken');

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

mongoose.connect(db).then((connection) => {
  console.log('Connection successful!');
}).catch((err) => {
  console.log(err);
}) ;


const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

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