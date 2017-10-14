const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const bcryptSalt = 10;
const flash = require('connect-flash');

/* Get all users*/

router.get('/users', (req, res) => {
  User.find((err, userList) => {
    if (err) {
      res.json(err);
    } else {
      res.json(userList);
    }
  });
});

/* GET a single user */
router.get('/users/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
  }

  User.findById(req.params.id)
    .populate('itineraries')
    .exec((err, user) => {
      if (err) {
        res.status(400).json({ message: 'something went wrong' });
      } else {
        res.json(user);
      }
    });
});

//edit an existing user
router.put('/users', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
  }

  User.findById(req.body._id, (err, user) => {
    let updates = {
      name: req.body.name,
      username: req.body.username,
      nationality: req.body.nationality1,
      password: '',
      nationality2: req.body.nationality2
    };
    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
      if (!isMatch && !req.body.password) {
        let password = req.body.password;
        let salt = bcrypt.genSaltSync(bcryptSalt);
        let hashPass = bcrypt.hashSync(password, salt);
        updates.password = hashPass;
      } else {
        updates.password = user.password;
      }
      User.findByIdAndUpdate(req.body._id, updates, (err, user) => {
        // bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
        //   console.log('isMatch', isMatch, updates.password, user.password);
        //   if (!isMatch && req.body.password !== null && req.body.password !== undefined) {
        //     let password = req.body.password;
        //     console.log('password', password);
        //     let salt     = bcrypt.genSaltSync(bcryptSalt);
        //     let hashPass = bcrypt.hashSync(password, salt);
        //     updates.password = hashPass;
        //     console.log('updates.password1', updates.password)
        //   } else {
        //     updates.password = user.password;
        //     console.log('updates.password', updates.password)
        //   }
        // });

        if (err) {
          next(err);
        } else {
          user = updates;
          res.status(200).json(user);
        }
      });
    });
  });
});

/* CREATE a new user. */
router.post('/users', (req, res, next) => {
  const theUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    placesVisited: req.body.placesVisited,
    itineraries: req.body.itineraries,
    nationalities: req.body.nationalities
  });

  theUser.save(err => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        id: theUser._id
      });
    }
  });
});

//deletes user from the database
router.delete('/users/:id/delete', (req, res, next) => {
  User.remove({ _id: req.user._id }, function(err, user) {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
