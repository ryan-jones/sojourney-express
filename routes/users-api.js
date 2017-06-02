var express = require('express');
const bcrypt   = require("bcrypt");
var router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
// const passport = require("../helpers/passport");
const bcryptSalt = 10;
// var auth    = require('../helpers/auth');
const flash          = require("connect-flash");


/* Get all users*/

router.get('/users', (req, res, next) => {
  User.find((err, userList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(userList);
  });
});

/* GET a single user */
router.get('/users/:id', (req, res) => {
  console.log('something', req.body)
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findById(req.params.id, (err, theUser) => {
    console.log("inside User")
      if (err) {
        res.json(err);
        return;
      }
      User
       .findById(req.params.id)
       .populate("itineraries")
       .exec((err, user) => {
         if (err) {
           next(err);
           return;
         }
         res.json(user);
       });
    });
});

/* CREATE a new user visa schedule. */
router.post('/users', (req, res, next) => {

  const theUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    places_visited: req.body.places_visited,
    itineraries: req.body.itineraries,
    nationality: req.body.nationality,
  });

  theUser.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      id: theUser._id
    });
  });
});


router.delete('/users/:id/delete', ((req, res, next) => {
		User.remove({ _id: req.user._id }, function(err, user) {
	    if (err) {
	    	next(err)
	    } else {
	    	res.json(user);
	    }
    });
	}));


module.exports = router;
