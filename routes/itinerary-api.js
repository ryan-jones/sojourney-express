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
  const nationality1 = req.body.nationality1;
  const nationality2 = req.body.nationality2;

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
      User.findByIdAndUpdate(
        { _id: userId },
        { $push: { itineraries: itinerary.id } },
        (err, user) => {
          if (err) {
            res.json(err);
            return;
          }
          res.json(user);
        }
      );
    }
  });
});

module.exports = router;
