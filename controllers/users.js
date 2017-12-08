const User = require('../models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

exports.getUser = getUser;
exports.getUserList = getUserList;
exports.editUser = editUser;
exports.createUser = createUser;
exports.deleteUser = deleteUser;

function getUser(req, res) {
  User.findById(req.params.id)
    .populate('itineraries')
    .exec((err, user) => {
      if (err) {
        res.status(400).json({ message: 'something went wrong' });
      } else {
        res.json(user);
      }
    });
}

function getUserList(req, res) {
  User.find((err, userList) => {
    if (err) {
      res.json(err);
    } else {
      res.json(userList);
    }
  });
}

function setPassword(req, user) {
  bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
    if (!isMatch && req.body.password) {
      let password = req.body.password;
      let salt = bcrypt.genSaltSync(bcryptSalt);
      let hashPass = bcrypt.hashSync(password, salt);
      return hashPass;
    } else {
      return user.password;
    }
  });
}

function editUser(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (user) {
      updateUser(req);
    } else {
      return res.json(err);
    }
  });
}

function updateUser(req, res) {
  let updates = {
    name: req.body.name,
    username: req.body.username,
    nationalities: req.body.nationalities,
    password: setPassword(req, user)
  };
  User.findByIdAndUpdate(req.params.id, updates, (err, user) => {
    if (err) {
      next(err);
    } else {
      return res.status(200).json({ message: 'ok', token: '', user: user });
    }
  });
}

function createUser(req, res, next) {
  const {
    name,
    username,
    password,
    placesVisited,
    itineraries,
    nationalities
  } = req.body;
  const theUser = new User({
    name,
    username,
    password,
    placesVisited,
    itineraries,
    nationalities
  });

  theUser.save(err => {
    if (err) {
      res.json(err);
    } else {
      res.json(theUser);
    }
  });
}

function deleteUser(req, res, next) {
  User.remove({ _id: req.params.id }, (err, user) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ message: 'successfully deleted' });
    }
  });
}
