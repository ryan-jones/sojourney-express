const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtOptions');
const passport = require('passport');
// Our user model
const User = require('../models/user');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

//login a user
router.post('/login', function(req, res) {
  if (!req.body.username && !req.body.password) {
    return res.status(401).json({ message: 'fill up the fields' });
  }
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }, (err, user) => {
    if (!user) {
      return res.status(401).json({ message: 'no such user found' });
    } else {
      return bcrypt.compare(password, user.password, function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).json({ message: 'passwords do not match' });
        } else {
          const payload = { id: user._id };
          const token = jwt.sign(payload, jwtOptions.secretOrKey);
          const response = { message: 'ok', token: token, user: user };
          console.log('response', response);
          return res.status(200).json(response);
        }
      });
    }
  });
});

router.post('/signup', (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const nationalities = req.body.nationalities;

  if (!username || !password || !nationalities) {
    return res
      .status(400)
      .json({ message: 'Provide username, password, and nationality' });
  }

  User.findOne({ username }, 'username', (err, user) => {
    if (user) {
      return res.status(400).json({ message: 'user exists' });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      name,
      username,
      password: hashPass,
      nationalities
    });

    newUser.save((err, user) => {
      if (err) {
        return res.status(400).json({ message: err });
      } else {
        const payload = { id: user._id, user: user.username };
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        return res
          .status(200)
          .json({ message: 'ok', token: token, user: user });
      }
    });
  });
});

module.exports = router;
