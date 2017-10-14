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

/* GET a single country */
router.get('/countries/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: 'Specified id is not valid' });

  Country.findById(req.params.id, (err, theCountry) => {
    if (err) {
      res.json(err);
    } else {
      res.json(theCountry);
    }
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
