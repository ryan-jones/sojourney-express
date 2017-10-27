const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Country = require('../models/country');

/* Get all countries*/

router.get('/countries', (req, res, next) => {
  Country.find((err, countryList) => {
    if (err) return next(err);
    return res.json(countryList);
  });
});

/* CREATE a new country visa schedule. */
router.post('/countries', (req, res) => {
  const theCountry = new Country({
    name: req.body.name,
    countryCode: req.body.countryCode,
    visaFree: req.body.visaFree,
    visaOnArrival: req.body.visaOnArrival,
    bannedFrom: req.body.bannedFrom
  });

  theCountry.save(err => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        id: theCountry._id
      });
    }
  });
});

module.exports = router;
