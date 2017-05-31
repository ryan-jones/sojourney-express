var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Country = require('../models/country');


/* Get all countries*/

router.get('/countries', (req, res, next) => {
  Country.find((err, countryList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(countryList);
  });
});

/* GET a single country */
router.get('/countries/:id', (req, res) => {
  console.log('something', req.params.id)
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Country.findById(req.params.id, (err, theCountry) => {
    console.log("inside Country")
      if (err) {
        res.json(err);
        return;
      }

      res.json(theCountry);
    });
});

/* CREATE a new country visa schedule. */
router.post('/countries', (req, res, next) => {
  const theCountry = new Country({
    name: req.body.name,
    countryCode: req.body.countryCode,
    visaFree: req.body.visaFree,
    visaOnArrival: req.body.visaOnArrival,
    bannedFrom: req.body.bannedFrom
  });

  theCountry.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      id: theCountry._id
    });
  });
});

module.exports = router;
