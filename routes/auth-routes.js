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
  if (req.body.username && req.body.password) {
    const username = req.body.username;
    const password = req.body.password;
  }

  if (!username || !password) {
    res.status(401).json({ message: 'fill up the fields' });
    return;
  }

  User.findOne({ username: username }, (err, user) => {
    if (!user) {
      res.status(401).json({ message: 'no such user found' });
    } else {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (!isMatch) {
          res.status(401).json({ message: 'passwords do not match' });
        } else {
          const payload = { id: user._id }; //user: user.username
          const token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({ message: 'ok', token: token, user: user });
        }
      });
    }
  });
});

router.post('/signup', (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const nationality = req.body.nationality;
  const nationality2 = req.body.nationality2;

  if (!username || !password || !nationality) {
    res
      .status(400)
      .json({ message: 'Provide username, password, and nationality' });
    return;
  }

  User.findOne({ username }, 'username', (err, user) => {
    if (user) {
      res.status(400).json({ message: 'user exists' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      name,
      username,
      password: hashPass,
      nationality,
      nationality2
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        const payload = { id: user._id, user: user.username };

        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({ message: 'ok', token: token, user: user });

        // res.status(200).json(user);
      }
    });
  });
});

module.exports = router;
