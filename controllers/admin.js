const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtOptions');
const bcryptSalt = 10;

exports.loginUser = loginUser;
exports.signupUser = signupUser;

function loginUser(req, res) {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, user) => {
    if (!user) {
      return res.status(401).json({ message: 'no such user found' });
    } else {
      return bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ message: 'passwords do not match' });
        } else {
          const payload = { id: user._id };
          const token = jwt.sign(payload, jwtOptions.secretOrKey);
          const response = { message: 'ok', token: token, user: user };
          return res.status(200).json(response);
        }
      });
    }
  });
}

function signupUser(req, res, next) {
  const { name, username, password, nationalities } = req.body;

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
        const response = { message: 'ok', token: token, user: user };
        return res.status(200).json(response);
      }
    });
  });
}
