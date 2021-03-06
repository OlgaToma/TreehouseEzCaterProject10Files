'use strict';

const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcrypt');

/**
 * Middleware to authenticate the request using Basic Authentication.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {Function} next - The function to call to pass execution to the next middleware.
 */
exports.authenticateUser = async (req, res, next) => {
  let message;

  console.log("in authenticateUser");

  const credentials = auth(req);
  console.log("Creds");
  console.log(credentials);
  
  if (credentials) {
    const user = await User.findOne({ where: {emailAddress: credentials.name} });
    if (user) {
      if(credentials.pass === null || user.password === null) {
        message = `Credentials not found`;
      } else {
        const authenticated = bcrypt
          .compareSync(credentials.pass, user.password);
        if (authenticated) {
          console.log(`Authentication successful for username: ${user.emailAddress}`);

          // Store the user on the Request object.
          req.currentUser = user;
        } else {
          message = `Authentication failure for username: ${user.emailAddress}`;
        }
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ errors: ['Access Denied'] });
  } else {
    next();
  }
};