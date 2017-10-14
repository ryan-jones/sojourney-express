const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Itinerary = require('../models/itinerary');

// const passport = require("../helpers/passport");
// const auth = require('../helpers/auth');
const flash = require('connect-flash');

router.post('/itinerary', (req, res, next) => {
  const userId = req.body.id;
  const name = req.body.name;
  const flightPaths = req.body.flightPaths;
  const placesAndDates = req.body.placesAndDates;
  const nationalities = req.body.nationalities;

  const newItinerary = Itinerary({
    name,
    userId,
    nationalities,
    placesAndDates
  });

  newItinerary.save((err, itinerary) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      User.findByIdAndUpdate(
        { _id: userId },
        { $push: { itineraries: itinerary.id } },
        (err, user) => {
          if (err) {
            res.json(err);
          } else {
            res.json(user);
          }
        }
      );
    }
  });
});

module.exports = router;
