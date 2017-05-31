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
  console.log('something', req.params.id)
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

      res.json(theUser);
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



// /* GET users listing. */
// router.get('/signup', function(req, res, next) {
//   let role = req.query.role;
//   res.render('auth/signup', { "message": req.flash("error"), role });
// });
//
// router.post("/signup", (req, res, next) => {
//   var name = req.body.name;
//   var username = req.body.username;
//   var password = req.body.password;
//   var nationality = req.body.nationality;
//   var role = req.body.usertype;
//   var companyid = null;
//
//   if (username === "" || password === "") {
//   	req.flash('error', 'Indicate username and password' );
//     res.render("auth/signup", { "message": req.flash("error") });
//     return;
//   }
//
//   User.findOne({ username }, "name", (err, user) => {
//     if (user !== null) {
//     	req.flash('error', 'The username already exists' );
//       res.render("auth/signup", { message: req.flash("error") });
//       return;
//     }
//
//     var salt     = bcrypt.genSaltSync(bcryptSalt);
//     var hashPass = bcrypt.hashSync(password, salt);
//
//     var newUser = User({
//       name,
//       username,
//       password: hashPass,
//       nationality,
//       role,
//       companyid
//     });
//
//     newUser.save((err) => {
//       if (err) {
//       	req.flash('error', 'The username already exists' );
//         res.render("auth/signup", { message: req.flash('error') });
//       } else {
//         passport.authenticate("local")(req, res, function () {
//            res.redirect('/login');
//         });
//       }
//     });
//   });
// });
//
// router.get("/login", (req, res, next) => {
//   res.render("auth/login", { "message": req.flash("error") });
// });
//
//
// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/users/index/",
//   failureRedirect: "/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));
//
//
// router.get('/users/index/', auth.checkLoggedIn('You must be logged in', '/login'), (req, res, next) => {
//   if(req.user.role === "USER") {
//       res.render('users/index', { user: req.user});
//   } else if (req.user.role === "COMPANY") {
//       res.render('companies/index', { user: req.user});
//   } else {
//       res.render('admin/index', { user: req.user });
//     }
// });

module.exports = router;
