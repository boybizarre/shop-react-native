const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyAuth = async (req, res, next) => {
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
    // console.log('the error is here');
    return res.status(404).json({
      message: 'The user belonging to this token no longer exists',
    });
  }

  req.user = user;

  next();
};

module.exports = verifyAuth;
