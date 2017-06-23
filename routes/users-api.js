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
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log('cannot find user')
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findById(req.params.id, (err, theUser) => {
    console.log("inside User")
      if (err) {
        res.status(400).json(err);
        return;
      }
      User
       .findById(req.params.id)
       .populate("itineraries")
       .exec((err, user) => {
         if (err) {
           res.status(400).json({ message: 'something went wrong' });
           return;
         }
         res.json(user);
       });
    });
});

//edit an existing user
router.put('/users', (req, res, next)=>{
  console.log('inside of put method');
  if(!mongoose.Types.ObjectId.isValid(req.body._id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  // let password = req.body.password;
  // console.log('password', password);
  // let salt     = bcrypt.genSaltSync(bcryptSalt);
  // let hashPass = bcrypt.hashSync(password, salt);
  // console.log('hashpass', hashPass);

  const updates = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    nationality: req.body.nationality1,
    nationality2: req.body.nationality2
    };

    User.findByIdAndUpdate(req.body._id, updates, (err, user) => {

      bcrypt.compare(updates.password, user.password, function(err, isMatch) {
        console.log(isMatch);
        if (!isMatch) {
          let password = req.body.password;
          console.log('password', password);
          let salt     = bcrypt.genSaltSync(bcryptSalt);
          let hashPass = bcrypt.hashSync(password, salt);
          updates.password = hashPass;
          console.log('updates.password', updates.password)
        } else {
          updates.password = user.password
          console.log('updates.password = user.password', updates.password);
        }
      });
      console.log('updates.password', updates.password);
      if (err) {
        console.warn('xhr.responseText', xhr.responseText);
        console.log("error");
        next(err);
      } else {
        console.log('userrrrrrr -> ', user);

        res.status(200).json(user);
      }

    });
})

/* CREATE a new user. */
router.post('/users', (req, res, next) => {

  const theUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    places_visited: req.body.places_visited,
    itineraries: req.body.itineraries,
    nationality: req.body.nationality1,
    nationality2: req.body.nationality2,
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


//deletes user from the database
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
