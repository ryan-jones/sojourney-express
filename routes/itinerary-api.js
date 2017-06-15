var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Itinerary = require('../models/itinerary');

// const passport = require("../helpers/passport");
// var auth    = require('../helpers/auth');
const flash          = require("connect-flash");



router.post('/itinerary', (req, res, next) => {
  var userId = req.body.id
  var name  =       req.body.name
  var flightPaths = req.body.flightPaths
  var placesAndDates = req.body.placesAndDates
  var nationality1 =    req.body.nationality1
  var nationality2 =  req.body.nationality2

     const newItinerary = Itinerary({
        name: name,
        userId: userId,
        nationality1: nationality1,
        nationality2: nationality2,
        placesAndDates: placesAndDates
    });

      newItinerary.save((err, itinerary) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          User.findByIdAndUpdate({_id: userId},{$push: { itineraries: itinerary.id }}, (err, user) => {
              console.log("inside User")
                if (err) {
                  res.json(err);
                  return;
                }
                 res.json(user)
                console.log("user", user);
              });
        }
      });
});


      

module.exports = router;
